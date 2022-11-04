build-server:
	docker build -f Dockerfile.server -t nestjs-backend .

build-client:
	docker build -f Dockerfile.client -t angular-frontend .

build:
	make build-server && make build-client

run:
	docker-compose -f docker-compose.yml up

start:
	docker-compose -f docker-compose.yml start

stop:
	docker-compose -f docker-compose.yml stop

remove:
	docker-compose -f docker-compose.yml down