// Sound systems!

function playSound (id, clone) {
  switch (clone) {
    case 0: 
      document.getElementById(id).play();
      break;
    case 1:
      document.getElementById(id).cloneNode(true).play();
      break;
  }
}

function stopSound (id) {
  document.getElementById(id).pause();
}

function fadeSound (id) {
  $("#" + String(id)).animate({volume : 0.0}, 3000);
} 

// Buttons.

let enableBtn = true;
const newBtn = document.getElementById("new");
const loadBtn = document.getElementById("load");
let hasTouched = false;

const display = document.getElementById("display");

function checkTouch () {
  if (hasTouched === false) {
    playSound("thunder", 0);
    hasTouched = true;
  }

  else {
    playSound("thunder", 1);
  }
}

newBtn.onclick = function () {
  if (enableBtn === true) {
    checkTouch();

    $("#title").hide();
    display.style.backgroundColor = "green";

    setTimeout(function () {
      display.style.backgroundColor = "black";

      setTimeout(function () {
        playSound("track1", 0);
        startIntro();
      }, 1000);
    }, 50);
  }

  else {
    return false;
  }
}

// Animations 

function startIntro () {
  $("#intro").fadeIn(3000);

  setTimeout(function () {
    $("#islide1").show();

    setTimeout(function () {
      $("#islide1").hide();
      $("#islide2").show();
    }, 3000);
  }, 3100);
}