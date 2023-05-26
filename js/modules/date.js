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

export default date;
