const mongoose = require('mongoose');
const { getConfigJson } = require('../utils/common.util');


const dbConnection = {
    connect: () => {
        const config = getConfigJson();
        if (!config || !config.MongoDB) {
            throw (new Error("Error: Config is undefined"));
        }
        const {username,password,address,port,dbname}=config.MongoDB;
        const conn_url = `mongodb://${username}:${password}@${address}:${port}/${dbname}`;
        mongoose.connect(process.env.MONGODB_URL || conn_url, 
            { useNewUrlParser: true, useCreateIndex: true, });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('connected', () => {
            console.log('MongoDB connection open');
        }).on('error', err => {
            console.log(err);
        })
    },

    disConnect: () => {
        mongoose.disconnect(() => {
            console.log('MongoDB connection close');
        }, err => {
            console.log(err)
        })
    }
}

module.exports = dbConnection;



