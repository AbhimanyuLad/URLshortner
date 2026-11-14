// Example origin = "https://www.google.com";
// features
// 5 characters
// expiry time stamp
// repeatation checking
// base 62





// 0 -> 0
// 0.1 -> 6.2 -> 6
// 0.9 -> 55.8 -> 55
// 1 -> 62
function generateRandomNumberWithBase(size=5, salted=false, mapChars=false) {

    const CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const FIXED_BASE = CHARACTERS.length;
    
    let encoded = Array.from({ length: size }, () => {
        return Math.floor(Math.random() * FIXED_BASE);
    });

    // salting strategy, add to encode
    if (salted) {
        let salt = generateRandomNumberWithBase(size, false, false);
        encoded = salt.map((val, i) => {
            return (val + encoded[i]) % FIXED_BASE;
        });
    }

    if (mapChars) {
        return encoded.map((val) => { return CHARACTERS[val] }).join("");
    }

    return encoded;

}
    
module.exports = generateRandomNumberWithBase;

// console.log(generateRandomNumberWithBase(5, true, true))
// console.log(generateRandomNumberWithBase(5, true))