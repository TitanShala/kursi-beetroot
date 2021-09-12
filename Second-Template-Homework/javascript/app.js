const arrow = document.getElementsByClassName("arrow")[0];

arrow.addEventListener("click", () => {
  arrow.classList.toggle("activearrow");
  window.location = "#arrow";
});
