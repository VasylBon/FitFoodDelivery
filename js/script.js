window.addEventListener("DOMContentLoaded", function () {
    //Change of language
    const languageZone = document.querySelector(".header__languages"),
        selectLanguage = languageZone.querySelector(".select__language"),
        caret = languageZone.querySelector(".caret"),
        option = languageZone.querySelector(".language li a"),
        language = languageZone.querySelector(".language"),
        selectedLanguage = document.querySelector(".selected");

    function closeLanguagePanel() {
        caret.classList.toggle("caret-rotate");
        language.classList.toggle("language-open");
    }

    selectLanguage.addEventListener("click", closeLanguagePanel);

    selectLanguage.addEventListener("mouseenter", () => {
        if (!language.classList.contains("language-open")) {
            closeLanguagePanel();
        }
    });

    option.addEventListener("mouseout", () => {
        if (language.classList.contains("language-open")) {
            closeLanguagePanel();
        }
    });

    option.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = event.target.href;
    });

    //Tabs with food style
    let tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer and promotion date
    const deadline = "2023-06-11";

    function convertDateToWords(date) {
        const parts = deadline.split("-"),
            month = parts[1],
            days = parts[2];
        let monthWords = [];

        if (selectedLanguage.textContent === "ua") {
            monthWords = [
                "січня",
                "лютого",
                "березня",
                "квітня",
                "травня",
                "червня",
                "липня",
                "серпня",
                "вересня",
                "жовтня",
                "листопада",
                "грудня",
            ];
        } else {
            monthWords = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
        }
        const monthWord = monthWords[month - 1];
        return [monthWord, days];
    }

    function showPromotionPeriod(date) {
        const promotionDate = document.querySelector("#date"),
            [month, day] = convertDateToWords(date);

        if (selectedLanguage.textContent === "ua") {
            promotionDate.textContent = `Акція завершиться ${day} ${month} о 0:00`;
        } else {
            promotionDate.textContent = `The promotion will end on ${month} ${day} at 0:00`;
        }
    }

    function getTimeRemaining(endTime) {
        let days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0;
        const time = Date.parse(endTime) - Date.parse(new Date());

        if (time > 0) {
            days = Math.floor(time / 86400000);
            hours = Math.floor((time / 3600000) % 24);
            minutes = Math.floor((time / 60000) % 60);
            seconds = Math.floor((time / 1000) % 60);
            showPromotionPeriod(endTime);
        }

        return { time, days, hours, minutes, seconds };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num;
    }

    function setClock(selector, endTime) {
        const time = document.querySelector(selector),
            days = time.querySelector("#days"),
            hours = time.querySelector("#hours"),
            minutes = time.querySelector("#minutes"),
            seconds = time.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.time <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    //Modal window

    const btnModalOpen = document.querySelectorAll("[data-modal]"),
        modalWindow = document.querySelector(".modal"),
        btnModalClose = document.querySelector("[data-close]"),
        modalTimer = setTimeout(openModal, 10000);

    function openModal() {
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }

    function closeModal() {
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight ===
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    btnModalOpen.forEach((item) => {
        item.addEventListener("click", openModal);
    });

    btnModalClose.addEventListener("click", closeModal);

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModal();
        }
    });

    window.addEventListener("scroll", showModalByScroll);

    //Cards menu
    class MenuCard {
        constructor(
            src,
            alt,
            title,
            descr,
            price,
            currency,
            parentSelector,
            ...classes
        ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.parent = document.querySelector(parentSelector);
            this.price = price;
            this.priceCost = "Price:";
            this.currency = currency;
            this.classes = classes;
            this.rate = 38;
            this.convertToUAH();
        }

        convertToUAH() {
            if (selectedLanguage.textContent === "ua") {
                this.price = this.price * this.rate;
                this.priceCost = "Ціна:";
            }
        }

        render() {
            const element = document.createElement("div");
            if (this.classes.length == 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach((className) =>
                    element.classList.add(className)
                );
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

    if (selectedLanguage.textContent === "ua") {
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            "Фітнес-меню",
            'Меню "Фітнес" - це новий підхід до приготування страв Детальніше свіжі фрукти та овочі. Продукт активних і здорових людей. Це абсолютно новий продукт з найкращою ціною та високою якістю!',
            "6",
            "₴/день",
            ".menu .container"
        ).render();

        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            "Пісне-меню",
            'Меню "Пісне" - це ретельний підбір інгредієнтів: Зовсім немає продуктів тваринного походження, молоко з мигдалю, вівса, кокоса або гречки, правильна кількість білка за рахунок тофу та імпортних вегетаріанські стейки.',
            "10",
            "₴/день",
            ".menu .container"
        ).render();

        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            "Преміум-меню",
            'У меню "Преміум" ми використовуємо не тільки красивий дизайн упаковки, але й якісне виконання страв. Червона риба, морепродукти, фрукти - ресторанне меню без відвідування ресторану!',
            "14",
            "₴/день",
            ".menu .container"
        ).render();
    } else {
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            "Fitness-menu",
            'The "Fitness" menu is a new approach to cooking More fresh fruits and vegetables. The product of active and healthy people. This is a brand new Product with the best price and high quality!',
            "6",
            "$/day",
            ".menu .container"
        ).render();

        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            "Lenten-menu",
            'The menu "Lenten" is a careful selection of ingredients: No animal products at all, milk from almonds, oats, coconut or buckwheat, The right amount of protein through tofu and imported vegetarian steaks.',
            "10",
            "$/day",
            ".menu .container"
        ).render();

        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            "Premium-menu",
            'In the "Premium" menu we use not only beautiful package design, but also high-quality execution of the dishes. Red fish seafood, fruit - a restaurant menu without going to the restaurant!',
            "14",
            "$/day",
            ".menu .container"
        ).render();
    }

    //Forms
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "Загрузка",
        success: "Дякуємо! Ми з вами зв'яжемося!",
        failure: "Щось пішло не так...",
    };

    forms.forEach((item) => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            request.setRequestHeader("Content-type", "application/json");
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }
});
