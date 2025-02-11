document.addEventListener("DOMContentLoaded", () => {
    const status = document.getElementById("status");
    const takeoffButton = document.getElementById("takeoff");
    const abortButton = document.getElementById("abort");

    takeoffButton.addEventListener("click", () => {
        status.textContent = "Houston, we have liftoff!";
    });

    abortButton.addEventListener("mouseenter", () => {
        abortButton.style.backgroundColor = "red";
    });

    abortButton.addEventListener("mouseleave", () => {
        abortButton.style.backgroundColor = "";
    });

    abortButton.addEventListener("click", () => {
        const confirmAbort = confirm("Are you sure you want to abort the mission?");
        if (confirmAbort) {
            status.textContent = "Mission aborted! Space shuttle returning home.";
        }
    });
});
