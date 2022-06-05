const generatorButton = document.querySelector('.generator__button');
const baseUrl = 'https://www.thecolorapi.com';
let colorsArray = [];

// Render the HTML for the color palette
function renderColors() {
   let html = '';
   colorsArray.forEach(color => {
      console.log(color);
      html += `
         <div class="generator__colorblock">
            <div class="generator__color" style="background-color: ${color};"></div>
            <div class="generator__colorcode">${color}</div>
         </div>
      `;
   });
   document.querySelector('.generator__palette').innerHTML = html;
   colorsArray = [];
}

// Call the API and get the palette for the input color
function getScheme() {
   const color = document.querySelector('.generator__colorpicker').value.substring(1);
   const mode = document.querySelector('.generator__mode').value;
   const endpoint = `/scheme?hex=${color}&mode=${mode}&format=json&count=5`;
   //let colorsArray = [];

   fetch(baseUrl + endpoint).then(res => res.json())
      .then(data => {
         //console.log(data.colors);
         data.colors.forEach(color => {
            colorsArray.push(color.hex.value);
         })
         renderColors();
      });
}

generatorButton.addEventListener('click', getScheme);