## sequelize
sequelize db:migrate
sequelize db:migrate:undo
sequelize migration:generate --name articles
sequelize model:generate --name test --attributes title:string,name:string

## heroku
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
#list of commands
heroku help pg
#
heroku pg:psql
heroku pg:info
heroku addons:create heroku-postgresql:hobby-dev
