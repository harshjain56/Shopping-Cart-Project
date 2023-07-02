

let loginBtn=document.getElementById("loginbtn")
loginBtn.addEventListener("click",landToLoginPage)


function landToLoginPage(event){

    console.log(event.target)
    setTimeout(() => {
        let link=document.createElement("a")
        link.href="./Login/Login.html"
        link.click()
        document.removeChild(link)
    },500);
    
   
}


let signUpBtn=document.getElementById("signUpbtn")
signUpBtn.addEventListener("click", landToSignUpPage)


function landToSignUpPage(event){
    console.log(event.target)
    setTimeout(() => {
    let link=document.createElement("a")
    link.href="./SignUp/SignUp.html"
    link.click()
    document.removeChild(link)
    }, 500);
    
}

