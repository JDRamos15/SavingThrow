const url = "http://localhost:8080/";

export const Server = {
    createUser()
};

//User
function createUser(data) {
   const req = {  
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:data
}
 return fetch(url + "create-account", req).then(receivedData => receivedData.json());
};

export default Server