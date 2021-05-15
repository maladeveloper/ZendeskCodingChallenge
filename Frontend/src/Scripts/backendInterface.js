const BASE_URL = 'https://zendesk-challenge-backend.azurewebsites.net/'
//const BASE_URL = "http://127.0.0.1:3001/"

//Vars
const joiner = "&";



export var backendWebVars = {

    GET_TICKS:{
        method:"GET",
        URL: (argObject) => BASE_URL + "tickets?ticketNums="+ argObject.ticketNums + (argObject.afterUrl ? joiner + "afterUrl=" + argObject.afterUrl : "") 
    },
    
}

export var webFuncInteraction = (backendWebVar, argObject) =>{

    return new Promise((resolve)=>{

        //Make a fetch request for the data
        fetch(backendWebVar.URL(argObject)).then(response => response.json()).then(data => 
            
            //Now resolve with the data that was returned 
            resolve(data)
        
        //If the api refuses to get data.
        ).catch((error) =>{
            
            resolve(false)
        })
        
        ;
    })
}