const { createLogger, format, transports } = require('winston');
const logger = createLogger({
    transports: [
        new transports.Console({
            // filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json(),format.prettyPrint()),
        }),
        new transports.Console({
            // filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json(),format.prettyPrint())
        }),
    ]
})
module.exports = logger;