let connected = false;
let hasGP = false;
let gp;

let fb = 0;
let rl = 0;
let rot = 0;

function setup() {
  createCanvas(700, 700);
  background(70);
}

$(window).on("gamepadconnected", function() {
  connected = true;
  $("#gamepadPrompt").html("Gamepad connected!");
  console.log("connection event");
});

var checkGP = window.setInterval(function() {
  console.log('checkGP');
  if(navigator.getGamepads()[0]) {
      if(!hasGP) $(window).trigger("gamepadconnected");
      window.clearInterval(checkGP);
  }
}, 500);

function draw() {
  stroke(255);
  noFill();
  square(width/2, height/2, 40);
  if(connected) {
    gp = navigator.getGamepads()[0];
    fb = -gp.axes[1];
    rl = gp.axes[0];
    rot = gp.axes[2];
  }
}