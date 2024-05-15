// Helpful Variables for Cart & Main Products
let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let listProductHTML = document.querySelector(".product-list");
let listProducts = [];
let listcardHtml = document.querySelector(".list-cart");
let listcard = [];
let category = document.querySelectorAll(".product-category ul li");
category.forEach((cat) => {
    cat.addEventListener('click', () => {
        category.forEach((cates) => {
            cates.classList.remove('active');
        })
        cat.classList.add('active');
    })
})
// Open & Closing Cart
let iconCartSpan = document.querySelector(".icon-cart span");
iconCart.addEventListener('click', () => {
    body.classList.toggle("show-cart");
})
closeCart.addEventListener('click', () => {
    body.classList.toggle("show-cart");
})

// Showing Products Function
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {``
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product-item');
            newProduct.dataset.id = product._id;
            newProduct.dataset.category = product.type;
            //Filtering Categories
            filteringCategoriesProd(newProduct);
            newProduct.innerHTML = ` 
                    <img src="${product.image}" alt="" crossorigin="anonymous">
                    <h2>${product.name}</h2>
                    <div class="price">${product.price} SYP</div>
                    <button class="addcart">Add To Cart </button>
        `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
//Filtering Categories Function
const filteringCategoriesProd = (newProduct) => {
    category.forEach((cat) => {
        cat.addEventListener('click', (e) => {
            let filter = e.target.dataset.name;
            if (filter === 'all') {
                newProduct.style.display = 'block';
            } else {
                if (newProduct.dataset.category === filter) {
                    newProduct.style.display = 'block';

                } else {
                    newProduct.style.display = 'none';
                }
            }
        });
    });
}
// Add Product To Cart
listProductHTML.addEventListener( 'click', ( event ) =>
{
    let positionClick = event.target;
    if ( positionClick.classList.contains( 'addcart' ) )
    {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }

} );

const addToCart = (product_id) => {
    let positionThisProductInCart = listcard.findIndex( ( value ) => value.product_id == product_id );
    if (listcard.length <= 0) {
        listcard = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        listcard.push({
            product_id: product_id,
            quantity: 1
        })
    } else {
        listcard[positionThisProductInCart].quantity = listcard[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
// To Store Cart Products In Memory

const addCartToMemory = () => {
    localStorage.setItem('productCart', JSON.stringify(listcard));
}
// Adding To Cart Function

const addCartToHTML = () => {
    listcardHtml.innerHTML = '';
    let totalQuantity = 0;
    if (listcard.length > 0) {
        listcard.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex( ( value ) => value._id == cart.product_id );
            let info = listProducts[ positionProduct ];
            newCart.innerHTML = `<div class="image">
                        <img src="${info.image}" alt="" crossorigin="anonymous">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="total-price">
                    ${info.price * cart.quantity} SYP
                    </div>
                    <div class="quantity">
                        <span class="minus"> - </span>
                        <span>${cart.quantity}</span>
                        <span class="plus"> + </span>
                    </div>`;
            listcardHtml.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
// To Control Quantities

listcardHtml.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
// Quantity Function

const changeQuantity = (product_id, type) => {
    let positionItemCart = listcard.findIndex((value) => value.product_id == product_id);
    if (positionItemCart >= 0) {
        switch (type) {
            case 'plus':
                listcard[positionItemCart].quantity = listcard[positionItemCart].quantity + 1;
                break;

            default:
                let valueChange = listcard[positionItemCart].quantity - 1;
                if (valueChange > 0)
                    listcard[positionItemCart].quantity = valueChange;
                else {
                    listcard.splice(positionItemCart, 1)
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
// Fetch Data To Use As Products

const initApp = () => {
    // get data from json
    fetch('http://localhost:7000/api/v1.0.0/products')
    .then(response => response.json())
    .then(data => {
        listProducts = data.doc;
        addDataToHTML();
        // get cart from memory 
        if (localStorage.getItem('productCart')) {
            listcard = JSON.parse(localStorage.getItem('productCart'));
            addCartToHTML();
        }
    })
}
initApp();














// <div class="swiper-slide slide">
//                     <h3 class="title">
//                         breakfast
//                     </h3>

//                     <div class="box-container">

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/breakfast1.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/breakfast2.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/breakfast3.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/brakfast4.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/brakfast5.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>
//                         <a href="#" class="btn-menu">See more..</a>
//                     </div>
//                 </div>
// <!-- //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
//                 <div class="swiper-slide slide">
//                     <h3 class="title">lunch</h3>


//                     <div class="box-container">

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/lunch1.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/lunch2.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/lunch3.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/lunch4.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/lunch5.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <a href="#" class="btn-menu">See more..</a>

//                     </div>
//                 </div>

//                 <div class="swiper-slide slide">
//                     <h3 class="title">dinner</h3>


//                     <div class="box-container">

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/dinner1.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/dinner2.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/dinner3.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/dinner4.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/dinner5.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <a href="#" class="btn-menu">See more..</a>

//                     </div>
//                 </div>

//                 <div class="swiper-slide slide">
//                     <h3 class="title">drinks</h3>

//                     <div class="box-container">

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/drink1.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/drink2.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/drink3.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/drink4.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/drinkk5.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>
//                         <a href="#" class="btn-menu">See more..</a>

//                     </div>

//                 </div>

//                 <div class="swiper-slide slide">
//                     <h3 class="title">deserts</h3>


//                     <div class="box-container">

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/desert1.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/desert2.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/desert3.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/desert4.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>

//                         <div class="box">
//                             <div class="image">
//                                 <img src="images/desert5.jpg" alt="">
//                                 <a href="#" class="fas fa-heart"></a>
//                             </div>
//                             <div class="content">
//                                 <div class="stars">
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star"></i>
//                                     <i class="fas fa-star-half-alt"></i>
//                                 </div>
//                                 <h3>delicious food</h3>
//                                 <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, accusantium.</p>
//                                 <a href="#" class="btn">add to cart</a>
//                                 <span class="price">$12.99</span>
//                             </div>
//                         </div>
//                         <a href="#" class="btn-menu">See more..</a>


//                     </div>
