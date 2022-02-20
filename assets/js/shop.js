let sortingShow = document.querySelector('.sort-by-product-area .sort-by-cover.mr-10');
let dropDown = document.querySelector('.sort-by-dropdown');

if (sortingShow && dropDown) {
  sortingShow.addEventListener('click', function() {
    this.classList.toggle('show');
    dropDown.classList.toggle('show');
  });
}

let sorter = document.querySelector('.sort-by-cover.featured');
let droping = document.querySelector('.sort-by-cover.featured .sort-by-dropdown');

if (sorter && droping) {
  sorter.addEventListener('click', function() {
    this.classList.toggle('show');
    droping.classList.toggle('show');
  });
}

const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const sortItem = document.getElementById("product-list");
  const product = document.querySelectorAll(".vendor-card");
  const pname = sortItem.getElementsByClassName('name');

  for(var i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByClassName('name')[0];

    if(match) {
      let textValue = match.textContent || match.innerHTML

      if(textValue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
}

let carts = document.querySelectorAll('.add-cart .add');

let products = [
  {
    name: 'Seeds of Change Organic Quinoe Naturel',
    price: 28.85,
    rating: 4,
    img: 'assets/imgs/shop/product-1-1.jpg',
    inCart: 0
  },
  {
    name: 'All Natural Italian-Style Chicken Meatballs',
    price: 52.85,
    rating: 3.5,
    img: 'assets/imgs/shop/product-2-1.jpg',
    inCart: 0
  },
  {
    name: 'Angie’s Boomchickapop Sweet & Salty',
    price: 48.85,
    rating: 4,
    img: 'assets/imgs/shop/product-3-1.jpg',
    inCart: 0
  },
  {
    name: 'Foster Farms Takeout Crispy Classic',
    price: 17.85,
    rating: 4,
    img: 'assets/imgs/shop/product-4-1.jpg',
    inCart: 0
  },
  {
    name: 'Blue Diamond Almonds Lightly Naturel',
    price: 23.85,
    rating: 4,
    img: 'assets/imgs/shop/product-5-1.jpg',
    inCart: 0
  },
]

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

// function onloadCartNumbers() {
//   let productNumbers = localStorage.getItem('cartNumbers');
//   if (productNumbers) {
//     document.querySelector('.cart span').textContent = productNumbers;
//   }
// }

function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if( productNumbers ) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    // document.querySelector('.cart span').textContent = productNumbers + 1; /* Add navbar first */
  } else {
    localStorage.setItem('cartNumbers', 1);
    // document.querySelector('.cart span').textContent = 1; /* Add navbar first */
  }

  setItems(product);
}

function setItems (product) {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.name] == undefined) {
      cartItems = {
        ...cartItems,
        [product.name]: product
      }
    }
    cartItems[product.name].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.name]: product
    }
  }
  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  if( cartCost != null) {
    cartCost = parseFloat(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector('.shopping-container');
  let cartCost = localStorage.getItem('totalCost');
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <tr class="pt-30">
          <td class="custome-checkbox pl-30">
              <input class="form-check-input" type="checkbox" name="checkbox" id="exampleCheckbox1" value="">
              <label class="form-check-label" for="exampleCheckbox1"></label>
          </td>
          <td class="image product-thumbnail pt-40"><img src="${item.img}" alt="#"></td>
          <td class="product-des product-name">
              <h6 class="mb-5"><a class="product-name mb-10 text-heading" href="shop-product-right.html">${item.name}</a></h6>
              <div class="product-rate-cover">
                  <div class="product-rate d-inline-block">
                      <div class="product-rating" style="width:90%">
                      </div>
                  </div>
                  <span class="font-small ml-5 text-muted">${item.rating}</span>
              </div>
          </td>
          <td class="price" data-title="Price">
              <h4 class="text-body">$${item.price}</h4>
          </td>
          <td class="text-center detail-info" data-title="Stock">
              <div class="detail-extralink mr-15">
                  <div class="detail-qty border radius">
                      <a href="#" class="qty-down"><i class="fi-rs-angle-small-down"></i></a>
                      <span class="qty-val">${item.inCart}</span>
                      <a href="#" class="qty-up"><i class="fi-rs-angle-small-up"></i></a>
                  </div>
              </div>
          </td>
          <td class="price" data-title="Price">
            <h4 class="text-brand">$${(item.price * item.inCart).toFixed(2)}</h4>
          </td>
          <td class="action text-center" data-title="Remove"><a href="#" class="text-body"><i class="fi-rs-trash"></i></a></td>
        </tr>
      `
      let add = document.querySelectorAll('.fi-rs-angle-small-up');
      let remove = document.querySelectorAll('.fi-rs-angle-small-down');
      for (i = 0; i < add.length; i++) {
        add[i].addEventListener('click', function() {
          // this.parentNode.previousElementSibling.innerHTML += 1;
          let added = +this.parentNode.previousElementSibling.innerHTML;
          this.parentNode.previousElementSibling.innerHTML = `${added += 1}`;
        });
      }
    });
    let totalAmount = document.querySelectorAll('.cart_total_amount .text-brand');
    if (totalAmount) {
      totalAmount.forEach((amount) => {
        amount.innerText = `$${parseFloat(cartCost).toFixed(2)}`;
      });
    }
  }
}


// onloadCartNumbers();
displayCart();