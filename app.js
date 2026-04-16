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

// 🔥 منع التكرار
let exists = contractors.find(c => c.name === name && editIndex === -1);
if(exists){
alert("⚠️ هذا المقاول مضاف مسبقًا");
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

contractors.forEach(c=>{
c.priceNum = parseFloat(c.price);
c.value = c.score / c.priceNum;
});

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

// 🔥 تحسين UX
window.scrollTo({top:0, behavior:"smooth"});
document.getElementById("name").focus();

document.querySelector("button").innerText = "💾 تحديث المقاول";
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

document.querySelector("button").innerText = "إضافة";
}

function decide(){

if(contractors.length === 0){
document.getElementById("decision").innerHTML = "❌ ما عندك بيانات";
return;
}

contractors.sort((a,b)=>b.value - a.value);

let best = contractors[0];

let avgPrice = contractors.reduce((s,c)=>s + c.priceNum,0)/contractors.length;

let msg = `
🏆 الأفضل: <b>${best.name}</b><br><br>
Score: ${best.score}<br>
السعر: ${best.price}<br>
Value: ${best.value.toFixed(5)}<br><br>
`;

if(best.score >= 12 && best.price <= avgPrice){
msg += "🔥 اختيار ذكي: جودة عالية + سعر مناسب<br>";
}
else if(best.score >= 12 && best.price > avgPrice){
msg += "⚠️ جودة ممتازة لكن سعره أعلى من السوق<br>";
}
else if(best.score < 8){
msg += "❌ مخاطرة: تقييمه ضعيف<br>";
}
else{
msg += "📊 خيار متوسط يحتاج مقارنة إضافية<br>";
}

let cheapest = contractors.reduce((a,b)=>a.priceNum < b.priceNum ? a : b);

msg += `<br>💡 الأرخص: ${cheapest.name}`;

document.getElementById("decision").innerHTML = msg;
}

render();
