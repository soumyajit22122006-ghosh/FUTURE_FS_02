const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const session = require("express-session");
const flash = require("connect-flash");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "boilerplate");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
    session({
        secret: "leadsphere-secret",
        resave: false,
        saveUninitialized: false
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Routes
const indexRouter = require("./routes/index");
const enquiryRouter = require("./routes/enquiry");
const dashboardRouter = require("./routes/dashboard");
app.use("/", indexRouter);
app.use("/enquiry", enquiryRouter);
app.use("/lead-management", dashboardRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(8080, () => {
            console.log("Server is listening to the port 8080");
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });