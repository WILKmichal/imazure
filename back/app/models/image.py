from app.extensions import db


class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    url = db.Column(db.String(2048))
    name = db.Column(db.String(64))
    
    tags = db.relationship("Tag", secondary="image_tag", back_populates="images")
    
    def __repr__(self):
        return f'<Image "{self.title}">'
