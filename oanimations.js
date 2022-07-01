let current_cloud_left = 0;
let current_cloud1_left = 0;

let bird_flying_stage = 1;
let bird_left = 0;

let day = true;

function fireFlyAnimation () {
  if (day === true) {
    // Return none
  }

  else {
    $("#fireflies").fadeOut(3000);

    setTimeout(function () {
      fireflies.style.left = Math.floor(Math.random() * 450) + "px";

      setTimeout(function () {
        $("#fireflies").fadeIn(3000);
      }, 1000);
    }, 4000);
  }
}

function dayAndNight () {
  if (day === true) {
    day = false;

    fishbowl.style.backgroundColor = "black";
    $("#fireflies").fadeIn(5000);
  }

  else {
    day = true;
    night.pause();
    wind.play();

    fireflies.style.left = Math.floor(Math.random() * 450) + "px";

    fishbowl.style.backgroundColor = "#dde8e7";
    $("#fireflies").fadeOut(5000);
  }
}

function weather () {
  
}

function animateCloud () {
  current_cloud_left += 0.05;
  current_cloud1_left += 0.001;

  clouds.style.left = current_cloud_left + "px";
  clouds1.style.left = current_cloud1_left + "px";

  if (current_cloud_left > 510) {
    current_cloud_left = -500;
  }

  if (current_cloud1_left > 510) {
    current_cloud_left = -500;
  }
}

/*
function animateBird () {
  bird_left += 5;
  bird.style.left = bird_left + "px";
  
  if (bird_flying_stage === 1) {
    bird_flying_stage = 2;
    bird.src = "/src/www/image/bird/flying2.png";
  }
  else {
    bird_flying_stage = 1;
    bird.src = "/src/www/image/bird/flying1.png";
  }
}
*/

try {
  setInterval(animateCloud, 10);
  setInterval(dayAndNight, 300000);
  setInterval(fireFlyAnimation, 8000);
}

catch (error) {
  alert(error);
}