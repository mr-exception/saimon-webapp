# Salimon Web App Project

this is the web application source of salimon project. it's one of variouse clients in salimon network. (for more information about salimon network you can read in [protocol documents](https://salimon.ir/docs)). this projects is based on ReactJS library and uses TypeScript as development language. you'll need `NodeJS` and `Yarn` package manager to start this project.

## Install Project Dependecies

after cloning the project from git repository, just head into the root directory of project and execute this command:

```
yarn
```

## Run the Project

after installing all required packages. you can start the project. this webapp has two separate thread. and they both must be running while you are developing the project. the first thread is the front thread which is responsible for all UI components, containers and anything else that user can see. you have to start this thread by executing:

```
yarn start
```

> PWA methods are activated in this project so the biggest problem in development is caching. `localhost` is in exception list for caching so you don't have to use custom local dns and domains for this project.

the second thread is the core thread and is responsible for connections, queues, background services, encryptions all other long-term-and-freezing operations. you can execute this thread by running:

```
yarn worker
```

this thread will watch `/src/Worker` directory for any change then compiles and bundles it into `/public/worker.js`, UI thread is using this worker and comunicating with it.

> if you are not going to work on core thread, then you don't need to run it. the latest version `/public/worker.js` is always there and you can use it in UI thread.

## Build the Project

after working on project. you can build and bundle it in a single js-html-css directory. just execute this command:

```
yarn run build
```

this command will bundle the project build into `/build` direcotry in root of the project. you can serve it by `serve` command in nodejs or using any webserver application/service you prefer.

## Test the Project

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Project Source Details

all component and methods are rich commented (or they're going to be, we promise!). but you always need a starter clue about where to start. I'm going to explain the source structure for you here. so lets start from directories in `/src` directory

### Classes

this direcotry holds core classes. most of them are connected to `IndexedDB`. they are handling the data stored in data storage and anything comes or goes in connection channels

### Apis

this directory contains http methods

### Containers

this directory containers pages and main ui sections of project (for example: home page, settions and ... ). each sub-directory in this directory is a route in projects that is handled by react-router-dom in `/src/Routes.tsx`

### Images

this directory contains component images rendered by svg tools.

### Layouts

this directory contains main components of layout design in pages. each page contains different layout and those layout components are in this page

### Modals

this directory contains all modal components used in projects. all these modals are registered and subscribed in redux structure

### Redux

this direcotry contains all methods and classes about redux. redux is the main state provider of this project. this directory contains all selectore, reducers, actions, loaders, listeners and syncers.

### Storage

storage is a unit that hold all information and connections to local data storage of applications. for now, we are using `IndexedDB` as primary local storage in this web application. but It may change in future. but all interfaces in this directory and `Storage` class won't change

### UI-Kit

this directory contains usefull UI components in project, like buttons, input fields and modals. any component that is gonna be used several times in project must be placed in this directory.

### Worker

this directory contains background thread of project. it's a `web worker` that complies and bundles into `/public/worker.js`. the started and main entry of the project in `/src/Worker/worker.ts`.

### WorkerHandlers

all independent subscribtions from `WorkerSubscriber` will be placed in this directory. `WorkerSubscriber` is a variable stored in `Redux` (by name: worker) and you can subsribe into this worker thread channels and messages by method `WorkerSubscriber.on(event: stirng): Observable<any>`
