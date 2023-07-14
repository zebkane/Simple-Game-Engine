let ctx;

function showError(error, fix, verbose) {
  const errorBox = document.createElement("div");

  errorBox.style.backgroundColor = "#F24C3D";
  errorBox.style.padding = "3rem";
  errorBox.style.borderRadius = "1rem";
  errorBox.style.position = "absolute";
  errorBox.style.left = "50%";
  errorBox.style.top = "50%";
  errorBox.style.transform = "translate(-50%, -50%)";
  errorBox.style.width = "70vw";
  errorBox.style.height = "70vh";
  errorBox.style.fontFamily = "sans-serif";

  let errorMessage = `${verbose.name}: ${verbose.message}`;
  if (verbose.stack) {
    const lineNumberMatches = verbose.stack.match(/:(\d+):\d+/);
    const lineNumber = lineNumberMatches && lineNumberMatches[1];
    if (lineNumber) {
      errorMessage += ` at line ${lineNumber}`;
    }
  }

  errorBox.innerHTML = `
    <h1 style="color: white;">
      !Simple Game Engine Error! <br><br>
      ${error}
    </h1>  
    <p style="color: white;">
    Potential fix: <br>
    ${fix}
    </p>
    <p style="color: white;">
    Verbose error: <br>
    ${errorMessage}</p>
  `;

  document.body.appendChild(errorBox);
}

// Classes
class Game {
  constructor({ s = { w: 500, h: 500 }, loop, name = "Simple Game Engine" }) {
    try {
      this.c;
      this.loop = loop;
      this.name = name;
      this.keys = {};
      this.targetFps = 61;
      this.s = s;
      this.lastTime;
      this.requiredElapsed;
      this.internalSetup(s);
      this.addEventListeners();
    } catch (error) {
      showError(
        "Game loop is not defined.",
        "Create loop function. [function loop() {}] => Add loop function to game initialization. [loop: loop,]",
        error
      );
    }
  }

  internalSetup(s) {
    try {
      this.requiredElapsed = 1000 / this.targetFps;
      const canvas = document.createElement("canvas");

      if (isNaN(s.w) || isNaN(s.h)) {
        throw new Error("Parameter is not a number!");
      }

      canvas.width = s.w;
      canvas.height = s.h;

      canvas.id = "canvas";

      document.body.appendChild(canvas);
      document.title = this.name;

      this.c = document.querySelector("#canvas");
      ctx = canvas.getContext("2d");
    } catch (error) {
      showError(
        "Internal canvas setup error.",
        "Ensure game size are of type number and in object format. [s: { w: ~, h: ~ }]",
        error
      );
    }
  }

  begin() {
    try {
      const loop = (now) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!this.lastTime) {
          this.lastTime = now;
        }

        let elapsed = now - this.lastTime;

        if (elapsed > this.requiredElapsed) {
          try {
            this.loop();
          } catch (error) {
            showError(
              "External error in game loop.",
              "Check code inside of defined loop function.",
              error
            );
          }

          this.lastTime = now;
        }

        requestAnimationFrame(loop);
      };

      loop();
    } catch (error) {
      showError(
        "Interal loop setup error. ",
        "Create loop function. [function loop() {}] => Add loop function to game initialization. [loop: loop,]",
        error
      );
    }
  }

  addEventListeners() {
    addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });
    addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });
  }

  key(key) {
    return this.keys[key];
  }

  add(item, value = null) {
    this[item] = value;
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  setFps(fps) {
    this.requiredElapsed = 1000 / fps;
  }
}

class Object {
  constructor({
    pos = { x: 50, y: 50 },
    s = { w: 50, h: 50 },
    color = "black",
    name = "defaltName",
    img = undefined,
  } = {}) {
    this.pos = pos;
    this.s = s;
    this.color = color;
    this.img = img;
    this.name = name;
    this.imgLoaded = false;

    this.loadImg();
  }

  loadImg() {
    try {
      if (this.img !== undefined) {
        this.imgSrc = this.img;
        this.img = new Image();
        this.img.onload = () => {
          this.imgLoaded = true;
        };
        this.img.src = this.imgSrc;
      }
    } catch (error) {
      errorBox(
        "Unable to load image for sprite " + this.name + ".",
        "Check that source path is correct.",
        error
      );
    }
  }

  add(item, value = null) {
    this[item] = value;
  }

  move({ x = 0, y = 0 }) {
    try {
      this.pos.x += x;
      this.pos.y += y;
    } catch (error) {
      errorBox(
        "Unable to run move function on sprite " + this.name + ".",
        "Ensure that parameter is of type number.",
        error
      );
    }
  }

  draw() {
    try {
      if (this.img === undefined) {
        ctx.fillStyle = this.color;
        if (this.s.r) {
          ctx.beginPath();
          ctx.arc(this.pos.x, this.pos.y, this.s.r, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(this.pos.x, this.pos.y, this.s.w, this.s.h);
        }
      } else {
        if (this.imgLoaded) {
          if (this.s.r) {
            ctx.drawImage(
              this.img,
              this.pos.x - this.s.r,
              this.pos.y - this.s.r,
              this.s.r * 2,
              this.s.r * 2
            );
          } else {
            ctx.drawImage(this.img, this.pos.x, this.pos.y, this.s.w, this.s.h);
          }
        }
      }
    } catch (error) {
      errorBox(
        "Unable to load image for sprite " + this.name + ".",
        "Check that source path is correct.",
        error
      );
    }
  }

  update() {
    this.draw();
  }
}

class Ui {
  constructor() {
    this.bars = [];
    this.barsIndex = {};
    this.numbers = [];
    this.numbersIndex = {};
  }

  bar({
    name,
    pos = { x: 0, y: 0 },
    s = { w: 200, h: 20 },
    color = "black",
    min = 0,
    max = 100,
    from = 50,
  } = {}) {
    this.bars.push({
      name: name,
      pos: pos,
      s: s,
      color: color,
      min: min,
      max: max,
      from: from,
    });
    this.barsIndex[name] = this.bars.length - 1;
  }

  number({
    pos = { x: 0, y: 0 },
    s = 48,
    color = "black",
    from = 50,
    min = 0,
    max = 1000,
    name,
  } = {}) {
    this.numbers.push({
      name: name,
      pos: pos,
      s: s,
      min: min,
      max: max,
      color: color,
      from: from,
    });
    this.numbersIndex[name] = this.numbers.length - 1;
  }

  updateNumber({ name, from }) {
    this.numbers[this.numbersIndex[name]].from = from;
  }

  updateBar({ name, from }) {
    this.bars[this.barsIndex[name]].from = from;
  }

  draw() {
    this.bars.forEach((bar) => {
      let range = bar.max - bar.min;
      let percent = bar.from / range;

      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      ctx.fillStyle = bar.color;
      ctx.fillRect(bar.pos.x, bar.pos.y, bar.s.w * percent, bar.s.h);

      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(bar.pos.x, bar.pos.y, bar.s.w, bar.s.h);
    });

    this.numbers.forEach((number) => {
      let numberDrawn = number.from;

      if (number.from < number.min) {
        numberDrawn = number.min;
      } else if (number.from > number.max) {
        numberDrawn = number.max;
      }

      ctx.fillStyle = number.color;
      ctx.font = `${number.s}px serif`;
      ctx.fillText(numberDrawn, number.pos.x, number.pos.y);
    });
  }

  update() {
    this.draw();
  }
}

class ParticleSystem {
  constructor({
    pos = { x: 0, y: 0 },
    s = { w: 10, h: 10 },
    pieces = 10,
    speed = 5,
    color = "black",
    friction = 0.95,
    dur = 3000,
    img = undefined,
  } = {}) {
    this.pos = pos;
    this.numberOfPieces = pieces;
    this.pieces = [];
    this.speed = speed;
    this.s = s;
    this.color = color;
    this.friction = friction;
    this.dur = dur;
    this.img = img;
    this.imgLoaded = false;

    this.loadImg();
    this.init();
  }

  loadImg() {
    try {
      if (this.img !== undefined) {
        this.imgSrc = this.img;
        this.img = new Image();
        this.img.onload = () => {
          this.imgLoaded = true;
        };
        this.img.src = this.imgSrc;
      }
    } catch (error) {
      errorBox(
        "Unable to load image for particle.",
        "Check that source path is correct.",
        error
      );
    }
  }

  init() {
    try {
      for (let i = 0; i < this.numberOfPieces; i++) {
        this.pieces.push({
          pos: {
            x: this.pos.x,
            y: this.pos.y,
          },
          v: {
            x: Math.random() * this.speed - this.speed / 2,
            y: Math.random() * this.speed - this.speed / 2,
          },
          s: this.s,
        });
      }

      setTimeout(() => {
        this.pieces = [];
      }, this.dur);
    } catch (error) {
      showError(
        "Internal particle initialization error.",
        "Ensure parameters are of propper type.",
        error
      );
    }
  }

  move() {
    try {
      if (isNaN(this.friction)) throw new Error();

      this.pieces.forEach((piece) => {
        piece.pos.x += piece.v.x;
        piece.pos.y += piece.v.y;

        piece.v.x *= this.friction;
        piece.v.y *= this.friction;

        if (Math.abs(piece.v.x) < 0.001) piece.v.x = 0;
        if (Math.abs(piece.v.y) < 0.001) piece.v.y = 0;
      });
    } catch (error) {
      showError(
        "Internal particle move error.",
        "Ensure friction is of type number.",
        error
      );
    }
  }

  draw() {
    try {
      if (this.img === undefined) {
        this.pieces.forEach((piece) => {
          ctx.fillStyle = this.color;
          ctx.fillRect(piece.pos.x, piece.pos.y, piece.s.w, piece.s.h);
        });
      } else {
        if (this.imgLoaded) {
          this.pieces.forEach((piece) => {
            ctx.drawImage(
              this.img,
              piece.pos.x,
              piece.pos.y,
              piece.s.w,
              piece.s.h
            );
          });
        }
      }
    } catch (error) {
      showError(
        "Internal particle draw error.",
        "Ensure parameters are of propper type.",
        error
      );
    }
  }

  update() {
    this.move();
    this.draw();
  }
}

// Functions
function route({ object1, object2, dir = "to", speed, type = "axis" }) {
  try {
    if (dir === "to") {
      if (type === "axis") {
        if (object1.pos.x < object2.pos.x) {
          object1.pos.x += speed;
        } else if (object1.pos.x > object2.pos.x) {
          object1.pos.x -= speed;
        }

        if (object1.pos.y < object2.pos.y) {
          object1.pos.y += speed;
        } else if (object1.pos.y > object2.pos.y) {
          object1.pos.y -= speed;
        }
      } else if (type === "trig") {
        let angle = Math.atan2(
          object2.pos.y - object1.pos.y,
          object2.pos.x - object1.pos.x
        );

        object1.pos.x += Math.cos(angle) * speed;
        object1.pos.y += Math.sin(angle) * speed;
      }
    } else if (dir === "away") {
      if (type === "axis") {
        if (object1.pos.x < object2.pos.x) {
          object1.pos.x -= speed;
        } else if (object1.pos.x > object2.pos.x) {
          object1.pos.x += speed;
        }

        if (object1.pos.y < object2.pos.y) {
          object1.pos.y -= speed;
        } else if (object1.pos.y > object2.pos.y) {
          object1.pos.y += speed;
        }
      } else if (type === "trig") {
        let angle = Math.atan2(
          object2.pos.y - object1.pos.y,
          object2.pos.x - object1.pos.x
        );

        object1.pos.x -= Math.cos(angle) * speed;
        object1.pos.y -= Math.sin(angle) * speed;
      }
    }
  } catch (error) {
    showError(
      `Error routing ${object1.name} ${dir} ${object2.name}.`,
      "Ensure speed parameter is passes. [{ speed: ~ }] Ensure objects have pos and s. [pos: { x: ~, y: ~ }, s: { -type=rect-(w: ~, h: ~) -type=circle-(r: ~) }]",
      error
    );
  }
}

function collide({ object1, object2, type = "rect" }) {
  try {
    if (type === "rect") {
      return (
        object1.pos.x + object1.s.w >= object2.pos.x &&
        object1.pos.x <= object2.pos.x + object2.s.w &&
        object1.pos.y + object1.s.h >= object2.pos.y &&
        object1.pos.y <= object2.pos.y + object2.s.h
      );
    } else if (type === "circle") {
      return (
        Math.abs(object1.pos.x - object2.pos.x) <= object1.s.r + object2.s.r &&
        Math.abs(object1.pos.y - object2.pos.y) <= object1.s.r + object2.s.r
      );
    }
  } catch (error) {
    showError(
      `Error colliding ${object1.name} and ${object2.name}.`,
      "Ensure objects have pos and s. [pos: { x: ~, y: ~ }, s: { -type=rect-(w: ~, h: ~) -type=circle-(r: ~) }]",
      error
    );
  }
}

module.exports = {
  Game: Game,
  Object: Object,
  ParticleSystem: ParticleSystem,
  Ui: Ui,
  route: route,
  collide: collide,
};
