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
  function connect (x1,y1,x2,y2) {
    let canvas = document.getElementById('graph2');
    if (canvas.getContext) {
      let ctx = canvas.getContext('2d');
    } 
      xr = x2 - x1;
      yr = y2 - y1;
      k = yr / xr;
      xx = Math.sqrt((4^2)/(1+k^2));
      yy = xx * k;
      x1 = x1 + xx;
      y1 = y1 + yy;
        if ((y2 == y1) && (x2 < x1)) {
      ctx.moveTo(x1-2*xx,y2);
      ctx.lineTo(x2+xx,y1);
      ctx.stroke();
      }
        else if ((x2 < x1) && (y2 < y1)) {
      ctx.moveTo(x1-xx,y1-2*yy);
      ctx.lineTo(x2+xx,y2+yy);
      ctx.stroke();
      }
        else if ((x2 < x1) && (y2 > y1)) {
      ctx.moveTo(x1-2*xx,y1+2*yy);
      ctx.lineTo(x2+xx,y2-yy);
      ctx.stroke();
      }
        else if (x1 = x2) {
          ctx.moveTo(x1,y1);
          ctx.lineTo(x2-xx,y2-yy);
          ctx.stroke();
      }
        else {
        ctx.moveTo(x1,y1-yy);
        ctx.lineTo(x2,y2+yy);
        ctx.stroke();
      }
 }
 connect(200,200,50,50);
}
