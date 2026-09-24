module.exports.home = (req, res) => {
    res.render("home", {
        title: "LeadSphere | Turn Leads Into Relationships",
        activePage: "home"
    });
};