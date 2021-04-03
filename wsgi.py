import os
from api.app import getApp

os.environ['DATABASE_URL']
app = getApp()