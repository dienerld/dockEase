# create script to run docker compose

docker:
	docker compose up -d

docker-build:
	docker compose up -d --build

docker-destroy:
	docker compose down --volumes

drizzle-studio:
	yarn drizzle-kit studio

run: docker drizzle-studio

run-build: docker-build
