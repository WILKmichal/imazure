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
from azure.storage.blob import BlobServiceClient
from datetime import datetime
from flask import current_app
Object = lambda **kwargs: type("Object", (), kwargs)
from dotenv import load_dotenv
load_dotenv()

# retrieve the connection string from the environment variable
connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
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

            # TODO get tags from API
            # TODO make sure tags are unique
            tag = Tag(name = 'tag given by API')
            tag2 = Tag(name = '2nd tag')
            image_tag = Image_tag(image=image, tag=tag, confidence=0)
            image_tag2 = Image_tag(image=image, tag=tag2, confidence=10)
            db.session.add(image)
            db.session.add(tag)
            db.session.add(tag2)
            db.session.add(image_tag)
            db.session.add(image_tag2)
            db.session.commit()

            # upload the file to the container using uuid as the blob name
        except Exception as e:
            # ignore duplicate filenames
            print("Ignoring duplicate filenames")
            print(e)

    return redirect('/')


@bp.get('/all')
def images_as_json():
    # list all the blobs in the container
    blob_items = container_client.list_blobs()
    images = []
    for blob in blob_items:
        blob_client = container_client.get_blob_client(blob=blob.name)
        images.append({
            "url": blob_client.url,
            "name": blob_client.blob_name
        })
    return jsonify(images)
