import { sleep } from "../util/sleep";

const API_IP = "https://bambam.app";

// Generic API request helper function
async function request(method, clientData, path) {
  const options = {
    method: method,
    body: JSON.stringify(clientData),
    headers: {
      "Content-Type": "application/json"
    },
  };

  let fetchRes = await fetch(API_IP + path, options);
  console.log(fetchRes);
  let datamsg = await fetchRes.json()
  return datamsg;
}

// Concise wrapper around hasOwnProperty
function hasProperty (obj, prop) {
  // https://simplernerd.com/fix-error-do-not-access-object-prototype-method-hasownproperty/
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/*
clientData is a json object with the following fields:

Example:
  const clientData = {
      name: "Sender",
      magnetLink: torrent.magnetURI,
      coordinates: [longitude, lattitude],
      date: Date.now(),
  };

Schema: See "models/Sender.js" for the most up-to-date MongoDB schema.
The types that the MongoDB database is expecting are...
  name:         String
  magnetLink:   String
  coordinates:  [Number]    // Array of numbers
  date:         Date
*/

/**
 * Called by the Sender
 * @param {*} clientData JSON of data needed to be stored in the database
 * @returns API server response. Also JSON.
 */
export async function APIsend (clientData) {
  return request ("POST", clientData, '/send');
}

/**
 * Called by the Receiver. Tries to find a matching Sender.
 * @param {*} clientData JSON of data needed to be stored in the database
 * @returns API server response. Also JSON.
 */
export async function APIrecv (clientData) {
  let response = await request ("POST", clientData, '/recv');
  let retriesLeft = 5
  while (retriesLeft-- > 0 && !hasProperty(response, "magnetLink")) {
    await sleep(500);  // 500 = half a second
    response = await request ("POST", clientData, '/recv');
  }
  return response;
}
