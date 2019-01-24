const getConfigJson = () => {
    try {
        const fs = require('fs');
        const path = require('path');
        return JSON.parse(fs.readFileSync(path.resolve('config.json')).toString());
    } catch (error) {
        throw error;
    }
}

module.exports = { getConfigJson };