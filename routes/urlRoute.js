const express = require("express");
const router = express.Router();
const validateUrl = require("../middleware/urlvalidator");

const {redirectTowardsHomePage, getURLConverterPage, generateShortURLAndStoreOriginalAndShortURLInDB, getTheOriginalURL, renderAnalysisPageTHroughHomePage, generateQRCodeForShortenedURL, mainPage}  = require("../controller/urlController");

router.get("/", redirectTowardsHomePage)

router
.get("/home", mainPage)


router
.get("/home/dashboard", getURLConverterPage )
.post("/home/dashboard", validateUrl, generateShortURLAndStoreOriginalAndShortURLInDB)

router.get("/:shortCode", getTheOriginalURL)


router.get("/home/dashboard/analysis", renderAnalysisPageTHroughHomePage)


router.get("/home/dashboard/qrcode", generateQRCodeForShortenedURL)


module.exports = router;