const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');

var isUsernameValid = false;
var isEmailValid = false;
var isPhoneValid = false;
var isPasswordValid = false;
var isCPasswordValid = false;

const emailPattern = /^[A-Za-z._]{3,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


// const route = (event)=>{
//     event = event || window.event;
//     event.preventDefault();
//     console.log('before');
//     console.log(event.target.href);
//     window.history.pushState({}, "", event.target.href);
//     console.log("after");
//     handelLocation();
// }

// const routes = {
//     404:"",
//     "/login":"/login-signup/login2.html",
//     "/signUp":"/login-signup/form.html"
// }

// const handelLocation = async()=>{
//     const path = window.location.pathname;
//     const route = routes[path] || routes[404];
//     const html = await fetch(route).then((data)=> data.text());

//     document.getElementById("main-page").innerHTML = html;
// }
// window.onpopstate = handelLocation;
// window.route = route;
// handelLocation();




form.addEventListener('submit', (event)=>{
    event.preventDefault();
    if(validate()){
        alert("Mubarak ho");
        const user = {
            name:  username.value.trim(),
            email: email.value.trim(), 
            phone: phone.value.trim(),
            pass:  password.value.trim(),
            totalBooking:[]   // will store the car that has been booked by the user.

        }
        alert(`${username.value.trim()} is successfully registered`)
        insertUser(user);
        window.location.href = "/login-signup/login2.html";
    }
    else{
        alert("Dhyan se dekh kuch reh gya hay")
    }
})

function insertUser(user){
    const txn = db.transaction('Users', 'readwrite'); // txn = transaction, Users -> store
  
      // get the Contacts object store
      const store = txn.objectStore('Users'); // The 1st parameter is the name of the table inside the IndexDb
      
      let query = store.add(user);

      // handle success case
      query.onsuccess = function (event) {
          console.log(event);
      };
  
      // handle the error case
      query.onerror = function (event) {
          console.log(event.target.errorCode);
      }

  }

// function onFocus(target) {
//     console.log(target);
//     if(target.value.length ===0 ){
//         setErrorMsg(target, 'Field cannot be blank');
//     }
// }

// onfocus="onFocus(this)"
username.onfocus = ()=>{
    console.log("usrname focus");
    if(username.value.length ===0 ){
        setErrorMsg(username, 'Field cannot be blank');
    }
    else if(username.value.length <= 2){
        setErrorMsg(username, 'Username min 3 char');
    }
    else{
        setSuccessMsg(username);
    }
}
username.onblur = ()=>{
    console.log("username onblur");
    const formControl = username.parentElement;
    if(username.value.trim() ===""){
        formControl.className = "form-control";
    }
    else if(username.value.length <= 2){
        formControl.className = "form-control error";
    }
    else{
        formControl.className = "form-control success";
    }
    
    console.log(formControl);
}
username.addEventListener("input", (event)=>{
    console.log("username eventlistener");
    if(username.value.trim() ===""){
        isUsernameValid = true;
        setErrorMsg(username, 'Filed cannot be blank');
    }
    else if(username.value.length <= 2){
        isUsernameValid = false;
        setErrorMsg(username, 'Username min 3 char');
    }
    else{
        isUsernameValid = true;
        setSuccessMsg(username);
    }
})

// for email

email.onfocus = ()=>{
    console.log("email onfocus");
    if(email.value.length ===0 ){
        setErrorMsg(email, 'Field cannot be blank');
    }
    else if(!isEmail(email.value.trim())){
        setErrorMsg(email, 'Not a valid email');
    }
    else{
        setSuccessMsg(email);
    }
}
email.onblur = ()=>{
    const formControl = email.parentElement;
    if(email.value.trim() ===""){
        formControl.className = "form-control";
    }
    else if(!isEmail(email.value.trim())){
        formControl.className = "form-control error";
    }
    else{
        formControl.className = "form-control success";
    }
    console.log("email onblur");
}
email.addEventListener("input", (event)=>{
    console.log("email addeventListener");
    if(email.value.trim() ===""){
        isEmailValid = false;
        setErrorMsg(email, 'Filed cannot be blank');
    }
    else if(!isEmail(email.value.trim())){
        isEmailValid = false;
        setErrorMsg(email, 'Not a valid email');
    }
    else{
        isEmailValid = true;
        setSuccessMsg(email);
    }
})

// for phone number

phone.onfocus = ()=>{
    console.log("phone onfocus");
    if(phone.value.length ===0 ){
        setErrorMsg(phone, 'Field cannot be blank');
    }
    else if(phone.value.length !=10){
        setErrorMsg(phone, 'Not a valid phone');
    }
    else{
        setSuccessMsg(phone);
    }
}
phone.onblur = ()=>{
    const formControl = phone.parentElement;
    if(phone.value.trim() ===""){
        formControl.className = "form-control"
    }
    else if(phone.value.length !=10){
        formControl.className = "form-control error";
    }
    else{
        formControl.className = "form-control success";
    }
    console.log("phone onblur");
}
phone.addEventListener("input", (event)=>{
    console.log("phone addeventListener");
    if(phone.value.trim() ===""){
        isPhoneValid = false;
        setErrorMsg(phone, 'Filed cannot be blank');
    }
    else if(phone.value.length !=10){
        isPhoneValid = false;
        setErrorMsg(phone, 'Not a valid phone');
    }
    else{
        isPhoneValid = true;
        setSuccessMsg(phone);
    }
})


// password validation 

password.onfocus = ()=>{
    const formControl = password.parentElement;
    var allP = [...formControl.querySelectorAll('p')]
    allP.forEach((p)=>{
        p.classList.remove("hidden")
    })
    if(validPass(password)){
        formControl.className = "form-control success"
    }
    else{
        formControl.className = "form-control error";
    }
}

password.onblur = ()=>{
    const formControl = password.parentElement;
     if(validPass(password)){
        formControl.className = "form-control success";
        var allP = [...formControl.querySelectorAll('p')]
        allP.forEach((p)=>{
        p.classList.add("hidden")
    })
    }
    else{
        formControl.className = "form-control error";
    }
    console.log("phone onblur");

}
password.addEventListener("input", (event)=>{
    console.log("inside pass Eventlistener")
    const formControl = password.parentElement;
    if(validPass(password)){
        isPasswordValid = true;
        console.log("valid pass")
        setSuccessMsg(password)
        // formControl.className = "form-control success"
    }
    else{
        isPasswordValid = false;
        console.log("invalid pass")
        formControl.className = "form-control error";
    }
})


// confirm Password validation

cpassword.onfocus = ()=>{
    const formControl = cpassword.parentElement;
    
    if(cpassword.value==""){
        setErrorMsg(cpassword, "Field Cannot blank")
    }

    else if(password.value == cpassword.value){
        setSuccessMsg(cpassword)
    }
    else{
        setErrorMsg(cpassword, "Password doesn't Match")
    }
}

cpassword.onblur = ()=>{
    const formControl = cpassword.parentElement;
    if(cpassword.value==""){
        formControl.className = "form-control"
    }
    else if(password.value == cpassword.value){
        formControl.className = "form-control success";
    }
    else{
        formControl.className = "form-control error";
    }
}
cpassword.addEventListener("input", (event)=>{
    console.log("inside cpass Eventlistener")
    
    if(cpassword.value==""){
        isCPasswordValid = false;
        setErrorMsg(cpassword, "Field Cannot blank")
    }
    else if(password.value == cpassword.value){
        isCPasswordValid = true;
        setSuccessMsg(cpassword)
    }
    else{
        isCPasswordValid = false;
        setErrorMsg(cpassword, "Password doesn't Match")
    }
})

const validate = ()=>{
    console.log("inside validate")
    return isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isCPasswordValid

}

function setErrorMsg(input, errorMsg) {
    console.log(`Inside setErrorMsg: - ${errorMsg}`)
    console.log(input);
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.style.display = `block`
    small.innerText = errorMsg;

    // So if there is any error, we have to add a "error" class dynamically into the form-control, so that the error i tags get visible.
    // formControl.classList.add("error");
    formControl.className = "form-control error";
}

function setSuccessMsg(input){
    const formControl = input.parentElement;
    formControl.classList.remove("error")
    formControl.classList.add("success");
    const small = formControl.querySelector('small');
    small.style.display = `none`
}

const isEmail = (emailVal)=>{
    // if(emailPattern.test(emailVal)){
    //     return true;
    // }
    // return false;
    return true;
}

const validPass = (password) =>{

    const eightDigitVal = document.getElementById("eightDigitPassValidation");
    let isEight = false;

    const AteastOneLetterVal = document.getElementById("AteastOneLetterPassValidation");
    let atLeastOne = false;

    const AteastOneNumPassVal = document.getElementById("AteastOneNumPassValidation");
    let atLeastOneNumber = false;

    if(password.value.length<8){
        eightDigitVal.classList.remove("validPass")
        eightDigitVal.classList.add("invalidPass")
    }
    else{
        isEight = true;
        eightDigitVal.classList.remove("invalidPass")
        eightDigitVal.classList.add("validPass")
    }

    if(/[a-zA-Z]/.test(password.value.trim())){
        atLeastOne = true;
        AteastOneLetterVal.classList.remove("invalidPass")
        AteastOneLetterVal.classList.add("validPass")
    }
    else{
        AteastOneLetterVal.classList.remove("validPass")
        AteastOneLetterVal.classList.add("invalidPass")
    }
    if(/[0-9]/.test(password.value.trim())){
        atLeastOneNumber = true;
        AteastOneNumPassVal.classList.remove("invalidPass")
        AteastOneNumPassVal.classList.add("validPass")
    }
    else{
        AteastOneNumPassVal.classList.remove("validPass")
        AteastOneNumPassVal.classList.add("invalidPass")
    }
    return (isEight && atLeastOne && atLeastOneNumber)
}






























