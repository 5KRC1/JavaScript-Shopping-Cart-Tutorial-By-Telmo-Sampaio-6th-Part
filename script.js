 
// let cart = document.querySelectorAll(".addToCartButton");
// let products = [
//      //Your Items Here
//      //IMPORTANT
//      //if you have decimal number for price, everywhere where you do "localStorage.getItem(parseInt('totalCost'))" you do "localStorage.getItem(parseFloat('totalCost')"
//      {
//           name: "item1",
//           tag: "i1",
//           price: 5,
//           inCart: 0
//      },     {
//           name: "item2",
//           tag: "i2",
//           price: 5,
//           inCart: 0
//      },
//      {
//           name: "item3",
//           tag: "i3",
//           price: 5,
//           inCart: 0
//      },
//      {
//           name: "item4",
//           tag: "i4",
//           price: 5,
//           inCart: 0
//      },
//      {
//           name: "item5",
//           tag: "i5",
//           price: 5,
//           inCart: 0
//      },
//      {
//           name: "item6",
//           tag: "i6",
//           price: 5,
//           inCart: 0
//      },
//      {
//           name: "item7",
//           tag: "i7",
//           price: 5,
//           inCart: 0
//      }
// ]


// for (let i=0; i < cart.length; i++) {
//      cart[i].addEventListener("click", () => {
//           cartNumbers(products[i]);
//      })
// }


// function item1(){
//      cartNumbers(products[0]);
//      totalCost(products[0]);
// }

// function item2(){
//      cartNumbers(products[2]);
//      totalCost(products[2]);
// }

// function item3(){
//      cartNumbers(products[1]);
//      totalCost(products[1]);
// }

// function item4(){
//      cartNumbers(products[3]);
//      totalCost(products[3]);
// }

// function item5(){
//      cartNumbers(products[5]);
//      totalCost(products[5]);
// }

// function item6(){
//      cartNumbers(products[4]);
//      totalCost(products[4]);
// }

// function item7(){
//      cartNumbers(products[6]);
//      totalCost(products[6]);
// }


// function cartNumbers(product){
//      let productNumbers = localStorage.getItem("cartNumbers");
//      productNumbers = parseInt(productNumbers);

//      if (productNumbers){
//           localStorage.setItem("cartNumbers", productNumbers + 1);
//      }
//      else{
//           localStorage.setItem("cartNumbers", 1);
//      }


//      setItems(product);
// }

// function setItems(product){
//      let cartItems = localStorage.getItem("productsInCart");
//      cartItems = JSON.parse(cartItems);

//      if (cartItems !== null){

//           if (cartItems[product.tag] == undefined){
//                cartItems = {
//                     ...cartItems,
//                     [product.tag]: product
//                }
//           }
//           cartItems[product.tag].inCart += 1;
//      }
//      else{
//           product.inCart = 1;
//           cartItems = {
//                [product.tag]: product
//           }
//      }

//      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
// }

// function totalCost(product){
//      let cartCost = localStorage.getItem("totalCost");

//      if(cartCost != null){
//           cartCost = parseInt(cartCost);
//           localStorage.setItem("totalCost", cartCost + product.price);
//      }
//      else{
//           localStorage.setItem("totalCost", product.price);
//      }
// }

//ADDED FUNCTIONS
//=========add these functions=========

function removeOne(tag){
     //gets data from localstorage
     var cart = JSON.parse(localStorage.getItem("productsInCart"));
     var totalPrice = parseFloat(localStorage.getItem("totalCost"));
     var N = parseInt(localStorage.getItem("cartNumbers"));
     var i = 0;

     //gets the correct item
     while (i < cart.length){
          if (tag == cart[i].tag){
               var item = cart[i]
          }
          i++;
     }

     //changes values of cart items
     if (item.inCart > 1){
          item.inCart--
          localStorage.setItem("productsInCart", JSON.stringify(cart));
     }
     else{
          localStorage.setItem("productsInCart", JSON.stringify(cart.pop(item)));
     }

     //changes total price and total number of products
     localStorage.setItem("totalCost", totalPrice - parseFloat(item.price));
     localStorage.setItem("cartNumbers", N - 1);
     location.reload();
}
function addOne(tag){
     //gets data from localstorage
     var cart = JSON.parse(localStorage.getItem("productsInCart"));
     var totalPrice = parseFloat(localStorage.getItem("totalCost"));
     var N = parseInt(localStorage.getItem("cartNumbers"));
     var i = 0;

     //gets the correct item
     while (i < cart.length){
          if (tag == cart[i].tag){
               var item = cart[i]
          }
          i++;
     }

     //change values
     item.inCart++; //adds one more inCart
     localStorage.setItem("productsInCart", JSON.stringify(cart));
     localStorage.setItem("totalCost", totalPrice + parseFloat(item.price))
     localStorage.setItem("cartNumbers", N + 1)
     location.reload();
}
function removeAll(tag){
     //gets data from localstorage
     var cart = JSON.parse(localStorage.getItem("productsInCart"));
     var totalPrice = parseFloat(localStorage.getItem("totalCost"));
     var N = parseInt(localStorage.getItem("cartNumbers"));
     var i = 0;

     //gets the correct item
     while (i < cart.length){
          if (tag == cart[i].tag){
               var item = cart[i]
          }
          i++;
     }

     localStorage.setItem("productsInCart", cart.pop(item));
     localStorage.setItem("totalCost", totalPrice - (parseFloat(item.price) * parseInt(item.inCart)))
     localStorage.setItem("cartNumbers", N - parseInt(item.inCart))
     location.reload();
}


//to your icons add the above functions (watch <ion-icon>) with onClick=''
function displayCart(){
     let cartItems = localStorage.getItem("productsInCart");
     cartItems = JSON.parse(cartItems);
     let productContainer = document.querySelector(".products");
     let cartCost = localStorage.getItem("totalCost");
     console.log(cartItems);
     if(cartItems && productContainer){
          productContainer.innerHTML = "";
          Object.values(cartItems).map(item => {
               productContainer.innerHTML += `
               <div class="product">
                    <button type="button" onclick="removeAll('${item.tag}')"><ion-icon name="close-circle"></ion-icon></button>
                    <img src="../img/${item.tag}.png">
                    <span>${item.name}</span>
               </div>
               <div class="price">&nbsp;$${item.price}</div>
               <div class="quantity">
                    <button onclick="removeOne('${item.tag}')"><ion-icon name="caret-back-circle"></ion-icon></button>
                    <span>${item.inCart}</span>
                    <ion-icon onclick="addOne('${item.tag}')" name="caret-forward-circle"></ion-icon>
               </div>
               <div class="total">
                    $${item.inCart * item.price}
               </div>
               `;
          });

          productContainer.innerHTML += `
               <div class="cartTotalContainer">
                    <h3 class="cartTotalTitle">
                         Cart Total
                    </h3>
                    <h3 class="cartTotal">
                         $${cartCost}
                    </h3>
          `;

     }
}

// displayCart();

// function removeItem(){
//      localStorage.clear();
//      document.location.reload(true);
// }
