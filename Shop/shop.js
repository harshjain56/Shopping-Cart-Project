let existingusers = JSON.parse(localStorage.getItem("usersDetails"))
let currentUser = JSON.parse(localStorage.getItem("currentUserDetails"))

let mensCategory = document.getElementById("mensCategory")
let womensCategory = document.getElementById("womensCategory")
let jewelryCategory = document.getElementById("jewelryCategory")
let electronicsCategory = document.getElementById("electronicsCategory")

let mensItems = document.getElementById("mensitems")
let womensItems = document.getElementById("womensitems")
let jewelryItems = document.getElementById("jewelryitems")
let electronicsItems = document.getElementById("electronincsitems")


let allitems = []
let mensClothing = []
let womensClothing = []
let electronincs = []
let jewelry = []
let selectedCateoryItems = []
let selectedFilteredCateoryItems = []
let cartItems 


if(currentUser.cartItems===undefined){
    cartItems=[]
}
else{
    cartItems=currentUser.cartItems
}

let size = ["S", "M", "L", "XL"]
let color = ["Red", "Blue", "Black", "Green", "White"]



async function fetchingProducts() {
    let response = await fetch("https://fakestoreapi.com/products")
    let data = await response.json()
    displayingandStoringdata(data)


}

fetchingProducts()


function randomSize() {
    return size[Math.floor(Math.random() * size.length)]
}

function randomColor() {

    return color[Math.floor(Math.random() * color.length)]

}





// Displaying all category products
function displayingandStoringdata(data) {
    data.forEach((item) => {
        allitems.push(item)
        selectedCateoryItems.push(item)
        if (item.category === "men's clothing") {
            item.size = randomSize()
            item.color = randomColor()
            mensClothing.push(item)
            displayMensClothing(item)
        }

        if (item.category === "jewelery") {
            item.size = randomSize()
            item.color = randomColor()
            jewelry.push(item)
            displayjewelry(item)
        }

        if (item.category === "women's clothing") {
            item.color = randomColor()
            item.size = randomSize()
            womensClothing.push(item)
            displayWomensClothing(item)
        }

        if (item.category === "electronics") {
            item.size = randomSize()
            item.color = randomColor()
            electronincs.push(item)
            displayelectronincs(item)
        }
    })


}


function displayItem(item){
    let product = document.createElement("div")
    product.className = "item"
    product.setAttribute("id", `${item.id}`)

    let productImg = document.createElement("img")
    productImg.src = item.image

    let productTitle = document.createElement("div")
    productTitle.className = "productTitle"
    productTitle.innerText = `Tilte: ${item.title}`

    let priceandSize = document.createElement("div")
    priceandSize.className = "priceandSize"
    let price = document.createElement("p")
    price.innerText = `Price:${item.price}`
    let size = document.createElement("p")
    size.innerText = `Size:${item.size}`
    priceandSize.appendChild(price)
    priceandSize.appendChild(size)

    let productColor = document.createElement("p")
    productColor.innerText = `Color: ${item.color}`

    let productRating = document.createElement("p")
    productRating.innerText = `Rating:${item.rating.rate}`

    let addToCartBtn = document.createElement("button")
    addToCartBtn.setAttribute("id", "addToCartBtn")
    addToCartBtn.innerText = "Add To Cart"
    addToCartBtn.addEventListener("click", () => {
        cartItems.push(item)
        addingCartItemsToUserObject(cartItems)
    })

    product.appendChild(productImg)
    product.append(productTitle)
    product.appendChild(priceandSize)
    product.appendChild(productColor)
    product.appendChild(productRating)
    product.appendChild(addToCartBtn)
    return product
}

function displayMensClothing(item) {
    let product= displayItem(item)
    mensItems.appendChild(product)

}

function displayWomensClothing(item) {
    let product=displayItem(item)
    womensItems.appendChild(product)
}


function displayjewelry(item) {
    let product=displayItem(item)
    jewelryItems.appendChild(product)
}

function displayelectronincs(item) {
     let product=displayItem(item)
    electronicsItems.appendChild(product)
}

function addingCartItemsToUserObject(cartItems) {
    currentUser.cartItems = cartItems
    existingusers.forEach((existinguser) => {
        if (existinguser.id === currentUser.id) {
            existinguser.cartItems = currentUser.cartItems
        }
    })

    localStorage.setItem("currentUserDetails", JSON.stringify(currentUser))
    localStorage.setItem("usersDetails", JSON.stringify(existingusers))
}















// filter related events

let filterform = document.getElementById("filterform")
let applyFilterbtn = document.getElementById("applyFilterbtn")

filterform.addEventListener("submit", (event) => {
    event.preventDefault()
    let selectedFilterValues = getFilteredValues()
    displaylingFilteredItems(selectedFilterValues)
})


function getFilteredValues() {

    let filteredValuesObject = {}

    filteredValuesObject.colors = Array.from(document.querySelectorAll(`.colorFilter input[type="checkbox"]:checked`)).map((checBox) => {
        return checBox.id
    })

    filteredValuesObject.sizes = Array.from(document.querySelectorAll(`.sizesFilter input[type="checkbox"]:checked`)).map((checBox) => {
        return checBox.id
    })

    let selectedPrice = document.querySelector(`.priceFilter input[type="radio"]:checked`)
    filteredValuesObject.price = selectedPrice ? selectedPrice.id : " "

    filteredValuesObject.rating = document.getElementById("ratingValue").innerText

    return filteredValuesObject

}


function displaylingFilteredItems(selectedFilterValues) {
    if (selectedCateoryItems === mensClothing) {

        mensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            let itemColor = item.color
            let itemsize = item.size
            let itemprice = parseFloat(item.price)
            let itemrating = parseFloat(item.rating.rate)

            let itemMeetsCriteria = true
            if (selectedFilterValues.colors.length > 0 && !selectedFilterValues.colors.includes(itemColor)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.sizes.length > 0 && !selectedFilterValues.sizes.includes(itemsize)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.rating && !(itemrating === parseFloat(selectedFilterValues.rating))) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.price) {
                let range = selectedFilterValues.price.split("to")
                let minvalue = parseFloat(range[0])
                let maxvalue = parseFloat(range[1])

                if (itemprice < minvalue || itemprice >= maxvalue) {
                    itemMeetsCriteria = false
                }
            }
            if (itemMeetsCriteria) {
                displayMensClothing(item)
            }

        })

    }

    else if (selectedCateoryItems === womensClothing) {
        womensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            let itemColor = item.color
            let itemsize = item.size
            let itemprice = parseFloat(item.price)
            let itemrating = parseFloat(item.rating.rate)

            let itemMeetsCriteria = true
            if (selectedFilterValues.colors.length > 0 && !selectedFilterValues.colors.includes(itemColor)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.sizes.length > 0 && !selectedFilterValues.sizes.includes(itemsize)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.rating && !(itemrating === parseFloat(selectedFilterValues.rating))) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.price) {
                let range = selectedFilterValues.price.split("to")
                let minvalue = parseFloat(range[0])
                let maxvalue = parseFloat(range[1])

                if (itemprice < minvalue || itemprice >= maxvalue) {
                    itemMeetsCriteria = false
                }
            }

            if (itemMeetsCriteria) {
                displayWomensClothing(item)
            }
        })

    }

    else if (selectedCateoryItems === jewelry) {
        jewelryItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            let itemColor = item.color
            let itemsize = item.size
            let itemprice = parseFloat(item.price)
            let itemrating = parseFloat(item.rating.rate)

            let itemMeetsCriteria = true
            if (selectedFilterValues.colors.length > 0 && !selectedFilterValues.colors.includes(itemColor)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.sizes.length > 0 && !selectedFilterValues.sizes.includes(itemsize)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.rating && !(itemrating === parseFloat(selectedFilterValues.rating))) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.price) {
                let range = selectedFilterValues.price.split("to")
                let minvalue = parseFloat(range[0])
                let maxvalue = parseFloat(range[1])

                if (itemprice < minvalue || itemprice >= maxvalue) {
                    itemMeetsCriteria = false
                }
            }

            if (itemMeetsCriteria) {
                displayjewelry(item)
            }
        })

    }

    else if (selectedCateoryItems === electronincs) {
        electronicsItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            let itemColor = item.color
            let itemsize = item.size
            let itemprice = parseFloat(item.price)
            let itemrating = parseFloat(item.rating.rate)

            let itemMeetsCriteria = true
            if (selectedFilterValues.colors.length > 0 && !selectedFilterValues.colors.includes(itemColor)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.sizes.length > 0 && !selectedFilterValues.sizes.includes(itemsize)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.rating && !(itemrating === parseFloat(selectedFilterValues.rating))) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.price) {
                let range = selectedFilterValues.price.split("to")
                let minvalue = parseFloat(range[0])
                let maxvalue = parseFloat(range[1])

                if (itemprice < minvalue || itemprice >= maxvalue) {
                    itemMeetsCriteria = false
                }
            }

            if (itemMeetsCriteria) {
                displayelectronincs(item)
            }
        })

    }

    else {
        electronicsItems.innerHTML = ""
        jewelryItems.innerHTML = ""
        womensItems.innerHTML = ""
        mensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            let itemColor = item.color
            let itemsize = item.size
            let itemprice = parseFloat(item.price)
            let itemrating = parseFloat(item.rating.rate)

            let itemMeetsCriteria = true
            if (selectedFilterValues.colors.length > 0 && !selectedFilterValues.colors.includes(itemColor)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.sizes.length > 0 && !selectedFilterValues.sizes.includes(itemsize)) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.rating && !(itemrating === parseFloat(selectedFilterValues.rating))) {
                itemMeetsCriteria = false
            }

            if (selectedFilterValues.price) {
                let range = selectedFilterValues.price.split("to")
                let minvalue = parseFloat(range[0])
                let maxvalue = parseFloat(range[1])

                if (itemprice < minvalue || itemprice >= maxvalue) {
                    itemMeetsCriteria = false
                }
            }

            if (itemMeetsCriteria) {
                if (item.category === "men's clothing") {
                    displayMensClothing(item)
                }

                if (item.category === "women's clothing") {
                    displayWomensClothing(item)
                }

                if (item.category === "electronics") {
                    displayelectronincs(item)
                }

                if (item.category === "jewelery") {
                    displayjewelry(item)
                }
            }
        })
    }



}








// CategoryButton related events

let allItemsBtn = document.getElementById("allItemsBtn")
allItemsBtn.addEventListener("click", () => {
    if (mensCategory.style.display = "none") {
        mensCategory.style.display = "block"
    }

    if (womensCategory.style.display = "none") {
        womensCategory.style.display = "block"
    }

    if (jewelryCategory.style.display = "none") {
        jewelryCategory.style.display = "block"
    }

    if (electronicsCategory.style.display = "none") {
        electronicsCategory.style.display = "block"
    }

    selectedCateoryItems = allitems
})

let mensItemsBtn = document.getElementById("mensItemBtn")
mensItemsBtn.addEventListener("click", () => {
    womensCategory.style.display = "none"
    electronicsCategory.style.display = "none"
    jewelryCategory.style.display = "none"
    if (mensCategory.style.display = "none") {
        mensCategory.style.display = "block"
    }

    selectedCateoryItems = mensClothing
})


let womensItemBtn = document.getElementById("womensItemBtn")
womensItemBtn.addEventListener("click", () => {
    mensCategory.style.display = "none"
    electronicsCategory.style.display = "none"
    jewelryCategory.style.display = "none"
    if (womensCategory.style.display = "none") {
        womensCategory.style.display = "block"
    }
    selectedCateoryItems = womensClothing
})



let jewelryItemsBtn = document.getElementById("jewelryItemsBtn")
jewelryItemsBtn.addEventListener("click", () => {

    mensCategory.style.display = "none"
    electronicsCategory.style.display = "none"
    womensCategory.style.display = "none"
    if (jewelryCategory.style.display = "none") {

        jewelryCategory.style.display = "block"
    }
    selectedCateoryItems = jewelry
})

let electronicsItemBtn = document.getElementById("electronicsItemBtn")
electronicsItemBtn.addEventListener("click", () => {

    mensCategory.style.display = "none"
    womensCategory.style.display = "none"
    jewelryCategory.style.display = "none"
    if (electronicsCategory.style.display = "none") {

        electronicsCategory.style.display = "block"
    }
    selectedCateoryItems = electronincs
})






// Navbar related events
let myCartTab=document.getElementById("cartTab")
myCartTab.addEventListener("click",()=>{
    myCartTab.href="../Cart/cart.html"
    myCartTab.click()
})


let profileTab=document.getElementById("profileTab")
profileTab.addEventListener("click",()=>{
    profileTab.href="../Profile/Profile.html"
    profileTab.click()
})


let logoutTab=document.getElementById("logoutTab")
logoutTab.addEventListener("click",()=>{
    localStorage.removeItem("currentUserDetails")
    logoutTab.href="../index.html"
    logoutTab.click()

})





// Search Input related events
let searchInput=document.getElementById("seachInput")
searchInput.addEventListener("change",displaySearchResults)

function displaySearchResults(event){
    let enteredText=event.target.value
    if (selectedCateoryItems === mensClothing) {

        mensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
           
              if(item.title.includes(enteredText)){
                displayMensClothing(item)
              }

        })

    }

    else if (selectedCateoryItems === womensClothing) {
        womensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
           
            if(item.title.includes(enteredText)){
             displayWomensClothing(item)
            }

      })
    }

    else if (selectedCateoryItems === jewelry) {
        jewelryItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
           
            if(item.title.includes(enteredText)){
             displayjewelry(item)
            }

      })

    }

    else if (selectedCateoryItems === electronincs) {
        electronicsItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
           
            if(item.title.includes(enteredText)){
              displayelectronincs(item)
            }

      })

    }

    else {
        electronicsItems.innerHTML = ""
        jewelryItems.innerHTML = ""
        womensItems.innerHTML = ""
        mensItems.innerHTML = ""
        selectedCateoryItems.forEach((item) => {
            if(item.title.includes(enteredText)){
                if (item.category === "men's clothing") {
                    displayMensClothing(item)
                }

                if (item.category === "women's clothing") {
                    displayWomensClothing(item)
                }

                if (item.category === "electronics") {
                    displayelectronincs(item)
                }

                if (item.category === "jewelery") {
                    displayjewelry(item)
                }
            }       
  
          })

           

    }
}







