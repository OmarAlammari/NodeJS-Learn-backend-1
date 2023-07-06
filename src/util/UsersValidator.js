const Ajv = require('ajv');

const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "email": {
            "type": "string",
            // "pattern": ".+\@.+\..+"
        },
        "password": {
            "type": "string",
            "minLength": 5
        }
    },
    "required": ["name", "email", "password"]
};
module.exports = new Ajv.default().compile(schema);



// "maxProperties": 3,
// additionalProperties: false

