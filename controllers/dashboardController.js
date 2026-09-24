const Lead = require("../models/Lead");

module.exports.dashboard = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({
            status: "New"
        });
        const contactedLeads = await Lead.countDocuments({
            status: "Contacted"
        });
        const followUpLeads = await Lead.countDocuments({
            status: "Follow-up"
        });
        const convertedLeads = await Lead.countDocuments({
            status: "Converted"
        });
        const lostLeads = await Lead.countDocuments({
            status: "Lost"
        });
        res.render("leadManagement/dashboard", {
        title: "Lead Management | LeadSphere",
        activePage: "lead-management",
        totalLeads,
        newLeads,
        contactedLeads,
        followUpLeads,
        convertedLeads,
        lostLeads
    });
    } catch (err) {
        console.log("Error loading dashboard:", err);
        req.flash(
            "error",
            "Unable to load the lead management dashboard."
        );
        res.redirect("/");
    }
};