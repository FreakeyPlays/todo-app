build:
	docker-compose -f docker-compose.yml build

run:
	docker-compose -f docker-compose.yml up

start:
	docker-compose -f docker-compose.yml start

stop:
	docker-compose -f docker-compose.yml stop

remove:
	docker-compose -f docker-compose.yml down