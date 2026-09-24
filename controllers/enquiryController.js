const Lead = require("../models/Lead");

module.exports.showEnquiryForm = (req, res) => {
    res.render("enquiry/form", {
    title: "New Enquiry | LeadSphere",
    activePage: "enquiry"
});
};

module.exports.createLead = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            company,
            note
        } = req.body;
        if (!name || !name.trim()) {
            req.flash("error", "Name is required.");
            return res.redirect("/enquiry");
        }
        if (!phone || !/^[0-9]{10}$/.test(phone)) {
            req.flash("error", "Phone number must contain exactly 10 digits.");
            return res.redirect("/enquiry");
        }

        const newLead = new Lead({
            name: name.trim(),
            phone: phone.trim(),
            email: email ? email.trim() : "",
            company: company ? company.trim() : "",
            note: note ? note.trim() : ""
        });

        await newLead.save();

        req.flash("success", "Lead added successfully!");
        res.redirect("/");
    } catch (err) {
        console.log("Error creating lead:", err);
        req.flash(
            "error",
            "Something went wrong while adding the lead."
        );
        res.redirect("/enquiry");
    }
};