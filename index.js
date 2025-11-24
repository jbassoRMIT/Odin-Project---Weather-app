const weatherResults=document.querySelector(".weatherResults");
const form=document.querySelector("form");
const citySearch=document.querySelector("#city");
const unitChoice=document.querySelector("#units");
const toggleUnits=document.querySelector(".toggleUnits");

const key="Q4ZEAHEY26Q25F7A4ZP6YLT6H"

//Write function to remove child nodes from parent
const removeChilden=function(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
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
    const temp=results.days[0].temp;
    const minTemp=results.days[0].tempmin;
    const maxTemp=results.days[0].tempmax;
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
    removeChilden(toggleUnits);

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
}

//add event listener to form
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const city=citySearch.value;
    let units=unitChoice.value;
    fetchWeather(city,units);

    //add button to toggleUnits div, allowing user to toggle units
    const toggleUnitsButton =document.createElement("button");
    toggleUnitsButton.textContent="toggle Units";
    toggleUnits.appendChild(toggleUnitsButton);

    //add event listener to the button
    toggleUnitsButton.addEventListener("click",()=>{
        removeChilden(toggleUnits);
        if(units=="celcius"){
            units="fahrenheit";
        }
        else{
            units="celcius";
        }
        fetchWeather(city,units);
    })
})



