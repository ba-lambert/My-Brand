const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click",()=>{
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

const blogcontainer = [...document.querySelectorAll('.blog-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

blogcontainer.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})