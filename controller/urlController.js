const generateCode = require("../Generator/generateUrl");
const crypto = require("crypto");
const prisma = require("../prismaClient");
const { UAParser } = require("ua-parser-js");
const getLocation = require("../utils/getLocation");
const QRCode = require("qrcode");



const mainPage = (req, res) => {
    res.render("./main");
}; 



const redirectTowardsHomePage = (req, res) => {
    res.redirect("/home");
};



const getURLConverterPage = async (req, res) => {
    try {

        // 1. Get current page from URL
        const currentPage = Math.max(1, parseInt(req.query.page) || 1);

        // 2. Set records per page
        const limit = 10;

        // 3. Calculate records to skip
        const skip = (currentPage - 1) * limit;

        // 4. Get total number of URL records
        const totalRecords = await prisma.url.count();

        // 5. Calculate total pages
        const totalPages = Math.ceil(totalRecords / limit);

        // 6. Fetch paginated URL records

        const [totalUrls, activeUrls, expiredUrls, clickResult, details] = await Promise.all([
            prisma.url.count(),

            prisma.url.count({
                where: {
                    OR: [
                        { expiresOn: null },
                        { expiresOn: { gt: new Date() } }
                    ]
                }
            }),

            prisma.url.count({
                where: {
                    expiresOn: { lte: new Date() }
                }
            }),

           prisma.url.aggregate({
                _sum: {
                    urlclicks: true
                }
            }),

            prisma.url.findMany({
                skip: skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ]);
        const urlclicks = clickResult._sum.urlclicks || 0;  

        res.render("dashboard.ejs", {error: req.query.error, details, totalUrls, activeUrls, expiredUrls, urlclicks, totalPages, totalRecords, currentPage});// error: req.query.error,

    } catch (error) {
        console.error(error);

        res.status(500).send("Unable to load URL records");
    }
};



const renderAnalysisPageTHroughHomePage = async (req, res) => {
    const shortCode = req.query.shortcode;
    console.log(shortCode);

    const getAllDetailsOfAnalytics = await prisma.url.findUnique({
        where: {
            shortCode: shortCode
        },
        include: {
            urlClicks: {
                orderBy: {
                    clickedAt: "desc"
                }
            }
        }
    });
    console.log(getAllDetailsOfAnalytics);
    const clicksJson = JSON.stringify(
        getAllDetailsOfAnalytics.urlClicks
    ).replace(/</g, "\\u003c");

    res.render("analysis", {getAllDetailsOfAnalytics, clicksJson});
};



const generateShortURLAndStoreOriginalAndShortURLInDB = async (req, res) => {
    try {
        var myUrl = new URL(req.body.url);
        var originalUrl = myUrl.href;

        var expiryDate = req.body.expiryDate;
        var expiryTime = req.body.expiryTime;

        // Checking expiry date and time
        var expiresOn = null;

        if (expiryDate && expiryTime) {
            expiresOn = new Date(`${expiryDate}T${expiryTime}`);

            if (expiresOn <= new Date()) {
                throw new Error("Please select a future expiry date and time");
            }
        }

        // Check whether URL already exists and is active
        const existingUrl = await prisma.url.findFirst({
            where: {
                originalUrl: originalUrl,
                expiresOn: {
                    gt: new Date()
                }
            }
        });

        if (existingUrl) {
            return res.redirect("/?error=alreadyExists");
        }

        var code = generateCode(5, true, true);
        // Generating short URL
        var shortUrl = "http://localhost:3000/" + code;
        var id = crypto.randomUUID();

        await prisma.url.create({
            data: {
                id: id,
                originalUrl: originalUrl,
                shortCode: code,
                createdAt: new Date(),
                expiresOn: expiresOn
            }
        });

        res.redirect("/");

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Unable to shorten URL");
    }
};



const getTheOriginalURL = async (req, res) => {
    const shortCode = req.params.shortCode;
    const parser = new UAParser(req.headers["user-agent"]);
    const browser = parser.getBrowser().name;
    const os = parser.getOS().name;
    const device = parser.getDevice().type || "Desktop";

    const ip = "1.1.1.1"; //getVisitorIP(req);  before depolyment enable this function.

    let location = {
        country: null,
        city: null
    };

    if (ip) {
        location = await getLocation.getLocation(ip);
    }
    console.log(location)

    const url = await prisma.url.findUnique({
        where: {
            shortCode: shortCode
        }
    });

    if (!url) {
        res.render("404.ejs");
    }

   

    await prisma.url.update({
        where: {
            shortCode: shortCode
        },
        data: {
            urlclicks: {
                increment: 1
            }
        }
    });

    await prisma.urlClicked.create({
        data: {
            urlId: url.id,
            city: location.city,
            country: location.country,
            os: os || "Unknown",
            device: device || "Desktop",
            browser: browser || "Unknown"
        }
    });

    // Redirect to original website
    res.redirect(url.originalUrl);
};



const generateQRCodeForShortenedURL = async (req, res) => {
    const shortCode = req.query.shortcode;
    console.log(shortCode)
    const shortUrl = `http://localhost:3000/${shortCode}`;
    console.log(shortUrl);
    const qrCode = await QRCode.toDataURL(shortUrl);
    res.render("QRcode", { qrCode});
};



const aboutURLshortner = (req, res) => {
    res.render("about.ejs");
};





module.exports = {redirectTowardsHomePage, getURLConverterPage, generateShortURLAndStoreOriginalAndShortURLInDB, getTheOriginalURL, renderAnalysisPageTHroughHomePage, generateQRCodeForShortenedURL, aboutURLshortner, mainPage};