let form=document.getElementById("form");

form.addEventListener("submit", function(){
    event.preventDefault();
    let email= form.email.value;
    let password=form.password.value;
    if(email=="empher@gmail.com" && password=="empher@123" ){
        alert("Login Success");
        window.location.href="quiz.html";
    }
})