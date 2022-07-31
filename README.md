# backend-wine-shop

This is a RESTFul API built with NodeJS using HTTP standards requests to communicate with other applications.

# Dependencies
Typescript 3.1+
NodeJS 8.0+
Mysql 8.0.16

# Backend is developed on node.js
# Database - mysql

Need to install latest version of node and npm or yarn

# Clone
1. First need to clone the project from repo.
git clone git@bitbucket.org:url.git

# Install Dependencies
2. Install All dependencies using run the command - npm install, npm install will automatically install all related dependencies on your syastem.

# Seting Up Database 
3. Create .env and Add following variables on the file.

# Database configuration file for the API server
DATABASE_DRIVER=mysql
DATABASE_HOST=127.0.0.1
DATABASE_SCHEMA=    //DB name
DATABASE_USERNAME=root
DATABASE_PASSWORD=  //DB password
DB_PORT=3306
PORT = 3000

# Run the project 
4. Run - "node index.js" or "nodemon index.js"

If you run "nodemon index.js" then it will automatically recompile node project when you did any changes.

# Swagger documentation
You can find the the swagger documentation in the url -  root_url/api/api-docs/#
ex- for local it will be localhost:3000/api/api-docs/#

Note - For Database script please find the folder as 'database_upgrade' and refer all files inside this folder.