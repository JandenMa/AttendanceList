const controller = require("../controllers/employee.controller");
const moment = require("moment");

const Query = {
  getEmployees: async (v, { key }) => {
    return await controller.getEmployees(key);
  }
};

const Mutation = {
  saveEmployee: async (v, { employee }) => {
    if (!employee.id) {
      employee.id = `E${moment().unix()}${Math.round(Math.random() * 3000)}`;
    }
    return await controller.saveEmployee(employee);
  }
};

module.exports = { Query, Mutation };
