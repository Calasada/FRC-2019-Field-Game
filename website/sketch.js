let connected = false;
let hasGP = false;
let gp;

let fb = 0;
let rl = 0;
let rot = 0;

let x;
let y;
let angle;

const speed = 4;

let img;

function preload() {
  img = loadImage('field.jpg');
}

function setup() {
  createCanvas(700, 700);
  image(img, 0, 0);
  x = width/2;
  y = height/2;
  angle = 0;
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

  if(Math.abs(rl) > 0.2 || Math.abs(fb) > 0.2) {
    x += rl*speed;
    y += fb*speed;
  }
  if(Math.abs(rot) > 0.2) {
    angle += rot*0.05;
  }
  translate(x, y);
  rotate(angle);

  stroke(255);
  noFill();
  square(-20, -20, 40);

  if(connected) {
    gp = navigator.getGamepads()[0];
    fb = gp.axes[1];
    rl = gp.axes[0];
    rot = gp.axes[2];
  }
}