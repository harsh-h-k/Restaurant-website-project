
const toggleButton = document.getElementsByClassName('navbar-navtoggle')[0];
const navbarLinks = document.getElementsByClassName('navbar-menu-item');

toggleButton.addEventListener("click", () => {
    for (let i = 0; i < navbarLinks.length; i++) {
        navbarLinks[i].classList.toggle('active')
    }
})
