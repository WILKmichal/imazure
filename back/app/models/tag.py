from app.extensions import db

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250))

    images = db.relationship("Image",secondary="image_tag", back_populates="tags")

    def __repr__(self):
        return f'<Tag "{self.name}">' 