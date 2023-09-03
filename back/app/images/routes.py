from flask import render_template
from app.images import bp
from app.extensions import db
from app.models.image import Image
from app.models.tag import Tag
from app.models.image_tag import Image_tag

from flask import (
    Blueprint,
    redirect,
    render_template,
    request,
    url_for,
    jsonify

)

import jsonpickle
import uuid
from werkzeug.exceptions import abort
import os
import sys
from azure.storage.blob import BlobServiceClient
from datetime import datetime
from flask import current_app
Object = lambda **kwargs: type("Object", (), kwargs)
from dotenv import load_dotenv
load_dotenv()

from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials


# retrieve the connection string from the environment variable
connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
subscription_key = os.getenv('VISION_KEY')
endpoint = os.getenv('VISION_ENDPOINT')
computervision_client = ComputerVisionClient(endpoint, CognitiveServicesCredentials(subscription_key))
# container name in which images will be store in the storage account
container_name = "images"
# create a blob service client to interact with the storage account
blob_service_client = BlobServiceClient.from_connection_string(
    conn_str=connect_str)
try:
    # get container client to interact with the container in which images will be stored
    container_client = blob_service_client.get_container_client(
        container=container_name)
    # get properties of the container to force exception to be thrown if container does not exist
    container_client.get_container_properties()
except Exception as e:
    # create a container in the storage account if it does not exist
    container_client = blob_service_client.create_container(container_name)


@bp.get('/view')
def index():
    images = Image.query.all()
    return render_template('images/index.html', images=images)


@bp.get('view/upload')
def upload_form():
    return render_template('images/upload.html')


@bp.post('/upload')
def upload():
    images = []
    for file in request.files.getlist("images"):
        try:
            extension = os.path.splitext(file.filename)[1]
            name = str(uuid.uuid4()) + extension 
            uploaded = container_client.upload_blob(name, file)
            image = Image(
                title = file.filename,
                url = uploaded.url,
                name = name
            )
            remote_image_url = uploaded.url
            # Call API with remote image
            tags_result_remote = computervision_client.tag_image(remote_image_url)
            all_tags = []
            all_tag_names = []
            image_tags = []
            old_tags = []

            for tag in tags_result_remote.tags:
                tagEntity = Tag(name = tag.name)
                all_tag_names.append(tag.name)
                all_tags.append((tagEntity, tag.confidence))

            old_tags = Tag.query.filter(Tag.name.in_(all_tag_names)).all()
            old_tag_names = [tag.name for tag in old_tags]
            
            # Try each tag separately to avoid duplicates, associate
            for tag in all_tags:
                try:
                    if (not (tag[0].name in old_tag_names)):
                        image_tags.append(
                            Image_tag(image=image,
                            tag=tag[0],
                            confidence=tag[1])
                            )
                    else:
                        image_tags.append(
                            Image_tag(image=image,
                            tag=next(iter([t for t in old_tags if t.name == tag[0].name])),
                            confidence=tag[1])
                            )
                except Exception as e:
                    print(e)

            db.session.add(image)
            db.session.commit()
            images.append(image)

            # Add all tag-image relations at once
            for image_tag in image_tags:
                db.session.add(image_tag)
            db.session.commit()

            # upload the file to the container using uuid as the blob name
        except Exception as e:
            # ignore duplicate filenames
            print(e)

    return [i.to_dict() for i in images]


@bp.get('/all')
def images_as_json():

    images =  [i.to_dict() for i in Image.query.all()]

    return jsonify(images)

# get image details + associated tags
@bp.get('/details/<id>')
def image_info(id):
    image = Image.query.get(id)

    return jsonify(image.to_dict())

# add tags to an image
# expects
# {
#     "title": "Cars",
#     "tags": ["pixel", "illustration"]
# }
@bp.put('/<id>')
def add_image_tags(id):
    img_from_json = jsonpickle.decode(request.data)
    print(img_from_json)
    image = Image.query.get(id)
    tag_list = img_from_json['tags']
    all_tags = []
    all_tag_names = []
    image_tags = []
    existing_tags = []

    for tag in tag_list:
        tagEntity = Tag(name = tag)
        all_tag_names.append(tag)
        all_tags.append((tagEntity, 1.0))

    existing_tags = Tag.query.filter(Tag.name.in_(all_tag_names)).all()
    existing_tag_names = [tag.name for tag in existing_tags]

    for tag in all_tags:
        try:
            if (not (tag[0].name in existing_tag_names)):
                
                image_tags.append(
                    Image_tag(image=image,
                    tag=tag[0],
                    confidence=tag[1])
                    )
            else:
                image_tags.append(
                    Image_tag(image=image,
                    tag=next(iter([t for t in existing_tags if t.name == tag[0].name])),
                    confidence=tag[1])
                    )
        except Exception as e:
            print(e)

    # only associate tags if not already associated
    associated_tags = [t for t in image.tags]
    associated_tags_ids = [t.id for t in image.tags]
    to_be_associated = [i_t for i_t in image_tags if ((not (i_t.tag.id in associated_tags_ids)) and (i_t.tag.name in tag_list)) ]

    to_be_deleted_ids = [t.id for t in associated_tags if not (t.name in tag_list)]
    Image_tag.query.filter(Image_tag.tag_id.in_(to_be_deleted_ids)).delete()


    for image_tag in to_be_associated:
        db.session.add(image_tag)
    db.session.commit()

    image.title = img_from_json['title']
    image.description = img_from_json['description']
    print(image.description)
    db.session.commit()

    return jsonify(image.to_dict())

# delete a single image
@bp.delete('/<id>')
def delete_image(id):
    try:
        img = Image.query.get(id)
        if (img == None): return ('', 204)

        Image_tag.query.filter_by(image_id=id).delete()
        Image.query.filter_by(id=id).delete()

        blob_client = container_client.get_blob_client(blob=img.name)
        blob_client.delete_blob(delete_snapshots="include")
        db.session.commit()
        return ('', 204)
    except Exception as e:
        return (str(e), 500)

@bp.delete('/multiple')
def delete_images():
    try:
        id_list = request.get_json(force=False, silent=False, cache=True)
        for image_id in id_list:
            Image_tag.query.filter_by(image_id=image_id).delete()
            img = Image.query.get(image_id)
            if (img == None): continue
            blob_client = container_client.get_blob_client(blob=img.name)
            blob_client.delete_blob(delete_snapshots="include")

        Image.query.filter(Image.id.in_(id_list)).delete()

        db.session.commit()
        return ('', 204)
    except Exception as e:
        return (str(e), 500)

@bp.get('by-tags')
def imagesByTag():
    tags = request.args.getlist("tag")

    if (len(tags) == 0):
        return jsonify([i.to_dict() for i in Image.query.all()])

    subquery = (
    db.session.query(Image_tag.image_id, db.func.count(Image_tag.tag_id).label('count'))
    .filter(Image_tag.tag_id.in_(tags))
    .group_by(Image_tag.image_id)
    .having(db.func.count(Image_tag.tag_id) == len(tags))
    .subquery()
    )

    # Get the images that have associations with all the tags
    images = (
        db.session.query(Image)
        .join(subquery, Image.id == subquery.c.image_id)
        .all()
    )

    images = [i.to_dict() for i in images]

    return jsonify(images)

@bp.get('search')
def image_search():
    query = request.args.get("q")

    if not query:
        return jsonify([image.to_dict() for image in Image.query.all()])
    
    query_words = query.split()
    like_queries = [f"%{word}%" for word in query_words]

    if (len(request.args.get("q")) == 0):
        return jsonify([i.to_dict() for i in Image.query.all()])

    subquery = (
    db.session.query(Image_tag.image_id, Image_tag.confidence)
    .join(Tag)
    .filter(db.or_(*[Tag.name.ilike(like_query) for like_query in like_queries]))
    .group_by(Image_tag.image_id, Image_tag.confidence)
    .distinct(Image_tag.image_id)
    .subquery()
    )

    # Get the images that have associations with all the tags
    images = (
        db.session.query(Image, subquery.c.confidence)
        .join(subquery, Image.id == subquery.c.image_id)
        .all()
    )

    for image, confidence in images:
        for tag in image.tags:
            for word in query_words:
                tag.matched = (word.lower() in tag.name.lower()) or tag.matched
            tag.confidence = confidence
        image.tags.sort(key=lambda tag: ( not tag.matched ))

    images = [i.to_dict(rules=('tags.matched', 'tags.confidence')) for i, confidence in images]

    return jsonify(images)