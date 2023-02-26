const form = document.getElementById('form');
const usernameEmail = document.getElementById('usernameEmail');
const password = document.getElementById('password');

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
//     "/login-signup/login2.html":"/login-signup/login2.html",
//     "/login-signup/form.html":"/login-signup/form.html"
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
    console.log(usernameEmail.value.trim());
    const txn = db.transaction('Users', 'readonly');
    const store = txn.objectStore('Users');

    // get the index from the Object Store
    const index = store.index('email');
    // query by indexes
    let query = index.get(usernameEmail.value.trim());

    // return the result object on success
    query.onsuccess = (event) => {
        console.log(event.target.result); // result objects ( in this case a single object because the email is unique)
        let User = event.target.result;
        if(User.pass==password.value.trim()){
            alert(`${usernameEmail.value.trim()} is successfully LoggedIn`);
            var currentUserEmail = JSON.parse(localStorage.getItem("currentUserEmail") || "[]");
            currentUserEmail.push(usernameEmail.value.trim());
            localStorage.setItem("currentUserEmail", JSON.stringify(currentUserEmail));
            console.log("success");
            window.location.href = "/home.html";
        }
        else{
            alert("Password is incorrect");
        }
        
      };

      query.onerror = (event) => {
        console.log(event.target.errorCode);
    }

      
    
})

usernameEmail.onfocus = ()=>{
    console.log("usrname focus");
    if(usernameEmail.value.length ===0 ){
        setErrorMsg(usernameEmail, 'Field cannot be blank');
    }
    else if(usernameEmail.value.length <= 3){
        setErrorMsg(usernameEmail, 'Username min 3 char');
    }
    else{
        setSuccessMsg(usernameEmail);
    }

}
usernameEmail.onblur = ()=>{
    console.log("username onblur");
    const formControl = usernameEmail.parentElement;
    if(usernameEmail.value.trim() ===""){
        formControl.className = "form-control";
    }
    else if(usernameEmail.value.length <= 2){
        formControl.className = "form-control error";
    }
    else{
        formControl.className = "form-control success";
    }
    
    console.log(formControl);
}
usernameEmail.addEventListener("input", (event)=>{
    console.log("username eventlistener");
    if(usernameEmail.value.trim() ===""){
        isUsernameValid = true;
        setErrorMsg(usernameEmail, 'Field cannot be blank');
    }
    else if(usernameEmail.value.length <= 3){
        isUsernameValid = false;
        setErrorMsg(usernameEmail, 'Username min 3 char');
    }
    else{
        isUsernameValid = true;
        setSuccessMsg(usernameEmail);
    }
})

// password check 

password.onfocus = ()=>{
    console.log("password eventlistener");
    if(password.value.trim() ===""){
        setErrorMsg(password, 'Field cannot be blank');
    }
    else{
        setSuccessMsg(password);
    }
}

password.onblur = ()=>{
    console.log("password eventlistener");
    const formControl = password.parentElement;
    if(password.value.trim() ===""){
        formControl.className = "form-control";
    }
    else{
        formControl.className = "form-control success";
    } 
    console.log(formControl);

}
password.addEventListener("input", (event)=>{
    if(password.value.trim() ===""){
        setErrorMsg(password, 'Field cannot be blank');
    }
    else{
        setSuccessMsg(password);
    }
})


function setErrorMsg(input, errorMsg) {
    console.log(`Inside setErrorMsg: - ${errorMsg}`)
    console.log(input);
    const formControl = input.parentElement;
    const p = formControl.querySelector('p');
    p.style.display = `block`
    p.innerText = errorMsg;

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

function getUserByEmailUsername(email){
    

    // close the database connection
    // txn.oncomplete = function () {
    //     db.close();
    // };
}

















































//     /// <reference path = "/Users/tarunbidaliya/Downloads/angular-1.6.0/angular.min.js"/>


// // var myApp = angular.module("form2App",[]);


// var isFound = false;

// myApp.controller("loginController", function ($scope, $location, $rootScope) {

//     $scope.submit = ()=>{
//         let usernameEmail = $scope.login.nameEmail;
//         let password = $scope.login.password;

//         console.log(usernameEmail);
//         console.log(password);
//         // var users = JSON.parse(localStorage.getItem("users") || "[]");
        
//         // users.forEach(user => {
//         //     if((user.name === usernameEmail || user.email === usernameEmail) && user.pass === password){
//         //         isFound = true
//         //         alert(`Hello name = ${user.name} email = ${user.email}`);
//         //         $rootScope.isLoggedIn = true;
//         //         $rootScope.loggedInUsername = user.name;
//         //         window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
//         //         window.localStorage.setItem("loggedInUsername", $rootScope.loggedInUsername);
//         //         gotoHome()
//         //     }
//         // });
//         // if(!isFound){
//         //     $rootScope.isLoggedIn = false;
//         //     window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
//         //     alert("No User Found");
//         //     console.log("user not found");
//         //     // $scope.login.nameEmail = "";
//         //     // $scope.login.password = "";
//         //     gotoLogin()
//         // }

//         const txn = db.transaction('Users', 'readonly');
//         const store = txn.objectStore('User');
//         const index = store.index('email');
//         let query = index.get(usernameEmail);

//     }
//     var gotoLogin = ()=>{
//       $location.path('/signUp2')
//       console.log("clicked");
//     }
    
//     var gotoHome = ()=>{
//       $location.path('/home')
//     }

// });

// function getContactByEmail(db, email) {
//     const txn = db.transaction('Contacts', 'readonly');
//     const store = txn.objectStore('Contacts');

//     // get the index from the Object Store
//     const index = store.index('email');
//     // query by indexes
//     let query = index.get(email);

//     // return the result object on success
//     query.onsuccess = (event) => {
//         console.table(query.result); // result objects
//     };

//     query.onerror = (event) => {
//         console.log(event.target.errorCode);
//     }

//     // close the database connection
//     txn.oncomplete = function () {
//         db.close();
//     };
// }

