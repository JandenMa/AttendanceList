const model = require('../models/attendList.model');

const saveAttendList = (list) => {
    return new Promise((resolve) =>{
    model.findOneAndUpdate({ id: list.id }, { $set: list }, { new: true, upsert: true })
        .then((data) => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })  
}

const getAttendLists = () => {
    return new Promise((resolve) => {
        model.find().then(data => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })
}

module.exports = {
    saveAttendList, getAttendLists
};