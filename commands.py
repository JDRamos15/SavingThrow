import click
from flask.cli import with_appcontext

from extensions import db
from Models.User import userModel
from Models.Campaing import campaignModel

@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()