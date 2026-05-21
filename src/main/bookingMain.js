/*let loaded = false;
//load flight information
window.addEventListener("DOMContentLoaded", async () => {
    if (!loaded) {
        await loadData();
        loaded = true;

        const Selectedflight = JSON.parse(sessionStorage.getItem("selectedFlight"));
        if (!SelectedFlight) {
            alert("No flight found.");

            return;
        }}})
*/
//ABN field is added if select traveling for business 
const travelForBussines = document.getElementById("travelFoBuss");
const abnField = document.getElementById("abnField");

travelForBussines.addEventListener("change", () => {

    if (travelForBussines.checked) {
        abnField.style.display = "flex";
    } else {
        abnField.style.display = "none";
    }

});
//load with no ABN field
if (!travelForBussines.checked) {
    abnField.style.display = "none";
}