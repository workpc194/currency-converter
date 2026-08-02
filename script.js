// Base URL of API
let baseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Selecting HTML Elements
let dropdown = document.querySelectorAll("#dropdown");
let formSel = document.querySelector(".from select");
let toSel = document.querySelector(".to select");
let btn = document.querySelector("button");

// Function for Updating Flag
function updateFlag(element){
    crrCode = element.value;
    let img = element.parentElement.querySelector("img");
    img.src = `https://flagsapi.com/${countryList[crrCode]}/flat/64.png`;
}

// Loop for Selecting DropDowns
for(select of dropdown){
    // Loop For Creating Options in DropDown
    for(crrCode in countryList){
        let options = document.createElement("option");
        select.append(options);
        options.innerText = crrCode;
        options.value = crrCode;
        if(select.name === "from" && options.value === "USD"){
            options.selected = true;
        } else if(select.name === "to" && options.value === "PKR"){
            options.selected = true;
        }
    }
    // Calling Function of UpdateFlag via Event Listener 
    select.addEventListener("change", (evnt)=>{
        updateFlag(evnt.target);
    })
}

// Event Listener on Button For Performing Tasks
btn.addEventListener("click", async(evnt)=>{
    // Preventing Page for Refreshing
    evnt.preventDefault();
    let inp = document.querySelector("input");
    // Changing The Value of input into from safing it from negative or null values
    if(inp.value <= 0 || inp.value === ""){
        inp.value = 1;
    }
    // Converting Input Value into Number
    Number(inp.value);
    // Updating The Base URL of API 
    let url = `${baseUrl}/${formSel.value.toLowerCase()}.json`;
    // Calling The API
    let response = await fetch(url);
    // Converting result (output) into json Form
    let result = await response.json();
    // Getting The Conversion Rate of our selected Currency from Object
    let rate = result[formSel.value.toLowerCase()][toSel.value.toLowerCase()];
    let final = inp.value * rate;
    // Displaying The Final Output on Page 
    let msg = document.querySelector("h3");
    msg.innerText = `${inp.value} ${formSel.value} = ${final} ${toSel.value}`;
});