# How to migrate DB:
Run command:
```
    docker-compose exec app npx prisma migrate dev --name {{your name}}
    docker-compose exec app npx prisma generate
```
# How to install new package for app:
Run command:
```
docker-compose exec app npm install {{package}}
```

# How to install new package for worker:
Run command:
```
docker-compose exec worker npm install {{package}}
```