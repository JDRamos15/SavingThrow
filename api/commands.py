import click
from flask.cli import with_appcontext

import extension.db
import Models.User.userModel
import Models.Campaign.campaignModel

@click.command(name='create_tables')
@with_appcontext
def create_tables():
    db.create_all()