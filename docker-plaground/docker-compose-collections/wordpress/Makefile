up:
	docker compose up -d

down:
	docker compose down

reset:
	docker compose down --volumes --remove-orphans
	make remove-files

remove-files:
	sudo chmod 777 wp-data
	sudo rm -rf wp-data
	sudo chmod 777 db-data
	sudo rm -rf db-data
	echo "Removed wp-data and db-data directories"