var timer = {
  minutes: 0,
  seconds: 0,
  id: 0,
}

/**************************
this function is the value updating function that update the value of the H2 spam of HTML code
**************************/
function updateValue(key, value) {
  var output = document.getElementById(key);

  if(value < 0 || value == "") {
    value = 0;
  }
  if(key == "minutes") {
    if(value > 119) {
      value = 119;
    }
  }
  if(key == "seconds") {
    if(value > 59) {
      value = 59;
    }
    if(value < 10) {
      value = "0" + value;
    }
  }
  output.innerHTML = value;
  timer[key] = value;
  return arguments.callee;
}
// The end of change detector function

/**************************
this function is the change detector function that detect the change in input of minutes and seconds from input field of HTML code
**************************/
(function detectChanges(key) {
  var input = key + "Input";
  var inputSelector = document.getElementById(input);

  inputSelector.addEventListener("change", function() {
    frezzStartButton();
    updateValue(key, inputSelector.value);
    timer[key] = inputSelector.value;
  });

  inputSelector.addEventListener("keyup", function() {
    frezzStartButton();
    updateValue(key, inputSelector.value);
    timer[key] = inputSelector.value;
  });

  return arguments.callee; // We do not understand this line...
})("minutes")("seconds");
// The end of change detector function

/**************************
this part is for starting, stopping and pauseing buttons of the timer
**************************/

// starting timer function
function startTimer() {

  buttonManager(["start", false], ["stop", true], ["pause", true]);

  timer.id = setInterval(function() {
    timer.seconds--;
    if(timer.seconds < 0) {
      if(timer.minutes == 0) {
        alarm();
        return stopTimer();
      }
      timer.minutes--;
      timer.seconds = 59;
    }
    //tick();
    updateValue("minutes", timer.minutes);
    updateValue("seconds", timer.seconds);
  }, 1000);
  frezzInput("minutes")("seconds")
}

// stopoing timer function
function stopTimer() {

  buttonManager(["start", true], ["stop", false], ["pause", false]);

  clearInterval(timer.id);
  timer.minutes = document.getElementById("minutesInput").value;
  timer.seconds = document.getElementById("secondsInput").value;

  updateValue("minutes", timer.minutes);
  updateValue("seconds", timer.seconds);
  unfrezzInput("minutes")("seconds");
}

// pauseing timer function
function pauseTimer() {

  buttonManager(["start", true], ["stop", true], ["pause", false]);

  clearInterval(timer.id);
}
// The end of timer controllers function

function frezzInput(key) {
  var input = key + "Input";
  var inputSelector = document.getElementById(input);
  inputSelector.setAttribute("disabled", "disabled");
  return arguments.callee;
}

function unfrezzInput(key) {
  var input = document.getElementById(key + "Input");
  input.removeAttribute("disabled");
  return arguments.callee;
}

function frezzStartButton() {
  var minutes = document.getElementById("minutesInput").value;
  var seconds = document.getElementById("secondsInput").value;

  if((minutes == "" && seconds == "") || (minutes == "0" && seconds == "0") || (minutes == "0" && seconds == "") || (minutes == "" && seconds == "0")) {
    buttonManager(["start", false], ["stop", false], ["pause", false]);
  }else {
    buttonManager(["start", true], ["stop", false], ["pause", false]);
  }

}
frezzStartButton();

function buttonManager(...buttonArray) {
  for(var i = 0; i < buttonArray.length; i++) {
    var button = buttonArray[i][0] + "Button";
    var buttonSelector = document.getElementById(button);
    if(buttonArray[i][1] == true) {
      buttonSelector.removeAttribute("disabled");
    }else {
      buttonSelector.setAttribute("disabled", "disabled");
    }
  }
}

function alarm() {
  var audio = new Audio('Timer_Sound_Effect.mp3');
  audio.play();
}

function tick() {
  var audio = new Audio('Clock_Ticking_Effect.mp3');
  audio.play();
}

(function maxValues() {
  var minutes = document.getElementById("minutesInput");
  var seconds = document.getElementById("secondsInput");

  minutes.addEventListener("change", function(){
    if(minutes.value > 119) {
      minutes.value = 119;
    }
  })

  minutes.addEventListener("keyup", function(){
    if(minutes.value > 119) {
      minutes.value = 119;
    }
  })

  seconds.addEventListener("change", function(){
    if(seconds.value > 59) {
      seconds.value = 59;
    }
  })

  seconds.addEventListener("keyup", function(){
    if(seconds.value > 59) {
      seconds.value = 59;
    }
  })

})();
