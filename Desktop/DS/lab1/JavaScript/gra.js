<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 1 Ћабораторна робота з ƒискретноъ математики</title>
    <style>
        body {
          background: bisque;
        }
        canvas {
          display: block;
          margin: auto;
          margin-top: 70px;
          border-radius: 20px;
          background: white;
          border: 1px solid black;
        }
        .nav {
            height: 50px;
            width: 450px ;
            margin: 0 auto;
        }
        a {
            font-size: 20px;
            padding-right: 50px;
            box-sizing : border-box;
        }
      </style>
</head>
<body onload="draw([
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
[0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
[0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]);">
    <div class="nav">
        <a href="index.html">ќр≥Їнтований граф</a>
        <a href="index1.html">Ќеор≥Їнтований граф</a>
    </div>
    <canvas id='canvas'> </canvas>
    <script>
        'use strict';

function draw(matrix) {
    var canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 450;
    if (canvas.getContext) {
var ctx = canvas.getContext('2d');
ctx.font = '8px Tahoma';
//ctx.lineWidth = '0.2';
var point = [[120,75], [270,75], [420,75], [570,75], [720,75], [120,225], [120,375], [470,275], [420,375], [720,225], [720,375] ];
var couple = [];

function canvas_arrow(fromX, fromY, toX, toY, pointFrom, pointTo) {
    
    const arrowSize = 8;
    let dx = toX - fromX;
    let dy = toY - fromY;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(fromX, fromY);
    const angle = Math.atan2(dy, dx);

 /*   if (pointFrom >= 1 && pointFrom <= 5 && pointTo >=1 && pointTo <= 5 && pointTo !== pointFrom  && fromY === toY ) {
    ctx.lineTo(fromX, fromY - 20);
    ctx.lineTo(toX, toY - 20);
    }
    else if (pointFrom === 7 || pointFrom === 9 || pointFrom === 11 && fromY === toY) {
    ctx.lineTo(fromX, fromY + 20);
    ctx.lineTo(toX, toY + 20);
    }
    else if (pointFrom === 1 || pointFrom === 6 || pointFrom === 7 && fromX === toX ) {
    ctx.lineTo(fromX - 20 , fromY);
    ctx.lineTo(toX -20 , toY);
    }
    else if ( pointFrom === 5 || pointFrom === 10 || pointFrom === 11 && fromX === toX ) {
    ctx.lineTo(fromX + 20 , fromY);
    ctx.lineTo(toX  + 20 , toY);
    }
*/
        ctx.lineTo(toX, toY);
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle - Math.PI / 6),
        toY - arrowSize * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowSize * Math.cos(angle + Math.PI / 6),
        toY - arrowSize * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}


//¬изначаЇмо пари вершин €к≥ мають зв'€зок
for ( let i = 0; i < matrix.length; i++) {
    for ( let j = 0; j < 11; j++) {
        if ( matrix[i][j] === 1 ) {
            couple.push([i+1, j+1]);
        } 
    }
}

//ЅудуЇмо циклом 11 вершин, координати €ких вказан≥ у массив≥ point
function drawCircle(i) {
    ctx.beginPath();
    ctx.arc(point[i][0], point[i][1], 15, 0, Math.PI*2, true);
    ctx.closePath();
    if (i < 9) {
    ctx.fillText(`${i+1}`, point[i][0]-2, point[i][1]+3);
    }
    else {
        ctx.fillText(`${i+1}`, point[i][0]-4, point[i][1]+3);
    }
    if (i !== point.length - 1) {
    ctx.moveTo(point[i+1][0]+15, point[i+1][1]);
    }
    ctx.stroke();
}
//¬их≥дн≥ точки
let output = [];

//¬х≥дн≥ точки
let input = [];
// —тр≥лки будуть виходити з л≥вого ≥ правого бок≥в вершини а заходити зверху ≥ знизу

//ƒл€ кожноњ вершини визначаЇмо вих≥д≥н≥ ≥ вх≥д≥н≥ точки
for ( let i = 0; i < 11; i++) {
    output[i] = {
        right : [ point[i][0]+15, point[i][1] ],
        left : [ point[i][0]-15, point[i][1] ]
    };
    input[i] = {
        top : [ point[i][0], point[i][1] - 15],
        bottom : [ point[i][0], point[i][1] + 15]
    };
}
//------------------------------------------------------------------
console.log(matrix);


//ћалюЇмо напр€млен≥ стр≥лки
    for ( let i = 0; i < couple.length; i++ ) {
        let fromX;
        let fromY;
        let toX;
        let toY;

        if (couple[i][0] === couple[i][1]) {
            ctx.beginPath();
            ctx.arc(point[couple[i][0] - 1][0], point[couple[i][0] - 1][1] - 22, 7, 0, 2*Math.PI)
            ctx.stroke();
        }else if (point[couple[i][0] - 1][0] < point[couple[i][1] - 1][0]) {
           fromX = output[couple[i][0]-1].right[0];
           fromY = output[couple[i][0]-1].right[1];
            if (point[couple[i][0] - 1][1] < point[couple[i][1] - 1][1]) {
            toX = input[couple[i][1]-1].top[0]; 
            toY = input[couple[i][1]-1].top[1];
            } else {
                toX = input[couple[i][1]-1].bottom[0];
                toY = input[couple[i][1]-1].bottom[1];
            }
        } else {
            fromX = output[couple[i][0]-1].left[0]; 
            fromY = output[couple[i][0]-1].left[1];
            if (point[couple[i][0] - 1][1] < point[couple[i][1] - 1][1]) {
                toX = input[couple[i][1]-1].top[0]; 
                toY = input[couple[i][1]-1].top[1];
            } else {
                toX = input[couple[i][1]-1].bottom[0];
                toY = input[couple[i][1]-1].bottom[1];
            }
        }
canvas_arrow(fromX, fromY, toX, toY, couple[i][0], couple[i][1]);
    }
    for (let i = 0; i < point.length; i++) {
        drawCircle(i)
    }
    }
}

    </script>

    
</body>
</html>