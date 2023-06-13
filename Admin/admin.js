const form = document.getElementById('form');
const carName = document.getElementById('carNameInput');
const carNumber = document.getElementById('carNumberInput');
const carRent = document.getElementById('carRentInput');
const carPicInput = document.getElementById('picOfCar');
var carPicInputResult = null;

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    const car = {
        carName:  carName.value.trim(),
        carNumber: carNumber.value.trim(), 
        carRent: carRent.value.trim(),
        carPic: String(carPicInputResult)
    };
    insertCar(car);
    
});


function insertCar(car) {
    console.log("inside car");
    console.log(car);
    
    // The first argument in db.transaction() is a list of object stores that the transaction will span.
    const insertTxn = db.transaction('Cars', "readwrite"); 
    const carStore = insertTxn.objectStore('Cars');
    const query = carStore.add(car);
    query.onsuccess = function(event){
        // event.target.result -> will return the key of the car which is added in the Db.
        alert(`${event.target.result} is successfully added`)
        console.log(event.target.result);
        window.location.href = "/home.html";
    }
    query.onerror = function (event) {
        console.log(event.target.errorCode);
    }
}

carPicInput.addEventListener('change', function(e) {
    var file = carPicInput.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            // fileDisplayArea.innerHTML = "";
            var img = new Image();
            carPicInputResult = reader.result;
            console.log(carPicInputResult);
            // fileDisplayArea.appendChild(img);

        }
        reader.readAsDataURL(file);	
    } else {
        console.log("File not supported!");
    }
});












