"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouteDefinition = void 0;
exports.apiRouteDefinition = {
    "ApiEndpoint": [
        {
            "RequestBody": undefined,
            "QueryParams": undefined,
            "endpoint": "",
            "method": "GET",
            "definition": [
                {
                    "action": "find",
                    "collection": "movies"
                }
            ]
        },
        {
            "RequestBody": undefined,
            "QueryParams": undefined,
            "endpoint": "/{id}",
            "method": "GET",
            "definition": [
                {
                    "action": "findOne",
                    "filterBy": [
                        {
                            "field": "id"
                        }
                    ],
                    "collection": "movies"
                }
            ]
        },
        {
            "RequestBody": {
                "schema": [
                    {
                        "type": "string",
                        "field": "name",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "yor",
                        "required": true
                    },
                    {
                        "type": "number",
                        "field": "duration",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "summary",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "director",
                        "required": true
                    },
                    {
                        "type": "number",
                        "field": "age",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "cast",
                        "required": true
                    },
                    {
                        "type": "boolean",
                        "field": "audio_description"
                    }
                ]
            },
            "QueryParams": undefined,
            "endpoint": "",
            "method": "POST",
            "definition": [
                {
                    "action": "insertOne",
                    "collection": "movies"
                }
            ]
        },
        {
            "RequestBody": {
                "schema": [
                    {
                        "type": "string",
                        "field": "name",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "yor",
                        "required": true
                    },
                    {
                        "type": "number",
                        "field": "duration",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "summary",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "director",
                        "required": true
                    },
                    {
                        "type": "number",
                        "field": "age",
                        "required": true
                    },
                    {
                        "type": "string",
                        "field": "cast",
                        "required": true
                    },
                    {
                        "type": "boolean",
                        "field": "audio_description"
                    }
                ]
            },
            "QueryParams": undefined,
            "endpoint": "/{id}",
            "method": "PUT",
            "definition": [
                {
                    "action": "updateOne",
                    "filterBy": [
                        {
                            "field": "id"
                        }
                    ],
                    "collection": "movies"
                }
            ]
        },
        {
            "RequestBody": undefined,
            "QueryParams": undefined,
            "endpoint": "/{id}",
            "method": "DELETE",
            "definition": [
                {
                    "action": "deleteOne",
                    "filterBy": [
                        {
                            "field": "id"
                        }
                    ],
                    "collection": "movies"
                }
            ]
        }
    ],
    "endpoint": "/movies"
};
