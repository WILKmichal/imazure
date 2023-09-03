from flask import Flask

from config import Config
from app.extensions import db
from flask_cors import CORS

def create_app(config_class=Config):
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:3000", "https://localhost:3000"])
    app.config.from_object(config_class)

    # Initialize Flask extensions here
    db.init_app(app)
    
    # Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.images import bp as images_bp
    app.register_blueprint(images_bp, url_prefix='/images')

    from app.tags import bp as tags_bp
    app.register_blueprint(tags_bp, url_prefix='/tags')

    return app