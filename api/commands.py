import click
from flask.cli import with_appcontext
# Accept current changes
# from .extension import db
# from .Models.User import userModel
# from .Models.Campaign import campaignModel
# from .Models.characterSheets import characterSheetModel
# from .Models.Room import roomModel

from extension import db
from Models.User import userModel
from Models.Campaign import campaignModel
from Models.characterSheets import characterSheetModel
from Models.Room import roomModel


@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()