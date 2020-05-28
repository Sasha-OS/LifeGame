      xr = toX - fromY;
      yr = toY - fromY;
      k = yr / xr;
      xx = Math.sqrt((4^2)/(1+k^2));
      yy = xx * k;
      x1 = x1 + xx;
      y1 = y1 + yy;
        if ((toY == fromY) && (toX < fromX)) {
      ctx.moveTo(fromX-2*xx,toY);
      ctx.lineTo(toX+xx,fromY);
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

      /*
      x1 = fromX;
      x2 = toX;
      y1 = fromY;
      y2 = toY;
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

      */