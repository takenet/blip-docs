//= require ../lib/_jquery


function toggleMode() {
    var element = document.getElementById('html');
    toggleLogo();
    element.classList.toggle("light-mode");

}
  

function toggleLogo() {
    var logo = document.getElementById('logo');
    console.log(logo.src);
    if (logo.src.includes("images/Logo.svg")) {
        logo.src = "images/LogoL.svg"; 
    } else {
        logo.src = "images/Logo.svg"
    }
}



