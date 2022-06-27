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

const objBtn = document.getElementById("objBtn");
const backObj = document.getElementById("backObj");
const invBtn = document.getElementById("invBtn");
const backInv = document.getElementById("backInv");
const mapBtn = document.getElementById("mapBtn");
const backMap = document.getElementById("backMap");

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

objBtn.onclick = function () {
  playSound("beep", 0); 

  $("#objDisplay").show();
  $(formerShow).hide();
}

backObj.onclick = function () {
  playSound("beep", 1); 

  $("#objDisplay").hide();
  $(formerShow).show();
}

invBtn.onclick = function () {
  playSound("beep", 0); 

  $("#invDisplay").show();
  $(formerShow).hide();
}

backInv.onclick = function () {
  playSound("beep", 1); 

  $("#invDisplay").hide();
  $(formerShow).show();
}

mapBtn.onclick = function () {
  playSound("beep", 0); 

  $("#mapDisplay").show();
  $(formerShow).hide();
}

backMap.onclick = function () {
  playSound("beep", 1); 

  $("#mapDisplay").hide();
  $(formerShow).show();
}

// Animations 

function startIntro () {
  $("#intro").fadeIn(3000);

  setTimeout(function () {
    $("#islide1").show();

    setTimeout(function () {
      $("#islide1").hide();
      $("#islide2").show();

      setTimeout(function () {
        $("#islide2").hide();
        $("#islide3").show();

        setTimeout(function () {
          $("#islide3").hide();
          $("#islide4").show();

          setTimeout(function () {
            $("#islide4").hide();
            $("#islide5").show();

            setTimeout(function () {
              $("#islide5").hide();
              $("#islide6").show();

              setTimeout(function () {
                $("#islide6").hide();
                $("#islide7").show();

                setTimeout(function () {
                  $("#islide7").hide();
                  $("#islide8").show();

                  setTimeout(function () {
                    $("#islide8").hide();
                    $("#islide9").show();

                    setTimeout(function () {
                      $("#islide9").hide();
                      $("#islide10").show();

                      setTimeout(function () {
                        $("#islide10").hide();
                        $("#islide11").show();

                        setTimeout(function () {
                          $("#islide11").hide();
                          $("#islide12").show();

                          setTimeout(function () {
                            $("#intro").fadeOut(3000);
                            fadeSound("track1");

                            setTimeout(function () {
                              theNoise();
                            }, 3500);
                          }, 4000);
                        }, 3000);
                      }, 5000);
                    }, 3000);
                  }, 3000); 
                }, 6000);
              }, 4000);
            }, 6000);
          }, 2500);
        }, 6000);
      }, 4000);
    }, 3000);
  }, 3100);
}

function theNoise () {
  $("#night1").fadeIn(3000);

  setTimeout(function () {
    playSound("elec", 0);
    display.style.backgroundColor = "green";
    $("#night1").hide();

    setTimeout(function () {
      display.style.backgroundColor = "black";
      $("#night1").show();

      setTimeout(function () {
        $(".gui").show();
        $("#mainBtns").show();
        formerShow = "#night1";
        addObjective("Follow the noise outside.");
        $("#map1").show();
        $("#map2").show();
        $("#map3").show();
      }, 1000);
    }, 50);
  }, 3000);
}

// Game variables. 

let formerShow = "";
let currentLoc = 0;
let objMark = document.getElementById("objMark");
let youAreAt = document.getElementById("youAreAt");

// Game functions

function addObjective (objective) {
  objMark.innerText = "[ " + objective + " ]";
  objList.innerHTML = "<b>[ " + objective + " ]</b><br/>" + objList.innerHTML;
}

function checkYouAreAt () {
  switch (currentLoc) {
    case 0: 
      youAreAt.innerText = "You are at the Fortress Room.";
      break;
  }
}

setInterval(checkYouAreAt, 1000);