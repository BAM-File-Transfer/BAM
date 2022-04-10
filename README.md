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
    ├── server              # Back End Folder structure (Node.js + ExpressJS)
    │   ├── node_modules    # Holds all downloaded NPM packages
    │   ├── server.js       # Main server app
    │   ├── package.json    # Dependency, script, version, etc. data      
    └── README.md

# getting-started-with-UI
## Step 1:
  Install Node v16.14.0 to your computer (use homebrew or install from website). Confirm version by running: `node --version`
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

### Lints and fixes files
```
npm run lint
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


