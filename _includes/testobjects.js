var primitives = true;

function ggbOnInit() {

	var element = document.getElementsByClassName("toolbar_button")[0]; 
	element.setAttribute("isselected", "false"); 
	ggbApplet.debug("ggbOnInit");
	ggbApplet.registerAddListener("newObjectListener");
	Command('progress = 0');
	Command('Progresstext = Text["Progress: "progress"%",'+abspos("0.02","-0.05")+']');
	Command('countnumber = 0');
	Command ('count0 = Text["Moves: "countnumber"",'+abspos("0.85","-0.05")+']');
	Command('W = (-10,-10)'); 
	ggbApplet.setVisible("W",false);
	Command('welldone = Text["Well done!", W]'); 		
	ggbApplet.setVisible("welldone",false);	
	}

function Command(cmd){ggbApplet.debug(cmd); ggbApplet.evalCommand(cmd);}

function abspos(x,y){
	return "Corner[4] + ("+x+"*(x(Corner[3])-x(Corner[4])),"+y+"*(y(Corner[3])-y(Corner[2])))"
	}

function getCoord(objx){ 
	if (ggbApplet.getObjectType(objx) === "point" ) {
		var x = ggbApplet.getXcoord(objx);
		var y = ggbApplet.getYcoord(objx);
		return "("+x+","+y+")"
	}
	else if (ggbApplet.getObjectType(objx)==="segment" || ggbApplet.getObjectType(objx)==="ray" || ggbApplet.getObjectType(objx)==="line" ){
		Command("xx = x(Point["+objx+",0.5])");
		Command("yy = y(Point["+objx+",0.5])");
		var x = ggbApplet.getValue("xx");
		var y = ggbApplet.getValue("yy");
		return "("+x+","+y+")";
	}
	else if (ggbApplet.getObjectType(objx)==="circle"){
		var cmdStringx = ggbApplet.getCommandString(objx);
		var x = ggbApplet.getXcoord(cmdStringx.substring(7,8));
		var y = ggbApplet.getYcoord(cmdStringx.substring(7,8));
		return "("+x+","+y+")";
	}
}

function newObjectListener(obj) {
	var objType = ggbApplet.getObjectType(obj);
	if (objType === "boolean" || objType === "text" || objType === "numeric"|| obj == "W")
		{return;
		}

	if (objType == "segment" || objType == "circle" || objType == "ray" || objType == "line") 
		{ggbApplet.setColor(obj,255,204,102);
		}
	var cmdString = ggbApplet.getCommandString(obj);
	console.log(objType,":", obj, "=", cmdString);

/*	if (objType == "point" && cmdString == ""){
		var x = ggbApplet.getXcoord(obj) + 0.01;
		var y = ggbApplet.getYcoord(obj) - 0.01;
		console.log(x,y);
		Command( obj +"= ("+x+","+y+")");
	}
*/
	if (cmdString.substring(0,3) == "Ray" || (cmdString.substring(0,2) == "Eq" && objType=="point") || 
		cmdString.substring(0,3) == "Seg" ||cmdString.substring(0,3) == "Cir" || cmdString.substring(0,3) == "Mid" || 
		cmdString.substring(0,13) == "AngleBisector" || cmdString.substring(0,4) == "Perp" || cmdString.substring(0,4) == "Line" || 
		(cmdString.substring(0,5) == "Trans"&& objType=="point")){
			Command('countnumber = countnumber + 1');
			if (!(cmdString.substring(0,3) == "Ray" || cmdString.substring(0,3) == "Seg" || cmdString.substring(0,4) == "Line" || cmdString.substring(0,3) == "Cir") && primitives) { 
				primitives = false;
				console.log("First non-primitive tool.");
			}

			function isLowerCase(myString) { 
				return (myString == myString.toLowerCase()); 
				}

			var lastcomma = cmdString.indexOf(",");
			if(cmdString.substring(0,3) == "Cir" && (isLowerCase(cmdString.substring(lastcomma+2,lastcomma+3)) || cmdString.substring(lastcomma+2,lastcomma+4) =="Se" || cmdString.substring(lastcomma+2,lastcomma+4) =="Ra")) {
				primitives = false;
				console.log("Compass tool.");
			}
			if(cmdString.substring(0,4) == "Line" && (isLowerCase(cmdString.substring(lastcomma+2,lastcomma+3)))) {
				primitives = false;
				console.log("Parallel line tool.");
			}
		}

// The following code disallows (by deletion) the angle bisector of a straight angle.  
if (cmdString.substring(0,13) == "AngleBisector"){
	var obj1 = cmdString.substring(14,15);
	if (ggbApplet.getObjectType(obj1) === "point"){
		var obj2 = cmdString.substring(17,18);
		var obj3 = cmdString.substring(20,21);
		var a = ggbApplet.getXcoord(obj1);
		var b = ggbApplet.getYcoord(obj1);
		var m = ggbApplet.getXcoord(obj2);
		var n = ggbApplet.getYcoord(obj2);
		var x = ggbApplet.getXcoord(obj3);
		var y = ggbApplet.getYcoord(obj3);

		function round(value) {
			return(Math.round(value * 100000) / 100000);
			}

		if ( round((n-b)*(x-m)) === round((y-n)*(m-a))){
			Command('Delete['+obj+']');
			Command('Text["Some angle bisection methods fail when the angle is 180 degrees!  Try again.",'+abspos("0.02","-0.80")+']');		
		}
	}
}
	// The following "check" functions test whether target has been drawn.  
	// When it has, finished = true in the app, and the check function:  
	//   (1) Sets the target's "finished" flag by defining the text variable f_target in the app;
	//   (2) Sets the position of "Well done!" offset from target by (x,y); and
	//   (3) Diplays "Well done!"

	// This function can check all general objects. 
	function checkobject(target,x,y) {
		Command("finished = (" + obj + "== " + target + ")");
		finished = ggbApplet.getValueString("finished");
		if (finished.indexOf("true") > -1) {
			Command('f_'+target+'= Text["", (0,0)]');
			Command("W = "+getCoord(target)+"+("+x+","+y+")");
			ggbApplet.setVisible("welldone",true);		  
		} 
	}

	// This function checks line segments.
	function checksegment(target,x,y) {
		if (ggbApplet.getObjectType(obj) == "segment") {
			var beginpointobject = "Point["+obj+",0]"
			var endpointobject = "Point["+obj+",1]"
			var beginpointtarget = "Point["+target+",0]"
			var endpointtarget = "Point["+target+",1]"
			//here it checks if endpoints of line segment are equal
			if (obj != "finished") {
				Command("finished =((("+beginpointobject+"=="+beginpointtarget+")||("+beginpointobject+"=="+endpointtarget+"))&&(("+endpointobject+"=="+beginpointtarget+")||("+endpointobject+"=="+endpointtarget+")))");
				finished = ggbApplet.getValueString("finished");
				if (finished.indexOf("true") > -1) {
					Command('f_'+target+'= Text["", (0,0)]');
					if (typeof x !== 'undefined'){
						Command("W = "+getCoord(target)+"+("+x+","+y+")")
					};	
					ggbApplet.setVisible("welldone",true);		  
				}
			}
		}
	}

	// This function can check if line segment has right direction.
 
	function checkdirection(target,x,y) {
		if (ggbApplet.getObjectType(obj) == "segment" || ggbApplet.getObjectType(obj) == "ray" || ggbApplet.getObjectType(obj) == "line") { 
			Command("finished = (("+obj+"(1)=="+target+"(1))&&("+obj+"(-1)=="+target+"(-1)))");
			finished = ggbApplet.getValueString("finished");
			if (finished.indexOf("true") > -1) {
				Command('f_'+target+'= Text["", (0,0)]');
				if (typeof x !== 'undefined'){
					Command("W = "+getCoord(target)+"+("+x+","+y+")")
				};	
				ggbApplet.setVisible("welldone",true);		
			}
		}
	}

	// This function checks if the new point is on the targetline.
	// Assuming 'target' is a line, the command "finished = (target(x(A))==y(A))" computes the 
	// y-coordinate corresponding to x(A) on 'target', and checks its equality to y(A).
	function checkpointontarget(target,x,y) {
		if (ggbApplet.getObjectType(obj) == "point") {
			Command("finished = ("+target+"(x("+obj+"))==y("+obj+"))");
			finished = ggbApplet.getValueString("finished");
			if (finished.indexOf("true") > -1) {
				Command('f_p'+target+'= Text["", (0,0)]');
				if (typeof x !== 'undefined'){
					Command("W = "+getCoord(obj)+"+("+x+","+y+")")
				};	
				ggbApplet.setVisible("welldone",true);		 
 			}
		}
	}

	// This function returns true if one of the above check functions has placed a "finished" flag in the app. 
	// For the function to work correctly, a check function must first be called for the (target) object. 
	function drawn(object){
		return ggbApplet.getVisible('f_'+object) ;
	}

function LevelCompleted(condition,mincount){  // The parameter mincount is obsolete and unused. 
	if(condition){
		Command('progress = 100');
		Command('Complete = Text["Level completed!",  '+abspos("0.15","-0.20")+']');   
		//document.getElementById("level").style.display="inline-block";	
		$( "#hidden" ).slideDown(1000);	
		// $( "#hiddencomments" ).toggle();	 Used for disqus comments.
		var count = ggbApplet.getValue("countnumber");
		if (primitives) {
			if (count === levels[{{page.number}}].primitive){
				Command('score2 = Text["Perfect! You have done this challenge in a minimum number of primitive moves!", '+abspos("0.35","-0.90")+']');
			}
			else if (count <= levels[{{page.number}}].primitive){
				Command('score2 = Text["Amazing! You have a new record for the minimum number of primitive moves!", '+abspos("0.35","-0.90")+']');
			}}
		else {
			if(count === levels[{{page.number}}].all){
				Command('score2 = Text["Perfect! You have done this challenge in a minimum number of moves!", '+abspos("0.35","-0.90")+']');
			}
			else if(count <= levels[{{page.number}}].all){
				Command('score2 = Text["Amzaing! You have a new record for the minimum number of moves!", '+abspos("0.35","-0.90")+']');
			}
		}

	if (primitives){
		if (!(localStorage.Level{{page.number}}p < count)) {
			localStorage.Level{{page.number}}p = count;
		}
	}
	else{
		if(!(localStorage.Level{{page.number}}<count)) {
			localStorage.Level{{page.number}} = count;
		}
	}

	}
}
