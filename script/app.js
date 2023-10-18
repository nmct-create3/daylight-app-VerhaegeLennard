let sunrise;
let sunset;
let htmlLocation = document.querySelector('.js-location');
let htmlSunrise = document.querySelector('.js-sunrise');
let htmlSunset = document.querySelector('.js-sunset');
let htmlTimeLeft = document.querySelector('.js-time-left');
let htmlSun = document.querySelector('.js-sun');
let intervalId;

// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = '0' + date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp (gebruiken we nu niet)
  // const seconds = '0' + date.getSeconds();

  // Will display time in 10:30(:23) format
  return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie
const updateSun = (leftOffset, bottemOffset) => {
  htmlSun.style.left = `${leftOffset}%`
  htmlSun.style.bottom = `${bottemOffset}%`

  htmlSun.setAttribute(
    'data-time',
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  )
}

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (amountOfDay) => {
  console.log(new Date(amountOfDay - 3600000));
  // In de functie moeten we eerst wat zaken ophalen en berekenen.
  // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
  // Bepaal het aantal minuten dat de zon al op is.
  const timeLeft = new Date(new Date(sunset) - new Date() - 3600000);
  htmlTimeLeft.innerHTML = `${timeLeft.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`
  // Nu zetten we de zon op de initiÃ«le goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
  let today = new Date();
  let totalMinutes = amountOfDay.getHours() * 60 + amountOfDay.getMinutes();
  let minutesUp = today.getHours() * 60 + today.getMinutes() - (sunrise.getHours() * 60 + sunrise.getMinutes())

  let percentage = (100 / totalMinutes) * minutesUp, 
    sunLeft = percentage,
    sunBottom = percentage < 50 ? percentage * 2 : (100 - percentage) * 2;
    updateSun(sunLeft, sunBottom);

  console.log(new Date(new Date(sunset) - new Date() - 3600000) / amountOfDay);
  // We voegen ook de 'is-loaded' class toe aan de body-tag.
  // Vergeet niet om het resterende aantal minuten in te vullen.
  // Nu maken we een functie die de zon elke minuut zal updaten
  intervalId =  setInterval(()=>{
    today = new Date()
    minutesUp++

    let percentage = (100 / totalMinutes) * minutesUp, 
      sunLeft = percentage,
      sunBottom = percentage < 50 ? percentage * 2 : (100 - percentage) * 2;
    updateSun(sunLeft, sunBottom);

    if (percentage >= 100) clearInterval(intervalId);
  }, 60 * 1000)
  // Bekijk of de zon niet nog onder of reeds onder is
  // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
  // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  stad = queryResponse.city.name;
  land = queryResponse.city.country;
  console.log(stad, land);
  htmlLocation.innerHTML = `${stad}, ${land}`;
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  sunrise = new Date(queryResponse.city.sunrise * 1000 - queryResponse.city.timezone);
  sunset = new Date(queryResponse.city.sunset * 1000 - queryResponse.city.timezone);
  console.log(sunrise.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }));
  console.log(sunset.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }));

  htmlSunrise.innerHTML = `${sunrise.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;
  htmlSunset.innerHTML = `${sunset.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' })}`;
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.

  // tijdTussen = sunset.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' }) - sunrise.toLocaleTimeString({ hour: '2-digit', minute: '2-digit' });
  // tijdTussen = Date(tijdTussen);
  // console.log(tijdTussen);

  placeSunAndStartMoving(new Date(sunset - sunrise));
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
  const weatherInfo = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=nl&cnt=1`).then((response) => response.json());

  console.log(weatherInfo);

  showResult(weatherInfo);

  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  // Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener('DOMContentLoaded', function () {
  // 1 We will query the API with longitude and latitude.
  console.log('Laden');
  getAPI(50.8027841, 3.26493);
});
