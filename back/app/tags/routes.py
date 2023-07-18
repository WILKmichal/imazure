from app.tags import bp
from app.models.tag import Tag
from flask import (jsonify, request,Blueprint)

@bp.get('all')
def tags():
    tages =  [i.to_dict(rules = ('-images',)) for i in Tag.query.all()]
    return jsonify(tages)

@bp.get('count/')
def tags():
    tags = Tag.query.all()
    tags_data = [{"id": tag.id,"num_images": len(tag.images)} for tag in tags]
    return jsonify(tags_data)

@bp.get('count/<id>')
def imageCount(id):
    tag = Tag.query.get(id)
    return jsonify(len(tag.images))
