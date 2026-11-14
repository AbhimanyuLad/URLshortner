const test = require("node:test");
const assert = require("node:assert");

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

test("Valid URL should return true", () => {
    assert.strictEqual(
        isValidUrl("https://google.com"),
        true
    );
});

test("Invalid URL should return false", () => {
    assert.strictEqual(
        isValidUrl("hello"),
        false
    );
});