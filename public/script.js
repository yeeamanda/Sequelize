async function windowActions(){
    const endpoint = '/api/dining';
    const request = await fetch(endpoint);
    const json = await request.json();
    res.json(json);
};

window.onload = windowActions;