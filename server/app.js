const Express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");
const db = require("./config/db.config");
const corsOptions = require("./config/cors.config");
const EmployeeRouter = require("./routes/employee.route");
const AttendListRouter = require("./routes/attendList.route");

const app = new Express();
const PORT = 8085;

db.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/attendList", AttendListRouter);
app.use("/employee", EmployeeRouter);

app.use(Cors(corsOptions));

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
