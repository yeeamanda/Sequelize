function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const databody = document.querySelector('.body');
const datahead = document.querySelector('.header');

async function windowActions() {
  const endpoint1 = '/api/meals';
  const endpoint2 = '/api/macros';
  const request = await fetch(endpoint1);
  const request2 = await fetch(endpoint2);
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
    `; 
  }).join(''); // convert it all to a string (from an array, result of map method)

  datahead.innerHTML = key_html;

  const indexList = [];
    const mealIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selection = mealIndex.map((element) => {
      const random = getRandomIntInclusive(0, json.length - 1);
      indexList.push(random);
      lineitem = document.createElement('tr'); // create a new row for each iteration
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
      lineitem.innerHTML = html; // add html to the newly made row tag
      databody.append(lineitem); // add the row tag w html into the body
   });
   

   // Beginning of chart information
  let CalorieData = [];
  let CholData = [];
  let SodiumData = [];
  let CarbData = [];
  let ProteinData = [];
  let FatData = [];
   
  const macroItems = indexList.reverse().map(i => {
    CalorieData.push({label: json[i].meal_name, y: json2[i].calories});
    CholData.push({label: json[i].meal_name, y: json2[i].cholesterol});
    SodiumData.push({label: json[i].meal_name, y: json2[i].sodium}); 
    CarbData.push({label: json[i].meal_name, y: json2[i].carbs});
    ProteinData.push({label: json[i].meal_name, y: json2[i].protein});
    FatData.push({label: json[i].meal_name, y: json2[i].fat});
  });


  let newchart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title:{
      text: "Meal Information"
    },
    axisX: {
      valueFormatString: "DDD",
      labelAutoFit: true,
      labelFontSize: 15
    },
    axisY: {
      labelFontSize: 15
    },
    toolTip: {
      shared: true
    },
    legend:{
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [{
      type: "stackedBar",
      name: "Calories",
      showInLegend: "true",
      dataPoints: CalorieData
    },
    {
      type: "stackedBar",
      name: "Cholesterol",
      showInLegend: "true",
      dataPoints: CholData
    },
    {
      type: "stackedBar",
      name: "Sodium",
      showInLegend: "true",
      dataPoints: SodiumData
    },
    {
      type: "stackedBar",
      name: "Carbs",
      showInLegend: "true",
      dataPoints: CarbData
    },
    {
      type: "stackedBar",
      name: "Protein",
      showInLegend: "true",
      dataPoints: ProteinData
    },
    {
      type: "stackedBar",
      name: "Fat",
      showInLegend: "true",
      dataPoints: FatData

    }]
  });
  newchart.render();

  function toggleDataSeries(e) {
    if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    newchart.render();
  }
}

window.onload = windowActions;