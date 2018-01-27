# BDS app

## Installation

* You need NodeJs (min 4.2.6)
* Go into client/bds-app and server/ and run npm install

##### Other specifications for the server (server/)

* The server need a mysql database, so you have to create your own with the server/sql/create.sql file

* To configure the app with your database, create a config directory and a config.json file into, see below for the file content :

```
{
  "server" : {
    "port" : port number of the server
  },
  "db" : {
    "host": "database ip address",
    "user": "database user name",
    "password": "database password",
    "database" : "database name",
    "timeoutBeforeReconnection" : "10000"
  }
}
```

* src files are write in ES6 but for all browser support we use Babel as a transpiler. Before run the server you need to call the build script with npm or you can configure your Ide to do it automatically (if you don't know what is Babel please refer to the official documentation)

##### Exemple for ide configuration with WebStorm :

In WebStorm you can use Babel watcher, first install Babel in your system :

```
sudo npm install -g babel-cli
```

Then in WebStorm create a new scope :

&nbsp;&nbsp;&nbsp;Settings -> Appearance & Behavior -> scope

&nbsp;&nbsp;&nbsp;Name the scope "source" and include recursively the server/src directory

Finally create your watcher :

&nbsp;&nbsp;&nbsp;Settings->Tools->File Watchers

* Create a babel watcher, choose our "source" scope for the scope  
* Select the Babel "program" in your system (/usr/local/bin/babel for linux)  
* In "Arguments" write :  
```$FileDirRelativeToProjectRoot$ --source-maps --out-dir server/dist/$FileDirPathFromParent(src)$```  

* The "output paths to refresh" is : ```server/dist```  
* The "working directory" is : ```$ProjectFileDir$```

## Run Servers

##### For the client (client/whatCanIBuyWith/)

This part use angular cli so to run it you just have to use ```ng serve``` (see the official documentation for other commands)

##### For the server (server/)

To run the server use ```npm run start``` or use ```npm run watcherStart``` if you want that the server restart automatically when a file change 

## Test
