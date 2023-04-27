from flask import (
    Blueprint,
    flash,
    g,
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


bp = Blueprint('image', __name__)


from datetime import datetime
Object = lambda **kwargs: type("Object", (), kwargs)

# retrieve the connection string from the environment variable
connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')
# container name in which images will be store in the storage account
container_name = "images"

# create a blob service client to interact with the storage account
blob_service_client = BlobServiceClient.from_connection_string(conn_str=connect_str)
try:
    # get container client to interact with the container in which images will be stored
    container_client = blob_service_client.get_container_client(container=container_name)
    # get properties of the container to force exception to be thrown if container does not exist
    container_client.get_container_properties()
except Exception as e:
    # create a container in the storage account if it does not exist
    container_client = blob_service_client.create_container(container_name)

@bp.get('/')
def index():
    # list all the blobs in the container
    blob_items = container_client.list_blobs()
    images = []
    for blob in blob_items:
        blob_client = container_client.get_blob_client(blob=blob.name)
        images.append(Object(url = blob_client.url, name = blob_client.blob_name))

    return render_template('image/index.html', images=images)

@bp.get('/all')
def images_as_json():
    # list all the blobs in the container
    blob_items = container_client.list_blobs()
    images = []
    for blob in blob_items:
        blob_client = container_client.get_blob_client(blob=blob.name)
        images.append({ "url": blob_client.url, "name": blob_client.blob_name })
    return jsonify(images)


@bp.get('/upload')
def upload_form():
    return render_template('image/upload.html')

@bp.post('/upload')
def upload():
    for file in request.files.getlist("images"):
        try:
            # upload the file to the container using uuid as the blob name
            container_client.upload_blob(str(uuid.uuid4()), file)
        except Exception as e:
            # ignore duplicate filenames
            print("Ignoring duplicate filenames")
            print(e)
        
    return redirect('/')

@bp.delete('/')
def delete_files():
    try:
        container_client.delete_blobs(*request.args.getlist('name'))
    except Exception as e:
        print('Exception')
        print(e)
    return jsonify(None)