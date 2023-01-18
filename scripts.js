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
// const form = document.getElementById("form");
// form.addEventListener("submit", e => {
//     e.preventDefault();
//     formValidation();
//   });


/*---------------------form validation--------------------*/

function validInputs(){
    const username = document.getElementById("fname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const usernamevalue = username.value.trim();
    const emailvalue = email.value.trim();
    const messagevalue = message.value.trim();

    const setError = (element,message) =>{
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
    const setSuccess = (element)=>{
        const inputControl =element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = "";
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if(usernamevalue === ""){
        setError(username, 'user names are required');
    }else{
        setSuccess(username);
        username.value = "";
    }
    if(emailvalue === ""){
        setError(email, 'user names are required');
    }else if(!isValidEmail(emailvalue)){
        setError(email,'provide valid email address');
    }else{
        setSuccess(email);
        email.value = ""
    }
    if(messagevalue === ""){
        setError(message, 'user message is required');
    }else{
        setSuccess(message);
        message.value = "";
    }
}

/*----------------------------------------------------------*/
function validateComment(){
    const usernames= document.getElementById("names");
    const message = document.getElementById("txtmessage");
    
    const usernamevalue = usernames.value.trim();
    const messagevalue = message.value.trim();

    const setError = (element,message) =>{
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
    const setSuccess = (element)=>{
        const inputControl =element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = "";
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
    if(usernamevalue === ""){
        setError(usernames, 'user names are required');
    }else{
        setSuccess(usernames);
    }
    if(messagevalue === ""){
        setError(message, 'user message is required');
    }else{
        setSuccess(message);
    }
    
    usernames.value = "";
    message.value =""
}
function popup(){
    document.getElementById("popup").style.display = "block";
}

/*----------------------------slider---------------------------*/
/*------------------==============add blog--------------------- */
function blogValidate(){
    const blogtitle= document.getElementById("titlee");
    const content = document.getElementById("froala");
    const usernamevalue = blogtitle.value.trim();
    const messagevalue = content.value.trim();

    const setError = (element,message) =>{
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
    const setSuccess = (element)=>{
        const inputControl =element.parentElement;
        const errorDisplay = inputControl.querySelector(".error");
        errorDisplay.innerText = "";
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
    if(usernamevalue === ""){
        setError(blogtitle, 'user names are required');
    }else{
        setSuccess(blogtitle);
    }
    if(messagevalue === ""){
        setError(content, 'user message is required');
    }else{
        setSuccess(content);
    }
    
    blogtitle.value = "";
    content.value =""
}