let contractors = JSON.parse(localStorage.getItem("contractors")) || [];
let editIndex = -1;

function save(){

let name = document.getElementById("name").value.trim();
let price = parseFloat(document.getElementById("price").value);
let clarity = parseInt(document.getElementById("clarity").value);
let org = parseInt(document.getElementById("org").value);
let team = parseInt(document.getElementById("team").value);

// تحقق
if(!name || isNaN(price) || isNaN(clarity) || isNaN(org) || isNaN(team)){
alert("⚠️ تأكد من إدخال كل البيانات");
return;
}

let score = clarity + org + team;

let contractor = {name, price, clarity, org, team, score};

// تعديل
if(editIndex > -1){
contractors[editIndex] = contractor;
editIndex = -1;
}
else{
// إضافة
contractors.push(contractor);
}

localStorage.setItem("contractors", JSON.stringify(contractors));

clearForm();
render();
}

function render(){

let list = document.getElementById("list");
list.innerHTML = "";

if(contractors.length === 0) return;

// حساب القيمة
contractors.forEach(c=>{
c.priceNum = parseFloat(c.price);
c.value = c.score / c.priceNum;
});

// ترتيب
contractors.sort((a,b)=>b.value - a.value);

let bestValue = contractors[0].value;

contractors.forEach((c,i)=>{

let tag="", cls="";

if(c.score < 8){
tag="Risk";
cls="risk";
}
else if(c.value < bestValue * 0.7){
tag="Overpriced";
cls="over";
}
else{
tag="Smart Choice";
cls="smart";
}

list.innerHTML += `
<div class="item">
<b>${c.name}</b><br>
Score: ${c.score}<br>
السعر: ${c.price}<br>

<span class="tag ${cls}">${tag}</span>

<br><br>

<button onclick="edit(${i})">✏️ تعديل</button>
<button onclick="removeItem(${i})">🗑 حذف</button>

</div>
`;
});
}

function edit(i){

let c = contractors[i];

document.getElementById("name").value = c.name;
document.getElementById("price").value = c.price;
document.getElementById("clarity").value = c.clarity;
document.getElementById("org").value = c.org;
document.getElementById("team").value = c.team;

editIndex = i;
}

function removeItem(i){

if(confirm("متأكد من الحذف؟")){
contractors.splice(i,1);
localStorage.setItem("contractors", JSON.stringify(contractors));
render();
}
}

function clearForm(){
document.getElementById("name").value = "";
document.getElementById("price").value = "";
document.getElementById("clarity").value = "";
document.getElementById("org").value = "";
document.getElementById("team").value = "";
}

function decide(){

if(contractors.length === 0){
document.getElementById("decision").innerHTML = "❌ ما عندك بيانات";
return;
}

contractors.sort((a,b)=>b.value - a.value);

let best = contractors[0];

document.getElementById("decision").innerHTML =
`🏆 الأفضل: ${best.name}`;
}

render();
