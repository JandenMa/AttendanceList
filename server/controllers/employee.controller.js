const model = require('../models/employee.model')

const saveEmployee = employee => {
  return new Promise(resolve => {
    model
      .findOneAndUpdate(
        { id: employee.id },
        { $set: employee },
        { new: true, upsert: true }
      )
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        console.log(err)
        resolve(null)
      })
  })
}

const getEmployees = key => {
  let condition = {}
  if (key) {
    condition = {
      $or: [
        { firstName: { $regex: new RegExp(key, 'i') } },
        { lastName: { $regex: new RegExp(key, 'i') } }
      ]
    }
  }
  return new Promise(resolve => {
    model
      .find(condition)
      .then(data => resolve(data))
      .catch(err => {
        console.log(err)
        resolve(null)
      })
  })
}

module.exports = {
  saveEmployee,
  getEmployees
}
