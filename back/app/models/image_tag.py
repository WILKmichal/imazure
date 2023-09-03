from app.extensions import db
from app.models.image import Image
from app.models.tag import Tag

class Image_tag(db.Model):
    image_id = db.Column(db.Integer, db.ForeignKey('image.id', ondelete='CASCADE'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), primary_key=True)
    confidence = db.Column(db.Float)
    image = db.relationship(Image, backref="image_assoc")
    tag = db.relationship(Tag, backref="tag_assoc")

    def __repr__(self):
        return f'<Tag "{self.tag.name}" <-> Image "{self.image.title}">'
