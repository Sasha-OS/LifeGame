
rand("seed", 9504);
T = rand(10,10) + rand(10,10);
A = floor((1.0-0.02-4*0.005-0.25)*T);
disp(A);
for i=1:10 
    for j=1:10 
        if(A(i,j)==1 && A(j,i)~=1) then 
            A(j,i)=1; 
        end 
    end    
end
disp(A);


clf;
plot2d([0,100], [0,100],0);

function circle(x, y, r)
        xarc(x-r, y+r, 2*r, 2*r, 0, 64*360);
endfunction;



function coord = vertex(x, y, n)
    global Vmatrix;
    circle(x,y,4);
    xnumb(x-1,y-1,n);
    coord = [x; y];
    Vmatrix(:, n) = coord;
endfunction;
// Задання цетрів кіл та номерів
vertex(10,10, 1);
vertex(30,10, 2);
vertex(50,10, 3);
vertex(70,10, 4);
vertex(90,10, 5);
vertex(25,30, 10);
vertex(35,45, 9);
vertex(50,65, 8);
vertex(75,30, 6);
vertex(65,45, 7);


function connect(x1,y1,x2,y2,direct)
    if (direct == 0) then
        xr = x2 - x1
        yr = y2 - y1
        k = yr / xr
        xx = sqrt((4^2)/(1+k^2));
        yy = xx * k;
        x1 = x1+xx;
        y1=yy+y1;
          if ((y2 == y1) && (x2 < x1)) then
            xsegs([x1-2*xx;x2+xx],[y2;y1]);
       elseif ((x2 < x1) && (y2 < y1))
        xsegs([x1-xx;x2+xx],[y1-2*yy;y2+yy]);
        elseif ((x2 < x1) && (y2 > y1))
        xsegs([x1-2*xx;x2+xx],[y1-2*yy;y2+yy]);
       
    elseif (x1 ~= x2) xsegs([x1;x2-xx],[y1;y2-yy]);
    else xsegs([x1;x2],[y1-4;y2+4]);
    end
end
if  (direct == 1)then
     xr = x2 - x1
        yr = y2 - y1
        k = yr / xr
        xx = sqrt((4^2)/(1+k^2));
        yy = xx * k;
        x1 = x1+xx;
        y1=yy+y1;
        if ((y2 == y1) && (x2 < x1)) then
            xarrows([x1-2*xx;x2+xx],[y2;y1],50,0);
       elseif ((x2 < x1) && (y2 < y1))
        xarrows([x1-xx;x2+xx],[y1-2*yy;y2+yy],50,0);
        elseif ((x2 < x1) && (y2 > y1))
        xarrows([x1-2*xx;x2+xx],[y1-2*yy;y2+yy],50,0);
       
    elseif (x1 ~= x2) xarrows([x1;x2-xx],[y1;y2-yy],50,0);
    else xarrows([x1;x2],[y1-4;y2+4],50,0);
    end
end
endfunction;

function back(x,y,r)
    if (x<50) then
        circle(x-6,y,r-2);
    elseif (x>50) circle(x+6,y,r-2);
    end
endfunction

function connection(x1,y1,x2,y2)
        xsegs([x1;x2+15],[y1-4;y2]);
        xarrows([x2+15;x2+4],[y2;y2], 50, 0);
endfunction


function backward(x1,y1,x2,y2)
        xr = x2 - x1
        yr = y2 - y1
        k = yr / xr
        xx = sqrt((4^2)/(1+k^2));
        yy = xx * k;
        x1 = x1+xx;
        y1 = yy+y1;
            xz = (x1+x2)/2;
            yz = (y1+y2)/2;
                 xsegs([x1-2*xx;45],[y1-2*yy;yz]);
                 xarrows([45;x2+xx],[yz;y2+yy],50,0);
                 
endfunction;

connect(10,10,65,45,1);
connect(30,10,50,10,1);
connect(50,10,35,45,1);
connect(35,45,90,10,1);
connect(35,45,70,10,1);
connect(70,10,75,30,1);
connect(25,30,90,10,1);
connect(65,45,35,45,1);
connect(65,45,50,65,1);
connect(70,10,90,10,1);
connect(75,30,65,45,1);
connect(50,65,50,10,1);
connect(10,10,25,30,1);
connection(50,65, 25, 30);
backward(70,10,35,45);
back(35,45,4);
back(65,45,4);
back(90,10,4);
