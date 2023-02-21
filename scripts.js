const loginChecker = false
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

/*---------------------form validation--------------------*/

function validInputs(){
    const username = document.querySelector(".fname");
    const email = document.querySelector(".email");
    const message = document.querySelector(".message2");

    const usernamevalue = username.value.trim();
    const emailvalue = email.value.trim();
    const messagevalue = message.value.trim();
    console.log(usernamevalue);
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
    }else if(usernamevalue.length<2){
        setError(username,'your user name is too short');
    }
    else{
        setSuccess(username);
        username.value = "";
    }
    if(emailvalue === ""){
        setError(email, 'user email is required');
    }else if(!isValidEmail(emailvalue)){
        setError(email,'provide valid email address');
    }else{
        setSuccess(email);
        email.value = ""
    }
    if(messagevalue === ""){
        setError(message, 'user message is required');
    }else if(messagevalue.length <3){
        setError(message, 'your message is too short');
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
        setError(usernames, 'this field is required please!');
    }else if(usernamevalue.length<3){
        setError(usernames,'Your username is too short');
    }
    else{
        setSuccess(usernames);
    }
    if(messagevalue === "" || messagevalue.length <3){
        setError(message, 'user message is required');
    }else{
        setSuccess(message);
    }
    
    usernames.value = "";
    message.value =""
}
function popup1(){
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
        setError(blogtitle, 'title is required');
    }else{
        setSuccess(blogtitle);
    }
    if(messagevalue === ""){
        setError(content, 'message is required');
    }else{
        setSuccess(content);
    }
    
    blogtitle.value = "";
    content.value =""
    editor.html.set("");
}

/*-------------------------Local Storage -----------------------------*/


/*---------------------------------create comment/contactMe ---------------------*/
function contactMe12(){
    if(validInputs){}
    let Queries = JSON.parse(localStorage.getItem("message")|| "[]");
    var username = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message2").value;
    let data = {
        userNames :username,
        email : email,
        message :message,
    }
    console.log(data);
    Queries.push(data);
    // localStorage.setItem("message",JSON.stringify(Queries));
    var token = localStorage.getItem("tempUser")
    console.log(token);
    const dbData = {
        method :"POST",
        headers : {
            'Content-Type' : "application/json",
            'authorization': `Bearer ${token}`
        },
        body:JSON.stringify(data)
    }
    console.log(dbData);
    fetch('https://my-brand-production-05a1.up.railway.app/api/v1/messages',dbData)
    .then(async(res)=>{
        const data = await res.json()
        console.log(data);
    })
}

/*-------------------------------------------------------------------------------------------*/
function addBlog(){
    let Blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    var title = document.getElementById("titlee").value;
    var msg = document.getElementById("froala").value;
    var img = localStorage.getItem("tempImage")
    const data = {
        header : title,
        content : msg,
        comments : [],
        photo : img,
    }
    Blogs.push(data);
    localStorage.setItem("blogs",JSON.stringify(Blogs));
}
/*-------------------------------------comments-----------------------*/
function createComments(id){
    var names =document.getElementById("names").value;
    var message = document.getElementById("txtmessage").value;
    let Blogs = JSON.parse(localStorage.getItem("blogs"));
    

    const data = {
        name :names,
        msg :message
    }
    Blogs[id].comments.push(data)
    console.log(Blogs);
    localStorage.setItem("blogs",JSON.stringify(Blogs));
    
    
    
}
function loginValidate(){
    const blogtitle= document.getElementById("username");
    const content = document.getElementById("password");
    const usernamevalue = blogtitle.value.trim();
    const messagevalue = content.value.trim();
    console.log(messagevalue);

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
/*-----------------------------Auth ----------------------------------*/
function createUser(){
    let Users = JSON.parse(localStorage.getItem("users")|| "[]");
    var user = document.getElementById("username").value;
    var pass=document.getElementById("password").value;
    const data = {
        username : user,
        password : pass,
    }
    Users.push(data);
    localStorage.setItem("users",JSON.stringify(Users));
}
function signInUser(){
    alert("jdfkljdflk")
    let users = JSON.parse(localStorage.getItem("users"));
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    let data = {
        username :user,
        password :pass,
    }
    for(let i=0 ;i<=users.length ;i++){
        if((users[i].username ==user) && (users[i].password == pass)){
            
            // window.location.href ="./admin-panel.html";
            localStorage.setItem("tempUser",JSON.stringify(data));
        }else if((user == "admin") && (pass =="password")){
            
        }
    }
}

function userAuth (){
    if(loginValidate){
        signInUser();
    }else{
        console.log("user auth error")
    }
}

//admin pages 

function checkUser(){
    if(localStorage.getItem('tempUser')){
        loginChecker = true
    }
}
function checkAdmin(){
    if(localStorage.getItem('tempUser')){
        loginChecker =true
    }else{
        location.href='./index.html'
    }
}