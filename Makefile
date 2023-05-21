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

cypress-cli:
	npx cypress run

cypress-ui:
	npx cypress open

test-k6:
	docker run --net=host --rm -v ${pwd}/k6:/e2e -e STAGE=dev --workdir /e2e -i loadimpact/k6 run /e2e/main.js --summary-export=/e2e/summary.json