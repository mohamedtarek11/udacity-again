// Creating a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();
 const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
 const apiKey=",&appid=478fd5fab13a7bcbeda796a67ea4a3ca&units=metric"
// the URL of the server to post data
// showing the error to the user
const verificate = document.getElementById("verificate");
let generate=document.getElementById("generate")
generate.onclick = () => { 
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  // getWeatherData return promise
  getData(zip).then((data) => {
    //making sure from the received data to execute rest of the steps
    if (data) {
      let tempp=data.main.temp
      let namecit=data.name  
      let weathercit=data.weather[0].description
      const info = {
        newDate,
        namecit,
        tempp, 
        weathercit,
        feelings,
      };
      postData("/add", info);
      updatingUI();    
    }
  });
};
//Function to GET Web API Data
const getData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();
    console.log(data);
    if (data.cod != 200) {
      verificate.innerHTML = data.message;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Function to POST data
const postData = async (url = "", info = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  try {
    const newData = await res.json();
    // console.log(`You just saved`, newData);
    return newData;
  } catch (error) {
    console.log(error);
  }
};
//Function to GET Project Data
// and updating UI by this data
const updatingUI = async () => {
  const res = await fetch( "/all");///server +
  try {
    const returnData = await res.json();
    console.log(returnData);
    console.log(returnData.newData);
    document.getElementById("date").innerHTML =returnData.newDate
    document.getElementById("namecit").innerHTML = returnData.namecit
    document.getElementById("tagtemp").innerHTML = returnData.tempp;
    document.getElementById("contentdec").innerHTML = returnData.weathercit;
    document.getElementById("feeling").innerHTML = returnData.feelings;
  } catch (error) {
    console.log(error);
  }
};
