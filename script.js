const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=';
const apiKey = 'f916b73de9msh5608eff72ffc351p16fe19jsnd5acf64679d2';

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const toggleBtn = document.querySelector('.toggle-btn');
const nav = document.querySelector('nav');

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    // Save theme preference to local storage
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    // Update navigation bar background color based on theme
    if (theme === 'dark') {
        nav.style.backgroundColor = '#333'; // Dark mode background color
    } else {
        nav.style.backgroundColor = '#f0f0f0'; // Light mode background color
    }
}

// Check saved theme preference and apply
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme + '-mode');
    if (currentTheme === 'dark') {
        nav.style.backgroundColor = '#333'; // Set initial dark mode background color
    }
}

async function fetchWeather(city) {
	const apiUrl = url + encodeURIComponent(city); // Concatenate city name to API URL

	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': apiKey,
			'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(apiUrl, options);
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error('Network response was not ok: ' + response.statusText + '\n' + errorText);
		}
		const data = await response.json(); // Parse JSON response

		const tempKelvin = data.main.temp;
		const tempCelsius = tempKelvin - 273.15;

		// Update DOM elements with weather data
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML = tempCelsius.toFixed(0) + "°C";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h"; // Changed unit to meters per second
       
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "./images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "./images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "./images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "./images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "./images/mist.png";
        }
        document.querySelector(".weather").style.display="block";

	} catch (error) {
		console.error('Fetch error: ', error);
        document.querySelector(".error").style.display = "block"; // Display error message
		document.querySelector(".weather").style.display = "none";
	}
}
searchBtn.addEventListener("click", function(){
    fetchWeather(searchBox.value);
})
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchWeather(searchBox.value);
    }
});

