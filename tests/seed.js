
const crypto = require("crypto");
const generateCode = require("../Generator/generateUrl");
const prisma = require("../prismaClient");
const analysisData = require("./analysisData");
const getCredentialsFromThirdPartyApp = require("../utils/getLocation");
const analysisJSON = require("./click_data.json");

// Original URLs
const originalUrls = [
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.github.com",
    "https://www.amazon.in",
    "https://www.wikipedia.org",
    "https://www.linkedin.com",
    "https://www.instagram.com",
    "https://www.geeksforgeeks.org",
    "https://www.stackoverflow.com",
    "https://www.w3schools.com",
    "https://www.npmjs.com",
    "https://www.mongodb.com",
    "https://www.udemy.com",
    "https://www.netflix.com",
    "https://www.microsoft.com",
    "https://www.flipkart.com",
    "https://www.myntra.com",
    "https://www.ajio.com",
    "https://www.snapdeal.com",
    "https://www.tatacliq.com",
    "https://www.etsy.com",
    "https://www.ebay.com",
    "https://www.shopify.com",
    "https://www.coursera.org",
    "https://www.edx.org",
    "https://www.khanacademy.org",
    "https://www.codecademy.com",
    "https://www.freecodecamp.org",
    "https://www.hackerrank.com",
    "https://www.leetcode.com",
    "https://www.codechef.com",
    "https://www.hackerearth.com",
    "https://www.figma.com",
    "https://www.canva.com",
    "https://www.adobe.com",
    "https://www.behance.net",
    "https://www.dribbble.com",
    "https://www.pinterest.com",
    "https://www.reddit.com",
    "https://www.quora.com",
    "https://www.medium.com",
    "https://www.wordpress.com",
    "https://www.blogger.com",
    "https://www.discord.com",
    "https://www.telegram.org",
    "https://www.whatsapp.com",
    "https://www.zoom.us",
    "https://www.slack.com",
    "https://www.notion.so",
    "https://www.trello.com",
    "https://www.atlassian.com",
    "https://www.dropbox.com",
    "https://www.drive.google.com",
    "https://www.salesforce.com",
    "https://www.hubspot.com",
    "https://www.oracle.com",
    "https://www.ibm.com",
    "https://www.intel.com",
    "https://www.amd.com",
    "https://www.nvidia.com",
    "https://www.samsung.com",
    "https://www.apple.com",
    "https://www.oneplus.com",
    "https://www.realme.com",
    "https://www.mi.com",
    "https://www.irctc.co.in",
    "https://www.redbus.in",
    "https://www.makemytrip.com",
    "https://www.goibibo.com",
    "https://www.cleartrip.com",
    "https://www.booking.com",
    "https://www.airbnb.com",
    "https://www.skyscanner.net",
    "https://www.tripadvisor.com",
    "https://www.yatra.com",
    "https://www.moneycontrol.com",
    "https://www.zerodha.com",
    "https://www.groww.in",
    "https://www.upstox.com",
    "https://www.etmoney.com",
    "https://www.policybazaar.com",
    "https://www.bankbazaar.com",
    "https://www.paytm.com",
    "https://www.phonepe.com",
    "https://www.rbi.org.in",
    "https://www.ndtv.com",
    "https://www.bbc.com",
    "https://www.reuters.com",
    "https://www.thehindu.com",
    "https://www.hindustantimes.com",
    "https://www.indiatoday.in",
    "https://www.timesofindia.indiatimes.com",
    "https://www.espncricinfo.com",
    "https://www.cricbuzz.com",
    "https://www.espn.com",
    "https://www.hotstar.com",
    "https://www.primevideo.com",
    "https://www.spotify.com",
    "https://www.soundcloud.com",
    "https://www.twitch.tv",
    "https://www.rottentomatoes.com",
    "https://www.imdb.com",
    "https://www.patreon.com",
    "https://www.deezer.com",
    "https://www.jiosaavn.com",
    "https://www.dell.com",
    "https://www.hp.com",
    "https://www.lenovo.com",
    "https://www.asus.com",
    "https://www.acer.com",
    "https://www.sony.com",
    "https://www.lg.com",
    "https://www.cisco.com",
    "https://www.cloudflare.com",
    "https://www.digitalocean.com",
    "https://www.india.gov.in",
    "https://www.uidai.gov.in",
    "https://www.incometax.gov.in",
    "https://www.gst.gov.in",
    "https://www.digilocker.gov.in",
    "https://www.passportindia.gov.in",
    "https://www.mygov.in",
    "https://www.nvsp.in",
    "https://www.epfindia.gov.in",
    "https://www.onlinesbi.sbi",
    "https://www.jetbrains.com",
    "https://www.docker.com",
    "https://www.kubernetes.io",
    "https://www.postman.com",
    "https://www.vercel.com",
    "https://www.netlify.com",
    "https://www.heroku.com",
    "https://www.render.com",
    "https://www.supabase.com",
    "https://www.firebase.google.com",
    "https://www.byjus.com",
    "https://www.unacademy.com",
    "https://www.vedantu.com",
    "https://www.upgrad.com",
    "https://www.simplilearn.com",
    "https://www.skillshare.com",
    "https://www.pluralsight.com",
    "https://www.futurelearn.com",
    "https://www.udacity.com",
    "https://www.shiksha.com",
    "https://www.zomato.com",
    "https://www.swiggy.com",
    "https://www.bigbasket.com",
    "https://www.zepto.com",
    "https://www.dominos.co.in",
    "https://www.starbucks.in",
    "https://www.ikea.com",
    "https://www.decathlon.in",
    "https://www.nykaa.com",
    "https://www.urbancompany.com",
    "https://www.zoho.com",
    "https://www.freshworks.com",
    "https://www.intuit.com",
    "https://www.sap.com",
    "https://www.workday.com",
    "https://www.monday.com",
    "https://www.clickup.com",
    "https://www.asana.com",
    "https://www.intercom.com",
    "https://www.godaddy.com",
    "https://www.apollohospitals.com",
    "https://www.fortishealthcare.com",
    "https://www.maxhealthcare.in",
    "https://www.practo.com",
    "https://www.netmeds.com",
    "https://www.1mg.com",
    "https://www.pharmeasy.in",
    "https://www.healthline.com",
    "https://www.webmd.com",
    "https://www.mayoclinic.org",
    "https://www.cardekho.com",
    "https://www.carwale.com",
    "https://www.bikewale.com",
    "https://www.autocarindia.com",
    "https://www.marutisuzuki.com",
    "https://www.hyundai.com",
    "https://www.tatamotors.com",
    "https://www.kia.com",
    "https://www.toyotabharat.com",
    "https://www.olacabs.com",
    "https://www.naukri.com",
    "https://www.indeed.com",
    "https://www.glassdoor.com",
    "https://www.foundit.in",
    "https://www.internshala.com",
    "https://www.apna.co",
    "https://www.shine.com",
    "https://www.timesjobs.com",
    "https://www.angel.co",
    "https://www.wellfound.com",
    "https://www.sportskeeda.com",
    "https://www.olympics.com",
    "https://www.fifa.com",
    "https://www.icc-cricket.com",
    "https://www.iplt20.com",
    "https://www.nba.com",
    "https://www.premierleague.com",
    "https://www.strava.com",
    "https://www.fitbit.com",
    "https://www.menshealth.com",
    "https://www.99acres.com",
    "https://www.magicbricks.com",
    "https://www.housing.com",
    "https://www.nobroker.in",
    "https://www.jio.com",
    "https://www.airtel.in",
    "https://www.myvi.in",
    "https://www.bsnl.co.in",
    "https://www.olx.in",
    "https://www.quikr.com",
    "https://www.jiomart.com",
    "https://www.firstcry.com",
    "https://www.lenskart.com",
    "https://www.croma.com",
    "https://www.reliancedigital.in",
    "https://www.vijaysales.com",
    "https://www.hamleys.in",
    "https://www.pepperfry.com",
    "https://www.wakefit.co",
    "https://www.woodlandworldwide.com",
    "https://www.zara.com",
    "https://www.hm.com",
    "https://www.uniqlo.com",
    "https://www.nike.com",
    "https://www.adidas.com",
    "https://www.puma.com",
    "https://www.underarmour.com",
    "https://www.asos.com",
    "https://www.farfetch.com",
    "https://www.net-a-porter.com",
    "https://www.kfc.com",
    "https://www.mcdonalds.com",
    "https://www.burgerking.com",
    "https://www.pizzahut.com",
    "https://www.subway.com",
    "https://www.dominos.com",
    "https://www.tacobell.com",
    "https://www.chipotle.com",
    "https://www.popeyes.com",
    "https://www.dunkindonuts.com",
    "https://www.gitlab.com",
    "https://www.bitbucket.org",
    "https://www.digitalocean.com",
    "https://www.linode.com",
    "https://www.vultr.com",
    "https://www.railway.com",
    "https://www.sentry.io",
    "https://www.datadoghq.com",
    "https://www.elastic.co",
    "https://www.redis.io",
    "https://www.snapchat.com",
    "https://www.tiktok.com",
    "https://www.threads.net",
    "https://www.blueskyweb.xyz",
    "https://www.mastodon.social",
    "https://www.signal.org",
    "https://www.viber.com",
    "https://www.line.me",
    "https://www.skype.com",
    "https://www.meetup.com",
    "https://www.aljazeera.com",
    "https://www.cnn.com",
    "https://www.nbcnews.com",
    "https://www.theguardian.com",
    "https://www.forbes.com",
    "https://www.bloomberg.com",
    "https://www.businessinsider.com",
    "https://www.economist.com",
    "https://www.livemint.com",
    "https://www.financialexpress.com",
    "https://www.agoda.com",
    "https://www.expedia.com",
    "https://www.hotels.com",
    "https://www.hostelworld.com",
    "https://www.rome2rio.com",
    "https://www.eurail.com",
    "https://www.thomascook.in",
    "https://www.eazydiner.com",
    "https://www.ixigo.com",
    "https://www.easemytrip.com",
    "https://www.icicibank.com",
    "https://www.hdfcbank.com",
    "https://www.axisbank.com",
    "https://www.kotak.com",
    "https://www.pnbindia.in",
    "https://www.bajajfinserv.in",
    "https://www.hdfclife.com",
    "https://www.iciciprulife.com",
    "https://www.licindia.in",
    "https://www.npci.org.in",
    "https://www.disney.com",
    "https://www.hbomax.com",
    "https://www.paramountplus.com",
    "https://www.peacocktv.com",
    "https://www.vimeo.com",
    "https://www.dailymotion.com",
    "https://www.artstation.com",
    "https://www.deviantart.com",
    "https://www.shutterstock.com",
    "https://www.pexels.com",
    "https://www.nature.com",
    "https://www.sciencedirect.com",
    "https://www.springer.com",
    "https://www.researchgate.net",
    "https://www.arxiv.org",
    "https://www.jstor.org",
    "https://www.britannica.com",
    "https://www.nationalgeographic.com",
    "https://www.ted.com",
    "https://www.openstreetmap.org",
    "https://www.bmw.com",
    "https://www.mercedes-benz.com",
    "https://www.audi.com",
    "https://www.volkswagen.com",
    "https://www.ford.com",
    "https://www.chevrolet.com",
    "https://www.honda.com",
    "https://www.nissan-global.com",
    "https://www.renault.com",
    "https://www.tesla.com",
    "https://www.harvard.edu",
    "https://www.mit.edu",
    "https://www.stanford.edu",
    "https://www.ox.ac.uk",
    "https://www.cam.ac.uk",
    "https://www.iitb.ac.in",
    "https://www.iitm.ac.in",
    "https://www.iitd.ac.in",
    "https://www.bits-pilani.ac.in",
    "https://www.mu.ac.in",
    "https://www.python.org",
    "https://www.java.com",
    "https://www.php.net",
    "https://www.rust-lang.org",
    "https://www.typescriptlang.org",
    "https://www.react.dev",
    "https://www.angular.dev",
    "https://www.vuejs.org",
    "https://www.nextjs.org",
    "https://www.expressjs.com",
    "https://aws.amazon.com",
    "https://azure.microsoft.com",
    "https://cloud.google.com",
    "https://www.oraclecloud.com",
    "https://www.ibm.com/cloud",
    "https://www.redhat.com",
    "https://www.suse.com",
    "https://www.proxmox.com",
    "https://www.vmware.com",
    "https://www.paloaltonetworks.com",
    "https://www.firstpost.com",
    "https://www.news18.com",
    "https://www.zeenews.india.com",
    "https://www.indiatvnews.com",
    "https://www.deccanherald.com",
    "https://www.financialexpress.com",
    "https://www.business-standard.com",
    "https://www.outlookindia.com",
    "https://www.sakshi.com",
    "https://www.dnaindia.com",
    "https://www.instamart.com",
    "https://www.dunzo.com",
    "https://www.licious.in",
    "https://www.freshtohome.com",
    "https://www.countrydelight.in",
    "https://www.milkbasket.com",
    "https://www.eatclub.in",
    "https://www.box8.in",
    "https://www.behrouzbiryani.com",
    "https://www.theobroma.in",
    "https://www.paypal.com",
    "https://www.stripe.com",
    "https://www.wise.com",
    "https://www.revolut.com",
    "https://www.mastercard.com",
    "https://www.visa.com",
    "https://www.americanexpress.com",
    "https://www.swift.com",
    "https://www.nasdaq.com",
    "https://www.nyse.com",
    "https://www.miro.com",
    "https://www.webflow.com",
    "https://www.framer.com",
    "https://www.sketch.com",
    "https://www.invisionapp.com",
    "https://www.evernote.com",
    "https://www.todoist.com",
    "https://www.airtable.com",
    "https://www.typeform.com",
    "https://www.grammarly.com",
    "https://www.steampowered.com",
    "https://www.epicgames.com",
    "https://www.playstation.com",
    "https://www.xbox.com",
    "https://www.nintendo.com",
    "https://www.ign.com",
    "https://www.gamespot.com",
    "https://www.roblox.com",
    "https://www.minecraft.net",
    "https://www.chess.com",
    "https://www.goodreads.com",
    "https://www.alltrails.com",
    "https://www.bookinghealth.com",
    "https://www.petmd.com",
    "https://www.rover.com",
    "https://www.zillow.com",
    "https://www.realtor.com",
    "https://www.archdaily.com",
    "https://www.houzz.com",
    "https://www.weather.com"
];





// Generate random URL
function generateOriginalUrl() {
    const index = Math.floor(Math.random() * originalUrls.length);
    return originalUrls[index];
}

// Generate random date within the last 30 days
function generateCreatedAt() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);

    now.setDate(now.getDate() - daysAgo);
    return now;
}

// Generate expiry date between 1 and 30 days after creation
function generateExpiryDate(createdAt) {
    const expiry = new Date(createdAt);

    const expiryDays = Math.floor(Math.random() * 30) + 1;

    expiry.setDate(expiry.getDate() + expiryDays);

    return expiry;
}


async function saveURLs(list) {
    try {

        const result = await prisma.url.createMany({
            data: list
        });

        console.log(`${result.count} URLs inserted successfully`);

    } catch (error) {
        console.log("Error saving URLs:", error);
    }
}

async function checkMissingUrlIds(params) {
    const uniqueIds = [
        ...new Set(params.map(record => record.url_id))
    ];

    const existingUrls = await prisma.url.findMany({
        where: {
            id: {
                in: uniqueIds
            }
        },
        select: {
            id: true
        }
    });

    const existingIds = new Set(
        existingUrls.map(url => url.id)
    );

    const missingIds = uniqueIds.filter(
        id => !existingIds.has(id)
    );

    console.log("Total IDs in JSON:", uniqueIds.length);
    console.log("Existing IDs in database:", existingIds.size);
    console.log("Missing IDs:", missingIds.length);

    console.log("Missing URL IDs:", missingIds);

    return missingIds;
}

async function saveAnalysisData(params) {
    try {
        const batchSize = 1000;
        let totalInserted = 0;

        for (let i = 0; i < params.length; i += batchSize) {
            console.log(totalInserted);
            const batch = params.slice(i, i + batchSize);

            const formattedData = await Promise.all(
                batch.map(async (record) => {

                    const location = await getCredentialsFromThirdPartyApp.getLocation(
                        record.ip_address
                    );

                    return {
                        urlId: record.url_id,
               
                        os: record.os,
                        device: record.device,
                        browser: record.browser,
                        clickedAt: new Date(record.created_at),
                        city: location?.city || null,
                        country: location?.country || null
                    };
                })
            );

            const result = await prisma.urlClicked.createMany({
                data: formattedData
            });

            totalInserted += result.count;

            console.log(`${totalInserted} / ${params.length} records inserted`);
        }

        console.log("All analysis data inserted successfully!");

    } catch (error) {
        console.error("Error inserting analysis data:", error);
    }
}






// Generate 420 URLs
const urls = [];
console.log(originalUrls.length);

for (let i = 0; i < originalUrls.length; i++) {

    const createdAt = generateCreatedAt();
    const expiresOn = generateExpiryDate(createdAt);
    var id = crypto.randomUUID();
    console.log(id);
    var code = generateCode(5, true, true);

    urls.push({
        id: id,
        originalUrl: generateOriginalUrl(),
        shortCode: code,
        createdAt: createdAt,
        expiresOn: expiresOn,
        urlclicks: 0
    });
}

// Display generated data
// console.log(urls);
console.log("Total URLs generated:", urls.length);
//saveURLs(urls);
console.log(analysisData.analysisDataList);
//saveAnalysisData(analysisJSON);
//checkMissingUrlIds(analysisJSON);
await prisma.url.createMany({
    data: formattedData
});


