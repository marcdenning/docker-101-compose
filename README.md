# Docker 101 Node and Mongo

This multi-faceted application demonstrates a full-stack movie browser. The back-end is supported by MongoDB and NodeJS
and provides an API adhering to the [JSON API specification](http://jsonapi.org/). The front-end is a React app. Each
component can built on Docker containers and managed with [Docker Compose](https://docs.docker.com/compose/overview/).

A sample deployment configuration is shown (in this branch) as a Cloud Foundry deployment.

## Running in Development with Docker

Get started by running:

    docker-compose up -d

The command will build and start the `api` and `db` containers in the background. You can access the API
at [http://localhost:8888/api/movies](http://localhost:8888/api/movies) (substitute your Docker host address if it is
not `localhost`).

To start the front-end app in development mode, navigate into the `app` directory and run:

    npm install
    npm start

This will kick of a build of the app and set up a local file watcher to rebuild and reload changes when you make them.
Under the hood, the app makes use of the build process provided by
[Create React App](https://github.com/facebookincubator/create-react-app).

**Note:** You can run the front-end application in a Docker container as well, but volume mount performance is 
sufficiently slow to recommend against it for this project. Your mileage may vary.

## Deploy to Cloud Foundry

To deploy to a Cloud Foundry environment, you will need to create a MongoDB service using available services in the
marketplace or by rolling your own. In [Pivotal Web Services](https://run.pivotal.io/), this may look like:

    cf create-service mlab sandbox movie-db

Once your MongoDB service is up and running, navigate into the `api` directory and run `cf push movie-api`,
customizing the values in the `manifest.yml` as necessary. You can also provide your own arguments to
`cf push` on the command line like:

    cf push movie-api -k 256M -m 256M -i 1 -n movie-api --route-path api

Cloud Foundry should detect the `package.json` file and use a NodeJS buildpack for staging and deployment.

Next, you will need to bind your MongoDB service to your newly deployed app. This is specified in the provided
manifest, but if you want to do it yourself, your `cf bind-service` command should look like:

    cf bind-service movie-api movie-db

You will need to restage the app for it to pick up the newly-bound service. To do this, run:

    cf restage movie-api

Now you can create the app for the front-end. This will use the staticfile buildpack available in PWS. Navigate into
the `app` directory and build the React app, then deploy it with `cf push`:

    npm run build
    # Or docker-compose -f docker-compose.prod.yml run --rm app
    cf push movie-app -k 64M -m 64M -i 1 -b staticfile_buildpack -n movie-app

Keep in mind that domain routes are global across your Cloud Foundry installation. You should now be able to view the
movie browser app by navigating to your route for `movie-app`:
[http://movie-app.cfapps.io/](http://movie-app.cfapps.io).
