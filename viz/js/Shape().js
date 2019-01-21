/*
 * Shape
 * @param {object} 	grid 			- Reference to the grid.
 * @param {object} 	shapeType 		- Object representing one of the shapes in gridJsonObj.
 * @param {object} 	shapeId 		- Shape's id.
 * @param {integer} column 			- Column number.
 * @param {integer} line 			- Line number.
 * @param {object} 	generalParams 	- General parameters to use.
 */
function Shape(grid, shapeType, shapeId, column, line, generalParams) {
    /*************
	* Properties *
	*************/
	this.grid 		= grid;
	this.className 	= shapeType.className;
	this.id			= shapeId;
	this.content 	= shapeType.content;
	
	this.shapeSize 	= parseInt(generalParams.shapeSize);
	this.margin 	= parseInt(generalParams.margin);
	this.linewidth 	= parseInt(generalParams.linewidth);
	this.opacity 	= parseInt(generalParams.opacity);
	
	// Assign the properties of the object or, it undefined, the general properties 
	this.fill 	= shapeType.fill 	|| generalParams.fill;
	this.stroke = shapeType.stroke 	|| generalParams.stroke;
	
	// Okay for now, but to revisit formula
	var x = column 	* ((2 * this.shapeSize + this.linewidth) /*+ this.margin*/);
	var y = line 	* (this.shapeSize + this.margin);
	
	// Build the polygon
	this.polygon = this.grid.getTwoRef().makePolygon(x, y, this.shapeSize, generalParams.sidesNumber);
	
	/* if (this.id === "hex58" || this.id === "hex26") {
		console.log(this.id, x, y);
	} */
	
	// Assignment of properties or default
	this.polygon.fill 		= this.fill 		|| "#FFF";
	this.polygon.stroke 	= this.stroke 		|| "#F00";
	this.polygon.opacity 	= this.opacity 		|| 1;
	this.polygon.linewidth 	= this.linewidth 	|| 2;
	this.polygon.cap 		= generalParams.cap || "round";
	
	// Two.js gives ids to objects it creates, so we work with classes
	$(this.polygon).attr("class", shapeId);

	// TEST
	if(this.content != undefined) {
		var url = "./medias/" + this.content;
		//var url = "http://wlab.fmed.ulaval.ca/dev/hexGrid/medias/" + this.content;
		//var url = "https://i.imgur.com/DRmh6S9.jpg";
		
		/* var texture = new Two.Texture(url);
		console.log(texture);
		console.log(texture.image); */
		
		// Textures fill as patterns on any Two.Path
		//this.polygon.fill = texture;
		//texture.scale = 0.125;
		
		//var img = document.getElementById("two_0").createElement('img');
		//var img = document.createElement('img');
		
		/*img.onload = function() {
			//var sprite = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
			console.log(that.polygon);
			that.polygon.image = img;
			that.polygon.width = that.polygon.height = 25;
		};*/
		
		//img.src = "./medias/" + this.content;
		
		var pattern = addPattern(this.content, this.shapeSize);
		this.polygon.fill = "url(#" + pattern.id + ")"; //url(#two_2)
	}
	
	/**********
	* Methods *
	**********/
	function addPattern(defContent, size){
		// A way to get the dimensions of the SVF files
		// Keep until decision whether it is useful or not
		/*var img = document.createElement('img');
		img.onload = function() {
			console.log( this.width, "x", this.height );
		};
		img.src = './medias/' + defContent;*/
		
		var svg = $("#gridContainer svg");
		var defs = $("#gridContainer svg defs");
		var NS = "http://www.w3.org/2000/svg";
		
		//console.log(typeof(size.toString()));
		var strSize = size.toString();
		var strNegSize = "-" + strSize;
		
		var pattern = document.createElementNS( NS, "pattern" );
		pattern.setAttribute( "id", defContent );
		
		// Not necessary for the moment, "objectBoundingBox" being the default for the "patternUnits" attribute, which is what works for now
		//pattern.setAttribute( "patternUnits", "userSpaceOnUse" ); // userSpaceOnUse || objectBoundingBox
		//pattern.setAttribute( "patternContentUnits", "objectBoundingBox" ); // userSpaceOnUse || objectBoundingBox
		
		// These x, y, width and height values seem to be required to get the svg file in background without tiling/repeat effect
		pattern.setAttribute( "x", "0" );
		pattern.setAttribute( "y", "0" );
		pattern.setAttribute( "width", "1");
		pattern.setAttribute( "height", "1");
		
		var imagePattern = document.createElementNS( NS, "image" );
		imagePattern.setAttribute( "href", "./medias/" + defContent );
		// size*2 seems arbitrary
		// TODO: Find a better way
		imagePattern.setAttribute( "width", size*2 ); //size*2
		imagePattern.setAttribute( "height", size*2 ); //size*2
		//imagePattern.setAttribute( "x", "10" );
		//imagePattern.setAttribute( "y", "10" );
		
		pattern.appendChild( imagePattern );
		defs.append( pattern );
		svg.append( defs );
		
		return pattern;
	}
	
	this.getPolygon = function(){
		return this.polygon;
	}
	
	this.setColor = function(){
		console.log("For testing purpose only");
		this.polygon.fill 	= "#FF0";
		this.polygon.stroke = "#FF0";
	}
	
	this.setCoordinates = function(){
		
	}
}