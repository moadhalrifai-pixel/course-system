let projects = JSON.parse(localStorage.getItem("projects")) || [];

function addProject(){

let input = document.getElementById("projectName");
let name = input.value.trim();

if(!name){
alert("اكتب اسم المشروع");
return;
}

// منع تكرار
let exists = projects.find(p => p.name === name);
if(exists){
alert("المشروع موجود");
return;
}

projects.push({
name: name,
contractors: []
});

localStorage.setItem("projects", JSON.stringify(projects));

input.value = "";

renderProjects();
}

function renderProjects(){

let container = document.getElementById("projects");

if(!container) return;

let html = "";

projects.forEach((p,i)=>{

html += `
<div class="card">
<h3>${p.name}</h3>

<button onclick="openProject(${i})">فتح المشروع</button>
<button onclick="deleteProject(${i})">حذف</button>
</div>
`;
});

container.innerHTML = html;
}

function openProject(i){

localStorage.setItem("currentProject", i);

window.location.href = "tool.html";
}

function deleteProject(i){

if(confirm("حذف المشروع؟")){
projects.splice(i,1);
localStorage.setItem("projects", JSON.stringify(projects));
renderProjects();
}
}

// تشغيل
renderProjects();
