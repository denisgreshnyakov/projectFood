window.addEventListener("DOMContentLoaded", () => {
  // const cookieStorage = {
  //   getItem: (key) => {
  //     const cookies = document.cookie
  //       .split(";")
  //       .map((cookie) => cookie.split("="))
  //       .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
  //     return cookies[key];
  //   },
  //   setItem: (key, value) => {
  //     document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
  //   },
  // };

  // const storageType = cookieStorage;
  // const consentPropertyType = "site_consent";

  // //следует ли показывать окно с куки
  // const hasConsented = () =>
  //   storageType.getItem(consentPropertyType) === "true" ? true : false;
  // //если пользователь нажал кнопку согласия
  // const toggleStorage = (prop) =>
  //   storageType.setItem(consentPropertyType, prop);

  // const popup = document.querySelector(".popup");
  // const btnConfirm = document.querySelector("[data-confirm]");
  // const btnCancel = document.querySelector("[data-cancel]");

  // if (hasConsented()) {
  //   console.log("Loading...");
  // } else {
  //   popup.classList.add("popup_active");
  // }

  // //кнопка дать согласие
  // btnConfirm.addEventListener("click", () => {
  //   toggleStorage(true);
  //   popup.classList.remove("popup_active");
  //   console.log("Loading...");
  // });

  // //кнопка отмены
  // btnCancel.addEventListener("click", () => {
  //   toggleStorage(false);
  //   popup.classList.remove("popup_active");
  // });

  class cookieConsent {
    constructor({ popup, btnConfirm, btnCancel, activeClass = "" } = {}) {
      this.popup = document.querySelector(popup);
      this.activeClass = activeClass;
      this.btnConfirm = document.querySelector(btnConfirm);
      this.btnCancel = document.querySelector(btnCancel);
      this.consentPropertyType = "site_consent";
    }

    getItem = (key) => {
      const cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
      return cookies[key];
    };

    setItem = (key, value) => {
      document.cookie = `${key}=${value};expires=Sun, 16 Jul 3567 06:23:41 GMT`;
    };

    hasConsented = () => {
      if (this.getItem(this.consentPropertyType) === "true") {
        return true;
      } else {
        return false;
      }
    };

    changeStatus = (prop) => {
      this.setItem(this.consentPropertyType, prop);
      if (this.hasConsented()) {
        //Подписка
        myScripts();
      }
    };

    bindTriggers = () => {
      //кнопка дать согласие
      this.btnConfirm.addEventListener("click", () => {
        this.changeStatus(true);
        this.popup.classList.remove(this.activeClass);
        console.log("Loading...");
      });

      //кнопка отмены
      this.btnCancel.addEventListener("click", () => {
        this.changeStatus(false);
        this.popup.classList.remove(this.activeClass);
      });
    };

    init = () => {
      try {
        if (this.hasConsented()) {
          myScripts();
        } else {
          this.popup.classList.add(this.activeClass);
        }
        this.bindTriggers();
      } catch (e) {
        console.error("Переданы не все данные");
      }
    };
  }

  new cookieConsent({
    activeClass: "popup_active",
    popup: ".popup",
    btnConfirm: "[data-confirm]",
    btnCancel: "[data-cancel]",
  }).init();

  function myScripts() {
    console.log("loading");
  }
});
