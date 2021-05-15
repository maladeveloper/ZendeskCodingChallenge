//Commented out URL is the one used when deploying this application.
//const BASE_URL = 'https://zendesk-challenge-backend.azurewebsites.net/'

const BASE_URL = "http://127.0.0.1:3001/"

////Vars
const joiner = "&";
///

/**
 * An object which makes it really easy to add GET requests, by just specifying
 * the the function to make the URL.
 * Very open to extension as to specify another GET request just requires adding 
 * another entry to this object.
 */
export var backendWebVars = {

    GET_TICKS:{
        URL: (argObject) => BASE_URL + "tickets?ticketNums="+ argObject.ticketNums + (argObject.afterUrl ? joiner + "afterUrl=" + argObject.afterUrl : "") 
    },
    
}

/**
 * Makes a GET request for the backend
 * @param {Object} backendWebVar : One of the values from the chosen key in "backendVars" variable. 
 * @param {Object} argObject     : The object that is passed into the "URL" key function and has extra info to create URL. 
 * @returns - A promise when once resolved returns the relavant data.
 */
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