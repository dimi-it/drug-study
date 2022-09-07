const APIURL = new URL('http://localhost:3001/api/');

async function getRandomDrugForGame(game) {
    return new Promise((resolve, reject) => {
        fetch(new URL(`drugs/game/${game}/`, APIURL), {
            method: 'GET'
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());
            } else {
                response.json()
                    .then((obj) => { reject(obj); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
}

const API = { getRandomDrugForGame }
export default API