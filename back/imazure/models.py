from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from imazure import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __init__(self,ids, name):
        self.id = ids
        self.name = name