# GraphQL, Apollo, Express, TypeORM, and MySQL Demo

A TypeScript project that builds a GraphQL server using Apollo and Express. The backend is stored in a MySQL database that has a list of countries organized by code and population.

The Apollo Express instance running on http://localhost:4000/graphql documents the available queries for get, list, filter, and total; and also exposes two mutations to delete a country population, i.e. reset it back to 0; or to update the population to a number greater than 0.

## How to Use

Restore the database table located in the /src/data/countrypopulation.sql file. Rename the TypeORM ormconfig.development.json file to ormconfig.json and edit the necessary credentials for MySQL. 

Run an npm install or update
```
npm i
```

Start the Apollo Express server by using
```
npm start
```

Then navigate to the playground by going to http://localhost:4000/graphql

## Copyright and Ownership

All terms used are copyright to their original authors.

