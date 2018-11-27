sequelize db:migrate
sequelize db:migrate:undo
sequelize migration:generate --name articles
sequelize model:generate --name test --attributes title:string,name:string