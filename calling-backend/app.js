const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const contactRouter = require("./routes/contactRoutes");
const settingRouter = require("./routes/settingRoutes");
const callingRouter = require("./routes/callingRoutes");
const eventRouter = require("./routes/eventRoutes");
// const rotinRouter = require("./routes/rotinRoutes");
// const taskRouter = require("./routes/taskRoutes");
// const thinkRouter = require("./routes/thinkRoutes");
const evaluationRouter = require("./routes/evaluationRoutes");

const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "50mb" })); // Increase this limit as needed
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

// 3) ROUTES
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/settings", settingRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/callings", callingRouter);
app.use("/api/v1/evaluations", evaluationRouter);
// app.use("/api/v1/rotins", rotinRouter);
// app.use("/api/v1/tasks", taskRouter);
// app.use("/api/v1/thinks", thinkRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
