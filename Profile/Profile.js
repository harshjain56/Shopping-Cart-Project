let existingusers=JSON.parse(localStorage.getItem("usersDetails"))
let currentUser=JSON.parse(localStorage.getItem("currentUserDetails"))

let name=document.getElementById("name")
let email=document.getElementById("email")
let password=document.getElementById("password")

let newFirstName=document.getElementById("newFirsttName")

let newLastName=document.getElementById("newLastName")

let oldEmail=document.getElementById("oldEmail")
let newEmail=document.getElementById("newEmail")


let oldPassword=document.getElementById("oldPassword")
let newPassword=document.getElementById("newPassword")
let confirmNewPassword=document.getElementById("confirmNewPassword")


let shopTab=document.getElementById("shopTab")
shopTab.addEventListener("click",()=>{
    shopTab.href="../Shop/shop.html"
    shopTab.click()
})

let myCartTab=document.getElementById("cartTab")
myCartTab.addEventListener("click",()=>{
    myCartTab.href="../Cart/cart.html"
    myCartTab.click()
})

let logoutTab=document.getElementById("logoutTab")
logoutTab.addEventListener("click",()=>{
    localStorage.removeItem("currentUserDetails")
    logoutTab.href="../index.html"
    logoutTab.click()
})



function displayingCurrentUserDetails(){
    name.innerText=`Name:${currentUser.firstName} ${currentUser.lastName}`
    email.innerText=`Email:${currentUser.email}`
    

}

displayingCurrentUserDetails()




let editNameBtn=document.getElementById("editNameBtn")


editNameBtn.addEventListener("click" ,changingUserName)

function changingUserName(event) {
    console.log(event.target)
    event.preventDefault()
    if(newFirstName.value===""&&newLastName.value===""){
        alert("Please Enter The Fisrt Name or Last Name which you want to change ")
        return;
    }

    if(newFirstName.value!==""&&newLastName.value===""){
        name.innerText=`Name:${newFirstName.value} ${currentUser.lastName}`
        currentUser.firstName=newFirstName.value
        existingusers.forEach((existinguser)=>{
            if(existinguser.id===currentUser.id){
                existinguser.firstName=currentUser.firstName
            }
        })
        localStorage.setItem("currentUserDetails",JSON.stringify(currentUser))
        localStorage.setItem("usersDetails",JSON.stringify(existingusers))
    }



    if(newFirstName.value===""&&newLastName.value!==""){
        name.innerText=`Name:${currentUser.firstName} ${newLastName.value}`
        currentUser.lastName=newLastName.value
        existingusers.forEach((existinguser)=>{
            if(existinguser.id===currentUser.id){
                existinguser.lastName=currentUser.lastName
            }
        })
        localStorage.setItem("currentUserDetails",JSON.stringify(currentUser))
        localStorage.setItem("usersDetails",JSON.stringify(existingusers))
    }

    if(newFirstName.value!==""&&newLastName.value!==""){
        name.innerText=`Name:${newFirstName.value} ${newLastName.value}`
        currentUser.firstName=newFirstName.value
        currentUser.lastName=newLastName.value
        existingusers.forEach((existinguser)=>{
            if(existinguser.id===currentUser.id){
                existinguser.firstName=currentUser.firstName
                existinguser.lastName=currentUser.lastName
            }
        })
        localStorage.setItem("currentUserDetails",JSON.stringify(currentUser))
        localStorage.setItem("usersDetails",JSON.stringify(existingusers))

        alert("Name Successfully Changed")
    }
}


let editEmailBtn=document.getElementById("editEmailBtn")
editEmailBtn.addEventListener("click",changingUserEmailId)

function changingUserEmailId(event){
   console.log(event.target)
   event.preventDefault()
   if(newEmail.value===""||oldEmail.value===""){
    alert("Please Enter the data in both Email fields")
    return;
   }

   if(newEmail.value===oldEmail.value){
    alert("New email should be different from old one")
    return;
   }

   if(oldEmail.value!==currentUser.email){
    alert("The Old Email entered is wrong")
    return;
   }
    
   email.innerText=`Email:${newEmail.value}`
   currentUser.email=newEmail.value
   existingusers.forEach((existinguser)=>{
    if(existinguser.id===currentUser.id){
        existinguser.email=currentUser.email
    }
   })
      localStorage.setItem("currentUserDetails",JSON.stringify(currentUser))
      localStorage.setItem("usersDetails",JSON.stringify(existingusers))

      alert("Email Successfully Changed")
}



let changePasswordBtn=document.getElementById("changePasswordBtn")

changePasswordBtn.addEventListener("click",changeUserPassword)


function changeUserPassword(event){
  console.log(event.target)
  event.preventDefault()
  if(newPassword.value===""||oldPassword.value===""||confirmNewPassword.value===""){
    alert("Pls enter the password in all fields as per requirement")
    return;
  }

 

  if(newPassword.value.length<8){
    alert("Length Of New password must be greater than 8")
    return;
  }

  if(newPassword.value!==confirmNewPassword.value){
    alert("New Password and Confirm password doesnt Matches")
    return;
  }

  if(oldPassword.value===newPassword.value){
    alert("Old Password and New Password must be different")
    return;
  }

  if(oldPassword.value!==currentUser.password){
    alert("The old password entered by you is wrong")
    return;
  }

  
  
  
  currentUser.password=newPassword.value
  existingusers.forEach((existinguser)=>{
    if(existinguser.id===currentUser.id){
        existinguser.password=currentUser.password
    }
  })

  localStorage.setItem("currentUserDetails",JSON.stringify(currentUser))
  localStorage.setItem("usersDetails",JSON.stringify(existingusers))

  alert("Password Successfully Changed")
  

}