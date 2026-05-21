let loaded = false;
//load flight information
window.addEventListener("DOMContentLoaded", async () => {
    if (!loaded) {
        await loadData();
        loaded = true;

        const Selectedflight = JSON.parse(sessionStorage.getItem("selectedFlight"));
        if (!SelectedFlight) {
            alert("No flight found.");
            
            return;
        }}