


const form = document.getElementById("urlForm");
const expiryError = document.getElementById("expiryError");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (checkDateAndTime()) {
        expiryError.textContent = "";
        form.submit();
    }else {
        expiryError.textContent =
            "Expiry date and time must be in the future.";
    }
});



function checkDateAndTime(){
    var expiryDate = document.getElementById("expiryDate").value;
    var expiryTime = document.getElementById("expiryTime").value;
    var expiry = new Date(expiryDate + "T" + expiryTime);
    var now = new Date();
    console.log("Current:", now);
    console.log("Expiry:", expiry);

    if (expiry <= now) {
        console.log("Invalid Time");
        // alert("Expiry date and time must be in the future.");
        console.error("Expiry date and time must be in the future.");
        
        return false;
    }

    console.log("Valid Time");
    return true;
}



var searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    var searchValue = searchInput.value.toLowerCase();
    var rows = document.querySelectorAll("#urlTable tbody tr");

    rows.forEach(function (row) {

        // Get the direct link column (suppose it is the 3rd column)
        var directLink = row.cells[2].textContent.toLowerCase();

        if (directLink.includes(searchValue)) {
            row.style.display = "";
        } 
        else {
            row.style.display = "none";
        }

    });

});



document.querySelectorAll(".shareBtn").forEach(button => {
    button.addEventListener("click", async () => {

        const link = button.dataset.link;

        try {
            await navigator.clipboard.writeText(link);

            const oldText = button.innerHTML;

            button.innerHTML = '<i class="bi bi-check2"></i> Copied!';

            setTimeout(() => {
                button.innerHTML = oldText;
            }, 2000);

        } catch (error) {
            console.error("Copy failed:", error);
        }
    });
});

















