const url = 'https://api.openweathermap.org/data/2.5/weather';
const apikey = '7ccaee86d4d787a41defea4cecc2e4ac';

$(document).ready(function () {
    // Page load hotay hi default city ka weather dikhao (Alert se bachne ke liye)
    weatherFn('Lahore'); 

    // Search button click event
    $('#city-input-btn').on('click', function () {
        let cityName = $('#city-input').val().trim();
        weatherFn(cityName);
    });

    // Enter key support
    $('#city-input').keypress(function (e) {
        if (e.which == 13) {
            $('#city-input-btn').click();
        }
    });
});

async function weatherFn(cName) {
    if (!cName) {
        alert("Please Enter a City Name! 😊");
        return;
    }

    const tempUrl = `${url}?q=${cName}&appid=${apikey}&units=metric`;

    try {
        const res = await fetch(tempUrl);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again. ❌');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    // 1. Basic Info Update
    $('#city-name').text(`${data.name}, ${data.sys.country}`);
    $('#date').text(moment().format("MMM Do YYYY, h:mm:ss a"));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').text(`Wind Speed: ${data.wind.speed} m/s`);

    // 2. Icon Update
    const icon = data.weather[0].icon;
    $('#weather-icon').attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);

    // 3. DYNAMIC BACKGROUND LOGIC (The Pro Touch)
    const mainWeather = data.weather[0].main;
    const body = $('body');

    // Purani weather classes remove karein
    body.removeClass('sunny-bg rainy-bg cloudy-bg');

    if (mainWeather === "Clear") {
        body.css('background', 'linear-gradient(45deg, #00b4db, #0083b0)'); // Sunny Blue
    } else if (mainWeather === "Rain" || mainWeather === "Drizzle") {
        body.css('background', 'linear-gradient(45deg, #2c3e50, #4ca1af)'); // Rainy Grey/Blue
    } else if (mainWeather === "Clouds") {
        body.css('background', 'linear-gradient(45deg, #bdc3c7, #2c3e50)'); // Cloudy Grey
    } else {
        // Default gradient (jo tumne CSS mein likha hai)
        body.css('background', 'linear-gradient(45deg, #001F3F, #006F7A, #003C57)');
    }

    // 4. Show with Animation
    $('#weather-info').fadeIn().addClass('animate__animated animate__zoomIn');
}
