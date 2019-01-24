const controller = require('../controllers/employee.controller')
const moment = require('moment')

const Query = {
  getEmployees: async (v, args) => {
    return await controller.getEmployees(args.key)
  }
}

const Mutation = {
  saveEmployee: async (v, args) => {
    let { employee } = args
    if (!employee.id) {
      employee.id = `E${moment().unix()}${Math.round(Math.random() * 3000)}`
    }
    try {
      let res = await controller.saveEmployee(employee)
      return res
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = { Query, Mutation }
