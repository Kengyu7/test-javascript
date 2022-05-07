const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Ball {
  constructor(x, y, velX, velY, color, size, id) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.id= id;
    
  }

  getDegree(x, y, x2, y2) {
    radian = Math.atan2(y2 - y,x2 - x);
    degree = arcLineMargineRadian * 180 / Math.PI;
    return degree;
  }

  getVelocity(vx,vy,degree){
    
  }
  
  momentumCalculation(m1,m2,v1,v2){
    let v = ((m1-m2)*v1 + 2*m2*v2)/(m1+m2);
    return v
  }

  updateVelx(vx){
    this.velX=vx;
  }

  updateVelyy(vy){
    this.velY=vy;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;

    this.collisionDetect();
  }

  collisionDetect() {
    for (let j = this.id; j < balls.length; j++) {
      if (!(this === balls[j])) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + balls[j].size) {

          let a;
          a = this.momentumCalculation(1,1,this.velX,balls[j].velX);
          balls[j].velX = this.momentumCalculation(1,1,balls[j].velX,this.velX);
          this.velX = a;

          a = this.momentumCalculation(1,1,this.velY,balls[j].velY);
          balls[j].velY = this.momentumCalculation(1,1,balls[j].velY,this.velY);
          this.velY = a;


        }
      }
    }
  }
}



let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

let balls = [];

for(let i=0;i<100;i++){
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
    size,
    i,
  );
  console.log(ball);

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    console.log(balls[i]);

  }

  requestAnimationFrame(loop);
}

loop();
