from os.path import join, dirname, abspath
from dotenv import load_dotenv
DOTENV_PATH = abspath(join(dirname(__file__), '../../', '.env'))
load_dotenv(DOTENV_PATH)

from .base import *

if IS_PROD:
    from .prod import *
else:
    from .dev import *
