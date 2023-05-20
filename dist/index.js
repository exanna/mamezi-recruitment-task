const DATA_URL="https://www.mamezi.pl/praca/front/products/data.json",productsWrapper=document.querySelector(".js-products"),buttonList=document.querySelectorAll(".js-button"),loadProducts=t=>{fetch(DATA_URL).then((t=>t.json())).then((e=>{const a=e.list.slice(0,t).map((t=>{let e;return"ostatnia sztuka!"===t.availability.name?e="1":"brak towaru"===t.availability.name?e="0":"mała ilość"===t.availability.name&&(e="<5"),`                 \n                    <article class="product animate" tabindex="0">\n                        <div class="product__bar">\n                            <div class="count">\n                                <div class="cart">\n                                    <img src="assets/images/cart.png" alt="Ilość sztuk" class="cart" />\n                                    <p>sztuk: ${e}</p>\n                                </div>\n                                <span>oszczędzasz: ${t.price.gross.base_float-t.price.gross.promo_float} zł</span>\n                            </div>\n                        </div>\n                        <div class="product__image">\n                            <img src="https://www.mamezi.pl/praca/front/products/upload/${t.main_image}.png" alt="Zjęcie przedmiotu" />\n                        </div>\n                        <div class="product__info">\n                            <div class="price">\n                                <p class="price__new">${t.price.gross.final_float} zł</p>\n                                <p class="price__old">${t.price.gross.base_float} zł</p>\n                            </div>\n                            <div class="product__name">\n                                <p>${t.name}</p>\n                            </div>\n                            <div class="product__producer">\n                                <p>${t.producer.name}</p>\n                            </div>\n                        </div>\n                    </article>`})).join("");productsWrapper.innerHTML=a})).catch((t=>{console.log("Wystąpił błąd:",t)}))};buttonList.forEach((t=>{t.addEventListener("click",(t=>{const e=parseInt(t.target.innerHTML);loadProducts(e)}))}));const updatePromotionTimer=()=>{const t=new Date("2023-05-28T00:00:00")-new Date,e=Math.floor(t/864e5),a=Math.floor(t/36e5%24),o=Math.floor(t/6e4%60),n=Math.floor(t/1e3%60);document.querySelector(".js-days").textContent=e.toString().padStart(2,"0"),document.querySelector(".js-hours").textContent=a.toString().padStart(2,"0"),document.querySelector(".js-minutes").textContent=o.toString().padStart(2,"0"),document.querySelector(".js-seconds").textContent=n.toString().padStart(2,"0"),t<=0&&clearInterval(timer),setTimeout(updatePromotionTimer,1e3)};window.addEventListener("load",(()=>{loadProducts(4)})),updatePromotionTimer();
//# sourceMappingURL=index.js.map