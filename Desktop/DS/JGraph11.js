let matrix = [
  [0,   0,   0,   0,   0,   0,   1,   0,   0,   1],
  [0,   0,   1,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   0,   0,   1,   0],
  [0,   0,   0,   0,   1,   1,   0,   0,   1,   0],
  [0,   0,   0,   0,   1,   0,   0,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   1,   0,   0,   0],
  [0,   0,   0,   0,   0,   0,   1,   0,   1,   0],
  [0,   0,   1,   0,   0,   0,   0,   0,   0,   0],
  [0,   0,   0,   1,   1,   0,   0,   0,   1,   0],
  [0,   0,   0,   0,   1,   0,   0,   1,   0,   0],
];

let nM = (matrix) => {
for (let i=0; i <10; i++) {
  for (let j=0; j < 10 ; j++) {
   if((matrix[i][j] == 1) && (matrix[j][i] != 1)) {
       matrix[j][i] = 1;
   }
  }
 }
 return(matrix);
}
let nM1 = nM(matrix);



const number = (x, y, n) => {
  this.config.ctx.font = '12px serif';
  this.config.ctx.fillStyle = "black";
  this.config.ctx.fillText(n.toString(), x, y);
  ctx.arc(x,y,10,0, Math.PI / 2);
  ctx.stroke();
}


function draw () {

  alert('Hi');
}
