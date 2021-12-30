//Hämtar globala element från html dokumentet
const key = 'cd9c64a6a3f44627ae7ee9891dfd8605';
const searchButton = $('#searchButton')[0];
const cityName = $('#nameOfCity')[0];
const fiveDaySearch = $('#fiveDaySearch')[0];
const animationDiv = $('#animationDiv')[0];
animationDiv.style.display = 'none';
let isSearchable = true;

//skapande utav vänteanimation
let animation = anime({
    targets: '#animationDiv',
    translateX: 175,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });

//Vid klick på länken tas eventuella element bort och hämtar vädret för 5dagar samt startar min animation
fiveDaySearch.addEventListener('click', function(){
    deleteItems();
    getWeatherForcast(cityName.value, key);
    animationDiv.style.display = "inline-block";
    fiveDaySearch.style.display = 'none';
    searchButton.style.display = 'none';
})

//funktionen som hämtar vädret för 5dagar och avslutar animationen
function getWeatherForcast(cityName, key){
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${key}&lang=sv`;
    fetch(url).then(
        function(response){
            console.log('response Forcast:', response);
            return response.json();
        }
    ).then(
        function(data){
            console.log('Data:', data);
            for(let i = 1; i<6; i++){
                const weatherData = data.data[i];
                displayWeatherForcast(weatherData.weather.icon, weatherData.valid_date, weatherData.weather.description, weatherData.temp);
            }
            animationDiv.style.display = 'none';
            fiveDaySearch.style.display = 'inline-block';
            searchButton.style.display = 'inline-block';
        }
    ).catch(
        function (error){
            console.log(error);
            alert('Staden hittades inte, försök gärna igen.');
            animationDiv.style.display = 'none';
            fiveDaySearch.style.display = 'inline-block';
            searchButton.style.display = 'inline-block';
        }
    )
}

//Vid klick på knappen tas eventuella element bort och hämtar vädret för det nuvarande vädret samt startar animationen
searchButton.addEventListener('click', function(event){
    deleteItems();
    getCurrentWeather(cityName.value, key);
    console.log(cityName.value)
    animationDiv.style.display = "inline-block";
    fiveDaySearch.style.display = 'none';
    searchButton.style.display = 'none';
    isSearchable = false;
    event.preventDefault();

})


//funktionen som hämtar vädret som finns just nu och avslutar animationen
function getCurrentWeather(cityName, key){
    //If-satsen är till för att undvika spam-tryck på enter
    if(isSearchable){
            const url = `https://api.weatherbit.io/v2.0/current?count=5&city=${cityName}&key=${key}&lang=sv`;
        fetch(url).then(
            function(response){
                console.log('response:', response);
                return response.json();
            }
        ).then(
            function(data){
                console.log('Data:', data);
                const weatherData = data.data[0];
                displayCurrentWeather(weatherData.weather.icon, weatherData.weather.description, weatherData.temp, weatherData.rh, weatherData.wind_spd);
                animationDiv.style.display = 'none';
                fiveDaySearch.style.display = 'inline-block';
                searchButton.style.display = 'inline-block';
                isSearchable = true;
            }
        ).catch(
            function (error){
                console.log(error);
                
                alert('Staden hittades inte, försök gärna igen.');
                animationDiv.style.display = 'none';
                fiveDaySearch.style.display = 'inline-block';
                searchButton.style.display = 'inline-block';
            }
        )
    } else {
        console.log('För många serveranrop, inväntar svar')
    }
    
}

//funktionen som förvarar datan som kommit i sökningen i rätt divar och med texten i paragrafer
function displayCurrentWeather(_icon, _description, _temp, _rh, _wind){
    const informationDiv = $('#informationDiv')[0];
    informationDiv.style.padding = '1rem';
    informationDiv.style.border = 'solid 3px white';

    let weatherIcon = document.createElement('img');
    informationDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);
    weatherIcon.classList.add("weatherIcon");


    let description = document.createElement('p');
    informationDiv.appendChild(description);
    description.innerText= _description;
    console.log(_description);

    let temp = document.createElement('p');
    informationDiv.appendChild(temp);
    temp.innerText= 'Temp: '+ _temp +'°C';
    //If satsen bestämmer bakgrundsfärgen på de olika rutorna beroende på temperatur
    if(_temp <= 5){
        $("#informationDiv")[0].style.backgroundColor = "lightskyblue";
    } else if(_temp <= 15){
        $("#informationDiv")[0].style.backgroundColor = "orange";
    } else if(_temp > 15){
        $("#informationDiv")[0].style.backgroundColor = "red";
    }
    console.log(_temp);

    let humidity = document.createElement('p');
    informationDiv.appendChild(humidity);
    humidity.innerText='Luftfuktighet: '+ _rh;
    console.log(_rh);

    let wind = document.createElement('p');
    informationDiv.appendChild(wind);
    wind.innerText='Vindhastighet: '+ _wind+'m/s';
    console.log(_wind);
}

//funktionen som förvarar datan som kommit i sökningen i rätt divar och med texten i paragrafer
//Här används även en for-loop för att få tillräckligt många rutor med rätt information
function displayWeatherForcast(_icon, _currentDate, _description, _temp){

    const informationDiv = $('#informationDiv')[0];
    informationDiv.style.padding = '0rem';
    informationDiv.style.border = 'none';
    
    let backGroundDiv = document.createElement('div');
    backGroundDiv.className = 'forecastDiv';
    informationDiv.appendChild(backGroundDiv);
    backGroundDiv.style.padding = '1rem';
    backGroundDiv.style.border = 'solid 3px white';
    informationDiv.style.backgroundColor = 'lightblue';
    let weatherIcon = document.createElement('img');
    backGroundDiv.appendChild(weatherIcon);
    weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${_icon}.png`;
    console.log(weatherIcon);
    weatherIcon.classList.add("weatherIcon");

    let currentDate = document.createElement('p');
    backGroundDiv.appendChild(currentDate);
    currentDate.innerText= _currentDate;
    console.log(_currentDate);

    let description = document.createElement('p');
    backGroundDiv.appendChild(description);
    description.innerText= _description;
    console.log(_description);

    let temp = document.createElement('p');
    backGroundDiv.appendChild(temp);
    temp.innerText='Temp: '+ _temp +'°C';
    //If satsen bestämmer bakgrundsfärgen på de olika rutorna beroende på temperatur
    if(_temp <= 5){
        backGroundDiv.style.backgroundColor = "lightskyblue";
    } else if(_temp <= 15){
        backGroundDiv.style.backgroundColor = "orange";
    } else if(_temp > 15){
        backGroundDiv.style.backgroundColor = "red";
    }
    console.log(_temp);

}

//funktionen som tar bort alla element
function deleteItems(){
    const allElements = $('p');
    const allImgElements = $('img');
    const allDivElements = $('.forecastDiv');
    for(let i = 0; i<allElements.length; i++){
        const pElement = allElements[i];
        console.log('element: ', pElement);
        pElement.remove();
    }
    for(let i = 0; i<allImgElements.length; i++){
        const imgElement = allImgElements[i];
        console.log('elementImg: ', imgElement);
        imgElement.remove();
    }
    for(let i = 0; i<allDivElements.length; i++){
        const divElement = allDivElements[i];
        console.log('elementImg: ', divElement);
        divElement.remove();
    }
    
}
