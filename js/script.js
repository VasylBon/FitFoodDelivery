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
        modalTimer = setTimeout(openModal, 50000);

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

    modalWindow.addEventListener("click", (event) => {
        if (
            event.target === modalWindow ||
            event.target.getAttribute("data-close") == ""
        ) {
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
            language,
            parentSelector,
            ...classes
        ) {
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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getResource("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price, language }) => {
            if (language === selectedLanguage.textContent) {
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    language,
                    ".menu .container"
                ).render();
            }
        });
    });

    //Forms
    const forms = document.querySelectorAll("form");

    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякуємо! Ми з вами зв'яжемося!",
        failure: "Щось пішло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: data,
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.classList.add("loading");
            statusMessage.src = message.loading;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            closeModal();
        }, 4000);
    }

    //Slider and dots
    // 1. Slider
    const slides = document.querySelectorAll(".offer__slide"),
        slider = document.querySelector(".offer__slider"),
        prevSlider = document.querySelector(".offer__slider-prev"),
        nextSlider = document.querySelector(".offer__slider-next"),
        current = document.getElementById("current"),
        total = document.getElementById("total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width;
    let position = 1,
        offset = 0;

    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.Transition = "0.5s all";

    slidesWrapper.style.overflow = "hidden";

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    nextSlider.addEventListener("click", () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (position == slides.length) {
            position = 1;
        } else {
            position++;
        }

        showSliderPosition();
    });

    prevSlider.addEventListener("click", () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (position == 1) {
            position = slides.length;
        } else {
            position--;
        }

        showSliderPosition();
    });

    // 2.Dots
    const dots = document.createElement("ol"),
        activeDots = [];
    dots.classList.add("indicator__carousel");
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("li");
        dot.setAttribute("data-slide-to", i + 1);
        dot.classList.add("dot");
        if (i == 0) {
            dot.classList.add("active");
        }
        dots.append(dot);
        activeDots.push(dot);
    }

    activeDots.forEach((dot) => {
        dot.addEventListener("click", (event) => {
            const slideTo = event.target.getAttribute("data-slide-to");

            position = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            showSliderPosition();
        });
    });

    function showSliderPosition() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${position}`;
        } else {
            total.textContent = slides.length;
            current.textContent = position;
        }

        activeDots.forEach((dot) => {
            dot.classList.remove("active");
        });
        activeDots[position - 1].classList.add("active");
    }
    showSliderPosition();
});
