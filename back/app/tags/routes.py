from app.tags import bp
from app.extensions import db
from app.models.tag import Tag
from app.models.image import Image
from flask import (jsonify, request,Blueprint)

@bp.get('all')
def tags():
    most_used = (
    db.session.query(
        Tag,
        db.func.count(db.case(((Image.id.isnot(None), 1)), else_=0)).label('image_count')
    )
    .outerjoin(Tag.images)
    .group_by(Tag.id)
    .order_by(db.func.count(Image.id).desc())
    .all()
    )
    for tag, image_count in most_used:
        tag.image_count = image_count
    
    tags =  [tag.to_dict(rules = ('-images', 'image_count')) for tag, image_count in most_used]
    return jsonify(tags)

@bp.get('count/')
def allImageCount():
    tags = Tag.query.all()
    tags_data = [{"id": tag.id,"num_images": len(tag.images)} for tag in tags]
    return jsonify(tags_data)


@bp.get('count/<id>')
def imageCount(id):
    tag = Tag.query.get(id)
    return jsonify(len(tag.images))

@bp.get('<id>/images')
def imagesByTag(id):
    images = Tag.query.get(id).images
    return jsonify([i.to_dict(rules=('-tags',)) for i in images])
