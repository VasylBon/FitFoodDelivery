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

export default language;
