const databody = document.querySelector('.hallbody');
const datahead = document.querySelector('.hallhead');

async function windowActions() { 
  const endpoint = '/api/dining';
  const request = await fetch(endpoint);
  const json = await request.json();
  const data = json["data"];

  keys = Object.keys(data[0]);
  let key_html = keys.map(key => {
    let name = key.split("_")[1];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return `
      <td>${name}</td>
    `;
  }).join('');

  const html = data.map(hall => { //.map creates an array with equal size but replaces the values with this
    return `         
      <tr>
        <th class="id">${hall.hall_id}</th>
        <td class = "name">${hall.hall_name}</td> 
        <td class="address">${hall.hall_address}</td>
      </tr>   
    `;  

  }).join('');

  
  databody.innerHTML = html;
  datahead.innerHTML = key_html;
  
};

window.onload = windowActions;