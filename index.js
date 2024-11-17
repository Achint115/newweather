let city = document.querySelector(".inp");
let search = document.querySelector(".search");
let state = document.querySelector(".st");
let degree = document.querySelector(".degree");
let humidity = document.querySelector(".hum");
let wind = document.querySelector(".win");
let mainImg = document.querySelector(".mainimg");

// OpenWeatherMap API key (you need to replace this with your own API key)
const apiKey = 'c03be43c41fba8d2178ffe0b77e97b55';

// Fetch weather data and update UI
async function checkWeather(city) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod !== 200) {
            // Handle city not found or other errors
            alert('City not found, please try again.');
            return;
        }

        // Update DOM elements with weather data
        state.textContent = weatherData.name; // City name
        degree.textContent = `${weatherData.main.temp}°C`; // Temperature
        humidity.innerHTML = `${weatherData.main.humidity}% <br>Humidity`; // Humidity
        wind.innerHTML = `${weatherData.wind.speed} Km/h <br> Wind`; // Wind speed

        // Weather icon (OpenWeather provides an icon code that can be used to fetch the image)
        const iconCode = weatherData.weather[0].icon;
        mainImg.src = `http://openweathermap.org/img/wn/${iconCode}.png`; // Use icon code to set the image

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching the weather data. Please try again later.');
    }
}

// Event listener for the search button
search.addEventListener("click", () => {
    const cityName = city.value.trim();
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert('Please enter a city name.');
    }
});

// Optional: Allow pressing Enter to trigger the search
city.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const cityName = city.value.trim();
        if (cityName) {
            checkWeather(cityName);
        } else {
            alert('Please enter a city name.');
        }
    }
});
