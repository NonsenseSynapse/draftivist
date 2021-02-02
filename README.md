# Draftivist

## Setup

### Docker (preferred)

#### Prerequisites
The only thing you need to download/have installed is Docker.

Please refer to the [official Docker documentation](https://docs.docker.com/compose/install/) for instructions on how
to install Docker locally. Please not that if you do not download the Docker Desktop client and install Docker in a
different way, you need to make sure you install both Docker AND Docker-Compose. The Docker Desktop client handles
installing both for you:
- [Docker Desktop documentation for Macs](https://docs.docker.com/docker-for-mac/install/)
- [Docker Desktop Documentation for Windows](https://docs.docker.com/docker-for-windows/install/)

#### Building the Docker containers
Once you have Docker and Docker-Compose installed, clone this repo and open a terminal window in the root project
directory (`draftivist/`).

From there, just run `docker-compose up` and all of the containers will be built and started! It will probably take a
while to build the first time, but subsequent runs will be significantly faster.

To stop all of the containers, you can just use `Ctrl+C` (the standard terminal command for stopping the current
process.)

See below for more helpful Docker commands.

#### Initializing the database
When first setting up your environment (or any time there are changes to the database schema), just run the following to
update your database to the latest:
```
docker-compose run draftivist_api python manage.py migrate
```

#### Seeding local test data
To load an initial campaign that is pre-populated with issues and statements (note, you must run the database initialize
command above first so the expected DB tables are already set up):
```
docker-compose run draftivist_api python manage.py loaddata api/fixtures/test_campaign.json
```

### Manual (optional)

#### Frontend
To start the the Draftivist UI app:
1. Ensure Node v14 is installed: [Node installation](https://nodejs.org/en/download/)
2. Ensure `yarn` is installed: [yarn installation docs](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
3. Run `yarn install` to install all packages.
4. Run `yarn start` to manually run the application. Once running, the application will be available at http://localhost:3000.

#### Backend
Note that this method is a longer process and prone to more errors than using the docker configurations. You will also
have to ensure you have Postgres installed locally (this is included in the instructions below for Mac setup).  

1. install postgresql, pyenv, and pyenv-virtualenv (Mac Only)
```
brew install pyenv pyenv-virtualenv postgresql
```
Then add the following to `~/.zshrc` (or `~/.bash_profile` if you are not using zsh) to automatically initialize the 
virtualenv when you are in this directory
```
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"

if command -v pyenv 1>/dev/null 2>&1; then
  eval "$(pyenv init -)"
fi

if which pyenv-virtualenv-init > /dev/null; then
  eval "$(pyenv virtualenv-init -)"
fi
```
Restart your shell. Now that `PYENV_ROOT` is set, install python version 3.9.0 and create a virtualenv for draftivist: 
```
pyenv install 3.9.0
pyenv virtualenv 3.9 draftivist
```
Restart your shell once more. At this point, if you navigate to `draftivist/draftivist_api` in a terminal, you should 
see something like this:
```
(draftivist) knewman@Keiths-MacBook-Pro draftivist_api %
```
indicating that you are within the draftivist virtual environment. The reason it says "(draftivist)" is because of the
`.python-version` file in the `draftivist_api/` directory.

To further verify that it is working correctly, you can run this:
```
pyenv which pip
```
Which should point to the local paths we set up within `PYENV_ROOT`. Something like:
```
/Users/knewman/.pyenv/versions/draftivist/bin/pip
```
Once we know that we are inside the virtualenv, you can just install the requirements:
```
pip install -r requirements.txt
```

### Production
The basic structure for our production app is to build the frontend app in a Docker container using webpack, and then
copy those static assets into the `draftivist_api/frontend/static`. We then leverage Django's built-in `collectstatic`
to upload all of the static assets to DigitalOcean Spaces (similar to Amazon S3), which we then use to serve the frontend
app's CSS and JS files, as well as the static assets for the Django admin and Rest Framework assets.

####Running a production-like app locally
Note that these steps are a bit finnicky, as we are faking several of the steps in an actual production setup. If you
are still seeing this message, then I probably have not gotten around to making it more robust, so proceed at your own
risk. :)

1. Copy the contents of `.env-example` into a file called `.env`
1. Tweak `draftivist_ui/config/webpack.config.production.js` with the following values:
    1. `'__API_HOSTNAME__': JSON.stringify("http://localhost:8000/api")`
    1. `publicPath: "http://localhost:8000/static"`
1. Start up your local database `docker-compose up -d db`
1. Build the app! From the root directory, just run `./scripts/run_production.sh`

####A few notes
1. As you may have noticed, in the `.env-example` file, we have `PROJECT_ENVIRONMENT="DEV"`. On our actual production
environment, we use the environment "PROD", but building with that configuration will cause an error locally since you
do not have the production database or DigitalOcean Spaces credentials. As an alternative, the static assets are served
locally from the system, which also leverages Django's built-in static asset collection.
1. The app runs on port 8000. On production, we have `nginx` running as a reverse-proxy which allows port 80 on our
production server to deliver the application.

## Help and FAQs
### Aliases
Sometimes it can be helpful to add an alias for a terminal command that you know you will use frequently. Since
`docker-compose` can be annoying to keep typing, I recommend adding this line to your currently shell profile:
```
alias dc="docker-compose"
```
This will allow you to just type `dc` instead of `docker-compose` every time.

Note: depending on your operation system and which terminal shell you are using, the location and name of your shell
profile may vary. Some common options are:
1. Mac/Linux
    1. `~/.zshrc` (if using zsh, the new standard on macs)
    1. `~/.bash_profile` (if using an older/standard terminal)
1. Windows
    1. Unfortunately, bash profiles and aliases are a bit more complicated to set up in Windows. If you are on a
    Windows machine and this becomes an issue for you, please raise your concern and we can lock down an official
    recommended protocol.

### Docker Commands
Here are a list of some of the most helpful Docker and Docker-Compose commands. Unless otherwise noted, you can assume
that these should all be run in the project's root directory.

Also, there are some commands where I mention being able to pass in a container name. To view the list of possible
containers, check the `docker-compose.yaml` file. The containers are each listed at the first nested level, under
`services` (i.e. `draftivist_api`, `db`, `draftivist_ui`).

#### List all containers
```
docker ps -a
```

#### Start all containers (all output streamed to your current terminal window)
```
docker-compose up
```

#### Start all containers in detached mode (no terminal output in current terminal window)
```
docker-compose up -d
```

#### Stop all running containers
This is particularly useful if you started your containers in detached mode.
```
docker-compose stop
```

#### Run a command on a specific container
You can run pretty much any `docker-compose` command by passing in a specific container's name as the last argument.
For example:
```
# Only starts draftivist_api in detached mode
docker-compose up -d draftivist_api

# Restart UI
docker-compose restart draftivist_ui
```

#### Enter a terminal shell within the container
```
docker-compose run draftivist_api bash
```

#### Run an arbitrary command from a container
This allows you to pass any command-line input to the container.
```
docker-compose run draftivist_api <custom command>

# Examples
docker-compose run draftivist_ui yarn install
docker-compose run draftivist_api python manage.py migrate
```

#### View terminal output for a container
Having all of the console output streaming to a single terminal window can be hard to follow. Often, it is easier to
start all containers in detached mode, and then use the following command to get a live readout of the terminal output
for a given container.
```
docker-compose logs -ft <container name>

# Example
docker-compose logs -ft draftivist_api
```

#### Clean up any lingering containers
Each time you kick off a different command, you are creating a new docker container. For example, try running the
following commands:
```
docker-compose up -d
docker-compose run draftivist_api bash

# Ctrl+D to exit the bash shell you just opened

docker ps -a
```
You will notice 4 containers. 1 for the DB, 1 for the UI, 1 for the API, and 1 for the `bash` command that you just ran.

In order to fix this, you can do the following:
```
# Ensure all containers are stopped
docker-compose stop

# Now start up only the containers defined in docker-compose.yaml
docker-compose up -d

# Remove any dangling docker containers or resources
docker system prune
```

#### Completely nuke your environment
By default, Docker has a concept called Volumes. A Volume represents data that persists between instances of the
application. This is the reason you can start and stop your containers without affecting your local database. Becaus
the database is defined as a Volume.

If you run into a situation where you want to completely remove and rebuild all containers AND volumes, do the
following:
```
# Ensure all containers are stopped
docker-compose stop

# Remove any dangling docker containers, resources, AND volumes
docker system prune --volumes

# Rebuild your containers
docker-compose build
docker-compose up
```

#### More Info...
The official [Docker-Compose documentation](https://docs.docker.com/compose/reference/) is very good. Feel free to
check there to look into the other commands not listed here.
