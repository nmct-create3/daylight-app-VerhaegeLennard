let sunrise;
let sunset;

let sunElement;
let sunriseElement;
let sunsetElement;
let timeLeftElement;

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
const updateSun = (timeLeftPercentage) => { }

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
	// remove the time difference from our current timezones
	console.log(new Date(amountOfDay - 3600000))
	// In de functie moeten we eerst wat zaken ophalen en berekenen.
	// Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
	// Bepaal het aantal minuten dat de zon al op is.
	timeLeftElement.innerHTML = `${new Date(
		amountOfDay - 3600000)
		.toLocaleDateString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
		}`

	// const totalMinutes = new Date(amountOfDay).getMinutes();
	// const minutesLeft = new Date(timeLeft).getMinutes();

	// Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
	console.log()
	// We voegen ook de 'is-loaded' class toe aan de body-tag.
	// Vergeet niet om het resterende aantal minuten in te vullen.
	// Nu maken we een functie die de zon elke minuut zal updaten
	// Bekijk of de zon niet nog onder of reeds onder is
	// Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
	// PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = queryResponse => {
	// We gaan eerst een paar onderdelen opvullen
	let locationElement = document.querySelector('js-location');
	console.log(queryResponse.city.name);
	console.log(queryResponse.city.country);
	// Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
	locationElement.innerHTML = `${queryResponse.city.name}, ${queryResponse.city.country}`;
	// Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
	sunriseElement.innerHTML = sunrise.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	sunsetElement.innerHTML = sunset.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})
	// Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
	// Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
	placeSunAndStartMoving(sunset - sunrise);
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
	// Eerst bouwen we onze url op
	// Met de fetch API proberen we de data op te halen.
	// Als dat gelukt is, gaan we naar onze showResult functie.
	const wheaterInfo = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=nl&cnt=1`).then((response) => response.json());
	console.info(wheaterInfo);
	showResult(wheaterInfo);

};

document.addEventListener('DOMContentLoaded', function () {
	// 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.26493);

	let sunElement = document.querySelector('.js-sun');
	let sunriseElement = document.querySelector('.js-sunrise');
	let sunsetElement = document.querySelector('.js-sunset');
	let timeLeftElement = document.querySelector('.js-time-left');
});
