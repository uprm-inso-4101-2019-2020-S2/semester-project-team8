# Flovver Dev Repo - Period Tracker and Ovulation Calendar
### Team 8 - (Original Members) Yavier Mari, Guillermo Carrión, Yamil Hernández 
### (Rotation 1) Yavier Mari, Kenneth Rosario, Isabel A. Muñiz, Alberto Cruz, Javier Cuebas

Team 8 will be in charge of creating a Menstrual Cycle App in which the user will 
be able to track down their menstrual patterns. With this data, the app will
make estimations for the user's menstrual cycle and notify an approximated important 
dates. The user will also be able to link the app with other users to show
their personal data.

Please view other readmes in scala-api, flovver-app, and documents

Based on: https://github.com/kenneth-rosario/scala-npm-postgres-docker-boilerplate

Application figma mock up design prototype : https://www.figma.com/proto/Sa8Rgvi0cjKM6NcFmi6MaK/app-mockup?node-id=168%3A1&scaling=min-zoom

Application expo demo link : https://expo.io/@flovver-corp/Flovver

Application video demo link : https://www.youtube.com/watch?v=ZN5GHsWceT0&feature=youtu.be 

# Pre-requisites:
* Download the expo app in your phone for testing app  
* Install nodejs and npm
* Install expo client globally:
```
npm install -g expo-cli
```
* Install Docker and Docker Compose

# Run Native App Commands:
* To start developing native app first install dependancies:
```
cd ./flovver-app
npm install
```
* Now your ready to start dev server run the following command in the flovver-app directory:
```
expo start
```

# Run REST API and db:
* run the following command from project root directory (first run takes some time to install all dependancies) cntl + c to stop:
```
    docker-compose up
```
* delete all docker containers and volumes that are related to project run:
```
    docker-compose down
```

# Deploying changes on the rest api:
* after installing the heroku cli tool, log in
```
    heroku login
```
* build rest api
```
    ./build.sh
```
* push docker image
```
    cd ./scala-api
    heroku container:push web -a flovver-api
```
* release
```
    heroku container:release web -a flovver-api
```
* check logs to check deployment status
```
    heroku logs -a flovver-api
```

# Accessing deployed DB:
* Log in to heroku cli
```
    heroku login
```
* connect to db with heroku cli
```
    heroku pg:psql
```


# Recommended Text editors and IDEs:
* Visual Studio Code with Docker plugin. It is great for developing typescript apps and has plugins for scala
* Any text editor and a terminal
* Any Scala IDE for developing scala applications


# Missing Functionality:
* Add functionality for view only user types.
* Add push notifications in server with the expo service
* Add offline capabilities with expo's SecureStore

