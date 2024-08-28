const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const errorHandler = require("./middlewares/errorHandler");
require("./models");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const routs = fs.readdirSync(path.join(__dirname, "routes"));
console.log(routs);
for (const iterator of routs) {
	app.use(require("./routes/" + iterator.substring(0, iterator.length - 3)));
}
app.use(errorHandler);

app.listen(3000);

