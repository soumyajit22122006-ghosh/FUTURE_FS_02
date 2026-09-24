const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

router.get("/", enquiryController.showEnquiryForm);
router.post("/", enquiryController.createLead);

module.exports = router;