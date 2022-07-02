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

const compIcon = document.getElementById("compIcon");
const atkBtn = document.getElementById("atkBtn");
const defBtn = document.getElementById("defBtn");
const foodBtn = document.getElementById("foodBtn");

const currentEnemy = document.getElementById("currentEnemy");
const wpMarker = document.getElementById("wpMarker");
const ammoMarker = document.getElementById("ammoMarker");
const combatStatus = document.getElementById("combatStatus");

const lootBtn = document.getElementById("lootBtn");
const eatBtn = document.getElementById("eatBtn");
const lootStatus = document.getElementById("lootStatus");
const llotBtn = document.getElementById("llotBtn");

const moveBtn = document.getElementById("moveBtn");
const lootTitle = document.getElementById("lootTitle");
const desStatus = document.getElementById("desStatus");
const desBtn = document.getElementById("desBtn");
const ldesBtn = document.getElementById("ldesBtn");

const shootClark = document.getElementById("shootClark");
const shootEastside = document.getElementById("shootEastside");

const chooseRA = document.getElementById("chooseRA");
const chooseHO = document.getElementById("chooseHO");
const chooseCC = document.getElementById("chooseCC");
const wah = document.getElementById("wah");

let hasEaten = false;
let hasLooted = false;
let leaveTarget = 1;
let distanceRun = 10;
let postDungeon = "";
let ending = "";

let compIconClickEvent = 0;

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

compIcon.onclick = function () {
  switch (compIconClickEvent) {
    case 0: 
      playSound("track3", 0);
      $("#sharon1").hide();
      $("#sharon2").hide();
      $("#sharon3").hide();
      $("#sharon4").hide();
      $("#mark1").show();
      $("#talkInt").show();
      $("#compIcon").hide();
      talkTitle.innerText = "Mark";
      objMark.innerText = "[ Recieved a Crude Pistol. ]";
      inv.push("Crude Pistol");
      $("#objMark").show();

      setTimeout(function () {
        talkTitle.innerText = "Mob of Students";

        $("#mob1").show();

        setTimeout(function () {
          $("#mob2").show(); 

          setTimeout(function () {
            $("#mob3").show();

            setTimeout(function () {
              $("#objMark").hide();
              $("#talkInt").hide();
              $("#combatInt").show();
              isCombat = true;
            }, 800);
          }, 800);
        }, 800);
      }, 4000);
      break;
    case 1:
      $("#darkway").hide();
      $("#compIcon").hide();
      $("#alltheotherstuff").show(); 
      $("#wah").show();
      wah.innerText = "In the dark, you rediscovered an old friend, a friend of many others too.";

      setTimeout(function () {
        wah.innerText = "The old order of the Academy did indeed still exist.";

        setTimeout(function () {
          wah.innerText = "The question becomes, who shall inherit it?";

          setTimeout(function () {
            $("#specChooseInt").show();
          }, 4000);
        }, 4000);
      }, 5500);
      break
  }
}

atkBtn.onclick = function () {
  let randMiss = Math.floor(Math.random() * 4);
  let randScream = Math.floor(Math.random() * 20);

  switch (randMiss) {
    case 0: 
    case 1: 
    case 2:
      combatStatus.innerText = "Enemy took " + weaponAtk + " damage.";
      enemyWp -= weaponAtk;

      if (weaponAtk > 2) {
        ammo -= 1;

        if (weaponAtk === 4) {
          playSound("m9", 1);
        }
      }

      switch (randScream) {
        case 3:
          playSound("scream", 0);
          break;
      }
      
      break;
    case 3: 
      combatStatus.innerText = "You missed.";
      break;
  }
}

foodBtn.onclick = function () {
  if (food < 1) {
    combatStatus.innerText = "You have no food.";
  }

  else {
    food -= 1;
    wp += 5;
  }
}

ldesBtn.onclick = function () {
  $("#lootInt").hide();
  $("#moveBtn").show();
  hasLooted = false;
  distanceRun -= 1;
}

moveBtn.onclick = function () {
  $("#moveBtn").hide();
  lootStatus.innerText = "";

  if (distanceRun < 1) {
    if (postDungeon === "") {
      crawlDungeon(); 
    }

    else if (postDungeon === "office") {
      fadeSound("track4");
      $("#moveBtn").hide();
      $("#darkway").fadeOut(3000);

      setTimeout(function () {
        $("#office1").fadeIn(3000);
        $("#eastside1").show();
        $("#mark1").hide();
        talkTitle.innerText = "Ms. Eastside";

        setTimeout(function () {
          $("#talkInt").fadeIn(3000);

          setTimeout(function () {
            eastside1t.innerText = "Come, we want to show you something.";

            setTimeout(function () {
              $("#office1").fadeOut(3000);

              setTimeout(function () {
                $("#office2").fadeIn(3000);
                eastside1t.innerText = "This is the Head Office's part of the building.";

                setTimeout(function () {
                  eastside1t.innerText = "We've got everything from water to crops, and even fireflies.";

                  setTimeout(function () {
                    eastside1t.innerText = "Remember that computer you tried to use earlier today?";

                    setTimeout(function () {
                      eastside1t.innerText = "We've been observing this turn of events via its camera.";

                      setTimeout(function () {
                        eastside1t.innerText = "We also saw how you held off that mob-";

                        setTimeout(function () {
                          eastside1t.innerText = "And how you found your way to us through the vents.";

                          setTimeout(function () {
                            eastside1t.innerText = "Try as we may however, we can't find a way to safely travel through.";

                            setTimeout(function () {
                              eastside1t.innerText = "Alternatively, there is a small tunnel not far from here.";

                              setTimeout(function () {
                                eastside1t.innerText = "Sadly, something is blocking its passage- we don't know what.";

                                setTimeout(function () {
                                  eastside1t.innerText = "Please go and find out what it is. Your reward shall be grand.";
                                  addObjective("30 ammo recieved.");
                                  ammo += 30;
                                  $("#objMark").show();

                                  setTimeout(function () {
                                    $("#talkInt").fadeOut(3000);
                                    $("#office2").fadeOut(3000);
                                    $("#objMark").fadeOut(3000);

                                    setTimeout(function () {
                                      $("#darkway").fadeIn(3000);
                                      distanceRun = 7;
                                      postDungeon = "wendigo";
                                      playSound("track5", 0);

                                      setTimeout(function () {
                                        $("#moveBtn").show();
                                      }, 3100);
                                    }, 3100);
                                  }, 6000);
                                }, 6000);
                              }, 4000);
                            }, 6000);
                          }, 5000);
                        }, 3000);
                      }, 5300);
                    }, 5000);
                  }, 5500);
                }, 4200);
              }, 3100);
            }, 5000);
          }, 3000);
        }, 3100);
      }, 3000);
    }

    else if (postDungeon === "wendigo") {
      stopSound("track5");

      setTimeout(function () {
        $("#wendigo").show();
        currentEnemy.innerText = "Current Enemy: Unknown";
        enemyWp = 50;
        enemyType = "wendigo";

        setTimeout(function () {
          isCombat = true; 
          $("#combatInt").show(); 
          $("#wendigo").hide(); 
          leaveTarget = 2;
        }, 1000);
      }, 1000);
    }

    else if (postDungeon === "poweron") {
      fadeSound("track6");
      $("#compIcon").show();
    }
  }

  else {
    $("#darkway").hide();
    display.style.backgroundColor = "gray";

    setTimeout(function () {
      display.style.backgroundColor = "black";
      $("#darkway").show();
      crawlDungeon();
    }, 50);
  }
}

function lootFunc () {
  let whichLoot = Math.floor(Math.random() * 2);
  let lootNum = Math.floor(Math.random() * 15);

  if (lootNum === 0) {
    lootNum = 1;
  }

  switch (whichLoot) {
    case 0: 
      ammo += lootNum;
      lootStatus.innerText = lootNum + " ammo added to inventory.";
      desStatus.innerText = lootNum + " ammo added to inventory.";
      break;
    case 1: 
      food += lootNum; 
      lootStatus.innerText = lootNum + " food added to inventory";
      desStatus.innerText = lootNum + " food added to inventory";
  }
}

lootBtn.onclick = function () {
  if (hasLooted === true) {
    lootStatus.innerText = "You've already looted this corpse.";
  }

  else {
    lootFunc(); 
    hasLooted = true;
  }
}

desBtn.onclick = function () {
  if (hasLooted === true) {
    desStatus.innerText = "You've already looted.";
  }

  else {
    lootFunc(); 
    hasLooted = true;
  }
}

eatBtn.onclick = function () {
  if (hasEaten === true) {
    lootStatus.innerText = "The corpse is little more than a pile of bones.";
  }

  else {
    lootStatus.innerText = "You eat the corpse. Delicious. Es ist sehr lecker.";
    wp += 1;
    hasEaten = true;
  }
}

llotBtn.onclick = function () {
  hasLooted = false; 
  hasEaten = false;
  lootStatus.innerText = "";
  $("#mortemInt").hide();
  callCombatEvent(leaveTarget);
  $("#mortemInt").hide();
  isCombat = false;
}

shootClark.onclick = function () {
  officeLeadership = "eastside";
  anotherEscape();
}

shootEastside.onclick = function () {
  officeLeadership = "clark";
  anotherEscape();
}

chooseRA.onclick = function () {
  ending = "ra";
  $("#specChooseInt").hide();
  endingSlides();
}

chooseHO.onclick = function () {
  ending = "ho";
  $("#specChooseInt").hide();
  endingSlides();
}

chooseCC.onclick = function () {
  ending = "cc";
  $("#specChooseInt").hide();
  endingSlides();
}

function endingSlides () {
  playSound("track7", 0);
  function displayEnd () {
    wah.innerText = "And so the Academy found a new direction, a new order.";

    setTimeout(function () {
      wah.innerText = "And one way or another, the caged windows, they were gone.";

      setTimeout(function () {
        wah.innerText = "Why not enjoy a trip to the student lounge?";

        setTimeout(function () {
          $("#alltheotherstuff").fadeOut(3000);

          setTimeout(function () {
            $("#slounge").fadeIn(3000);
          }, 3100);
        }, 3000);
      }, 4000);
    }, 4000);
  }
  
  if (ending === "ra") {
    wah.innerText = "With no real threats to their expansion, the Residents’ Alliance quickly moved to control all operations within the school.";
    $("#alltheotherstuff").show();
    $("#wah").show();

    setTimeout(function () {
      wah.innerText = "Delivering on their promise of better living conditions, the Alliance used their new numbers and Mr. Khan’s old technology in order to give the old Academy an upgrade.";

      setTimeout(function () {
        wah.innerText = "Unfortunately, much of the building remained vandalized and drugs, albeit less, flowed through the worst parts of the Academy. Some residents left entirely as a result.";

        setTimeout(function () {
          wah.innerText = "For your actions, the Alliance allowed you to keep the old Head Office room, a palace of your own.";

          setTimeout(function () {
            displayEnd();
          }, 5500);
        }, 11000);
      }, 11000);
    }, 7500);
  }

  else if (ending === "ho") {
    if (officeLeadership === "clark") {
      wah.innerText = "With no functioning Mr. Khan unit, the Head Office, with your help, finally came to realize that it was pointless to rely on a machine and a man that had forgotten about them.";
      $("#alltheotherstuff").show();
      $("#wah").show();

      setTimeout(function () {
        wah.innerText = "Soon, the Office utilized the surviving technology from the disabled unit, using it to improve the Academy as a whole.";

        setTimeout(function () {
          wah.innerText = "The graffiti on the walls was cleaned up, and even the food for both the students and the staff were improved.";

          setTimeout(function () {
            wah.innerText = "For your actions, you were awarded a hefty amount of space within the Academy.";

            setTimeout(function () {
              displayEnd();
            }, 4500);
          }, 8000);
        }, 8000);
      }, 11300);
    }

    else {
      wah.innerText = "With Mr. Khan back, the Academy returned to its original state- orderly and self-sufficient, with the Head Office following suit.";
      $("#alltheotherstuff").show();
      $("#wah").show();

      setTimeout(function () {
        wah.innerText = "The Head Office used the newly repaired Mr. Khan unit in order to reinstate many forgotten rules, some of which restricted the freedoms of the students and staff even further.";

        setTimeout(function () {
          wah.innerText = "Although much of the Academy was cleaned up and living conditions drastically improved, the relationship between Mr. Khan and the residents of the Academy remained cold and distant.";

          setTimeout(function () {
            wah.innerText = "For your actions, Mr. Khan personally invited you to his work room, where he allowed you to take a small piece of the advanced technology housed there.";

            setTimeout(function () {
              displayEnd();
            }, 8000);
          }, 11500);
        }, 11000);
      }, 8000);
    }
  }

  else if (ending === "cc") {
    wah.innerText = "With the Candy Crew in charge of Academy operations, their dreams of a drug empire soon became realized. Drugs soon became the new currency.";
    $("#alltheotherstuff").show();
    $("#wah").show();

      setTimeout(function () {
        wah.innerText = "Sifting through the deserted City surrounding them, the Candy Crew found many tools that would aid them in their drug manufacturing operations.";

        setTimeout(function () {
          wah.innerText = "It became common to see drug junkies roaming not only the halls of the tarnished Academy, but the streets of the deserted City as well.";

          setTimeout(function () {
            wah.innerText = "For your actions, Myron gave you a lifetime supply of drugs for you to use- or to sell.";

            setTimeout(function () {
              displayEnd();
            }, 6000);
          }, 9000);
        }, 10000);
      }, 9000);
  }
}

// Animations 
const sharonWord = document.getElementById("sharonword");

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
        playSound("track2", 0);
      }, 1000);
    }, 50);
  }, 3000);
}

function weirdHum () {
  $("#khanclass").hide();
  display.style.backgroundColor = "green";
  playSound("thunder", 0);

  setTimeout(function () {
    $("#khanclass").show();
    talkTitle.innerText = "Crowd of Students";
    display.style.backgroundColor = "black";

    setTimeout(function () {
      $("#talkInt").show();
      $("#staff1").show();

      setTimeout(function () {
        $("#staff2").show();

        setTimeout(function () {
          $("#staff3").show();

          setTimeout(function () {
            $("#staff4").show();

            setTimeout(function () {
              $("#sharon1").show();
              talkTitle.innerText = "Sharon";

              setTimeout(function () {
                sharon1t.innerText = "tell us all about their experience tomorrow.";

                setTimeout(function () {
                  sharon1t.innerText = "For now though, I think we should all just go back to sleep.";

                  setTimeout(function () {
                    $("#khanclass").fadeOut(3000);
                    $("#talkInt").fadeOut(3000);
                    fadeSound("track2");

                    setTimeout(function () {
                      $("#fort1").fadeIn(3000);

                      setTimeout(function () {
                        $("#fort1").fadeOut(3000);
                        $("#sharonword").show();
                        sharonWord.innerText = "Hello again. It's me, Sharon. I'm talking inside your head.";

                        setTimeout(function () {
                          $("#sharondreamtalk").fadeIn(3000);

                          setTimeout(function () {
                            sharonWord.innerText = "When you wake up, go to Spice Road. There's something I want to show you.";
                            $("#staff1").hide();
                            $("#staff2").hide();
                            $("#staff3").hide();
                            $("#staff4").hide();

                            setTimeout(function () {
                              $("#sharondreamtalk").fadeOut(3000);

                              setTimeout(function () {
                                $("#spiceroad").fadeIn(3000);
                                $("#talkInt").fadeIn(3000);
                                sharon1t.innerText = "Alright. We can talk now.";

                                setTimeout(function () {
                                  sharon1t.innerText = "Look around you.";

                                  setTimeout(function () {
                                    sharon1t.innerText = "Spice Road is where everyone gets food-";

                                    setTimeout(function () {
                                      sharon1t.innerText = "But the fertility of the 'land'...";

                                      setTimeout(function () {
                                        sharon1t.innerText = "Let's just put it this way:";

                                        setTimeout(function () {
                                          sharon1t.innerText = "We're all going to die soon if things keep going this way.";
                                          sharon1t.style.color = "red";

                                          setTimeout(function () {
                                            $("#sharon2").show();

                                            setTimeout(function () {
                                              $("#sharon3").show();

                                              setTimeout(function () {
                                                $("#sharon4").show();

                                                setTimeout(function () {
                                                  $("#talkInt").hide();
                                                  $("#compIcon").show();
                                                }, 4000);
                                              }, 3500);
                                            }, 3500);
                                          }, 6000);
                                        }, 3000);
                                      }, 3500);
                                    }, 4000);
                                  }, 2500);
                                }, 3000);
                              }, 3100);
                            }, 6000);
                          }, 5000);
                        }, 3000);
                      }, 3000);
                    }, 3100);
                  }, 4000);
                }, 3000);
              }, 3000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 50);
}

function anotherEscape () {
  $("#blkbrd").hide();
  $("#specShootInt").hide();
  display.style.backgroundColor = "red";
  playSound("m9", 1);

  setTimeout(function () {
    $("#blkbrd").show();
    display.style.backgroundColor = "black";

    $("#eastside1").hide();
    $("#clark1").hide();
    $("#myron1").show(); 
    talkTitle.innerText = "Myron";

    setTimeout(function () {
      $("#talkInt").show();
      myron1t.innerText = "Check it out- there's nothing in the room.";

      setTimeout(function () {
        myron1t.innerText = "Hm. Some of this tech could be used for...manufacturing...";

        setTimeout(function () {
          myron1t.innerText = "Now scram, before things get ugly.";

          setTimeout(function () {
            $("#blkbrd").fadeOut(3000);
            $("#talkInt").fadeOut(3000);

            talkTitle.innerText = "Sharon";
            $("#myron1").hide();
            $("#sharon1").show();
            sharon1t.style.color = "black";
            sharon1t.innerText = "Welcome back to the Fortress.";

            setTimeout(function () {
              $("#fort2").fadeIn(3000);
              $("#talkInt").fadeIn(3000);

              setTimeout(function () {
                sharon1t.innerText = "We- the entire Residents' Alliance- we're going to count on you soon.";

                setTimeout(function () {
                  sharon1t.innerText = "All we ask is that you keep the interests of your fellow students in mind.";

                  setTimeout(function () {
                    sharon1t.innerText = "Have some food before you go.";
                    $("#objMark").show();
                    addObjective("Recieved 20 food.");
                    food += 20;

                    setTimeout(function () {
                      playSound("power", 0); 
                      $("#objMark").hide();
                      $("#fort2").hide();
                      $("#talkInt").hide(); 

                      setTimeout(function () {
                        playSound("track6", 0);
                        distanceRun = 20;
                        postDungeon = "poweron";
                        $("#darkway").show();
                        $("#moveBtn").show();
                        compIconClickEvent = 1;
                        leaveTarget = 0;
                      }, 2000);
                    }, 4000);
                  }, 5500);
                }, 5000);
              }, 6000);
            }, 3100);
          }, 4000);
        }, 5000);
      }, 4000);
    }, 1000);
  }, 50);
}

// Game variables. 

let formerShow = "";
let currentLoc = 0;
let isNew = true;
let objMark = document.getElementById("objMark");
let youAreAt = document.getElementById("youAreAt");
let inv = [];
let ammo = 50;
let food = 0;
let isCombat = false;
let enemyWp = 15;
let weaponAtk = 3;
let enemyType = "mob";
let wp = 30;
let officeLeadership = "eastside";

function checkDeath () {
  if (wp < 1) {
    $("#combatInt").hide();
    $("#deathInt").show();
  }
}

setInterval(function () {
  function checkNegative (defNum) {
    if (ammo < 1) {
      weaponAtk = 1;
    }

    else {
      weaponAtk = defNum;
    }
  }
  
  if (String(inv).includes("Rifle")) {
    checkNegative(11);
  }

  else {
    if (String(inv).includes("Broken Shotgun")) {
      checkNegative(7);
    }

    else {
      if (String(inv).includes("Crude Pistol")) {
        checkNegative(4)
      }

      else {
        checkNegative(1)
      }
    }
  }

  if (isCombat === true) {
    if (enemyWp < 1) {
      isCombat = false;
      $("#combatInt").hide();
      $("#mortemInt").show();
    }
  }

  wpMarker.innerText = "Current Willpower: " + wp;
  ammoMarker.innerText = "Current Ammo: " + ammo;
  checkDeath();
}, 50);

setInterval(function () {
  if (isCombat === false) {
    // do nothing
  }

  else {
    let randMiss = Math.floor(Math.random() * 4);
    console.log("attacking..");

    function checkDam () {
      if (enemyType === "mob") {
        wp -= 1;
      }

      else if (enemyType === "junkie") {
        wp -= 2;
      }

      else if (enemyType === "thug") {
        wp -= 4;
      }

      else if (enemyType === "robot") {
        wp -= 6;
      }

      else if (enemyType === "wendigo") {
        wp -= 7;
      }
    }

    switch (randMiss) {
      case 0: 
      case 1: 
      case 2: 
        checkDam(); 
        combatStatus.innerText = "Enemy attacked.";
        break; 
      case 3: 
        combatStatus.innerText = "Enemy missed.";
        break;
    }
  }
}, 2000);

// Game functions

function callCombatEvent (num) {
  switch (num) {
    case 0: 
      distanceRun -= 1;
      $("#moveBtn").show();
      break;
    case 1:
      $("#talkInt").show();
      $("#mob1").hide(); 
      $("#mob2").hide(); 
      $("#mob3").hide();
      talkTitle.innerText = "Mark";
      fadeSound("track3");
      mark1t.innerText = "Run! Go through the vents, quick!";

      setTimeout(function () {
        $("#talkInt").fadeOut(3000);
        $("#night1").fadeOut(3000);

        setTimeout(function () {
          $("#dontpanic").fadeIn(3000);

          setTimeout(function () {
            $("#dontpanic").fadeOut(3000);

            setTimeout(function () {
              $("#darkway").fadeIn(3000);
              leaveTarget = 0;
              playSound("track4", 0);
              postDungeon = "office";
            }, 3100);
          }, 7500);
        }, 3100);
      }, 5000);
      break;
    case 2:
      addObjective("The tunnel opens up into a strange room.");
      setTimeout(function () {
        $("#darkway").fadeOut(3000);

        setTimeout(function () {
          $("#den").fadeIn(3000);
          $("#eastside1").hide();
          talkTitle.innerText = "Myron";

          setTimeout(function () {
            $("#talkInt").show();
            $("#eastside1").hide();
            $("#myron1").show();

            setTimeout(function () {
              myron1t.innerText = "I'm Myron, the leader of 'Candy Crew'.";

              setTimeout(function () {
                myron1t.innerText = "We have a somewhat bad reputation for selling drugs and whatnot.";

                setTimeout(function () {
                  myron1t.innerText = "Now, we do this for a reason. My- our- goals, they require...funds.";

                  setTimeout(function () {
                    myron1t.innerText = "This place is falling apart. Even you can probably see that.";

                    setTimeout(function () {
                      myron1t.innerText = "Thus, we need to get out. I've seen the outside world.";

                      setTimeout(function () {
                        myron1t.innerText = "It's quite beautiful compared to the confines of this building.";

                        setTimeout(function () {
                          myron1t.innerText = "With the right technology, we can unseal Mr. Khan's doors, and enter a new world.";

                          setTimeout(function () {
                            myron1t.innerText = "We may have also found a way to Mr. Khan's room as well.";
                            $("#den").fadeOut(3000);

                            setTimeout(function () {
                              $("#blkbrd").fadeIn(3000);

                              $("#myron1").hide();
                              $("#eastside1").show();
                              talkTitle.innerText = "Ms. Eastside";
                              eastside1t.innerText = "Don't you dare go in there.";

                              setTimeout(function () {
                                eastside1t.innerText = "If you do, Mr. Khan's machines might kill you.";

                                setTimeout(function () {
                                  talkTitle.innerText = "Mr. Clark";
                                  $("#eastside1").hide();
                                  $("#clark1").show(); 

                                  setTimeout(function () {
                                    clark1t.innerText = "They deserve to know the truth.";
                                  }, 1500);

                                  setTimeout(function () {
                                    $("#clark1").hide();
                                    talkTitle.innerText = "Ms. Eastside";
                                    eastside1t.innerText = "That's enough Joe!";
                                    $("#eastside1").show();

                                    setTimeout(function () {
                                      $("#eastside1").hide();
                                      talkTitle.innerText = "Mr. Clark";
                                      $("#clark1").show(); 
                                      clark1t.innerText = "No, it is not.";

                                      setTimeout(function () {
                                        $("clark1").hide(); 
                                        $("#eastside1").show(); 
                                        eastside1t.innerText = "YOU have a gun, don't you?";
                                        talkTitle.innerText = "Ms. Eastside";
                                        $("#objMark").show();
                                        addObjective("Recieved 2 ammo.");
                                        ammo += 2;

                                        setTimeout(function () {
                                          $("#objMark").hide();
                                          eastside1t.innerText = "Well then, shoot him!";

                                          setTimeout(function () {
                                            $("#talkInt").hide();
                                            $("#eastside1").hide();
                                            $("#specShootInt").show();
                                          }, 3000);
                                        }, 3000);
                                      }, 3000);
                                    }, 2000);
                                  }, 3000);
                                }, 4000);
                              }, 3000);
                            }, 3100);
                          }, 6000);
                        }, 5500);
                      }, 4000);
                    }, 4500);
                  }, 5500);
                }, 4500);
              }, 3000);
            }, 2000);
          }, 1000);
        }, 3000);
      }, 4500);
      break;
    case 3:
      break;
  }
}

function crawlDungeon () {
  let randomEncounter = Math.floor(Math.random() * 2);
  let lootEncounter = Math.floor(Math.random() * 4);
  let graveEncounter = Math.floor(Math.random() * 3);

  switch (randomEncounter) {
    case 0:
      switch (lootEncounter) {
        case 0:
          lootTitle.innerText = "It's the dead body of a junkie. Must've overdosed on Candy Crew drugs.";
          break;
        case 1:
          lootTitle.innerText = "What luck! A small box from the older days of the Academy.";
          break;
        case 2: 
          lootTitle.innerText = "It's an old backpack. It has tear marks- but from what?";
          break;
        case 3:
          lootTitle.innerText = "A skeleton, probably belonging to a dead student who was trapped here when part of the Academy collapsed.";
      }
      desStatus.innerText = "";
      $("#lootInt").show();
      break;
    case 1: 
      switch (graveEncounter) {
        case 0:
          enemyWp = 25;
          $("#combatInt").show();
          enemyType = "junkie";
          combatStatus.innerText = "A junkie attacks!";
          currentEnemy.innerText = "Current Enemy: Junkie";
          isCombat = true;
          break;
        case 1:
          enemyWp = 30;
          $("#combatInt").show();
          enemyType = "thug";
          combatStatus.innerText = "A thug attacks!";
          currentEnemy.innerText = "Current Enemy: Thug";
          isCombat = true;
          break;
        case 2:
          enemyWp = 35;
          $("#combatInt").show();
          enemyType = "robot";
          combatStatus.innerText = "A robot attacks!";
          currentEnemy.innerText = "Current Enemy: Robot";
          isCombat = true;
          break;
      }
      break;
  }
}

function addObjective (objective) {
  objMark.innerText = "[ " + objective + " ]";
  objList.innerHTML = "<b>[ " + objective + " ]</b><br/>" + objList.innerHTML;
}

function checkYouAreAt () {
  switch (currentLoc) {
    case 0: 
      youAreAt.innerText = "You are at the Fortress Room.";
      break;
    case 1: 
      youAreAt.innerText = "You are at the Fortress Exterior.";
      break;
    case 2: 
      youAreAt.innerText = "You are at Mr. Khan's Room.";
      break;
  }
}

setInterval(checkYouAreAt, 1000);

function checkDistance (num1, num2, div1, div2, spec, talk) {
  let numberCheckOne = parseInt(num1.substring(3));
  let numberCheckTwo = parseInt(num2.substring(3));

  let finalCheck = numberCheckOne - numberCheckTwo;
  console.log(finalCheck);

  if (finalCheck === 1) {
    $("#" + div2).hide();
    $("#mapDisplay").hide();
    display.style.backgroundColor = "green";

    setTimeout(function () {
      display.style.backgroundColor = "black";
      $("#" + div1).show();
      $("#" + spec).show();

      if (talk === true) {
        $("#talkInt").show();
      }

      formerShow = "#" + div1;
      if (div1 === "hallway1") {
        currentLoc = 1;
        $("#map1").hide();
      }

      else if (div1 === "khanclass") {
        currentLoc = 1;
        $("#map2").hide();
        $("#talkInt").hide();

        setTimeout(function () {
          weirdHum();
        }, 1000);
      }
    }, 50);
  }
}

// The Map!

const map1 = document.getElementById("map1");
const map2 = document.getElementById("map2");

map1.onclick = function () {
  if (currentLoc === 0) {
    // do nothing
  }
}

map2.onclick = function () {
  if (currentLoc === 1) {
    // do nothing
  }

  else {
    checkDistance("map2", "map1", "hallway1", "fort1", "night1", true);
    
    if (isNew === true) {
      addObjective("Talk to the Alliance guards in the hallway.");
    }
    
    $("#guard1").show();
    $("#guard2").show();
  }
}

map3.onclick = function () {
  if (currentLoc === 2) {
    // do nothing
  }

  else {
    checkDistance("map3", "map" + String(currentLoc + 1), "khanclass", "hallway1", "night1", true);
    $(".gui").hide();
    $("#talkInt").hide();
    $("#guard1").hide();
    $("#guard2").hide();
    $("#talkInt").hide();
  }
}

// Talking heads

const guard1 = document.getElementById("guard1");
const guard1t = document.getElementById("guard1t");
const guard2 = document.getElementById("guard2");
const guard2t = document.getElementById("guard2t");
const talkTitle = document.getElementById("talkTitle");
const sharon1t = document.getElementById("sharon1t");
const mark1t = document.getElementById("mark1t");
const eastside1t = document.getElementById("eastside1t");
const myron1t = document.getElementById("myron1t");
const clark1t = document.getElementById("clark1t");

function guardSpeak (which) {
  if (isNew === true) {
    if (which === 1) {
      guard1t.innerText = "I heard a weird noise. I think it came from Mr. Khan's room.";
      addObjective("Investigate Mr. Khan's room.");
      $("#map3").show();
    }

    else if (which === 2) {
      guard2t.innerText = "I heard a weird noise. I think it came from Mr. Khan's room.";
      addObjective("Investigate Mr. Khan's room.");
      $("#map3").show();
    }

    setTimeout(function () {
      isNew = false; 

      if (which === 1) {
        guard1t.innerText = "Click to talk.";
      }

      else if (which === 2) {
        guard2t.innerText = "Click to talk.";
      }
    }, 6000);
  }

  else {
    if (which === 1) {
      guard1t.innerText = "Haven't had Spice Road food in a while. I miss it.";
    }

    else if (which === 2) {
      guard2t.innerText = "Haven't had Spice Road food in a while. I miss it.";
    }

    setTimeout(function () { 
      if (which === 1) {
        guard1t.innerText = "Click to talk.";
      }

      else if (which === 2) {
        guard2t.innerText = "Click to talk.";
      }
    }, 5000);
  }
}

guard1.onclick = function () {
  guardSpeak(1);
}

guard2.onclick = function () {
  guardSpeak(2);
}