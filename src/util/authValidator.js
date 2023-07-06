const Ajv = require('ajv');

const schema = {
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            // "pattern": ".+\@.+\..+"
        },
        "password": {
            "type": "string",
            "minLength": 5
            // "maxLength": 15
        }
    },
    "required": ["email", "password"]
};
module.exports = new Ajv.default().compile(schema);


