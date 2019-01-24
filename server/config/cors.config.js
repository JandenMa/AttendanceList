const { getConfigJson } = require('../utils/common.util');

const config = getConfigJson();
if (!config||!config.Cors) {
    throw (new Error("Error: Config is undefined"));
}

const corsOptions = {
    credentials: true,
    origin: config.Cors.Origin,
    headers: config.Cors.Headers,
    methods:config.Cors.Methods
}

module.exports = corsOptions;
