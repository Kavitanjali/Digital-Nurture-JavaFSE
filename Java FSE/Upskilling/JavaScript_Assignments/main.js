console.log("Welcome to the Community Portal");

window.onload=function(){
alert("Community Portal Loaded");
};

const portalName="Community Events";

let events=[
{
name:"Music Night",
date:"2026-12-15",
category:"Music",
seats:20
},
{
name:"Baking Workshop",
date:"2026-11-20",
category:"Workshop",
seats:15
},
{
name:"Sports Meet",
date:"2026-10-05",
category:"Sports",
seats:10
}
];

class EventItem{
constructor(name,date,category,seats){
this.name=name;
this.date=date;
this.category=category;
this.seats=seats;
}
}

EventItem.prototype.checkAvailability=function(){
return this.seats>0;
};

function addEvent(eventObj){
events.push(eventObj);
}

function registerUser(eventName){

try{

let event=events.find(e=>e.name===eventName);

if(!event){
throw new Error("Event Not Found");
}

if(event.seats<=0){
throw new Error("No Seats Available");
}

event.seats--;

displayEvents();

}
catch(error){
console.log(error.message);
}
}

function filterEventsByCategory(category){

if(category==="All"){
return events;
}

return events.filter(
item=>item.category===category
);
}

function registrationCounter(){

let total=0;

return function(){
total++;
return total;
};

}

const countRegistration=
registrationCounter();

function displayEvents(list=events){

const container=
document.querySelector("#eventContainer");

container.innerHTML="";

list.forEach(event=>{

const card=
document.createElement("div");

card.className="card";

card.innerHTML=`
<h3>${event.name}</h3>
<p>${event.category}</p>
<p>Seats: ${event.seats}</p>
<button onclick="registerUser('${event.name}')">
Register
</button>
`;

container.appendChild(card);

});

}

displayEvents();

document
.querySelector("#categoryFilter")
.onchange=function(){

let filtered=
filterEventsByCategory(this.value);

displayEvents(filtered);

};

document
.querySelector("#searchBox")
.addEventListener("keydown",function(){

let text=
this.value.toLowerCase();

let result=
events.filter(
e=>e.name.toLowerCase().includes(text)
);

displayEvents(result);

});

const names=
events.map(
e=>"Workshop on "+e.name
);

console.log(names);

const musicEvents=
events.filter(
e=>e.category==="Music"
);

console.log(musicEvents);

events.push({
name:"Coding Camp",
date:"2026-09-01",
category:"Workshop",
seats:25
});

const copiedEvents=[...events];

console.log(copiedEvents);

const firstEvent=events[0];

const {
name,
date,
category
}=firstEvent;

console.log(name,date,category);

const form=
document.getElementById("registerForm");

form.addEventListener(
"submit",
function(event){

event.preventDefault();

let userName=
form.elements["name"].value;

let email=
form.elements["email"].value;

let selectedEvent=
form.elements["event"].value;

document
.getElementById("nameError")
.innerHTML="";

document
.getElementById("emailError")
.innerHTML="";

let valid=true;

if(userName===""){
document
.getElementById("nameError")
.innerHTML="Name Required";
valid=false;
}

if(email===""){
document
.getElementById("emailError")
.innerHTML="Email Required";
valid=false;
}

if(!valid){
return;
}

sendRegistration({
userName,
email,
selectedEvent
});

}
);

function sendRegistration(data){

document
.getElementById("message")
.innerHTML="Submitting...";

setTimeout(()=>{

fetch(
"https://jsonplaceholder.typicode.com/posts",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify(data)
}
)
.then(response=>response.json())
.then(result=>{

document
.getElementById("message")
.innerHTML=
"Registration Successful";

console.log(result);

})
.catch(()=>{

document
.getElementById("message")
.innerHTML=
"Registration Failed";

});

},1500);

}

async function loadEvents(){

try{

let response=
await fetch(
"https://jsonplaceholder.typicode.com/users"
);

let data=
await response.json();

console.log(data);

}
catch(error){

console.log(error);

}

}

loadEvents();