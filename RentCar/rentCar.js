const form = document.getElementById('form');
const userName = document.getElementById('userNameInput');
const userAddress = document.getElementById('userAddressInput');
const rentDateTime = document.getElementById('dateOfInput');
const rentDuration = document.getElementById('durationInput');



var carNumberList = JSON.parse(localStorage.getItem("rentedCar") || "[]");
console.log(carNumberList);

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // console.log(rentCar.carNumber);

    //get the car from the db using carNumber

    const txn = db.transaction('Cars', 'readonly');
    const store = txn.objectStore('Cars');
    // query by keyPath
    let query = store.get(carNumberList[carNumberList.length - 1]);
    
    query.onsuccess = (event) => {
        console.log(event.target.result); // result objects
        let carBooked = event.target.result;
        
        const rentCar = {
            carBooked: carBooked,
            userName:  userName.value.trim(),
            userAddress: userAddress.value.trim(), 
            rentDateTime: rentDateTime.value.trim(),
            rentDuration: rentDuration.value.trim()
        };

        console.log(rentCar);

        let currentUserEmail = JSON.parse(localStorage.getItem("currentUserEmail") || "[]");
        console.log(currentUserEmail[currentUserEmail.length - 1 ]);
        
        let txn = db.transaction('Users', 'readwrite'); // txn = transaction, Users -> store
  
        // get the Users object store
        let store = txn.objectStore('Users'); // The 1st parameter is the name of the table inside the IndexDb

        // set the query to get the current logged in user 
        let query = store.get(currentUserEmail[currentUserEmail.length - 1 ]);

        query.onsuccess = (event)=>{
            console.log(event.target.result);

            // get the current logged in user from the query result.
            let user = query.result;

            // push the car that has been rented by the user in the total booking
            user.totalBooking.push(rentCar);
            console.log(rentCar);
            
            // now put back the updated user in the store
            let updateQuery = store.put(user);
            updateQuery.onsuccess = function(event){
                alert(`${event.target.result} Update Succesfully`);
                // window.location.href = "/home.html";
            }
            updateQuery.onerror = function(event){
                console.log(event.target.errorCode);
            }
        }
        
    };

    query.onerror = (event) => {
        console.log(event.target.errorCode);
    }
    
    
});




