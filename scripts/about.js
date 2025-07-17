const aboutOpen = document.getElementById("about--button_open");
const aboutBack = document.getElementById("about--button_back");
const aboutText = document.getElementById("about--text");
aboutOpen.addEventListener("click", function () {
  aboutText.style.display = "block";
  aboutOpen.style.display = "none";
  aboutBack.style.display = "flex";
});
aboutBack.addEventListener("click", function () {
  aboutText.style.display = "none";
  aboutOpen.style.display = "flex";
  aboutBack.style.display = "none";
});
