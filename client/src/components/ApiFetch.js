const API_IP = "http://129.146.60.126";
const API_PORT = 5000;

async function postTo(clientData, path) {

  /*
  clientData is a json object.

  Example:
    const clientData = {
        name: "Saitama",
        time: "now",
        location: "here",
        magnet: torrent.magnetURI,
    };
  */
  
  const options = {
    method: "POST",
    body: JSON.stringify(clientData),
    headers: {
      "Content-Type": "application/json"
    },
  };

  let fetchRes = await fetch(API_IP + ":" + API_PORT + path, options);
  console.log(fetchRes);
  let datamsg = await fetchRes.json()
  console.log(datamsg);
  return datamsg;
}

export async function APIsend (clientData) {
  postTo (clientData, '/send');
}

export async function APIrecv (clientData) {
  var response;
  while (response['magnet']) {
    response = await postTo (clientData, '/recv');
    // if (response['magnet']) { break; }
  }
  console.log(response);
}
