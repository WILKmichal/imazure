from app.extensions import db
from sqlalchemy_serializer import SerializerMixin

class Image(db.Model, SerializerMixin):
    serialize_only = ('id', 'title', 'url', 'name', 'tags')
    serialize_rules = ('-tags.images',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    url = db.Column(db.String(2048))
    name = db.Column(db.String(64))
    
    tags = db.relationship("Tag", secondary="image_tag", back_populates="images")
    
    def __repr__(self):
        return f'<Image "{self.title}">'
