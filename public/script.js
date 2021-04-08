const databody = document.querySelector('.body');
const datahead = document.querySelector('.header');

async function windowActions() { 
  const endpoint1 = '/api/meals';
  const endpoint2 = '/api/macros';
  const request = await fetch(endpoint1);
  const request2 = await fetch(endpoint2)
  const json = await request.json();
  const json2 = await request2.json();
  // const data = json["data"];

  keys = Object.keys(json[0]);
  keymeals = keys.slice(0, 2);
  console.log(keymeals)
  keys2 = Object.keys(json2[0]);
  keymacros = keys2.slice(1, 7);
  keymacros.push(keys2[8])
  console.log(keymacros)
  headerkeys = keymeals.concat(keymacros);
  console.log(headerkeys)
  let name;
  let key_html = headerkeys.map(key => {
    if (key.includes("_")) {
      const head = key.split("_");
      for (i = 0; i < 2; i++) { 
        head[i] = head[i].charAt(0).toUpperCase() + head[i].slice(1);
        name = head.join(" ");
        console.log(name)
      }
    } else {
      name = key.charAt(0).toUpperCase() + key.slice(1);
    }
    return `
      <td>${name}</td>
    `;
  }).join('');
  datahead.innerHTML = key_html;

  /*keys = Object.keys(json[0]);
  keys2 = Object.keys(json2[0]);
  console.log(keys)
    for (let i = 0; i < 2; i++) {
      let name = keys[i].split("_")[1];
      console.log(name)
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    for (let i = 1; i<)



      const keys_html = `
        <td>${name}</td>
      `;
      datahead.innerHTML = keys_html;
      console.log(keys_html)
    };*/

  const rows = [json, json2];
  rows.forEach(() => {
    for (let i = 0; i < json.length; i++) {
      lineitem = document.createElement('tr');
      const html = `
        <th class = "id">${json[i].meal_id}</th>
        <td class = "name">${json[i].meal_name}</td>
        <td class = "calories">${json2[i].calories}</td>
        <td class = "serving">${json2[i].serving_size}</td>
        <td class = "cholesterol">${json2[i].cholesterol}</td>
        <td class = "sodium">${json2[i].sodium}</td>
        <td class = "carbs">${json2[i].carbs}</td>
        <td class = "protein">${json2[i].protein}</td>
        <td class = "fat">${json2[i].fat}</td>
        `;
      console.log(html)
      lineitem.innerHTML = html;
      databody.append(lineitem);
    }
  });



  /*const html = data.map(hall => { //.map creates an array with equal size but replaces the values with this
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
  */
};

window.onload = windowActions;