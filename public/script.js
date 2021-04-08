function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
 const test = getRandomIntInclusive(0,46);
 console.log(test)
const databody = document.querySelector('.body');
const datahead = document.querySelector('.header');

async function windowActions() { 
  const endpoint1 = '/api/meals';
  const endpoint2 = '/api/macros';
  const request = await fetch(endpoint1);
  const request2 = await fetch(endpoint2)
  const json = await request.json();
  const json2 = await request2.json();

  const keys = Object.keys(json[0]); // keys of meals array
  const keymeals = keys.slice(0, 2); // only grab the first two keys (into an array)
  const keys2 = Object.keys(json2[0]); // keys of macros array
  const keymacros = keys2.slice(1, 7); // only grab the keys 2-6 (into an array)
  keymacros.push(keys2[8]); // push the last key into the macros key array
  const headerkeys = keymeals.concat(keymacros); // concat the selected keys together into one array
  let name;

  let key_html = headerkeys.map(key => {
    if (key.includes("_")) { // if the key has an underscore
      const head = key.split("_"); // split it by the underscore, result is a list w each side
      for (i = 0; i < 2; i++) {  // for i = 0 and 1
        head[i] = head[i].charAt(0).toUpperCase() + head[i].slice(1); // uppercase each word
        name = head.join(" "); // join the words togehter (head = [Meal, Id])
      }
    } else {
      name = key.charAt(0).toUpperCase() + key.slice(1); // else, uppercase the word
    }
    return `
      <td>${name}</td> 
    `; // return the name in a td tag
  }).join(''); // convert it all to a string (from an array, result of map method)

  datahead.innerHTML = key_html;


    const mealIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selection = mealIndex.map((element) => {
      const random = getRandomIntInclusive(0, json.length - 1);
      lineitem = document.createElement('tr'); // create a new row for each iteration
      console.log()
      const html = `
        <th class = "id">${json[random].meal_id}</th>
        <td class = "name">${json[random].meal_name}</td>
        <td class = "calories">${json2[random].calories}</td>
        <td class = "serving">${json2[random].serving_size}</td>
        <td class = "cholesterol">${json2[random].cholesterol}</td>
        <td class = "sodium">${json2[random].sodium}</td>
        <td class = "carbs">${json2[random].carbs}</td>
        <td class = "protein">${json2[random].protein}</td>
        <td class = "fat">${json2[random].fat}</td>
        `;
      console.log(html)
      lineitem.innerHTML = html; // add html to the newly made row tag
      databody.append(lineitem); // add the row tag w html into the body
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