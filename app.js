// Getting elements ****************************
let input = document.getElementById("input");
let btn = document.getElementById("btn");
let conditionImage = document.getElementById("condition-img");
let mainImage = document.querySelector(".container-box");

// Dates methods ***************************
let today = new Date();
let date = today.getDate().toString().padStart(2, '0');
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let year = today.getFullYear();
let dates = document.getElementById("date");

// Api Configuration **********************************
const apiKey = "628985bb9ae78bc3ac2a1bb714d4e7d7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

let getData = (cityName, cb) => {
    fetch(`${apiUrl}?q=${cityName}&units=metric&appid=${apiKey}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((res) => cb(res))
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById("city").innerHTML = "Error fetching data. Please try again.";
        });
}

dates.innerHTML = `${date}-${month}-${year}`

// btn listener 
btn.addEventListener("click", () => {
    const cityName = input.value.trim();
    if (cityName) {
        getData(cityName, (data) => {
            if (data && data.name) {
                document.getElementById("weather").innerHTML = data.weather[0].main;
                document.getElementById("city").innerHTML = data.name;
                document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°C";
                document.getElementById("humidity").innerHTML = data.main.humidity + "%";
                document.getElementById("feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
                document.getElementById("wind").innerHTML = Math.round(data.wind.speed) + " km/h";

                // Weather Icon ************* 
                const weatherCondition = data.weather[0].main.toLowerCase();
                
                if (weatherCondition.includes("sunny") || weatherCondition.includes("clear")) {
                    conditionImage.src = "./assets/sun.png";
                    mainImage.style.backgroundImage = "url('./assets/clear.jpg')";

                } else if (weatherCondition.includes("clouds")) {
                    conditionImage.src = "./assets/cloud.png";
                    mainImage.style.backgroundImage = "url('./assets/cloudy.jpg')";

                } else if (weatherCondition.includes("rain")) {
                    conditionImage.src = "./assets/rainy.png";
                    mainImage.style.backgroundImage = "url('./assets/rainy-img.jpg')";

                } else if (weatherCondition.includes("haze")) {
                    conditionImage.src = "./assets/haze-icon.png";
                    mainImage.style.backgroundImage = "url('./assets/haze.jpg')";

                } else {
                    conditionImage.src = "./assets/default.png";
                    mainImage.style.backgroundImage = "url('./assets/default.jpg')";
                }
            } else {
                document.getElementById("city").innerHTML = "City not found. Please try again.";
            }
        });
    } else {
        document.getElementById("city").innerHTML = "Please enter a city name.";
    }
});
