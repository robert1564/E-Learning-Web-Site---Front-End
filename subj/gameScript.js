var rows = document.getElementById('rows');
var cols = document.getElementById('cols');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var rowS = 0,colS = 0;

canvas.addEventListener('mousedown', handleClick);

var placed = 0;

var arrayRef,solRef;
var startX = 0,startY = 0,endX = 0, endY = 0;

function solve(){
    if(findPath( startX, startY, "down")){
        colorPath();
    }
    else
        alert('No Path Found');
}


function findPath(x, y, dir){
    if(x==endX && y == endY)
    {
        solRef[x][y] = 1;
        return true;
    }
    if(safeToGo(x,y))
    {
        solRef[x][y] = 1;
        if(dir != "up" && findPath(x+1,y,"down"))
            return true;
        if(dir != "left" && findPath(x,y+1,"right"))
            return true;
        if(dir != "down" && findPath(x-1,y,"up"))
            return true;
        if(dir != "right" && findPath(x,y-1,"left"))
            return true;    
        solRef[x][y] = 0;
        return false;
    }
    return false;
}

function safeToGo( x, y)
{
    if(x>=0 && y>=0 && x<cols.value && y < rows.value && arrayRef[x][y] != 1 )
        return true;
    return false;   
}

function colorPath(){
    for(var i=0;i<solRef.length;i++)
    {
        var solOne = solRef[i];
        for(var j = 0;j<solOne.length;j++)
        {
            var val = solOne[j];
            if(val == 1 )
            {
                ctx.fillStyle = "blue";
                ctx.fillRect( j * rowS, i*colS , colS, rowS );
            }
        }
    }
}


function handleClick(e) {

    if(e.button == 0){
        ctx.fillStyle = "black";
        var x = Math.floor(e.offsetX / colS) * colS, y = Math.floor(e.offsetY / rowS) * rowS;
        ctx.fillRect( x , y , colS, rowS);
        arrayRef[Math.floor(y/rowS)][Math.floor(x/colS)] = 1;
    }
    else if(e.button == 1)
    {
        // middle button
        if(placed==0){
            ctx.fillStyle = "red";
            var x = Math.floor(e.offsetX / colS) * colS, y = Math.floor(e.offsetY / rowS) * rowS;
            ctx.fillRect( x , y , colS, rowS);
            placed = 1;
            startX = Math.floor(y/rowS);
            startY = Math.floor(x/colS);
            arrayRef[startX][startY] = 2;
        }
        else if(placed == 1)
        {
            ctx.fillStyle = "green";
            var x = Math.floor(e.offsetX / colS) * colS, y = Math.floor(e.offsetY / rowS) * rowS;
            ctx.fillRect( x , y , colS, rowS);
            placed = 2;
            endX = Math.floor(y/rowS);
            endY = Math.floor(x/colS);
            arrayRef[endX][endY] = 3;
        }
        
    }  
}
  
  

function genGrid(){   
    ctx.clearRect(0,0,500,500); 
    ctx.beginPath()
    ctx.fillStyle = "#000";
    placed = 0;
  
    rowS = 500 / rows.value ;
    colS = 500 / cols.value ;

    arrayRef = new Array(rows.value);
    solRef = new Array(rows.value);
    for(var i = 0; i < 500; i+=rowS)
    {
        ctx.moveTo(0, i );
        ctx.lineTo(500, i );    
        arrayRef[i/rowS] = new Array( parseInt(cols.value,10));         
        solRef[i/rowS] = new Array( parseInt(cols.value,10));         
        for(var j = 0; j<cols.value;j+=1)
        {
            arrayRef[i/rowS][j] = 0;
            solRef[i/rowS][j] = 0;
        }
    }

    for(var i = 0; i < 500; i+=colS)
    {
        ctx.moveTo(i, 0 );
        ctx.lineTo(i,500 );
        
    }

    ctx.stroke();
}