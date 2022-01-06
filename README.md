### DESCRIPTION

This is everything you need for finishing [this](https://www.youtube.com/watch?v=B20Getj_Zk4&list=PLD9SRxG6ST3HignjcXUX6w8RcT0_b5ihV) JS shopping cart tutorial from [Telmo Sampaio](https://www.youtube.com/channel/UCADAkBGiLWIPkCu8D1R1M6g)

### INSTRUCTIONS

First, the thing that made me feel stupid and stuck in debugging for few days, how [localStorage](https://javascript.info/localstorage) works. The problem was that I was just trying to change the "fetched" data but I was not storing it back to local storage.

1. Either way, firstly we need to get icons by importing [Ion-Icons](https://ionic.io/ionicons/v4) into html file as it is shown in the index.html file,
2. Secondly we need to make them show up in cart items by adding the code below to your html part in "displayCart()" function where you want it to be shown,

```html
<!--replace "nameOfIcon" with the name of the icon you are using-->
<ion-icon name="nameOfIcon"></ion-icon>
```

3. Thirdly we make the functions for edit buttons. You need three of them like shown below,

```javascript
function addOne() {
  console.log("addOne");
}
function removeOne() {
  console.log("removeOne");
}
function removeAll() {
  console.log("removeAll");
}
```

4. Then you make functions work by adding "onclick" method to ion-icons as shown below,

```html
<!--replace nameOfFunction() for the name of function you want to run-->
<ion-icon onclick="nameOfFunction()" name="stillNameOfIcon"></ion-icon>
```

##### After adding them make sure they work by opening console and seeing if buttons display the text when pressed!

5. And now we make functions do stuff,

```javascript
function removeOne(tag) {
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));

  //gets the correct item
  var item = cart[tag];

  //changes values of cart items
  if (item.inCart > 1) {
    item.inCart--;
    localStorage.setItem("productsInCart", JSON.stringify(cart));
  } else {
    delete cart[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cart));
  }

  //changes total price and total number of products
  localStorage.setItem("totalCost", totalPrice - item.price);
  localStorage.setItem("cartNumbers", N - 1);
  location.reload();
}
function addOne(tag) {
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));

  //gets the correct item
  var item = cart[tag];

  //change values
  item.inCart++; //adds one more inCart
  localStorage.setItem("productsInCart", JSON.stringify(cart));
  localStorage.setItem("totalCost", totalPrice + item.price);
  localStorage.setItem("cartNumbers", N + 1);
  location.reload();
}
function removeAll(tag) {
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));

  //gets the correct item
  var item = cart[tag];

  delete cart[tag];
  localStorage.setItem("productsInCart", JSON.stringify(cart));
  localStorage.setItem("totalCost", totalPrice - item.price * item.inCart);
  localStorage.setItem("cartNumbers", N - item.inCart);
  location.reload();
}
```

6. Lastly just add parameter to the function in ion-icons like in code below,

```html
<ion-icon onclick="nameOfFunction('${item.tag}')" name="nameOfFunction" />
```

and voila it works. :)

### EXPLANATION

In functions you can see I am firstly geting the data already stored there, then modifying the data and lastly storing the new data instead of the old. And you must make sure to also refresh the page to display the new data afterwards with "location.reload()".
