## sequelize
sequelize db:migrate
sequelize db:migrate:undo
sequelize migration:generate --name articles
sequelize model:generate --name test --attributes title:string,name:string

## heroku
#
DB : https://data.heroku.com/datastores/ebe1b516-9f9b-46a6-b589-f624a021fab3#
#
git push heroku master
heroku run bash
heroku ps:scale web=1
heroku open
# may need to taskkill /f /im node.exe to kill current node tasks
heroku local web
heroku logs --tail
# addons
heroku addons:create papertrail

heroku config vars
heroku addons
#DB
# !important pushing local database to heroku db
heroku pg:push postgres://postgres:123@localhost:5432/postgres DATABASE_URL --app server-article-reader-api
# get db to local
heroku pg:pull DATABASE_URL mylocaldb --app calm-citadel-53113
# local db
postgres://postgres:123@localhost:5432/postgres
#list of commands
heroku help pg
# to init DB console
heroku pg:psql
# get db info
heroku pg:info
# add DB to project
heroku addons:create heroku-postgresql:hobby-dev

