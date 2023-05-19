const DATA = "https://www.mamezi.pl/praca/front/products/data.json";
const productsWrapper = document.querySelector(".js-products");
const buttonList = document.querySelectorAll(".js-button");
  
const loadProducts = (productCount) => {
    fetch(DATA)
        .then((response) => response.json())
        .then((data) => {
            const limitedData = data.list.slice(0, productCount);

            const html = limitedData
                .map((item) => {
                    let quantity;
                    if(item.availability.name === "ostatnia sztuka!") {
                        quantity = "1";
                    } else if (item.availability.name === "brak towaru"){
                        quantity = "0";
                    } else if (item.availability.name === "mała ilość") {
                        quantity = "<5"
                    }

                    return `                 
                    <article class="product animate">
                        <div class="product__bar">
                            <div class="count">
                                <div class="cart">
                                    <img src="assets/images/cart.png" alt="Ilość sztuk" class="cart" />
                                    <p>sztuk: ${quantity}</p>
                                </div>
                                <span>oszczędzasz: ${item.price.gross.base_float - item.price.gross.promo_float} zł</span>
                            </div>
                        </div>
                        <div class="product__image">
                            <img src="https://www.mamezi.pl/praca/front/products/upload/${item.main_image}.png" alt="" />
                        </div>
                        <div class="product__info">
                            <div class="price">
                                <p class="price__new">${item.price.gross.final_float} zł</p>
                                <p class="price__old">${item.price.gross.base_float} zł</p>
                            </div>
                            <div class="product__name">
                                <p>${item.name}</p>
                            </div>
                            <div class="product__producer">
                                <p>${item.producer.name}</p>
                            </div>
                        </div>
                    </article>`;
                })
                .join("");

            productsWrapper.innerHTML = html;
    
        })
        .catch((error) => {
            console.log("Wystąpił błąd:", error);
        });
};

buttonList.forEach((button) => {
    button.addEventListener("click", (e) => {
        const productCount = parseInt(e.target.innerHTML);
        loadProducts(productCount);
    });
});

window.addEventListener("load", () => {
    loadProducts(4);
})