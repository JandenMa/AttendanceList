const controller = require("../controllers/attendList.controller");
const moment = require("moment");

const Query = {
  getAttendLists: async (v, { id }) => {
    return await controller.getAttendLists(id);
  }
};

const Mutation = {
  saveAttendList: async (v, { attendList }) => {
    console.log(attendList);
    attendList.id = `A${moment().format("YYYYMMDD")}`;
    attendList.month = moment().format("MMMDD");
    return await controller.saveAttendList(attendList);
  }
};

module.exports = { Query, Mutation };
