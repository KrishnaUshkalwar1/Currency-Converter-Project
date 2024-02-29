const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll(".drop-down-container select");
let btn = document.getElementById("formButton");
let fromCountry = document.querySelector(".from select");
let toCountry = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;
    if (select.name === "from" && country === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && country === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];

  let newFlagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newFlagUrl;
};

const updateMsg = async () => {
  let amountEl = document.querySelector("form input");
  let amountVal = amountEl.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amountEl.value = "1";
  }

  const URL = `${BASE_URL}/${fromCountry.value.toLowerCase()}/${toCountry.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCountry.value.toLowerCase()];

  let totalAmount = amountVal * rate;

  msg.innerText = `${amountVal}${fromCountry.value} = ${totalAmount}${toCountry.value}`;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  updateMsg();
});

window.addEventListener("load", () => {
  updateMsg();
});
