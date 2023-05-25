//filtering Constellations
const constellationCheckboxes = document.querySelectorAll('.constellation');

constellationCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterStarsConstellations);
});

function filterStarsConstellations() {
  const stars = document.querySelectorAll('.constellationstar');
  constellationCheckboxes.forEach(checkbox => {
    const constellationId = checkbox.getAttribute('data-constellation-id');
    stars.forEach(star => {
      if (star.getAttribute('data-constellation-id') === constellationId) {
        if (checkbox.checked) {
          star.style.display = 'block';
        } else {
          star.style.display = 'none';
        }
      }
    });
  });
}
//switch tables
function switchTableHandler() {
  const switchTable = document.getElementById('SwitchTable');
  const starsTable = document.getElementById('stars-table');
  const constellationsTable = document.getElementById('constellations-table');
  const starogs = document.querySelectorAll('.starog');
  const constellationStars = document.querySelectorAll('.constellationstar');

  if (switchTable.checked) {
    starsTable.classList.remove('d-none');
    constellationsTable.classList.add('d-none');
    starogs.forEach(function(starog) {
      starog.classList.remove('d-none');
    });
    constellationStars.forEach(function(constellationStar) {
      constellationStar.classList.add('d-none');
    });
  } else {
    starsTable.classList.add('d-none');
    constellationsTable.classList.remove('d-none');
    starogs.forEach(function(starog) {
      starog.classList.add('d-none');
    });
    constellationStars.forEach(function(constellationStar) {
      constellationStar.classList.remove('d-none');
    });
  }
}

document.addEventListener('DOMContentLoaded', switchTableHandler);
const switchTable = document.getElementById('SwitchTable');
switchTable.addEventListener('click', switchTableHandler);

//moon img
function moon(){
const moons = document.querySelectorAll(".moon");
const moonToggles = document.querySelectorAll(".moons-toggle");
const lastSelectedIndex = localStorage.getItem("lastSelectedIndex");
for (let i = 0; i < moons.length; i++) {
  if (lastSelectedIndex && i == lastSelectedIndex) {
    moons[i].classList.add("active");
  } else if (i !== 0) {
    moons[i].classList.remove("active");
  }
}
moonToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const index = toggle.getAttribute("data-id").slice(-1);
    for (let i = 0; i < moons.length; i++) {
      moons[i].classList.remove("active");
    }
    moons[index].classList.add("active");
    localStorage.setItem("lastSelectedIndex", index);
    moonToggles.forEach((toggle) => {
      toggle.classList.remove("active");
    });
    toggle.classList.add("active");
  });
});}
//fog opacity
const buttons = document.querySelectorAll('.fog');
const opacityValues = ['0%', '30%', '50%', '75%', '100%'];
let activeButton = null;
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    const fogImg = document.querySelector('.fog-img');
    const opacity = opacityValues[id.charAt(id.length - 1)];
    fogImg.style.opacity = opacity;
    buttons.forEach((button) => {
      button.classList.remove('active');
    });
    button.classList.add('active');
    localStorage.setItem('opacity', opacity);
    activeButton = button;
  });
});
const savedOpacity = localStorage.getItem('opacity');
if (savedOpacity !== null) {
  const fogImg = document.querySelector('.fog-img');
  fogImg.style.opacity = savedOpacity;
  buttons.forEach((button) => {
    if (button.getAttribute('data-id') === 'fog-' + opacityValues.indexOf(savedOpacity)) {
      button.classList.add('active');
      activeButton = button;
    }
  });
}
if (activeButton !== null) {
  activeButton.classList.add('active');
}

//rain snow
var nbDrop = 100;
var raining = false;
var snowing = false;
function randRange(minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}
function createRain() {
  for (i = 1; i < nbDrop; i++) {
    var dropLeft = randRange(0, 2600);
    var dropTop = randRange(-1000, 1400);
    $('.rain').append('<div class="drop" id="drop' + i + '"></div>');
    $('#drop' + i).css('left', dropLeft);
    $('#drop' + i).css('top', dropTop);
  }
}
function createSnow() {
  for (i = 1; i < nbDrop; i++) {
    var dropLeft = randRange(0, 2600);
    var dropTop = randRange(-1000, 1400);
    $('.snow').append('<div class="dropsnow" id="dropsnow' + i + '"></div>');
    $('#dropsnow' + i).css('left', dropLeft);
    $('#dropsnow' + i).css('top', dropTop);
  }
}
function toggleRain() {
  if (!raining) {
    createRain();
    raining = true;
    localStorage.setItem("raining", "true");
    $('#toggle-rain path').attr('d', 'M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z');
  } else {
    $('.drop').remove();
    raining = false;
    localStorage.setItem("raining", "false");
    $('#toggle-rain path').attr('d', 'M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z');
  }
}
function toggleSnow() {
  if (!snowing) {
    createSnow();
    snowing = true;
    localStorage.setItem("snowing", "true");
    $('#toggle-snow path').attr('d', 'M2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-.22-7.223a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973z');
  } else {
    $('.dropsnow').remove();
    snowing = false;
    localStorage.setItem("snowing", "false");
    $('#toggle-snow path').attr('d', 'M13.405 4.277a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10.25H13a3 3 0 0 0 .405-5.973zM8.5 1.25a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1-.001 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 1.25zM2.625 11.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm2.75 2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm-2.75-2a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25zm5.5 0a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 0 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 0 1-.248-.434l.495-.283-.495-.283a.25.25 0 0 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25z');
  }
}
if (localStorage.getItem("raining") === "true") {
  toggleRain();
}
if (localStorage.getItem("snowing") === "true") {
  toggleSnow();
}
$('#toggle-rain').click(toggleRain);
$('#toggle-snow').click(toggleSnow);

//clouds
function clouds(){
const toggles = document.querySelectorAll('.clouds-toggle');
const clouds = document.querySelectorAll('.clouds');
const clearSkyButton = document.querySelector("#clearsky");
toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const dropsnow = document.querySelectorAll('.dropsnow');
    const drop = document.querySelectorAll('.drop');
    const id = toggle.getAttribute('data-id');
    clouds.forEach((cloud) => {
      if (cloud.id === id) {
        cloud.classList.add('active');
      } else {
        cloud.classList.remove('active');
      }
    });
    localStorage.setItem('activeCloud', id);
    toggles.forEach((toggle) => {
      if (toggle.getAttribute('data-id') === id) {
        toggle.classList.add('active');
      } else {
        toggle.classList.remove('active');
      }
    });
    clearSkyButton.classList.remove('active');
    dropsnow.forEach(element => {
      element.classList.remove('hidden');
    });

    drop.forEach(element => {
      element.classList.remove('hidden');
    });
    document.querySelector("#toggle-rain").disabled = false;
    document.querySelector("#toggle-snow").disabled = false; 
  });
});
clearSkyButton.addEventListener("click", () => {
  const dropsnow = document.querySelectorAll('.dropsnow');
  const drop = document.querySelectorAll('.drop');
  const cloudsImages = document.querySelectorAll(".clouds");
  cloudsImages.forEach((img) => {
    if (img.classList.contains("active")) {
      img.classList.remove("active");
    }
  });
  localStorage.removeItem('activeCloud');
  toggles.forEach((toggle) => {
    toggle.classList.remove('active');
  });
  clearSkyButton.classList.add('active');
  dropsnow.forEach(element => {
    element.classList.add('hidden');
  });
  drop.forEach(element => {
    element.classList.add('hidden');
  });
  document.querySelector("#toggle-rain").disabled = true;
  document.querySelector("#toggle-snow").disabled = true; 
});
const activeCloudId = localStorage.getItem('activeCloud');
if (activeCloudId) {
  clouds.forEach((cloud) => {
    if (cloud.id === activeCloudId) {
      cloud.classList.add('active');
    } else {
      cloud.classList.remove('active');
    }
  });
  toggles.forEach((toggle) => {
    if (toggle.getAttribute('data-id') === activeCloudId) {
      toggle.classList.add('active');
    } else {
      toggle.classList.remove('active');
    }
  });
} else {
  const dropsnow = document.querySelectorAll('.dropsnow');
  const drop = document.querySelectorAll('.drop');
  clearSkyButton.classList.add('active');
  if (dropsnow && drop) {
    dropsnow.forEach(element => {
      element.classList.add('hidden');
    });
    drop.forEach(element => {
      element.classList.add('hidden');
    });
  }
  document.querySelector("#toggle-rain").disabled = true;
  document.querySelector("#toggle-snow").disabled = true; 
  console.log('sadasdasd1');
}}
//theme controller
const colorButtons = document.querySelectorAll('.color-buttons button');
const root = document.documentElement;
// save to local storage and to css variable
function changeColor(color) {
  root.style.setProperty('--primary-color', color);
  localStorage.setItem('primary-color', color);
}
//clear active class
colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color');
    changeColor(color);
    colorButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});
//set active
const savedColor = localStorage.getItem('primary-color');
if (savedColor) {
  changeColor(savedColor);
  const activeButton = document.querySelector(`[data-color="${savedColor}"]`);
  activeButton.classList.add('active');
}
//filter
const checkboxes = document.querySelectorAll('.form-check-input');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterStars);
});

function filterStars() {
  const checkboxes = document.querySelectorAll('.form-check-input');
  const stars = document.querySelectorAll('.starog');

  checkboxes.forEach((checkbox, index) => {
    const selectedStars = document.querySelectorAll(`.starog:nth-of-type(${index + 1})`);
    
    if (checkbox.checked) {
      selectedStars.forEach((star) => {
        star.style.display = 'block';
      });
    } else {
      selectedStars.forEach((star) => {
        star.style.display = 'none';
      });
    }
  });
}

//draggable star


const starsDivs = document.querySelectorAll('.starog');
starsDivs.forEach(starDiv => {
  starDiv.addEventListener('dblclick', () => {
    const starId = starDiv.dataset.id;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const starDetails = JSON.parse(this.responseText);
        const containerSkyDiv = document.querySelector('.container__sky');
        containerSkyDiv.innerHTML = `
        <div class="details">
            <div class=padding__frame>
              <div class="details__frame">
                <div class="image__section">
                  <img class="details__image" src="${starDetails.image}" />
                </div>
                <div class="text__section">
                  <h2 class="details__header">${starDetails.name}</h2>
                  <div class="text__main">
                    <div class="text__field">${starDetails.description}</div>
                  </div>
                <div class="button__section">
                  <a href="/edit/${starDetails._id}" class="default__button"><i class="fas fa-edit fa-lg mx-1"></i>Edytuj</a>
                  <a href="/delete/${starDetails._id}" class="default__button"><i class="fas fa-trash fa-lg mx-1"></i>Usuń</a>
                  <button class="default__button back-button"><i class="fas fa-chevron-left"></i> Powrót</button>
              </div>
                </div>
              </div>
            </div>
          </div>
        `;
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
          window.location.reload();
        });
      }
    };
    xhr.open('GET', `/details/${starId}`, true);
    xhr.send();
  });
});


//constellation old script
// const constellationsDivs = document.querySelectorAll('.constellationstar');
// constellationsDivs.forEach(constellationDiv => {
//   constellationDiv.addEventListener('dblclick', () => {
//     const starId = constellationDiv.dataset.constellationid;
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//       if (this.readyState === 4 && this.status === 200) {
//         const constellationDetails = JSON.parse(this.responseText);
//         const containerSkyDiv = document.querySelector('.container__sky');
//         containerSkyDiv.innerHTML = `
//         <div class="details">
//             <div class=padding__frame>
//               <div class="details__frame">
//                 <div class="image__section">
//                   <img class="details__image" src="${constellationDetails.image}" />
//                 </div>
//                 <div class="text__section">
//                   <h2 class="details__header">${constellationDetails.name}</h2>
//                   <div class="text__main">
//                     <div class="text__field">${constellationDetails.description}</div>
//                   </div>
//                 <div class="button__section">
//                   <a href="/editConstellation/${constellationDetails._id}" class="default__button"><i class="fas fa-edit fa-lg mx-1"></i>Edytuj</a>
//                   <a href="/deleteConstellation/${constellationDetails._id}" class="default__button"><i class="fas fa-trash fa-lg mx-1"></i>Usuń</a>
//                   <button class="default__button back-button"><i class="fas fa-chevron-left"></i> Powrót</button>
//               </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         `;
//         const backButton = document.querySelector('.back-button');
//         backButton.addEventListener('click', () => {
//           window.location.reload();
//         });
//       }
//     };
//     xhr.open('GET', `/detailsConstellation/${starId}`, true);
//     xhr.send();
//   });
// });


const icons = document.querySelectorAll('.text-success-icon');
const containerSkyDiv = document.querySelector('.container__sky');
let originalContent = containerSkyDiv.innerHTML;

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const starId = icon.getAttribute('data-rowid');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const constellationDetails = JSON.parse(this.responseText);
        containerSkyDiv.innerHTML = `
          <div class="details">
            <div class="padding__frame">
              <div class="details__frame">
                <div class="image__section">
                  <img class="details__image" src="${constellationDetails.image}" />
                </div>
                <div class="text__section">
                  <h2 class="details__header">${constellationDetails.name}</h2>
                  <div class="text__main">
                    <div class="text__field">${constellationDetails.description}</div>
                  </div>
                  <div class="button__section">
                    <a href="/editConstellation/${constellationDetails._id}" class="default__button"><i class="fas fa-edit fa-lg mx-1"></i>Edytuj</a>
                    <a href="/deleteConstellation/${constellationDetails._id}" class="default__button"><i class="fas fa-trash fa-lg mx-1"></i>Usuń</a>
                    <button class="default__button back-button"><i class="fas fa-chevron-left"></i> Powrót</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;

        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', () => {
          containerSkyDiv.innerHTML = originalContent;
          switchTableHandler();
          initializeStars();
          clouds();
          moon();
        });
      }
    };

    xhr.open('GET', `/detailsConstellation/${starId}`, true);
    xhr.send();
  });
});

function initializeStars() {
  $(document).ready(function() {
    $(".star").draggable({
      containment: ".container__sky"
    });
    $(".star").on("dragstop", function() {
      var position = $(this).position();
      var containerHeight = $(".container__sky").height();
      var containerWidth = $(".container__sky").width();
      var starLeft = (position.left / containerWidth) * 100;
      var starTop = (position.top / containerHeight) * 100;
      console.log(starLeft + "l:p" + starTop)
      localStorage.setItem($(this).attr("id"), JSON.stringify({
        top: starTop + "%",
        left: starLeft + "%"
      }));
    });
    $(".star").each(function() {
      var id = $(this).attr("id");
      var position = JSON.parse(localStorage.getItem(id));
      if (position !== null) {
        var containerHeight = $(".container__sky").height();
        var containerWidth = $(".container__sky").width();
        var starLeft = position.left / 100 * containerWidth;
        var starTop = position.top / 100 * containerHeight;
        $(this).css({
          top: starTop + '%',
          left: starLeft + '%'
        });
      }
    });
    function scaleStars() {
      var skyHeight = $(".container__sky").height();
      var skyWidth = $(".container__sky").width();
      $(".star").each(function() {
        var starWidth = skyWidth * (Math.random() * 0.005+0.002) + 0.005;
        var starHeight = starWidth;
        var starLeft = parseFloat($(this).css("left")) / skyWidth * 100;
        var starTop = parseFloat($(this).css("top")) / skyHeight * 100;
        $(this).css({
          "width": starWidth,
          "height": starHeight,
          "left": starLeft + "%",
          "top": starTop + "%"
        });
      });
    }
  
    scaleStars(); 
    $(window).resize(scaleStars);
  
    function blinkStars() {
      setTimeout(function() {
        $(".star").addClass("blink");
        setTimeout(function() {
          $(".star").removeClass("blink");
          blinkStars();
        }, 600);
      }, 2000 + Math.random() * 600);
    }
  
    blinkStars();
  }); 
}
moon();
clouds();
initializeStars();