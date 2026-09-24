const Lead = require("../models/Lead");


// Show all leads
module.exports.allLeads = async (req, res) => {

    try {

        const {
            search,
            status,
            followUp
        } = req.query;

        let query = {};


        // Search filter

        if (search && search.trim()) {

            const searchTerm = search.trim();

            query.$or = [

                {
                    name: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                },

                {
                    phone: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                },

                {
                    email: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                },

                {
                    company: {
                        $regex: searchTerm,
                        $options: "i"
                    }
                }

            ];

        }


        // Status filter

        if (
            status &&
            [
                "New",
                "Contacted",
                "Follow-up",
                "Converted",
                "Lost"
            ].includes(status)
        ) {

            query.status = status;

        }


        // Follow-up filter

        if (
            followUp &&
            [
                "today",
                "upcoming",
                "overdue"
            ].includes(followUp)
        ) {

            const startOfToday = new Date();

            startOfToday.setHours(0, 0, 0, 0);


            const endOfToday = new Date();

            endOfToday.setHours(23, 59, 59, 999);


            // Today

            if (followUp === "today") {

                query.followUpDate = {
                    $gte: startOfToday,
                    $lte: endOfToday
                };

            }


            // Upcoming

            if (followUp === "upcoming") {

                query.followUpDate = {
                    $gt: endOfToday
                };

            }


            // Overdue

            if (followUp === "overdue") {

                query.followUpDate = {
                    $lt: startOfToday
                };

            }

        }


        // Find leads

        const leads = await Lead.find(query)
            .sort({ createdAt: -1 });


        res.render("leadManagement/leads", {

            title: "All Leads | LeadSphere",

            activePage: "lead-management",

            leads,

            search: search || "",

            status: status || "",

            followUp: followUp || ""

        });


    } catch (err) {

        console.log(
            "Error loading leads:",
            err
        );

        req.flash(
            "error",
            "Unable to load leads."
        );

        res.redirect(
            "/lead-management"
        );

    }

};



// Show single lead details

module.exports.showLead = async (req, res) => {

    try {

        const { id } = req.params;


        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        res.render("leadManagement/show", {

            title: `${lead.name} | LeadSphere`,

            activePage: "lead-management",

            lead

        });


    } catch (err) {

        console.log(
            "Error loading lead:",
            err
        );

        req.flash(
            "error",
            "Unable to load lead details."
        );

        res.redirect(
            "/lead-management/leads"
        );

    }

};



// Show edit lead form

module.exports.editLeadForm = async (req, res) => {

    try {

        const { id } = req.params;


        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        res.render("leadManagement/edit", {

            title: `Edit ${lead.name} | LeadSphere`,

            activePage: "lead-management",

            lead

        });


    } catch (err) {

        console.log(
            "Error loading edit form:",
            err
        );

        req.flash(
            "error",
            "Unable to load edit form."
        );

        res.redirect(
            "/lead-management/leads"
        );

    }

};



// Update lead

module.exports.updateLead = async (req, res) => {

    try {

        const { id } = req.params;


        const {
            name,
            phone,
            email,
            company,
            status,
            followUpDate
        } = req.body;


        // Validate name

        if (!name || !name.trim()) {

            req.flash(
                "error",
                "Name is required."
            );

            return res.redirect(
                `/lead-management/leads/${id}/edit`
            );

        }


        // Validate phone

        if (
            !phone ||
            !/^[0-9]{10}$/.test(phone)
        ) {

            req.flash(
                "error",
                "Phone number must contain exactly 10 digits."
            );

            return res.redirect(
                `/lead-management/leads/${id}/edit`
            );

        }


        // Validate status

        const validStatuses = [

            "New",
            "Contacted",
            "Follow-up",
            "Converted",
            "Lost"

        ];


        if (!validStatuses.includes(status)) {

            req.flash(
                "error",
                "Invalid lead status."
            );

            return res.redirect(
                `/lead-management/leads/${id}/edit`
            );

        }


        // Find lead

        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        // Update lead

        lead.name = name.trim();

        lead.phone = phone.trim();

        lead.email = email
            ? email.trim()
            : "";

        lead.company = company
            ? company.trim()
            : "";

        lead.status = status;

        lead.followUpDate = followUpDate
            ? followUpDate
            : null;


        // Save

        await lead.save();


        req.flash(
            "success",
            "Lead updated successfully!"
        );


        res.redirect(
            `/lead-management/leads/${id}`
        );


    } catch (err) {

        console.log(
            "Error updating lead:",
            err
        );

        req.flash(
            "error",
            "Unable to update lead."
        );

        res.redirect(
            `/lead-management/leads/${req.params.id}/edit`
        );

    }

};



// Show edit note form

module.exports.editNoteForm = async (req, res) => {

    try {

        const { id } = req.params;


        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        res.render("leadManagement/editNote", {

            title: `Edit Note | ${lead.name}`,

            activePage: "lead-management",

            lead

        });


    } catch (err) {

        console.log(
            "Error loading note form:",
            err
        );

        req.flash(
            "error",
            "Unable to load note form."
        );

        res.redirect(
            "/lead-management/leads"
        );

    }

};



// Update lead note

module.exports.updateNote = async (req, res) => {

    try {

        const { id } = req.params;

        const { note } = req.body;


        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        lead.note = note
            ? note.trim()
            : "";


        await lead.save();


        req.flash(
            "success",
            "Lead note updated successfully!"
        );


        res.redirect(
            `/lead-management/leads/${id}`
        );


    } catch (err) {

        console.log(
            "Error updating note:",
            err
        );

        req.flash(
            "error",
            "Unable to update lead note."
        );

        res.redirect(
            `/lead-management/leads/${req.params.id}`
        );

    }

};



// Delete lead

module.exports.deleteLead = async (req, res) => {

    try {

        const { id } = req.params;


        const lead = await Lead.findById(id);


        if (!lead) {

            req.flash(
                "error",
                "Lead not found."
            );

            return res.redirect(
                "/lead-management/leads"
            );

        }


        await Lead.findByIdAndDelete(id);


        req.flash(
            "success",
            "Lead deleted successfully!"
        );


        res.redirect(
            "/lead-management/leads"
        );


    } catch (err) {

        console.log(
            "Error deleting lead:",
            err
        );

        req.flash(
            "error",
            "Unable to delete lead."
        );

        res.redirect(
            "/lead-management/leads"
        );

    }

};