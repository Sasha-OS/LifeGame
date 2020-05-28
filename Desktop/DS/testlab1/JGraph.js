const Graph = function(ctx, adjM, directed = false, radius = 10) {
    this.directed = directed;
    this.adjM = adjM;
    this.vertices = [];
    this.ctx = ctx;
    this.radius = radius;
  };
  
  Graph.prototype.connect = function(v1, v2, directed = false, double = false) {
    this.ctx.beginPath()
    if (v1 === v2) {
      this.ctx.arc(v1.x + 7, v1.y + 14, this.radius - 3, 0, 2 * Math.PI);
      this.ctx.stroke();
      if (directed) {
        v1.out++;
        v1.in++;
      } else {
        v1.deg += 2;
      }
      return;
    }
    const xr = v2.x - v1.x;
    const yr = v2.y - v1.y;
    const k = yr / xr;
    const xinter = Math.sqrt((this.radius ** 2)/(1 + k ** 2));
    const yinter = k * xinter; 
    if (directed) {
      v1.out++;
      v2.in++;
     
      if (v1.x === v2.x) {
        if (v2.y > v1.y) {
          canvas_arrow(this.ctx, v1.x, v1.y + this.radius, v2.x, v2.y - this.radius);
        } else {
          canvas_arrow(this.ctx, v1.x, v1.y - this.radius, v2.x, v2.y + this.radius);
        }
      } else {
        if (v2.x < v1.x) {
          canvas_arrow(this.ctx, v1.x - xinter, v1.y - yinter, v2.x + xinter, v2.y + yinter);
        } else {
          canvas_arrow(this.ctx, v1.x + xinter, v1.y + yinter, v2.x - xinter, v2.y - yinter);
        }
      }
    } else {
      
      v1.deg++;
      v2.deg++;
      
      if (v1.x === v2.x) {
        if (v2.y > v1.y) {
          this.ctx.moveTo(v1.x, v1.y + this.radius);
          this.ctx.lineTo(v2.x, v2.y - this.radius);
        } else {
          this.ctx.moveTo(v1.x, v1.y - this.radius);
          this.ctx.lineTo(v2.x, v2.y + this.radius);
        }
      } else {
        if (v2.x < v1.x) {
          this.ctx.moveTo(v1.x - xinter, v1.y - yinter);
          this.ctx.lineTo(v2.x + xinter, v2.y + yinter);
        } else {
          this.ctx.moveTo(v1.x + xinter, v1.y + yinter);
          this.ctx.lineTo(v2.x - xinter, v2.y - yinter);
        }
      }
    }
    if (double) {
      
      v1.in++;
      v2.out++;
      
      const d = Math.sqrt((v2.x - v1.x) ** 2 + (v2.y - v1.y) ** 2);
      const k = (v2.y - v1.y) / (v2.x - v1.x);
      const phi = Math.atan(k);
      this.ctx.save();
      this.ctx.translate(v1.x, v1.y);
      this.ctx.rotate(phi);
      this.ctx.moveTo(this.radius, 0);
      canvas_arrow(this.ctx, d / 2, d / 8, this.radius, 0)
      this.ctx.moveTo(d / 2, d / 8);
      this.ctx.lineTo(d - this.radius, 0);
      this.ctx.restore();
    }
    this.ctx.stroke();
  };
  
  Graph.prototype.vertex = function(x, y, n) {
    const v = {
      x: x, 
      y: y, 
      num: n, 
      in: 0, 
      out: 0,
      deg: 0, 
    };
    this.vertices[n - 1] = v;
  };
  
  Graph.prototype.draw = function() {
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    for (const vert of this.vertices) {
      this.ctx.beginPath();
      this.ctx.arc(vert.x, vert.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillText(vert.num, vert.x, vert.y);
      this.ctx.stroke();
    }
    if (!this.directed){
      for (const i in this.adjM) {
        for (const j in this.adjM[i]) {
          if (this.adjM[i][j] === 1 && i > j) {
            const v1 = this.vertices[i];
            const v2 = this.vertices[j];
            this.connect(v1, v2);
          } else if (i === j && this.adjM[i][j] === 1) {
            const v1 = this.vertices[i];
            this.connect(v1, v1);
          }
        }
      }
    } else {
      for (const i in this.adjM) {
        for (const j in this.adjM[i]) {
          if (this.adjM[i][j] === 1 && this.adjM[j][i] !== 1) {
            const v1 = this.vertices[i];
            const v2 = this.vertices[j];
            this.connect(v1, v2, true);
          }
          else if (this.adjM[i][j] === 1 && this.adjM[j][i] === 1 && i >= j) {
            const v2 = this.vertices[i];
            const v1 = this.vertices[j];
            this.connect(v1, v2, true, true);
          }
        }
      }
    }
  };
  
  Graph.prototype.triangle = function() {
    for (let i = 1; i <= 10; i++) {
      let x = 100 * i;
      let y = 50;
      if (i == 6) {
        x = 165;
        y= 170;
      };
      if( i == 7) {
        x = 200;
        y = 300;
      };
      if( i == 8) {
        x = 300;
        y = 500;
      };
      if (i == 9) {
        x = 430;
        y = 170;
      };
      if (i == 10) {
        x = 400;
        y = 300;
      };
      this.vertex(x, y, i);
    }
    this.draw();
  };
  
  Graph.prototype.degree = function(container) {
    let result = '';
    let info = '';
    let homo = true;
    if (this.directed) homo = false;
    const Degree = this.vertices[0].deg;
    
    for (let vert of this.vertices) {
      if (!this.directed) {
        if (vert.deg !== Degree) homo = false;
        info = `Vertex: ${vert.num}, deg: ${vert.deg}<br>`;
        } else {
        info = `Vertex: ${vert.num}, In: ${vert.in}, Out: ${vert.out}<br>`;
      }
      result += info;
    }
    
    for (let vert of this.vertices) {
        if (vert.deg === 0 && (vert.in === 0 && vert.out === 0)) {
          result += `Isolated vertex ${vert.num}<p>`;
        } else if  ((vert.deg === 1) || (vert.in === 1 && vert.out === 0) || (vert.out === 1 && vert.in === 0)) {
          result += `Leaf vertex ${vert.num}><p>`;
        } 
      }
    if (homo) result += 'Graph is homogenous';
    container.innerHTML = result;
  };

  const canvas_arrow = (context, fromx, fromy, tox, toy) => {
    const headlen = 10; // length of head in pixels
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }