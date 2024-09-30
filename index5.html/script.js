const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Function to fetch weather data by latitude and longitude
function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error:', error));
}

// Function to get user's location and fetch weather
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(lat, lon);
            },
            error => alert("Geolocation is not supported by this browser or permission denied.")
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to fetch weather data by city name
function getWeatherByCity() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error:', error));
    } else {
        alert("Please enter a city name.");
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    
    if (data.cod !== 200) {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const { name, main, weather, wind } = data;
    const temp = main.temp;
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    weatherDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${temp}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}
