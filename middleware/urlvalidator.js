function validateUrl(req, res, next) {

    const url = req.body.url;

    try {
        const parsedUrl = new URL(url);
    
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return res.status(400).send("Please enter a valid website URL");
        }

        console.log("Valid URL")
        next();

    } catch (error) {
        return res.status(400).send("Please enter a valid website URL");
    }
}

module.exports = validateUrl;