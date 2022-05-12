# BAM
A File Sharing Web Application
  Repository for the code dedicated to the management of the BAM! project for CSE115A at UCSC for the Spring '22 quarter.

## Project Structure
    .
    ├── client              # Front End Folder structure (React)
    │   ├── node_modules    # Holds all downloaded NPM packages
    │   ├── public          # Holds other data (icons, images, txt, etc.)
    │   ├── src             # Holds main code
    │   │   ├── index.js    # the js code executed when front end is booted up
    │   ├── package.json    # Dependency, script, version, etc. data
    ├── config              # Back End Folder structure (Node.js + ExpressJS)
    │   ├── config.env      # Contains sensitive environment variables 
    │   ├── db.js           # Contains function for database connection
    ├── models              # Holds Models for MongoDB
    │   ├── Sender.js       # Sender model
    ├── server              # Back End Folder structure (Node.js + ExpressJS)
    │   ├── node_modules    # Holds all downloaded NPM packages
    │   ├── server.js       # Main server app
    │   ├── package.json    # Dependency, script, version, etc. data      
    └── README.md

# getting-started-with-UI
## Step 1:
  Install Node v17.x to your computer:  
  ```shell
  curl -sL https://deb.nodesource.com/setup_17.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
  Confirm by running: `node -v`
## Step 2:
  Install npm v8.3.1 to your computer. Confirm by running: `npm --version`
## Step 3:
  Go into client directory: `cd client`
  Run the command: `npm install`
  This will install the bootstrap framework and other packages to your computer locally. These files will be in the .gitignore so that we are not constantly pushing ~20gb of the framework unneccesarily.


# For Front End/UI development:

## Project setup
  Go into client directory: `cd client`
```
npm install
```

### Compiles and hot-reloads for development
```
npm run start
```

### Compiles and minifies for production
```
npm run build
```
# BAM! API server

## Project Setup
  Go into server directory: `cd server`
### Run npm install

`npm i`
## How to...

### Work on the server

1. Start the server in dev mode\
`npm run dev`

2. Open [http://localhost:5000](http://localhost:5000). \
Open [http://localhost:5000/api](http://localhost:5000/api) to see the test `get` API call (returns a test JSON object).\

3. The server will automatically refresh with file changes

## Available Scripts

### Server (root)

#### `npm run dev`

Starts the server in dev mode.\
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.\

#### `npm start`

Starts the server in prod mode.\
This is the command that the prod box runs.

# Ubuntu 20.04 Oracle Cloud Server
## iptable Setup:
The Ubuntu image from Oracle has blocked network traffic and requires adding a rule to iptables to allow HTTP, HTTPS, and Node.js traffic.  
We need to use iptables to open the ports within Ubuntu to allow network traffic on the needed ports. We can do that by:
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --match multiport --dports 80,443,3000,5000 -j ACCEPT
sudo netfilter-persistent save
```

