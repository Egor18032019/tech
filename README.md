Проект для ...
---
Применяемые технологии: Spring Boot, ReactJS, PostgreSQL
***

## Install

1. Скачать
2. Создайте файл с секретами `.env` (например, из файла образца `.env.example`)
3. Зайти с помощью терминала/Windows power shell в папку проекта выполнить команду `docker compose up`
или
```shell
docker run --name demo -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -e POSTGRES_DB=demo -d postgres:11-alpine
```
```shell
mvn -f pom.xml clean package -D  maven.test.skip=true
```
```shell
java -jar target/tech-0.0.1-SNAPSHOT.jar --status=running
```
```shell
cp .env.example .env
```
```shell
cd src/main/ui
npm i
npm run build
rm -rf ../../../src/main/resources/static/
cp -r build ../../../src/main/resources/static/
```
    
## Usage

* В браузере зайти на сайт
http://localhost:8080/

* Документация лежит тут http://localhost:8080/swagger-ui/index.html
или http://localhost:8080/v3/api-docs
или в виде файла openapi.yaml

* Метрики
http://localhost:9999/actuator/prometheus

# TODO
 
## фронт:
- После того как сделал заявку и метка появилась на месте пина(пин возращаеться на место или другое поведение?)
- Стилизировать метки 
- Добавить дизайн(футер,хедер и т.п.)
## бэкенд
 
 
 

