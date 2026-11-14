const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const urlRoutes = require("./routes/urlRoute");
const deleteExpiredURL = require("./Cron/deleteExpiredUrls");



// ----------------------------------------------------------
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", "./views");
app.use(express.static("public"));
app.use(expressLayouts);
app.set("layout", "boilerplate");

// -----------------------------------------------------------

app.use("/", urlRoutes);



// -----------------------------------------------------------------------

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

