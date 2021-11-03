migrate:
	docker compose run api python manage.py migrate

make makemigrations:
	docker compose run api python manage.py makemigrations

populate_db:
	docker compose run api python manage.py loaddata api/fixtures/test_campaign.json

drop_db:
	docker compose stop db && docker container rm draftivist_db_1 && docker volume rm draftivist_db_data

