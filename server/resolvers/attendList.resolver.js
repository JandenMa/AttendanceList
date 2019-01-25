const controller = require("../controllers/attendList.controller");
const moment = require("moment");

const Query = {
  getAttendLists: async (v,args) => {
    return await controller.getAttendLists(args.id);
  }
};

const Mutation = {
  saveAttendList: async (v, args) => {
    let { attendList } = args;
    console.log(attendList);
    attendList.id = `A${moment().format("YYYYMMDD")}`;
    attendList.month = moment().format("MMMDD");
    return await controller.saveAttendList(attendList);
  }
};

module.exports = { Query, Mutation };
