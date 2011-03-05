var h = 500,
	w = 500;

/* http://paulirish.com/2011/requestanimationframe-for-smart-animating/ */
window.requestAnimFrame = (function () {
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function(/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		  };
})();

function Ball (options) {
	this.x = options.x || 100;
	this.y = options.y || 100;
	this.vx = options.vx || 0;
	this.vy = options.vy || 0;
	this.radius = options.radius || 15;
	this.color = options.color || "blue";
	this.backgroundColor = options.backgroundColor || "white";
}

Ball.prototype.accelerate = function (acc) {
	var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
	if ( landscapeOrientation) {
		this.vx += acc.y;
		this.vy += acc.x;
	} else {
		this.vx += acc.x;
		this.vy -= acc.y;
	}

	this.x += this.vx * 0.1;
	this.y += this.vy * 0.1;

	if (this.x < 0 + this.radius) {
		this.x = 0 + this.radius;
		this.vx = -this.vx * 0.8;
	}
	if (this.y < 0 + this.radius) {
		this.y = 0 + this.radius;
		this.vy = -this.vy * 0.8;
	}
	if (this.x > h - this.radius) {
		this.x = h - this.radius;
		this.vx = -this.vx * 0.8;
	}
	if (this.y > w - this.radius) {
		this.y = w - this.radius;
		this.vy = -this.vy * 0.8;
	}
};

Ball.prototype.draw = function(context) {
	context.fillStyle = this.backgroundColor;
	context.fillRect(0, 0, w, h);

	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	context.closePath();
	context.fill();
};

var canvas = document.getElementById("field");
var context = canvas.getContext("2d");
var ball = new Ball({x: 100, y: 100, radius: 15});

window.ondevicemotion = function (e) {
	ball.accelerate(e.accelerationIncludingGravity);
};

(function loop() {
	ball.draw(context);
	requestAnimFrame(loop);
})();
