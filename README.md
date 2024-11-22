Instructions:

GENERAL:
if di nyo pa sure si git:
install git in chrome,
install git extension in vscode
New Window, Clone repository then url ng repository na to, matic na un sha
git commit -m message
git pull origin master --gets latest repository updates (merges with concurrent clone)
git push origin master --sync up your commits to the database *DONT*
git checkout -b subbranch (if exists) then git checkout subbranch
before pushing, (allows pull request)
or better
after commit, git checkout master
git pull origin master -> git merge subbranch
then deal with the conflicts
before git push

before pala, chat kayo sakin about sa ENV if nainstall nyo na, pero on clone
go to the folder name (IM-development) in terminal, type "npm install" to install all packages

cd backend, then "npm start", the localhost is 5000 so access the web by localhost:5000/

FRONTEND:
Note for the ejs stuff, you can folder organize the ejs files pero sa mga access nya add nyo nlng ung folder name
ie. sa pages in routes/ directory, add the folder name in res.render('folder/file.ejs')

for adding scss or organizing frontend, naka set sya sa src (balak ko palitan), meaning dito nyo ilalagay ung css nyo para ilink

BACKEND:
create muna kayo sa root mysql nyo ng database
CREATE DATABASE fbs_development,

then sa server.js
i-uncomment nyo si sync({alter:true}), then comment the regular sync(), automates the table generations





