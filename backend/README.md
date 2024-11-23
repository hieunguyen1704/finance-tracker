# How to migrate DB:
Run command:
```
    docker-compose exec app npx prisma migrate dev --name {{your name}}
    docker-compose exec app npx prisma generate
```
# How to install new package:
Run command:
```
docker-compose exec app npm install {{package}}
```