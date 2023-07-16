import click
from flask import current_app, g
from flask_sqlalchemy import SQLAlchemy

def get_db():
    if 'db' not in g:
        g.db = SQLAlchemy(current_app)

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    # if db is not None:
        # db.dispose()

def init_db():
    db = get_db()
    print('db')
    with current_app.open_resource('schema.sql') as f:
        with db.engine.connect() as con:
            con.execute(f.read().decode('utf8'))
            print('a')
        print('a')
    print('db2')


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)