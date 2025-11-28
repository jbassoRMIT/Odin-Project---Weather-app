const weatherResults=document.querySelector(".weatherResults");
const form=document.querySelector("form");
const citySearch=document.querySelector("#city");
const unitChoice=document.querySelector("#units");
const toggleUnits=document.querySelector(".toggleUnits");
const gif=document.querySelector(".giphDisplay img");
const movies=document.querySelector(".movieDisplay");
const movieForm=document.querySelector("#movieSearchForm");
const movieTitle=document.querySelector("#movie");

const key="Q4ZEAHEY26Q25F7A4ZP6YLT6H"

//Write function to remove child nodes from parent
const removeChilden=function(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
}

//write function to convert celcius to fahrenheit and vice versa
const celciusToF=function(degrees){
    return (degrees*1.8+32);
}

const fahrenheitToC=function(degrees){
    return ((degrees-32)/1.8);
}

//write function to  fetch weather data and display to console
const fetchWeather= async function(city,units){
    let response="";
    let degreeUnits="";
    if(units=="celcius"){
        response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=Q4ZEAHEY26Q25F7A4ZP6YLT6H&contentType=json`);
        degreeUnits="℃"
    }
    else if(units=="fahrenheit"){
        response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=us&include=days&key=Q4ZEAHEY26Q25F7A4ZP6YLT6H&contentType=json`);
        degreeUnits="℉"
    }
 
    const results=await response.json();
    console.log(results);
    const address=city;
    const conditions=results.days[0].conditions;
    let temp=results.days[0].temp;
    let minTemp=results.days[0].tempmin;
    let maxTemp=results.days[0].tempmax;
    const icon=results.days[0].icon;

    if(temp<10){
        weatherResults.className="weatherResults cold";
    }
    else if(temp<20){
        weatherResults.className="weatherResults mild";
    } else{
        weatherResults.className="weatherResults warm";
    }

    //clear contents of weatherDisplay
    removeChilden(weatherResults);

    //display data as a list
    const listHeader=document.createElement("p");
    listHeader.textContent=`The weather today in ${address} is:`;
    const list=document.createElement("ul");
    const conditionList=document.createElement("li");
    conditionList.textContent=`Conditions: ${conditions}`;
    const tempList=document.createElement("li");
    tempList.textContent=`Temp: ${temp} ${degreeUnits}`;
    const minTempList=document.createElement("li");
    minTempList.textContent=`Min temp: ${minTemp} ${degreeUnits}`;
    const maxTempList=document.createElement("li");
    maxTempList.textContent=`Max temp: ${maxTemp} ${degreeUnits}`;

    weatherResults.appendChild(listHeader);
    weatherResults.appendChild(list);
    list.appendChild(conditionList);
    list.appendChild(tempList);
    list.appendChild(minTempList);
    list.appendChild(maxTempList);

    //add a section to display icon
    const iconDisplay=document.createElement("img");
    iconDisplay.className="weatherIcon";
    iconDisplay.src=`./Icons/${icon}.svg`;
    weatherResults.appendChild(iconDisplay);

    //run getGif, using icon as input
    getGif(icon);
}

//write function to get gif from giphy
const getGif= async function(searchTerm){
    const response=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=lSaPK1xtdipOD5FBO6qLflCfev5umows&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    const results=await response.json();
    console.log(results);
    const randomIndex=Math.floor(Math.random()*25);
    console.log(randomIndex);
    const url=results.data[randomIndex].images.original.url;
    gif.src=url;
}

//add event listener to form
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    removeChilden(toggleUnits);
    const city=citySearch.value;
    let units=unitChoice.value;
    fetchWeather(city,units);
    

    //add button to toggleUnits div, allowing user to toggle units
    const toggleUnitsButton =document.createElement("button");
    toggleUnitsButton.textContent="toggle Units";
    toggleUnits.appendChild(toggleUnitsButton);

    //add event listener to the button
    toggleUnitsButton.addEventListener("click",()=>{
        if(units=="celcius"){
            units="fahrenheit";
            // degreeUnits="℃";
            // temp=celciusToF(temp);
            // minTemp=celciusToF(minTemp);
            // maxTemp=celciusToF(maxTemp);
            // tempList.textContent=`Temp: ${temp} ${degreeUnits}`;
            // minTempList.textContent=`Min temp: ${minTemp} ${degreeUnits}`;
            // maxTempList.textContent=`Min temp: ${maxTemp} ${degreeUnits}`;
        }
        else{
            units="celcius";
            // degreeUnits="℃";
            // temp=fahrenheitToC(temp);
            // minTemp=fahrenheitToC(minTemp);
            // maxTemp=fahrenheitToC(maxTemp);
            // tempList.textContent=`Temp: ${temp} ${degreeUnits}`;
            // minTempList.textContent=`Min temp: ${minTemp} ${degreeUnits}`;
            // maxTempList.textContent=`Min temp: ${maxTemp} ${degreeUnits}`;
        }
        fetchWeather(city,units);
    })
})

//write a function to fetch movie data
const getMovie=async function(title) {
    const response=await fetch(`https://www.omdbapi.com/?apikey=7bf6fa45&t=${title}`);
    const results=await response.json();
    const keys=Object.keys(results);
    console.log(results);

    //clear the movies div
    removeChilden(movies);

    //create a table and fill with row headers for each info type
    const table=document.createElement("table");
    movies.appendChild(table);
    const rowHeaders=document.createElement("tr");
    table.appendChild(rowHeaders);
    const rowInfo=document.createElement("tr");
    table.appendChild(rowInfo);


    for(let key of keys){
        const header=document.createElement("th");
        header.textContent=key;
        rowHeaders.appendChild(header);
        const info=document.createElement("td");
        info.textContent=results[key];
        rowInfo.appendChild(info);
    }

}

//add event listener for the movie search form
movieForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const movie=movieTitle.value;
    getMovie(movie);
})







