const DATA="https://www.mamezi.pl/praca/front/products/data.json",productsWrapper=document.querySelector(".js-products"),buttonList=document.querySelectorAll(".js-button"),loadProducts=a=>{fetch(DATA).then((a=>a.json())).then((s=>{const t=s.list.slice(0,a).map((a=>{let s;return"ostatnia sztuka!"===a.availability.name?s="1":"brak towaru"===a.availability.name?s="0":"mała ilość"===a.availability.name&&(s="<5"),`                 \n                    <article class="product animate">\n                        <div class="product__bar">\n                            <div class="count">\n                                <div class="cart">\n                                    <img src="assets/images/cart.png" alt="Ilość sztuk" class="cart" />\n                                    <p>sztuk: ${s}</p>\n                                </div>\n                                <span>oszczędzasz: ${a.price.gross.base_float-a.price.gross.promo_float} zł</span>\n                            </div>\n                        </div>\n                        <div class="product__image">\n                            <img src="https://www.mamezi.pl/praca/front/products/upload/${a.main_image}.png" alt="" />\n                        </div>\n                        <div class="product__info">\n                            <div class="price">\n                                <p class="price__new">${a.price.gross.final_float} zł</p>\n                                <p class="price__old">${a.price.gross.base_float} zł</p>\n                            </div>\n                            <div class="product__name">\n                                <p>${a.name}</p>\n                            </div>\n                            <div class="product__producer">\n                                <p>${a.producer.name}</p>\n                            </div>\n                        </div>\n                    </article>`})).join("");productsWrapper.innerHTML=t})).catch((a=>{console.log("Wystąpił błąd:",a)}))};buttonList.forEach((a=>{a.addEventListener("click",(a=>{const s=parseInt(a.target.innerHTML);loadProducts(s)}))})),window.addEventListener("load",(()=>{loadProducts(4)}));
//# sourceMappingURL=index.js.map