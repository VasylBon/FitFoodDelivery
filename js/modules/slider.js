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

export default slider;
