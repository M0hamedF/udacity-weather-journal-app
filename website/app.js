/* Nigth Mode */
night = 1;
mood = 1;
const darkMode = () => {
  var element = document.body;
  element.classList.toggle("dark_mode");
  if (night == 1 && mood == 1) {
    document.getElementById("nightMode").src = "img/half-moon.png";
/*     document.getElementById("feel").innerHTML = "How are you Feeling Today π?";
 */    night = 0
    mood = 0
  }
  else {
    document.getElementById("nightMode").src = "img/sun.png";
/*     document.getElementById("feel").innerHTML = "How are you Feeling Tonight π?";
 */    mood = 1
    night = 1
  }
}
/* language */
languagee = 1
const langchange = () => {
  if (languagee == 1) {
    document.getElementById("lang").src = "img/united-kingdom.png";
    document.getElementById("zipp").innerHTML = "μ°νΈ λ²νΈ";
    document.getElementById("feel").innerHTML = "μ€λ κΈ°λΆμ΄ μ΄λ π?";
    document.getElementById("generate").innerHTML = "μμ±νλ€";
    document.getElementById("recent").innerHTML = "κ°μ₯ μ΅κ·Ό ν­λͺ©";
    languagee = 0
  } else {
    document.getElementById("lang").src = "img/south-korea.png";
    document.getElementById("zipp").innerHTML = "Zip Code";
    document.getElementById("feel").innerHTML = "How are you Feeling Tonight π?";
    document.getElementById("generate").innerHTML = "Generate";
    document.getElementById("recent").innerHTML = "Most Recent Entry";
    languagee = 1
  }
}
/* Global Variables */
const apiKey = 'a7ba244ca3a09737f4266e1d33c3c617';
const baseURL1 = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const baseURL2 = ',us&units=metric&appid=a7ba244ca3a09737f4266e1d33c3c617';
const zipCode = document.querySelector("#zip");
const feeling = document.querySelector("#feeling");
const myBtn = document.querySelector("#generate");
const date = document.querySelector("#date");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");
const feelling = document.querySelector("#feelling");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}
/*  */
async function weather() {
  const currentZip = zipCode.value;
  const requestUrl = `${baseURL1}${currentZip}${baseURL2}`;
  /*  */
  if (currentZip.length > 5 || currentZip.length < 5) {
    console.log("Require 5 digits")
    alert("Require 5 digits");
  } else {
    console.log(requestUrl);
  }
  //change data from json to js
  const res = await fetch(requestUrl);
  const data = await res.json();
  const mytemp = data.main.temp;
  const mycity = data.name;
  const newData = { temp: mytemp, feeling: feeling.value, date: newDate, city: mycity };
  const res1 = await postData('/postData', newData);
  await updateUI();
}
  /* post data to html */
async function updateUI() {
  const res = await fetch('/getData');
  const data = await res.json();
  temp.innerHTML = (data.temp + " Β°C");
  date.innerHTML = newDate;
  city.innerHTML = data.city;
  feelling.innerHTML= ("You are feeling " + feeling.value + " !!");
};
/* event listener */
myBtn.addEventListener("click", weather);
