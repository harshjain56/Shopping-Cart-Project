let existingusers=JSON.parse(localStorage.getItem("usersDetails"))
let users=[]

let firstName=document.getElementById("firstName")
let lastName=document.getElementById("lastName")
let email=document.getElementById("email")
let password=document.getElementById("password")
let confirmPassword=document.getElementById("confirmPassword")


let signUpBtn=document.getElementById("signUpBtn")
signUpBtn.addEventListener("click" ,storeData)

let loginTab=document.getElementById("loginTab")
loginTab.addEventListener("click", landToLoginPage)

function landToLoginPage(event){
  console.log(event.target)
  loginTab.href="../Login/Login.html"
  loginTab.click()
}

function storeData(event){
    event.preventDefault()
    console.log(event.target)
    let user={}
    if(firstName.value===""||lastName.value===""||email.value===""||password.value===""||confirmPassword.value===""){
        alert("Please Fill all the fields")
        return;
    }
    if(password.value.length<8){
        alert("length of password is less than 8")
        password.focus()
        return;
    }
    if(password.value!==confirmPassword.value){
        alert("Password and Confirm password doesnt Match")
        return;
    }


    

    user.firstName=firstName.value
    user.lastName=lastName.value
    user.email=email.value
    user.password=password.value
    user.id=generatingId()

    console.log(user)

    let result=checkingIfUserExist(user)
    if(result){
        console.log("failure")
       alert("User with the following Email Id Already Exists. Please enter a new email-ID")
       email.focus()
    }
    else{

       if(existingusers===null){
         
        users.push(user)
        localStorage.setItem("usersDetails",JSON.stringify(users)) 
        alert("Successfully Registered. Login to Continue")
            location.reload();

       }

       else{

        users=existingusers
        users.push(user)
        localStorage.setItem("usersDetails",JSON.stringify(users)) 
        alert("Successfully Registered. Login to Continue")
       
        location.reload();
     
       }
       
    }

  
}

function checkingIfUserExist(user) {
    console.log("checking")
    if(existingusers===null) return false;
    for(let i=0;i<existingusers.length;i++){
        if(existingusers[i].email===user.email){
            return true
        }
    }
    return false
}


function generatingId(){
  
        let charactersStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let id=""
        for(let i=0;i<16;i++){
            id+=charactersStr.charAt(Math.floor(Math.random()*charactersStr.length))
        }
        return id
    
}