
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function changeImage(imageId, filename) {
  switch(imageId) {
    case 1:
        var image = document.getElementById('image1');
        break;
    case 2:
        var image = document.getElementById('image2');
        break;
    case 3:
        var image = document.getElementById('image3');
        break;
    }
  image.src = filename;
}


function getCarDoor() {
  carDoor = getRandomInt(1,3);
  return carDoor;
}


function getMontyDoor() {
  montyDoor = getRandomInt(1,3);
  while (montyDoor == carDoor || montyDoor == pickDoor) { montyDoor = getRandomInt(1,3); }
  return montyDoor;
}


function setPickDoor(pickDoor1) {
  if (hasPicked == false) {
    pickDoor = pickDoor1;
    document.getElementById("selection").innerHTML = "You picked door number " + pickDoor + "!";
    changeImage(pickDoor, "doorajar.jpg");
    console.log("pickDoor = " + pickDoor);
    montyDoor = getMontyDoor();
    console.log("montyDoor = " + montyDoor);
    document.getElementById("openDoor").innerHTML = 'Now <a href="https://en.wikipedia.org/wiki/Monty_Hall" target="_blank"> the gameshow host</a> \
      knows what is behind each door, and he opens another door (door ' + montyDoor + ') to show you a goat. <br> \
      Now you get the chance to switch to the other closed door (door ' + 'getotherdoor' + '). <br>What do you want to do - switch or stick?' ;
    changeImage(montyDoor, "goat.jpg");
    document.getElementById("switchOptionButton").innerHTML = '<table class="table1" style="width:20%"> \
      <tr><td><button onclick="clickSwitchDoor()">Switch</button></td> \
      <td><button onclick="clickStickDoor()">Stick</button></td></tr></table> ';
    hasPicked = true;
  }
}


function clickSwitchDoor() {
  console.log("Switch button pressed");
  switchDoor = [1,2,3];
  switchDoor.splice(switchDoor.indexOf(montyDoor),1);
  switchDoor.splice(switchDoor.indexOf(pickDoor),1);
  switchDoor = switchDoor[0];
  console.log("switchDoor = " + switchDoor);
  document.getElementById("switchOption").innerHTML = "You switched to door number " + switchDoor + "! Let's see what you won!";
  changeImage(pickDoor, "door.png");
  changeImage(switchDoor, "doorajar.jpg");
  document.getElementById("switchOptionButton").innerHTML = '<button onclick="getResult()">Open your door!</button>' ;
  hasSwitched = true;
}


function clickStickDoor()  {
  console.log("Stick button pressed");
  document.getElementById("switchOption").innerHTML = "You chose to stick with door number " + pickDoor  + "! Let's see what you won!" ;
  document.getElementById("switchOptionButton").innerHTML = '<button onclick="getResult()">Open your door!</button>' ;
}

function getResult() {
  console.log("getting result");
  console.log("hasSwitched: " + hasSwitched + ". carDoor: " + carDoor + ". switchDoor: " + switchDoor + ". pickDoor: " + pickDoor);
  if (hasSwitched == true) {
    if (switchDoor == carDoor) {
      winSwitch += 1 ;
      console.log("winSwitch") ;
      document.getElementById("result").innerHTML = 'You won the car!!' ;
    }
    else {
      loseSwitch += 1 ;
      console.log("loseSwitch") ;
      document.getElementById("result").innerHTML = 'You got a goat!' ;
    }
  }
  else if (hasSwitched == false) {
    if (pickDoor == carDoor) {
      winStick += 1 ;
      console.log("winStick") ;
      document.getElementById("result").innerHTML = 'You won the car!!' ;
     }
    else {
      loseStick += 1 ;
      console.log("loseStick") ;
      document.getElementById("result").innerHTML = 'You got a goat!' ;
    }
  }

  console.log("ending turn");
  var gamesPlayed = winSwitch+loseSwitch+winStick+loseStick;
  document.getElementById("td1a").innerHTML = gamesPlayed ;
  document.getElementById("td1b").innerHTML = winSwitch+winStick ;
  document.getElementById("td1c").innerHTML = ( 100 * (winSwitch+winStick)/(gamesPlayed) ).toFixed(1) ;
  document.getElementById("td2a").innerHTML = winSwitch+loseSwitch ;
  document.getElementById("td2b").innerHTML = winSwitch ;
  document.getElementById("td2c").innerHTML = ( 100 * winSwitch / (winSwitch+loseSwitch) ).toFixed(1) ;
  document.getElementById("td3a").innerHTML = winStick+loseStick ;
  document.getElementById("td3b").innerHTML = winStick ;
  document.getElementById("td3c").innerHTML = ( 100 * winStick / (winStick+loseStick) ).toFixed(1) ;
  document.getElementById("reset").innerHTML = '<button onclick="reset()">New game</button>';
}


function reset() {
  console.log("RESET");
  hasSwitched = false ;
  hasPicked = false;
  carDoor = 0 ;
  pickDoor = 0 ;
  switchDoor = 0 ;
  carDoor = getCarDoor();
  console.log("carDoor = " + carDoor);
  for (i = 1; i <= 3; i++) { changeImage(i, "door.png"); }
  document.getElementById("selection").innerHTML = "" ;
  document.getElementById("openDoor").innerHTML = "" ;
  document.getElementById("switchOption").innerHTML = "" ;
  document.getElementById("switchOptionButton").innerHTML = "" ;
  document.getElementById("result").innerHTML = "" ;
  document.getElementById("reset").innerHTML = "" ;

}



var winSwitch = 0;
var loseSwitch = 0;
var winStick = 0;
var loseStick = 0 ;

var hasSwitched = false;
var hasPicked = false;
var carDoor;
var pickDoor;
var switchDoor;



carDoor = getCarDoor();
console.log("carDoor = " + carDoor);
