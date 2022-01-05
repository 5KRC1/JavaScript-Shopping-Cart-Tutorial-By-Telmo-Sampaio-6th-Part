### DESCRIPTION

This is everything you need for finishing [this](https://www.youtube.com/watch?v=B20Getj_Zk4&list=PLD9SRxG6ST3HignjcXUX6w8RcT0_b5ihV) JS shopping cart tutorial from [Telmo Sampaio](https://www.youtube.com/channel/UCADAkBGiLWIPkCu8D1R1M6g)

### INSTRUCTIONS

First, the thing that made me feel stupid and stuck in debugging for few days, how [localStorage](https://javascript.info/localstorage) works. The problem was that I was just trying to change the "fetched" data but I was not storing it back to local storage.

1. Either way, firstly we need to get icons by importing [Ion-Icons](https://ionic.io/ionicons/v4) into html file as it is shown in the index.html file.
2. Secondly we need to make them show up in cart items by adding the code below (replace "nameOfIcon" with the name of the icon you are using) to your html part in "displayCart()" function where you want it to be shown

```html
<ion-icon name="nameOfIcon"></ion-icon>
```

3. Thirdly we make the edit buttons. You need three functions like shown below (just add them above the function "displayCart()")

```
function addOne(tag){
    console.log("addOne")
}
function removeOne(tag){
    console.log("removeOne")
}
function removeAll(){
    console.log("removeAll")
}
```

##### After adding them make sure they work by opening console and seeing if buttons display the text when pressed.

4. Lastly we make functions do stuff and make them run on click of icons like in code below

```javascript
function removeOne(tag) {
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseInt(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));
  var i = 0;

  //gets the correct item
  while (i < cart.length) {
    if (tag == cart[i].tag) {
      var item = cart[i];
    }
    i++;
  }

  //changes values of cart items
  if (item.inCart > 1) {
    item.inCart--;
    localStorage.setItem("productsInCart", JSON.stringify(cart));
  } else {
    localStorage.setItem("productsInCart", JSON.stringify(cart.pop(item)));
  }

  //changes total price and total number of products
  localStorage.setItem("totalCost", totalPrice - parseFloat(item.price));
  localStorage.setItem("cartNumbers", N - 1);
  location.reload();
}
function addOne(tag) {
  //gets data from localstorage
  var cart = JSON.parse(localStorage.getItem("productsInCart"));
  var totalPrice = parseFloat(localStorage.getItem("totalCost"));
  var N = parseInt(localStorage.getItem("cartNumbers"));
  var i = 0;

  //gets the correct item
  while (i < cart.length) {
    if (tag == cart[i].tag) {
      var item = cart[i];
    }
    i++;
  }

  //change values
  item.inCart++; //adds one more inCart
  localStorage.setItem("productsInCart", JSON.stringify(cart));
  localStorage.setItem("totalCost", totalPrice + parseFloat(item.price));
  localStorage.setItem("cartNumbers", N + 1);
  location.reload();
}
function removeAll() {
  localStorage.removeItem("productsInCart");
  localStorage.removeItem("totalCost");
  localStorage.removeItem("cartNumbers");
  location.reload();
}
```

and add it to icons (replace nameOfFunction() for the name of function you want to be run on click)

```html
<!--if function has no parameters-->
<ion-icon onclick="nameOfFunction()" />
<!--if function has parameters like "addOne(tag)"-->
<ion-icon onclick="nameOfFunction('${item.tag}')" />
```

and voila it works :)
