from app.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Tag(db.Model, SerializerMixin):
    serialize_only = ('id', 'name', 'images')
    serialize_rules = ('-images.tags',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True)

    images = db.relationship("Image",secondary="image_tag", back_populates="tags")
    image_count = 0
    matched = False
    confidence = 0.0
    def __repr__(self):
        return f'<Tag "{self.name}">' 