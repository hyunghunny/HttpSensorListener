define({ "api": [
  {
    "type": "get",
    "url": ":userId",
    "title": "Show available APIs",
    "name": "Listing_API",
    "group": "Billboard",
    "examples": [
      {
        "title": "Example usage:",
        "content": "GET /john\nAuthorization: John'sAuthKey",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>your authentication key</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"api\":[{\n    \"href\":\"/api/john/1421\",\n    \"type\":\"POST\",\n    \n}]}",
          "type": "json"
        }
      ]
    },
    "description": "<p>This API lists the top level APIs. You can navigate the other APIs by starting with this API.</p> ",
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Billboard"
  },
  {
    "type": "post",
    "url": "userId/:sensorId",
    "title": "Posting sensor dataset",
    "name": "Posting_API",
    "group": "Posting_Observations",
    "examples": [
      {
        "title": "Example usage:",
        "content": "POST /john/1421 \nAuthorization: John'sAuthKey\n\n{ \"observations\" : [\n  {\n    \"timestamp\": 1428591600000,\n    \"value\": 10\n    }\n]}",
        "type": "js"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>your authentication key</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json or text/csv</p> "
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 202 Accepted",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Posting_Observations"
  }
] });