const generatorButton = document.querySelector('.generator__button');
const colorPicker = document.querySelector('.generator__colorpicker');

const baseUrl = 'https://www.thecolorapi.com';
let colorsArray = [];
const hexArray = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Get random hexadecimal color
function getRandomHex() {
   let hex = '';
   for (let i = 0; i < 6; i++) {
      hex += hexArray[Math.floor(Math.random() * hexArray.length)];
   }
   return hex;
}

// Render the HTML for the color palette
function renderColors() {
   let html = '';
   colorsArray.forEach(color => {
      //console.log(color);
      html += `
         <div class="generator__colorblock" data-color="${color}">
            <div class="generator__color" style="background-color: ${color};"></div>
            <div class="generator__colorcode"><button class="generator__copy">^ Copy</button>${color}</div>
         </div>
      `;
   });
   document.querySelector('.generator__palette').innerHTML = html;
   colorsArray = [];

   // Cannot copy code unless the HTML exists first
   const colorBlocks = document.querySelectorAll('.generator__colorblock');
   colorBlocks.forEach(color => {
      color.addEventListener('click', copy);
   });
}

// Call the API and get the palette for the input color
function getScheme() {
   const color = colorPicker.value.substring(1);
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

// Call random color scheme
function getRandomScheme() {
   colorPicker.value = `#${getRandomHex()}`;
   const color = colorPicker.value.substring(1);
   const mode = 'monochrome';
   const endpoint = `/scheme?hex=${color}&mode=${mode}&format=json&count=5`;

   fetch(baseUrl + endpoint).then(res => res.json())
      .then(data => {
         data.colors.forEach(color => {
            colorsArray.push(color.hex.value);
         })
         renderColors();
      });
}

// Copy color to clipboard
function copy(e) {
   const copyText = e.currentTarget.dataset.color;
     
   // if browser does not support the navigator.clipboard API, use the deprecated execCommand
   if (!navigator.clipboard) {
      document.execCommand("copy");
   } else{
      navigator.clipboard.writeText(copyText).then (function(){

      console.log(copyText);

         // Display copied color to user in alert for 2 seconds
         const status = document.getElementById('status');
         status.style.borderColor = copyText;
         status.innerHTML = `Copied<br>${copyText}`;
         status.classList.add('active');
         setTimeout(() => {
            status.classList.remove('active');
          }, 2000);
          
      })
      .catch (function() {
         console.log('Error copying color'); // error
      });
   }
}

// Get new color scheme on button click
generatorButton.addEventListener('click', getScheme);

// load random color on page load
getRandomScheme();




