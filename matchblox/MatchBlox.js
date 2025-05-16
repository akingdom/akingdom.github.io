<!--
//////////////////////////////////////////////////////////////////////////////
// filename: MatchBlox.js
//  version: 1.01
//
// Entire code Copyright (C) 2002 Andrew Kingdom. All rights reserved.
// http://homepage.mac.com/akingdom
//
//
// Include following line inside HTML body:
//
//  <script language="JavaScript" src="MatchBlox.js"></*script>
//
// NB: Remove ('*') character!
//
// Alternatively this javascript is able to be inserted in any html document,
//  so long as the specified graphic files are in same folder.
//
//
// Do not redistribute modified versions of this -- use originals only.
// Contact me via my website for any permissions/issues/changes/etc.
//
//////////////////////////////////////////////////////////////////////////////

// VARIABLES

var xmax= 18; // 18
var ymax= 10; // 10

var grClear= 'x.gif';
var grInitial= 'Fill.gif';
var grNames=       [grClear,'A.gif', 'B.gif', 'C.gif', 'D.gif', 'E.gif'];// grClear MUST be 1st entry
var grMarkedNames= [grClear,'Am.gif','Bm.gif','Cm.gif','Dm.gif','Em.gif'];// grClear MUST be 1st entry
var grBackgrounds= ['image1.jpg','image6.jpg','image5.jpg','image7.jpg','image5-3.jpg','image9.jpg','image12.jpg','image5-2.jpg'];// one entry of this array is randomly selected

var grEndNames= ['Fe.gif','Ie.gif','Ne.gif','Ie.gif','Se.gif','He.gif','Ee.gif','De.gif','x.gif'];

cacheImages([grClear]);
// OBJECTS

var grid=[],sharr=[];

function cellObj(x, y, grRef,obj) {
	this.x= x.valueOf();
	this.y= y.valueOf();
	this.obj= eval('document.'+grRef);// reference to graphic object
	this.selected = false;
	this.type= rndCellType();
	this.dirty= true;// true when display update required--do this last
}


// FUNCTIONS - Display

var finished=false;
function displayUpdateLoop() {
	// call initially from document.onload()
	if (finished)
		displayEnd()
	else
		displayGrid();
	displayScore();
}

var remaining= xmax*ymax;
function displayGrid() {
	remaining= 0;
	for (dx= 0;dx<=xmax;dx++) {
		for (dy= 0;dy<=ymax;dy++) {
			var g= grid[dx][dy];
			remaining+= (g.type!=0) ?1:0;
			if (g.dirty) {
				if (g.selected)
					g.obj.src= grMarkedNames[g.type]
				else
					g.obj.src= grNames[g.type];
				g.dirty= false;//mark as updated on-screen -- do this last.
			}
		}
	}
}

var displaypending= false;// used to avoid clogging the event queue
function displayUpdate() {
	if (!displaypending) {
		var delay= 0;//milliseconds
		setTimeout("displayUpdateLoop()", delay);// display update not yet requested.
	}
}

function displayDirty(dObj) {
	dObj.dirty= true;
	displayUpdate();
}

function displayEnd() {
	for (x= 0;x<=xmax;x++) {
		for (y= 0;y<=ymax;y++) {
			if (grid[x][y].type==0) {
				grid[x][y].obj.src= grEndNames[(x+y)%(grEndNames.length)];
			} else {
				grid[x][y].obj.src= grNames[grid[x][y].type];
			}
		}
	}
}

var totalscore= 0,localscore= 0;
var digits= 19;
var scorepre= '';
var scoreact= 0;
var scoregarr= new Array(digits);
function initScore () {
	for (i = digits-1; i >= 0;i--) {
		document.write('<td><img src="0.gif" width="15" height="20" name="TUG'+i+'"></td>');// must be wrapped in <table><tr>...</tr></table>
		scorepre+= '0';
		scoreact= scoreact*10 +9;//shift-left
		scoregarr[i]= eval('document.TUG'+i);// # graphic object 
	}
}
function displayScore() {
	if (localscore!= totalscore) {
		localscore= totalscore;
		var tsk= ''
		var ts= scorepre+(parseInt(Math.min(localscore,scoreact))).toString();// keep things sensible
	for (i = digits-1; i >= 0;i--) {
			var ti= ts.charAt(ts.length-i-1)+'.gif';
			scoregarr[i].src= ti;
			tsk+= ti+',';
		}
//		document.scoreform.thisblock.value= tsk;// debug check.
	}
}


// FUNCTIONS - Crunching

function rndCellType () {
	return Math.floor(Math.random()*(grNames.length-1))+1;
}
function rndCell () {
	return grNames[rndCellType()];
}
function rndBackground () {
	return grBackgrounds[Math.floor(Math.random()*grBackgrounds.length)];
}

function detectSubshape (x,y,type) {
	if ((x>=0)&&(y>=0)&&(x<=xmax)&&(y<=ymax)) {
		if ((!grid[x][y].selected)&&(grid[x][y].type==type)) {
			var si= new Number(sharr.length);
			sharr[si]= grid[x][y];
			sharr[si].selected= true;
			displayDirty(sharr[si]);
			//recursively check above, below, left and right cells
			//only checks cells within grid, unmarked, and original type
			detectSubshape(x-1,y,type);
			detectSubshape(x+1,y,type);
			detectSubshape(x,y-1,type);
			detectSubshape(x,y+1,type);
		}
	}
}

function detectShape(x,y) {
	clearShape();
	// detect new shape
	var type= grid[x][y].type;//only select same type
	if (type!=0)
		detectSubshape(x,y,type);
}

function clearShape() {
	// clear old shape
	for (i=0;i<sharr.length;i++) {
		sharr[i].selected= false;
		displayDirty(sharr[i]);
	}
	sharr= new Array();
}

function clickShape(x,y) {
	// act on shape
	var l= sharr.length;
	for (i=0;i<l;i++) {
		sharr[i].selected= false;
		sharr[i].type= 0;
		displayDirty(sharr[i]);
	}
	sharr= new Array();
	return l;
}

function calculateScore(n) {
	var r= Math.sqrt(5);
	var l= Math.pow(1-r,n);
	var g= Math.pow(1+r,n);
	var d= Math.pow(2,n-1);
	var s= (g-l)/(d*r);
	return Math.floor(s);
}

function matchBlock (x,y,type) {
	if ((x>=0)&&(y>=0)&&(x<=xmax)&&(y<=ymax)) // within grid
		return (grid[x][y].type==type)
	else
		return false;
}

function detectEnd() {
	retval= true;
	var x= 0;
	while ((x<=xmax)&&retval) {
		var y= 0;
		while ((y<=ymax)&&retval) {
			var t= grid[x][y].type;
			if ((t!=0) && (matchBlock(x-1,y,t) || matchBlock(x+1,y,t) || matchBlock(x,y-1,t) || matchBlock(x,y+1,t))) {
				retval= false;
			}
			y++;
		}
		x++;
	}
	return retval;
}

function applyGravity () {// this is the most complex bit of code in the whole thing.
	var xdropcells= 0;
	for (x= 0;x<=xmax;x++) {
		var ydropcells= 0;
		for (y= ymax;y>=0;y--) {//from bottom--skip any now empty cells at top
			var g= grid[x][y];
			var h= grid[x-xdropcells][y+ydropcells];
			if ((ydropcells>0)||(xdropcells>0)) {
				h.type= g.type;//drop cells down
				h.dirty= true;
			}
			if (g.type==0) {
				ydropcells+= 1;//drop cells by this amount
				g.dirty= true;
			}
		}
		for (y= 0;y<ydropcells;y++) {
			grid[x-xdropcells][y].type= 0;//backfill with clear cells
			grid[x-xdropcells][y].dirty= true;
		}
		if (ydropcells>ymax) {
			xdropcells++;
		}
	}
	for (x= 1+xmax-xdropcells;x<=xmax;x++) {
		for (y= 0;y<=ymax;y++) {
			grid[x][y].type= 0;//backfill with clear cells
			grid[x][y].dirty= true;
		}
	}
	displayUpdate();
}

function cacheImages() {//arguments are any number of arrays of source strings of graphics
	var d=document;
	if (!d.gcache)
		d.gcache= new Array();
	var g= d.gcache;
	for (j=0;j<arguments.length;j++) {
		var gArr= arguments[j];
		for(i=0; i<gArr.length; i++) {
			g[g.length]= (new Image).src=gArr[i];
		}
	}
}

function cachegraphics() {
	self.status= 'Preloading graphics...please be patient';
	cacheImages(grNames,grMarkedNames,grEndNames);
	self.status= '';
}


// FUNCTIONS - Handle events

function doCell(xRef,yRef) {
	if (grid[xRef][yRef].type!=0) {
		var blocksize= clickShape(xRef,yRef);
		if (blocksize > 0) {
			document.scoreform.thisblock.value= remaining+' left, '+totalscore;
			applyGravity();
			overCell(xRef,yRef);
			totalscore+= calculateScore(blocksize);
			if (detectEnd()) {// done
				finished= true;
				displayUpdate();
				document.scoreform.thisblock.value= remaining+' over, '+totalscore;
			}
		}
	}
}

function overCell(xRef,yRef) {
	detectShape(xRef,yRef);
	var cnt= sharr.length;
	if (cnt<2) {// 1 block doesn't count
		if (cnt==1)
			clearShape();
			document.scoreform.thiscount.value= '>>';
			document.scoreform.thisblock.value= remaining+' left, '+totalscore;
	} else {
		document.scoreform.thiscount.value= cnt;
		document.scoreform.thisblock.value= calculateScore(cnt);
	}
}

function outCell(xRef,yRef) {
	clearShape();
}

function reinit() {
	totalscore= 0;
	finished= false;
	//...
	for (dx= 0;dx<=xmax;dx++) {
		for (dy= 0;dy<=ymax;dy++) {
			var g= grid[dx][dy];
			g.dirty=true;
			g.obj.src= grInitial;
			g.type= rndCellType();
		}
	}
	displayUpdate();
}

// INITIALISE

function bloxInit () {
	grid= new Array(xmax+1);
	for (x=0;x<=xmax;x++)
			grid[x]= new Array(ymax+1);// create 2nd dimension (%$#@javascript!)
	document.write('<table border="0" cellspacing="0" cellpadding="0" align="center" background="'+rndBackground()+'">');
	for (y = 0; y <= ymax;y++) {
		document.write('<tr>');
		for (x = 0; x <= xmax;x++) {
	    	var grObjName= new String('Cell'+x+'_'+y);
			var grR= '('+x+','+y+')';
			document.write('<td><a href="#" onClick="doCell'+grR+'" onMouseOver="overCell'+grR+'" onMouseOut="outCell'+grR+'"><img src="'+grInitial+'" width="30" height="30" name="'+grObjName+'" border="0"></a></td>');
			grid[x][y]= new cellObj(x,y,grObjName);// must be after object is defined.
		}
		document.write('</tr>');
	}
	document.write('</table>');
	cachegraphics();
	document.write('<br><form name="scoreform" ><table border="1" cellspacing="0" cellpadding="4" align="center"><tr><td>Score for <input type="text" name="thiscount" size="2" value="" onChange="document.scoreform.thisblock.value= calculateScore(document.scoreform.thiscount.value)">&nbsp;blocks: <input type="text" name="thisblock" size="15" value=""></td><td><table border="0" cellspacing="0" cellpadding="0"><tr><td>Total score:&nbsp;</td>');
	initScore();
	document.write('</tr></table></td><td><input type="reset" name="Reset" value="New Game" onClick="reinit()"></td></tr></table></form><br>&nbsp;');
	setTimeout("displayUpdate()", 777);//milliseconds --MUST be last thing called
}

bloxInit();
//////////////////////////////////////////////////////////////////////////////
// 18.4.2002 - added graphic caching code
//////////////////////////////////////////////////////////////////////////////

//-->