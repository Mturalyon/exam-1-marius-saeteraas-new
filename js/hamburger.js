//hamburger transformation
const hamburgerMenu = document.querySelector(".hamburger-menu");
const nav = document.querySelector("nav");

hamburgerMenu.addEventListener('click', () => { //when hamburger is clicked then the  nav receives a class that rotates the burger into an X
    nav.classList.toggle("toggle");
});