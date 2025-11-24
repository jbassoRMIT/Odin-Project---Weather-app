const weatherResults=document.querySelector(".weatherResults");
const form=document.querySelector("form");
const citySearch=document.querySelector("#city");

const key="Q4ZEAHEY26Q25F7A4ZP6YLT6H"

//Write function to remove child nodes from parent
const removeChilden=function(parent){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
}

//write function to  fetch weather data and display to console
const fetchWeather= async function(city){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=Q4ZEAHEY26Q25F7A4ZP6YLT6H&contentType=json`);
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

    //display data as a list
    const listHeader=document.createElement("p");
    listHeader.textContent=`The weather today in ${address} is:`;
    const list=document.createElement("ul");
    const conditionList=document.createElement("li");
    conditionList.textContent=`Conditions: ${conditions}`;
    const tempList=document.createElement("li");
    tempList.textContent=`Temp: ${temp}`;
    const minTempList=document.createElement("li");
    minTempList.textContent=`Min temp: ${minTemp}`;
    const maxTempList=document.createElement("li");
    maxTempList.textContent=`Max temp: ${maxTemp}`;

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
    fetchWeather(city);
})

