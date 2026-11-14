const axios = require("axios");

async function getLocation(ip) {
    try {
        //https://ipinfo.io/8.8.8.8/json?token=YOUR_TOKEN
        const response = await axios.get(
            `https://ipinfo.io/${ip}/json`,
            {
                params: {
                    token: process.env.IPINFO_TOKEN
                }
            }
        );

        return {
            country: response.data.country || null,
            city: response.data.city || null
        };

    } catch (error) {
        console.log(error.message);

        return {
            country: null,
            city: null
        };
    }
}

module.exports = {getLocation};