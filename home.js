
var carsList = [];

setTimeout(() => {

// Get all the data
const transaction = db.transaction('Cars', 'readonly');
const objectStore = transaction.objectStore('Cars');

objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if(cursor) {
        // console.log(`${cursor.value}`);
        carsList.push(cursor.value);
        // console.log(event.target.keyPath);
        cursor.continue();
    }    
    else{
        console.log('Entries all displayed. or No car is present');
    }
    
}
//display the data
transaction.oncomplete = function(event){
    console.log(`${carsList.length}`);
    var parent = document.querySelector('.services-container');
    carsList.forEach(car => {
        let div = document.createElement('div');
        div.innerHTML = `<div class="box">
        <div class="box-img"><img src=${car.carPic} alt=""></div>
        <p>2017</p>
        <h3>${car.carName}</h3>
        <h2>$3000| ${car.carRent} <span>/month</span></h2>
        <a href="/RentCar/rentCar.html" class="btn" onclick="rent('${car.carNumber}')">Rent Now</a>
        </div>`;
    parent.appendChild(div); 
    
    });
}
}, 900);

function rent(rentedCarNumber) {
    // put the car number in the Local storage so that the rentCar.js can retrive from it.
    console.log(rentedCarNumber);
    var car = JSON.parse(localStorage.getItem("rentedCar") || "[]");
    car.push(rentedCarNumber)
    localStorage.setItem("rentedCar", JSON.stringify(car));
    console.log("Added Succesfully");
}




