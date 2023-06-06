class ProductLoader {
    constructor(dataUrl, productsWrapper, buttonList) {
        this.dataUrl = dataUrl;
        this.productsWrapper = productsWrapper;
        this.buttonList = buttonList;
    }

    loadProducts(productCount) {
        fetch(this.dataUrl)
            .then((response) => response.json())
            .then((data) => {
                const limitedData = data.list.slice(0, productCount);
                const html = limitedData
                    .map((item) => this.generateProductHtml(item))
                    .join("");
                this.productsWrapper.innerHTML = html;
            })
            .catch((error) => {
                console.log("Wystąpił błąd:", error);
            });
    }

    generateProductHtml(item) {
        let quantity;
        if (item.availability.name === "ostatnia sztuka!") {
            quantity = "1";
        } else if (item.availability.name === "brak towaru") {
            quantity = "0";
        } else if (item.availability.name === "mała ilość") {
            quantity = "<5";
        }

        return `
        <article class="product animate" tabindex="0">
          <div class="product__bar">
            <div class="count">
              <div class="cart">
                <img src="assets/images/cart.png" alt="Ilość sztuk" class="cart" />
                <p>sztuk: ${quantity}</p>
              </div>
              <span>oszczędzasz: ${item.price.gross.base_float - item.price.gross.promo_float
            } zł</span>
            </div>
          </div>
          <div class="product__image">
            <img src="https://www.mamezi.pl/praca/front/products/upload/${item.main_image
            }.png" alt="" />
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
    }

    addEventListeners() {
        this.buttonList.forEach((button) => {
            button.addEventListener("click", (e) => {
                const productCount = parseInt(e.target.innerHTML);
                this.loadProducts(productCount);
            });
        });
    }
}

class PromotionTimer {
    constructor() {
        this.timerElement = document.querySelector(".js-timer");
        this.targetDate = new Date("2023-06-28T00:00:00");
        this.timer = null;
    }

    start() {
        this.updateTimer();
        this.timer = setInterval(this.updateTimer.bind(this), 1000);
    }

    updateTimer() {
        const now = new Date();
        const difference = this.targetDate - now;

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        document.querySelector(".js-days").textContent = days
            .toString()
            .padStart(2, "0");
        document.querySelector(".js-hours").textContent = hours
            .toString()
            .padStart(2, "0");
        document.querySelector(".js-minutes").textContent = minutes
            .toString()
            .padStart(2, "0");
        document.querySelector(".js-seconds").textContent = seconds
            .toString()
            .padStart(2, "0");

        if (difference <= 0) {
            clearInterval(this.timer);
        }
    }
}

window.addEventListener("load", () => {
    const dataUrl = "https://www.mamezi.pl/praca/front/products/data.json";
    const productsWrapper = document.querySelector(".js-products");
    const buttonList = document.querySelectorAll(".js-button");

    const productLoader = new ProductLoader(dataUrl, productsWrapper, buttonList);
    productLoader.addEventListeners();
    productLoader.loadProducts(4);

    const promotionTimer = new PromotionTimer();
    promotionTimer.start();
});
