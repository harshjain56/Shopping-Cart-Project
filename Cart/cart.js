let existingusers = JSON.parse(localStorage.getItem("usersDetails"))
let currentUser = JSON.parse(localStorage.getItem("currentUserDetails"))



let messageDisplay=document.getElementById("messageDisplay")
let cartItemsContainer=document.getElementById("cartItemsContainer")
let checkoutContainer=document.getElementById("checkoutContainer")
let checheckoutItemList=document.getElementById("checkoutItemList")
let totalbillamount=document.getElementById("totalbillamount")
let checheckoutbtn=document.getElementById("checkoutbtn")
checheckoutbtn.addEventListener("click",landingtoPaymentGateway)

let shopTab=document.getElementById("shopTab")
shopTab.addEventListener("click",()=>{
    shopTab.href="../Shop/shop.html"
    shopTab.click()
})

let profileTab=document.getElementById("profileTab")
profileTab.addEventListener("click",()=>{
    profileTab.href="../Profile/Profile.html"
    profileTab.click()
})

let logoutTab=document.getElementById("logoutTab")
logoutTab.addEventListener("click",()=>{
    logoutTab.href="../index.html"
    logoutTab.click()
})

let totalamount=0;




if(currentUser.cartItems.length!==0){
   messageDisplay.style.display="none"
   cartItemsContainer.style.display="grid"
   checkoutContainer.style.display="block"
   currentUser.cartItems.forEach((item)=>{
    displayCartItems(item)
    displayCheckoutList(item)
   })
  
}


function displayCartItems(item){

    console.log("hii")
  
    let product=document.createElement("div")
    product.setAttribute("id",item.id)
    product.className="cartItem"

   let productImage=document.createElement("img")
   productImage.src=item.image
   
   let productTitle=document.createElement("p")
   productTitle.className="productTitle"
   productTitle.innerText=`Title:
   ${item.title}`

  let price=document.createElement("p")
  price.innerText=`Price:${item.price}`
  totalamount+=parseInt(item.price)
  


  let removeFromCartBtn=document.createElement("button")
  removeFromCartBtn.setAttribute("id", "removeFromCartBtn")
  removeFromCartBtn.innerText="Remove from cart"
  removeFromCartBtn.addEventListener("click",()=>{
    removeFromCart(item)
})


    product.appendChild(productImage)
    product.appendChild(productTitle)
    product.appendChild(price)
    product.appendChild(removeFromCartBtn)

    cartItemsContainer.appendChild(product)
  
}


function displayCheckoutList(item){
    let chechkoutItem=document.createElement("div")
    chechkoutItem.className="checkoutItem"
    chechkoutItem.setAttribute("id",item.id)

    let title=document.createElement("p")
    title.className="checkoutItemtitle"
    title.innerText=`Product Id:${item.id}`

    let price=document.createElement("p")
    price.innerText=`$${item.price}`
    totalbillamount.innerText=`$${totalamount}`

    chechkoutItem.appendChild(title)
    chechkoutItem.appendChild(price)

    checheckoutItemList.appendChild(chechkoutItem)

}

function removeFromCart(item) {
    for(let i=0;i<cartItemsContainer.children.length;i++){
       if(cartItemsContainer.children[i].id==item.id){
        cartItemsContainer.removeChild(cartItemsContainer.children[i])
        break;
       }
        }

        for(let i=0;i<checheckoutItemList.children.length;i++){
            if(checheckoutItemList.children[i].id==item.id){
             checheckoutItemList.removeChild(checheckoutItemList.children[i])
             break;
            }
         }

        totalamount-=parseInt(item.price)
        totalbillamount.innerText=`$${totalamount}`

        let indextoberemoved

        console.log( currentUser.cartItems)

      for(let i=0;i<currentUser.cartItems.length;i++){
        if(currentUser.cartItems[i].id===item.id){
            console.log(currentUser.cartItems[i])
            indextoberemoved=i
            break;
        }

       
      }
       currentUser.cartItems.splice(indextoberemoved,1)
       existingusers.forEach((existinguser)=>{
        if(existinguser.id===currentUser.id){
            existinguser.cartItems.splice(indextoberemoved,1)
        }
       })

       localStorage.setItem("currentUserDetails", JSON.stringify(currentUser))
       localStorage.setItem("usersDetails", JSON.stringify(existingusers))
       setTimeout(()=> {
        location.reload();
      }, 500);

    }

    function landingtoPaymentGateway(){

        currentUser.cartItems=[]
        existingusers.cartItems=[]
        localStorage.setItem("currentUserDetails", JSON.stringify(currentUser))
       localStorage.setItem("usersDetails", JSON.stringify(existingusers))
        alert("The payment has been successful")
       setTimeout(()=> {
        location.reload();
      }, 500);
    }



