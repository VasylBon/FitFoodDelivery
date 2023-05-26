import { getResource } from "../services/services";

function cards(selectedLanguage) {
    class MenuCard {
        constructor(src, alt, title, descr, price, language, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.language = language;
            this.priceCost = "Price:";
            this.currency = "$/day";
            this.classes = classes;
            this.rate = 38;
            this.convertToUAH();
        }

        convertToUAH() {
            if (this.language === "ua") {
                this.price = this.price * this.rate;
                this.priceCost = "Ціна:";
                this.currency = "₴/день";
            }
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length == 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt} />
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">
                        ${this.descr}
                        </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">${this.priceCost}</div>
                        <div class="menu__item-total">
                            <span>${this.price}</span> ${this.currency}
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    getResource("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price, language }) => {
            if (language === selectedLanguage.textContent) {
                new MenuCard(img, altimg, title, descr, price, language, ".menu .container").render();
            }
        });
    });
}

export default cards;
