# Server-Article-Restful

Purpose:
- Practice with Node server side by:
+ Create restful api for a blog 
+ Use it to make simple website

Run app:
git clone : https://github.com/hacktiger/Server-Article-Restful.git
npm install

heroku open
or:
# to run locally on localhost:5000
heroku local web 


########NOTE
default current_timestamp
use '' for strings and "" for identifiers in postgres
#ex: insert into articles(body,"userID") values('test','5')

ALTER TABLE comments ALTER COLUMN createdat SET DEFAULT current_timestamp
ALTER TABLE articles RENAME COLUMN "createdAt" TO createdat;
