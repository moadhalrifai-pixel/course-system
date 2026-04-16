let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentProjectIndex = localStorage.getItem("currentProject");

let contractors = [];

if(currentProjectIndex !== null && projects[currentProjectIndex]){
contractors = projects[currentProjectIndex].contractors;
}
let editIndex = -1;

// 📞 تواصل
function contact(){
alert("📞 للتواصل: 99999999");
}

// 🎬 الدروس
function loadLessons(){
const container = document.getElementById("lessons");
if(!container) return;

let html = "";

for(let i=1;i<=5;i++){
html += `<a href="lesson${i}.html" class="btn">🎬 الدرس ${i}</a>`;
}

html += `<a href="tool.html" class="btn">📊 النظام</a>`;

container.innerHTML = html;
}

// حفظ
function save(){
projects[currentProjectIndex].contractors = contractors;
localStorage.setItem("projects", JSON.stringify(projects));
let name = document.getElementById("name").value.trim();
let price = parseFloat(document.getElementById("price").value);
let clarity = +document.getElementById("clarity").value;
let org = +document.getElementById("org").value;
let team = +document.getElementById("team").value;

if(!name || !price) return alert("كمل البيانات");

let exists = contractors.find(c=>c.name===name && editIndex===-1);
if(exists) return alert("موجود");

let score = clarity + org + team;
let c = {name, price, clarity, org, team, score};

if(editIndex>-1){
contractors[editIndex]=c;
editIndex=-1;
}else{
contractors.push(c);
}

localStorage.setItem("contractors", JSON.stringify(contractors));

clearForm();
render();
}

// عرض
function render(){

let list = document.getElementById("list");
if(!list) return;

let html="";

contractors.forEach((c,i)=>{
html += `
<div class="item">
${c.name} - ${c.price}
<br>
<button onclick="edit(${i})">تعديل</button>
<button onclick="removeItem(${i})">حذف</button>
</div>`;
});

list.innerHTML = html;
}

// تعديل
function edit(i){
let c = contractors[i];
document.getElementById("name").value = c.name;
document.getElementById("price").value = c.price;
editIndex = i;
window.scrollTo({top:0,behavior:"smooth"});
}

// حذف
function removeItem(i){
if(confirm("حذف؟")){
contractors.splice(i,1);
localStorage.setItem("contractors", JSON.stringify(contractors));
render();
}
}

// تنظيف
function clearForm(){
document.getElementById("name").value="";
document.getElementById("price").value="";
}

// قرار
function decide(){
if(contractors.length===0) return;

let best = contractors[0];
document.getElementById("decision").innerHTML = `🏆 ${best.name}`;
}

// تشغيل
render();
loadLessons();
