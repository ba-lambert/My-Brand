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
function formValidation(){
    var fullname = document.formValidate.fname.value;
    var email = document.formValidate.email.value;
    var message = document.formValidate.message.value;
    var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    var regName = /\d+$/g;	
    if (fullname == "" || regName.test(fullname)) {
        window.alert("Please enter the names");
        fullname.focus();
        return false;
    }
    if (email == "" || !regEmail.test(email)) {
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }
    if (message == ""|| regName.test(message)) {
        alert("Please enter valid message.");
        message.focus();
        return false;
    }
    return true;	
}
function validateComment(){
    var names= document.formValidate.names.value;
    var message = document.formValidate.message.value;
    if(names == "" || names.length<4){
        alert("please enter the name with more 5 characters");
        return false;
    }
    if(message == "" || message.length<4){
        alert("please enter the message with more 5 characters");
        return false;
    }
}
function popup(){
    document.getElementById("popup").style.display = "block";
}
/*----------------------------slider---------------------------*/
/*------------------==============add blog--------------------- */
function blogValidate(){
    var blogtitle= document.formValidate.title.value;
    var content = document.formValidate.content.value;
    if(blogtitle == "" || blogtitle.length<4){
        alert("Enter the title of your blog");
        return false;
    }
    if(content == "" || content.length<4){
        alert("please enter the content of your blog");
        return false;
    }
    console.log(blogtitle)
}