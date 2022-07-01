let current_cloud_left = 0;
let current_cloud1_left = 0;

let bird_flying_stage = 1;
let bird_left = 0;

let day = true;

function weather () {
  
}

function animateCloud () {
  current_cloud_left += 0.05;
  current_cloud1_left += 0.001;

  clouds.style.left = current_cloud_left + "px";
  clouds1.style.left = current_cloud1_left + "px";

  if (current_cloud_left > 410) {
    current_cloud_left = -400;
  }

  if (current_cloud1_left > 410) {
    current_cloud_left = -400;
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
}

catch (error) {
  alert(error);
}