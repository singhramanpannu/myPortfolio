document.addEventListener("DOMContentLoaded",()=>{

const toggle=document.getElementById("theme-toggle");
toggle.onclick=()=>document.body.classList.toggle("dark");

/* ACTIVE NAV */

const sections=document.querySelectorAll("section");
const navLinks=document.querySelectorAll(".nav-link");

window.onscroll=()=>{
let current="";

sections.forEach(sec=>{
const top=window.scrollY;
const offset=sec.offsetTop-150;
const height=sec.offsetHeight;

if(top>=offset && top<offset+height){
current=sec.getAttribute("id");
}
});

navLinks.forEach(link=>{
link.classList.remove("active");
if(link.getAttribute("href")==="#"+current){
link.classList.add("active");
}
});
};

/* REVEAL */

const reveals=document.querySelectorAll(".reveal");

function reveal(){
reveals.forEach(el=>{
const windowHeight=window.innerHeight;
const revealTop=el.getBoundingClientRect().top;
if(revealTop<windowHeight-100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",reveal);
reveal();

});