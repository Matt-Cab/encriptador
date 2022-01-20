const btnMoreInfo = document.querySelector(".btn-more-info");
const btnClose = document.querySelector(".btn-close");
const menu = document.querySelector(".menu");

function openMenu() {
    menu.classList.add("show");
}

function closeMenu() {
    menu.classList.remove("show");
}

btnMoreInfo.addEventListener("click", openMenu);
btnClose.addEventListener("click", closeMenu);