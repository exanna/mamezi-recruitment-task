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
                    return `                 
                    <article class="product">
                        <div class="product__bar">
                            <div class="count">
                                <img src="assets/images/cart.png" alt="Ilość sztuk" class="cart" />
                                <span>oszczędzasz: ${item.price.gross.base_float - item.price.gross.promo_float} zł</span>
                            </div>
                        </div>
                        <div class="product__image">
                            <img src="" alt="" />
                        </div>
                        <div class="product__info">
                            <div class="product__price">
                                <p class="product__price--new">${item.price.gross.final_float} zł</p>
                                <p class="product__price--old">${item.price.gross.base_float} zł</p>
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