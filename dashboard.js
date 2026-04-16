let projects = JSON.parse(localStorage.getItem("projects")) || [];

function addProject(){

let name = document.getElementById("projectName").value.trim();

if(!name) return alert("اكتب اسم المشروع");

projects.push({
name,
contractors:[]
});

localStorage.setItem("projects", JSON.stringify(projects));

renderProjects();
}

function renderProjects(){

let container = document.getElementById("projects");
container.innerHTML = "";

projects.forEach((p,i)=>{

container.innerHTML += `
<div class="card">
<h3>${p.name}</h3>

<button onclick="openProject(${i})">فتح المشروع</button>
<button onclick="deleteProject(${i})">حذف</button>
</div>
`;
});
}

function openProject(i){

localStorage.setItem("currentProject", i);

// يوديك للنظام
window.location.href = "tool.html";
}

function deleteProject(i){

if(confirm("حذف المشروع؟")){
projects.splice(i,1);
localStorage.setItem("projects", JSON.stringify(projects));
renderProjects();
}
}

renderProjects();
