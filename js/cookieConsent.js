window.addEventListener("DOMContentLoaded", () => {
  const storageType = localStorage;
  const consentPropertyType = "site_consent";

  //следует ли показывать окно с куки
  const hasConsented = () =>
    storageType.getItem(consentPropertyType) === "true" ? true : false;
  //если пользователь нажал кнопку согласия
  const toggleStorage = (prop) =>
    storageType.setItem(consentPropertyType, prop);

  const popup = document.querySelector(".popup");
  const btnConfirm = document.querySelector("[data-confirm]");
  const btnCancel = document.querySelector("[data-cancel]");

  if (hasConsented()) {
    console.log("Loading...");
  } else {
    popup.classList.add("popup_active");
  }

  //кнопка дать согласие
  btnConfirm.addEventListener("click", () => {
    toggleStorage(true);
    popup.classList.remove("popup_active");
    console.log("Loading...");
  });

  //кнопка отмены
  btnCancel.addEventListener("click", () => {
    toggleStorage(false);
    popup.classList.remove("popup_active");
  });
});
