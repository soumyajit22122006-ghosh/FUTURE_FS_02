const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const leadController = require("../controllers/leadController");


// Lead management dashboard

router.get(
    "/",
    dashboardController.dashboard
);


// All leads

router.get(
    "/leads",
    leadController.allLeads
);


// Lead details

router.get(
    "/leads/:id",
    leadController.showLead
);


// Edit lead form

router.get(
    "/leads/:id/edit",
    leadController.editLeadForm
);


// Update lead

router.put(
    "/leads/:id",
    leadController.updateLead
);


// Edit lead note

router.get(
    "/leads/:id/note/edit",
    leadController.editNoteForm
);


// Update lead note

router.put(
    "/leads/:id/note",
    leadController.updateNote
);


// Delete lead

router.delete(
    "/leads/:id",
    leadController.deleteLead
);


module.exports = router;