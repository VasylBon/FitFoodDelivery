/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector(".calculating__result span");
    let sex = localStorage.getItem("sex"),
        height,
        weight,
        age,
        ratio = localStorage.getItem("ratio");

    if (!localStorage.getItem("sex")) {
        sex = "female";
        localStorage.setItem("sex", "female");
    }

    if (!localStorage.getItem("ratio")) {
        ratio = "1.375";
        localStorage.setItem("ratio", "1.375");
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute("id") === localStorage.getItem("sex")) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "----";
            return;
        }

        console.log(ratio);
        if (sex === "female") {
            result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
        } else {
            result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }

                elements.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {
            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }
        });

        input.addEventListener("input", () => {
            switch (input.getAttribute("id")) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price, language }) => {
            if (language === selectedLanguage.textContent) {
                new MenuCard(img, altimg, title, descr, price, language, ".menu .container").render();
            }
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/date.js":
/*!****************************!*\
  !*** ./js/modules/date.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function date(selectedLanguage, id, deadline) {
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

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (date);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimer) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякуємо! Ми з вами зв'яжемося!",
        failure: "Щось пішло не так...",
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let statusMessage = document.createElement("img");
            statusMessage.classList.add("loading");
            statusMessage.src = message.loading;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimer);

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
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/language.js":
/*!********************************!*\
  !*** ./js/modules/language.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function language() {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (language);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimer) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("show");
    modalWindow.classList.remove("hide");
    document.body.style.overflow = "hidden";

    if (modalTimer) {
        clearInterval(modalTimer);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add("hide");
    modalWindow.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimer) {
    const btnModalOpen = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    btnModalOpen.forEach((btn) => {
        btn.addEventListener("click", () => openModal(modalSelector, modalTimer));
    });

    modalWindow.addEventListener("click", (event) => {
        if (event.target === modalWindow || event.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight - 1) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ container, slide, nextArrow, previousArrow, totalCounter, currentCounter, wrapper, field }) {
    // 1. Slider
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prevSlider = document.querySelector(previousArrow),
        nextSlider = document.querySelector(nextArrow),
        current = document.getElementById(currentCounter),
        total = document.getElementById(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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
        if (offset == convertToNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += convertToNumber(width);
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
            offset = convertToNumber(width) * (slides.length - 1);
        } else {
            offset -= convertToNumber(width);
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
            offset = convertToNumber(width) * (slideTo - 1);
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

    function convertToNumber(value) {
        return +value.replace(/\D/g, "");
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: data,
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_language__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/language */ "./js/modules/language.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_date__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/date */ "./js/modules/date.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");










window.addEventListener("DOMContentLoaded", function () {
    const selectedLanguage = document.querySelector(".selected"),
        modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)(".modal", modalTimer), 50000),
        deadline = "2024-06-10";

    (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])("[data-modal]", ".modal", modalTimer);
    (0,_modules_language__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimer);
    (0,_modules_date__WEBPACK_IMPORTED_MODULE_5__["default"])(selectedLanguage, ".timer", deadline);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])(selectedLanguage);
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_7__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        previousArrow: ".offer__slider-prev",
        totalCounter: "total",
        currentCounter: "current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
