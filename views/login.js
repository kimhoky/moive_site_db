document.addEventListener("DOMContentLoaded", function() {
    const signInBtn = document.getElementById("signIn");
    const signUpBtn = document.getElementById("signUp");
    const firstForm = document.getElementById("form1");
    const secondForm = document.getElementById("form2");
    const container = document.querySelector(".container");
  
    signInBtn.addEventListener("click", function() {
      container.classList.remove("right-panel-active");
    });
  
    signUpBtn.addEventListener("click", function() {
      container.classList.add("right-panel-active");
    });
  
    firstForm.addEventListener("submit", function(e) {
      e.preventDefault();
    });
  
    secondForm.addEventListener("submit", function(e) {
      e.preventDefault();
    });
  });
  
