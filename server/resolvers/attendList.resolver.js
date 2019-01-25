const controller = require("../controllers/attendList.controller");
const moment = require("moment");

const Query = {
  getAttendLists: async () => {
    return await controller.getAttendLists();
  }
};

const Mutation = {
  saveAttendList: async (v, args) => {
    let { attendList } = args;
    if (!attendList.id) {
      attendList.id = `A${moment().format("YYYYMMDD")}`;
    }
    return await controller.saveAttendList(attendList);
  }
};

module.exports = { Query, Mutation };
