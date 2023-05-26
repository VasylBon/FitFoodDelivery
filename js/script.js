import tabs from "./modules/tabs.js";
import slider from "./modules/slider";
import modal from "./modules/modal";
import language from "./modules/language";
import forms from "./modules/forms";
import date from "./modules/date";
import cards from "./modules/cards";
import calculator from "./modules/calculator";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", function () {
    const selectedLanguage = document.querySelector(".selected"),
        modalTimer = setTimeout(() => openModal(".modal", modalTimer), 50000),
        deadline = "2023-06-10";

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalTimer);
    language();
    forms("form", modalTimer);
    date(selectedLanguage, ".timer", deadline);
    cards(selectedLanguage);
    calculator();
    slider({
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
