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

function connect(x1,y1,x2,y2,direct,backward)
    if (direct == 0) then
        xr = x2 - x1
        yr = y2 - y1
        k = yr / xr
        xx = sqrt((4^2)/(1+k^2));
        yy = xx * k;
        x1 = x1+xx;
        y1=yy+y1;
        if (x2 < x1) then
        xsegs([x1-8;x2+4],[y1;y2]);
    elseif (x2 ~= x1)  xsegs([x1;x2-xx],[y1;y2-yy]);
    else xsegs([x1;x2;],[y1+4;y2-4]);
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
        if (x2 < x1) then
        xarrows([x1-8;x2+4],[y1;y2],50,0);
    elseif (x1 ~= x2) xarrows([x1;x2-xx],[y1;y2-yy],50,0);
    else xarrows([x1;x2],[y1+4;y2-4],50,0);
    end
end;
endfunction;

function back(x,y,r)
    if (x<50) then
        circle(x-6,y,r-2);
    elseif (x>50) circle(x+6,y,r-2);
    end
endfunction

function connection(x1,x2,y1,y2) 
    deff("[y]=f(x)","y=sin(x)+cos(x)")
    x=[28:0.1:45]*%pi/10;
    fplot2d(x,f)
    fplot2d(1:10,'parab')
    deff("[y]=f(x)","y=sin(x)+cos(x)")
    x=[0:0.1:10]*%pi/10;
    fplot2d(x,f)
    fplot2d(1:10,'parab')
endfunction
function connection(x1,y1,x2,y2)
     
        xsegs([x1;x2+15],[y1-4;y2]);
        xsegs([x2+15;x2+4],[y2;y2]);
endfunction




connect(10,10,65,45,0);
connect(30,10,50,10,0);
connect(50,10,35,45,0);
connect(35,45,90,10,0);
connect(35,45,70,10,0);
connect(70,10,75,30,0);
connect(25,30,90,10,0);
connect(65,45,35,45,0);
connect(65,45,50,65,0);
connect(70,10,90,10,0);
connect(75,30,65,45,0);
connect(50,65,50,10,0);
connect(10,10,25,30,0);
connection(50,65, 25, 30);
back(10,10,4);
back(35,45,4);
back(65,45,4);
back(90,10,4);

