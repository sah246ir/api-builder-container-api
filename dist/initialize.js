"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitializeApi = async () => {
    try {
        // TODO: add logs throughout the functions
        // ENV
        let userId = parseInt(process.env.USERID || "");
        let apiId = parseInt(process.env.APIID || "");
        // TODO: find the api schema from the mongodb cluster
        let Schema;
        // TODO:fetch code snippets/dependencies from s3 and populate fs
        // TODO: segregate schema into routeDefinitions and middlewareDefinition
    }
    catch (e) {
        console.log(e);
    }
};
