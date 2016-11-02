// context and canvas
var c,ctx;
// time txt can be shown
textTime = 0;
// direction
var directionArr = {
	u:38,
	d:40,
	l:37,
	r:39
};
var gameMap = [
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
// array de clisionables
var colli_items = [];
var colli_tiles = [];
// floor
var floor = new Image();
floor.src = './floor.png';
//create a collision square
function colli_square (x,y,xb,yb) {
	this.x = x;
	this.y = y;
	this.xb = xb;
	this.yb = yb;
}
// player object
var player = {
	height:50,
	width:30,
	length:30,
	x: 130,
	y: -50,
	direction: directionArr.d,
};
//pos to iso
function posToIso(x, y)
{
    var posX = x * 1 + y * -1 +160;
    var posY = x * 0.5 + y * 0.5 + 0;  
    return [posX, posY];
}

window.onload = function () {
	c = document.getElementById('cg');
	ctx = c.getContext('2d');
	player.colli_square = new colli_square((c.width/2), (c.height/2), (c.width/2)+player.width, (c.height/2)+player.length);
	setInterval(update, 1000/50);
	document.addEventListener('keydown',move);
};
function update () {
	// panel
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, c.width, c.height);
	renderFloor();
	renderPlayer();
	playerOutOfMap();
	if (textTime > 0) {
		showText();
		textTime--;
		console.log('text shown');
	}
}
function renderFloor() {
	var x=0,y=0;
	var xarr;
	colli_tiles = [];
	for (var xarrenum = gameMap.length; xarrenum > 0; xarrenum--) {
		xarr = gameMap[xarrenum-1];
		y=0;
		for (var yval = xarr.length; yval >= 0; yval--) {
			tileRender(xarr[yval],x,y);
			y+=floor.height;
		}
		x+=floor.width;
	}
}
function tileRender (tileType,x,y) {
	var tile_colli_square = null;
	switch (tileType) {
		case 1:
			ctx.transform(1,0.5,-1,0.5,160,0);
			ctx.fillStyle = "grey";
			ctx.fillRect(x+player.x, y+player.y, floor.width, floor.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			break;
		case 0:
			tile_colli_square = new colli_square(x+player.x, y+player.y, x+floor.width+player.x, y+floor.height+player.y);
			colli_tiles.push(tile_colli_square);
			ctx.transform(1,0.5,-1,0.5,160,0);
			ctx.fillStyle = "orange";
			ctx.fillRect(x+player.x, y+player.y, floor.width, floor.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			break;
		case 2:
			tile_colli_square = new colli_square(x+player.x, y+player.y, x+floor.width, y+floor.height);
			colli_tiles.push(tile_colli_square);
			ctx.transform(1,0.5,-1,0.5,160,0);
			ctx.fillStyle = "red";
			ctx.fillRect(x+player.x, y+player.y, floor.width, floor.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			break;
	}
}

function renderPlayer() {
	// player
	ctx.fillStyle = "white";
	var pos = posToIso(c.width/2,c.height/2);
	ctx.fillRect(pos[0]-(player.width/2), pos[1]-(player.height/2), player.width, player.height);
	//player colllision square
	ctx.transform(1,0.5,-1,0.5,160,0);
	ctx.fillStyle = "red";
	ctx.fillRect(c.width/2, c.height/2, player.width, player.length);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function move (e) {
	var event = e ? e : window.event;
	var key = event.keyCode;
    if (key == directionArr.u) {
    	player.y += 10;
    	player.direction = directionArr.u;
	}
	else if (key == directionArr.d) {
	    player.y -= 10;
	    player.direction = directionArr.d;
	}
	else if (key == directionArr.l) {
	    player.x += 10;
	    player.direction = directionArr.l;
	}
	else if (key == directionArr.r) {
	    player.x -= 10;
	    player.direction = directionArr.r;
	}
}

function collide(a,b) {
	if (a.xb<b.x||b.xb<a.x||a.yb<b.y||b.yb<a.y) {
	}
	else {
		console.log('there is a collision');
		player.colli_square = new colli_square((c.width/2), (c.height/2), (c.width/2)+player.width, (c.height/2)+player.length);
		player.x = 130;
		player.y = -50;
		textTime = 30;
	}
}
function playerOutOfMap() {
	for (var i = colli_tiles.length; i > 0; i--){
		var collision = collide(colli_tiles[(i-1)],player.colli_square);
	}
}
function showText () {
		ctx.font = "20px sans-serif";
		ctx.fillStyle = "red";
		ctx.fillText("RESPAWN", player.colli_square.x, player.colli_square.y+50);
		ctx.fillText(textTime, player.colli_square.x, player.colli_square.y+30);
}