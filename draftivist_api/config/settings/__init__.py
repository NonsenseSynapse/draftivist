from dotenv import load_dotenv
from .base import *

DOTENV_PATH = os.path.abspath(os.path.join(PROJECT_ROOT, '..', '.env'))
load_dotenv()

if IS_PROD:
    from .prod import *
elif IS_STAGING:
    from .staging import *
else:
    from .dev import *
