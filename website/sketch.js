let connected = false;
let hasGP = false;
let gp;

let fb = 0;
let rl = 0;
let rot = 0;

const speed = 4;

let img;

var robot;

var leftWall;
var topWall;
var rightWall;
var bottomWall;

var rects = [robot, leftWall, topWall, rightWall, bottomWall];

function preload() {
  img = loadImage('field.jpg');
}

function setup() {
  createCanvas(1584, 644);
  image(img, 0, 0);

  robot = new Rect(40, 40, width/2, height/2, 0, 70, 0);
  robot.a = 0;

  leftWall = new Rect(82, 644, 172, 322, 0, 0, 1);
  topWall = new Rect(1163, 39, 796, 15, 0, 0, 2);
  rightWall = new Rect(82, 644, 1414, 322, 0, 0, 3);
  bottomWall = new Rect(1159, 35, 793, 626, 0, 0, 4);
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
  image(img, 0, 0);

  if(Math.abs(rl) > 0.2 || Math.abs(fb) > 0.2) {
    robot.x += rl*speed;
    robot.y += fb*speed;
  }
  if(Math.abs(rot) > 0.2) {
    robot.a += rot*0.05;
  }

  robot.draw();
  //leftWall.draw();
  //topWall.draw();
  //rightWall.draw();
  //bottomWall.draw();

  if(connected) {
    gp = navigator.getGamepads()[0];
    fb = gp.axes[1];
    rl = gp.axes[0];
    rot = gp.axes[2];
  }
}

class Rect {
  constructor(w, h, x, y, a, c, t) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.a = a;
    this.c = c;
    this.t = t;
  }
  
  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.a);
    fill(this.c);
    rect(-this.w/2, -this.h/2, this.w, this.h);
    pop();
  }
}