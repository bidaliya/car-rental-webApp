    let db = null;

    const request = indexedDB.open('CRM', 1);
        
        request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
        };

        request.onsuccess = (event) => {
        // add implementation here
        db = event.target.result;
        };

        request.onupgradeneeded = (event) => {
        const database = event.target.result;

        //userStore ->
        let Userstore = database.createObjectStore('Users', {keyPath: "email" });

        Userstore.createIndex('email', 'email', {unique: false});
        Userstore.createIndex('password', 'password', {unique: true});
        Userstore.createIndex('name', 'name', {unique: false});
        Userstore.createIndex('phone', 'phone', {unique: false});

        // Car store ->
        let carStore = database.createObjectStore('Cars', {keyPath: "carNumber" });

        carStore.createIndex("carName", "carName", { unique: false });
        carStore.createIndex("carRent", "carRent", { unique: false });
        carStore.createIndex("carNumber","carNumber", { unique:true });
        // on all stores created successfully
        console.log("Db is created");
    };



            
        // let currentUserNameIndex = currentUserNameStore.createIndex('currentUserName','currentUserName',{
        //     unique:false
        // });
  
        // create an index on the email property
        // let NameIndex = store.createIndex('name', 'name', {
        //   unique: false
        // });
        
        // let PhoneIndex = store.createIndex('phone', 'phone', {
        //   unique: false
        // });
                
    
        // Create an index to search cars by name. We may have duplicates
        // so we can't use a unique index.