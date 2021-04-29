import click
from flask.cli import with_appcontext
# Accept current changes
# from .extension import db
# from .Models.User import userModel
# from .Models.Campaign import campaignModel


from extension import db
from Models.User import userModel
from Models.Campaign import campaignModel


@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()