init:
	@docker-compose stop && docker-compose build --no-cache && docker-compose up -d --remove-orphans

up:
	@docker-compose stop && docker-compose up --build -d --remove-orphans

down:
	@docker-compose stop

restart:
	@docker-compose restart

# frontend
frontend-install:
	@docker-compose run --rm frontend npm install

frontend-logs:
	docker logs -f frontend

frontend-bash:
	docker exec -it frontend sh

# backend
backend-install:
	@docker-compose run --rm backend npm install

backend-logs:
	docker logs -f backend

backend-bash:
	docker exec -it backend /bin/bash

	# docker exec -it backend sh
