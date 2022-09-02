const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let myFrameCount = 0;
let car = new Image();
car.src = "../images/car.png";
let points = 0;

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  class Player {
    constructor(img, x, y) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.width = 50;
      this.height = 75;
    }
    updatePlayer() {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    movePlayer(keyCode) {
      if (keyCode === 37) this.x -= 5;
      if (keyCode === 39) this.x += 5;
    }
  }

  class Obstacule {
    constructor(x, y, width, height, color) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;
    }
    drawObstacule() {
      ctx.fillRect(this.x, this.y, this.width, this.height)
      ctx.fillStyle = this.color;
    }
    updateObstacule() {
      this.y += 1;
      if (this.y > canvas.height - this.height) {
        return true;
      }
      return false;
    }
  }

  let obstaculePosition = [];
  for (let i = 0; i < obstaculePosition.length; i++) {
    obstaculePosition[i];
  }

  const raceCar = new Player(car, (canvas.width / 2) - 25, canvas.height - 75);

  function col(obstacule) {
    if (raceCar.x < obstacule.x + obstacule.width && raceCar.x + raceCar.width > obstacule.x && raceCar.y < obstacule.y + obstacule.height && raceCar.y + raceCar.height > obstacule.y) {
      return true
    }
  }

  function startGame() {
    raceCar.updatePlayer();
    document.addEventListener('keydown', (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raceCar.movePlayer(e.keyCode)
      raceCar.updatePlayer();
    });
    myIntervalId = setInterval(() => {
      myFrameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raceCar.updatePlayer()
      if (myFrameCount % 250 === 0) {
        obstaculePosition.push(new Obstacule(Math.random() * (canvas.width - 75), 0, Math.random() * (canvas.width - 40), 25, "red"));
      }
      for (let i = 0; i < obstaculePosition.length; i++) {
        if (obstaculePosition[i].updateObstacule()) {
          obstaculePosition.splice(i, 1);
        }

      }
      for (let i = 0; i < obstaculePosition.length; i++) {
        obstaculePosition[i].drawObstacule()
        if (col(obstaculePosition[i])) {
          clearInterval(myIntervalId);
        }
      }
    }, 20)
  }
};