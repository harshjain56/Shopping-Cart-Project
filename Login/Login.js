let existingusers=JSON.parse(localStorage.getItem("usersDetails"))
let currentUser={}

let email=document.getElementById("email")
let password=document.getElementById("password")

let loginBtn=document.getElementById("loginBtn")
loginBtn.addEventListener("click",loginTheUser)

let signUpTab=document.getElementById("signUpTab")
signUpTab.addEventListener("click",landToSignUpPage)

function landToSignUpPage(event){
    console.log(event.target)
    signUpTab.href="../SignUp/SignUp.html"
    signUpTab.click()

}




function loginTheUser(event){
     event.preventDefault()
     console.log(event.target)

    
     if(email.value===""||password.value===""){
        alert("Please enter both email and Password")
        return;
     }
     if(existingusers===null){
        alert("User Doesnt Exists Please SignUp")
        signUpTab.style.backgroundColor="gray"
        setTimeout(()=>{
            signUpTab.style.backgroundColor="black"
        },1000)
        return;
     }


    let flag= userExistenceandCredentialsCheck()
    if(flag===1){
        currentUser.accessToken=generatingaccessToken()
       localStorage.setItem('currentUserDetails',JSON.stringify(currentUser)) 
     
        let link=document.createElement("a")
        link.href="../Shop/shop.html"
        link.click()
        document.removeChild(link)

    }

    else if(flag===-1){

        alert("User Doesnt Exists Please SignUp")
      
        signUpTab.style.backgroundColor="gray"
        setTimeout(()=>{
            signUpTab.style.backgroundColor="black"
        },1000)
        return;
    }

    else{
        alert("User Credentials Doesnt Match. Please Try Again")
        return;
    }
     
}


function userExistenceandCredentialsCheck(){
    for(let i=0;i<existingusers.length;i++){
        if(existingusers[i].email===email.value){
            if(existingusers[i].password===password.value){
                currentUser={...existingusers[i]}
                return 1
            }
            else{
                return 0
            }
        }
     }
     return -1
}

function generatingaccessToken(){
    let charactersStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let accessToken=""
    for(let i=0;i<16;i++){
        accessToken+=charactersStr.charAt(Math.floor(Math.random()*charactersStr.length))
    }
    return accessToken
}

