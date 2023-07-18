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
    for file in request.files.getlist("images"):
        try:
            name = str(uuid.uuid4())
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

            old_tags = Tag.query.filter(Tag.name.in_(all_tag_names))
            old_tag_names = [tag.name for tag in old_tags]
            
            # Try each tag separately to avoid duplicates, associate
            for tag in all_tags:
                try:
                    print("start")
                    print(old_tag_names)
                    for name in old_tag_names:
                        print(name)
                    if (not (tag[0].name in old_tag_names)):
                        print("if")
                        print(tag[0].name)
                        image_tags.append(
                            Image_tag(image=image,
                            tag=tag[0],
                            confidence=tag[1])
                            )
                    else:
                        print("else")
                        print(tag[0].name)
                        image_tags.append(
                            Image_tag(image=image,
                            tag=next(t for t in old_tags if t == tag[0].name),
                            confidence=tag[1])
                            )
                except Exception as e:
                    print(e)
                    print("Unexpected error:", sys.exc_info()[0])

            db.session.add(image)
            db.session.commit()

            # Add all tag-image relations at once
            for image_tag in image_tags:
                db.session.add(image_tag)
            db.session.commit()

            # upload the file to the container using uuid as the blob name
        except Exception as e:
            # ignore duplicate filenames
            print("Ignoring duplicate filenames")
            print(e)

    return redirect('/')


@bp.get('/all')
def images_as_json():

    images =  [i.to_dict() for i in Image.query.all()]

    return jsonify(images)

@bp.get('/details/<id>')
def image_info(id):
    image = Image.query.get(id)
    return jsonify(image.to_dict())
