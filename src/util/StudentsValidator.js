const Ajv = require('ajv');

const schema = {
    "type": "object",
    "properties": {
        "fn": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "ln": {
            "type": "string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "dept": {
            "type": "string",
            // "enum": ["SD", "SA", "MD"],
            "maxLength": 2,
            "minLength": 2
        },
    },
    "required": ["ln", "fn", "dept"],
    // "maxProperties": 3,
    // additionalProperties: false
};

// let validator = new Ajv.default({ allErrors: true }).compile(schema);
module.exports = new Ajv.default().compile(schema);
