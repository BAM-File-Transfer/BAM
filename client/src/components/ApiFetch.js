const API_IP = "http://129.146.60.126";
const API_PORT = 5000;

// Helper Function
async function request(method, clientData, path) {
  const options = {
    method: method,
    body: JSON.stringify(clientData),
    headers: {
      "Content-Type": "application/json"
    },
  };

  let fetchRes = await fetch(API_IP + ":" + API_PORT + path, options);
  console.log(fetchRes);
  let datamsg = await fetchRes.json()
  return datamsg;
}

/*
clientData is a json object with the following fields:

Example:
  const clientData = {
      name: "Saitama",
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

export async function APIsend (clientData) {
  return request ("POST", clientData, '/send');
}

export async function APIrecv (clientData) {
  //TODO Make this retry a few times
  return request ("POST", clientData, '/recv');
}
