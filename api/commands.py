import click
from .extension import db
from .Models.User import userModel
from .Models.Campaign import campaignModel
from flask.cli import with_appcontext


@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()