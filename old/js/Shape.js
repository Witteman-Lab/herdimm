/**
 * Shape (Prototype syntax)
 * 
 * @param {object} 	grid 			- Reference to the grid.
 * @param {object} 	shapeType 		- Object representing one of the shapes in gridJsonObj.
 * @param {object} 	shapeId 		- Shape's id.
 * @param {object} 	group 			- Group built by the participant.
 * @param {object} 	refGroupObject 	- Reference to the Javascript Group object
 * @param {integer} column 			- Column number.
 * @param {integer} line 			- Line number.
 * @param {object} 	generalParams 	- General parameters to use.
 */
function Shape (grid, shapeType, shapeId/*, group*/, column, line, generalParams) {
	this.grid 		= grid;
	this.className 	= shapeType.className;
	this.id			= shapeId;
	
	this.pattern;
	this.objPattern;
	this.svgDoc;
	this.imagePattern;
	
	this.shapeSize 	= parseInt(generalParams.shapeSize);
	this.margin 	= parseInt(generalParams.margin);
	this.linewidth 	= parseInt(generalParams.linewidth);
	this.opacity 	= parseInt(generalParams.opacity);
	
	// Assign the properties of the object or, if undefined, the general properties 
	this.fill 	= shapeType.fill 	|| generalParams.fill;
	this.stroke = shapeType.stroke 	|| generalParams.stroke;
	
	// Okay for now, but to revisit formula
	var x = column 	* ((2 * this.shapeSize + this.linewidth) /*+ this.margin*/);
	var y = line 	* (this.shapeSize + this.margin);
	
	// Build the polygon
	this.polygon = this.grid.getTwoRef().makePolygon(x, y, this.shapeSize, generalParams.sidesNumber);
	

	// TEST
	if(this.className !== "gen") {
		this.polygon.fill = "url(#pattern_" + this.id + ")";
		let fileAndStyle = this.getCharacterFileAndStyle(this.grid.getGroupMembers()),
			file  = fileAndStyle[0],
			style = fileAndStyle[1];
		
		this.createPattern(file, style, this.id, this.shapeSize);
	} else {
		this.polygon.fill = this.fill;
	}
	
	// Assignment of properties or default
	//this.polygon.fill 	= this.fill/*  		|| "#FFF"; */;
	this.polygon.stroke 	= this.stroke /*  	|| "#F00" */;
	this.polygon.opacity 	= this.opacity 		|| 1;
	this.polygon.linewidth 	= this.linewidth 	|| 2;
	this.polygon.cap 		= generalParams.cap || "round";

	// Two.js gives ids to objects it creates, so we work with classes
	$(this.polygon).attr("class", shapeId + " " + this.className);
	
	//this.grid.getGroupObject();
}

/**
 * Prototype for managing the methods
 * 	createPattern(): 
 * 	getPolygon(): 
 * 	setColor(): 
 * 	setCoordinates(): 
 */
Shape.prototype = {
    constructor: Shape,
	
	/**
	 * Add svg graphics as pattern
	 * Still has some issues, to continue working
	 * 
	 * @param {} 	defContent 	- ... .
	 * @param {} 	size 		- ... .
	 */
	createPattern : function (file, style, id, size) {
		const that 		= this;
		const NS 		= "http://www.w3.org/2000/svg";
		
		this.pattern 	= document.createElementNS( NS, "pattern" );
		
		// These x, y, width and height values seem to be required to get the svg file in background without tiling/repeat effect
		this.pattern.setAttribute( "x", "0" );
		this.pattern.setAttribute( "y", "0" );
		this.pattern.setAttribute( "width", "1" );
		this.pattern.setAttribute( "height", "1" );
		this.pattern.setAttribute( "id", "pattern_" + id );
		
		// Not necessary for the moment, "objectBoundingBox" being the default for the "patternUnits" attribute, which is what works for now
		//pattern.setAttribute( "patternUnits", "objectBoundingBox" ); // userSpaceOnUse || objectBoundingBox
		
		// Setting patternContentUnits to ”objectBoundingBox” ensure consistent coordinate space.
		// Not necessary for the moment, "userSpaceOnUse" being the default for the "patternContentUnits" attribute, which is what works for now
		//pattern.setAttribute( "patternContentUnits", "objectBoundingBox" ); // userSpaceOnUse || objectBoundingBox
		
		/*********************************************************************************************************************/
		
		let elementToCreate = "<div class=\"div_test\" id=\"div_" + id + "\">\n";
			//elementToCreate += "<object type=\"image/svg+xml\" data=\"./medias/characters/" + file + "\" class=\"obj_test\" id=\"objPattern_" + id + "\">\n";
			elementToCreate += "<object type=\"image/svg+xml\" data=\"./medias/characters/" + file + "\" id=\"objPattern_" + id + "\">\n";
			elementToCreate += "Your browser does not support SVG\n";
			elementToCreate += "</object>\n";
			elementToCreate += "</div>\n";
		
		$("#gridContainer").prepend(elementToCreate);
		
		this.objPattern = $("#objPattern_" + id);
		
		// $(this.objPattern).on("load", function() {
		this.objPattern.on("load", function() {
			that.applyPattern(this, style, size);
		});
	},
	
	/**
	 *
	 */
	renameClasses : function (style) {
		let a_classes = style.split(".");
		let newStyle = "";
		
		if (a_classes[0] === "") {
			a_classes.shift();
		}
		
		for (let i = 0; i < a_classes.length; i++) {
			newStyle += "." + this.id + "_" + a_classes[i];
		}
		
		return newStyle;
	},
	
	/**
	 *
	 */
	applyPattern : function (refPattern, style, size) {
		const defs = this.grid.getTwoRef().renderer.defs;
		let newStyle = this.renameClasses(style);
		let $paths;
		let $gSVG;
		
		this.svgDoc = $(refPattern).getSVG().get(0);
		
		$paths = $(this.svgDoc).find("path");
		$gSVG = $(this.svgDoc).find("g#SVG");
		console.log("$gSVG", $gSVG);
		
		for (let i = 0; i < $paths.length; i++) {
			let pathClass = $($paths[i]).attr("class");
			let parent = $($paths[i]).parent();
			//console.log("parent", parent);
			
			$($paths[i]).attr("class", this.id + "_" + pathClass);
		}

		$(this.svgDoc).find("style").get(0).innerHTML = newStyle;
		//$(this.svgDoc).setSVGStyle(style);
		
		this.imagePattern = this.svgDoc.children[0];
		this.imagePattern.setAttribute( "width", size * 2 );
		this.imagePattern.setAttribute( "height", size * 2 );
		this.imagePattern.setAttribute( "x", "0" );
		this.imagePattern.setAttribute( "y", "0" );
		this.imagePattern.setAttribute( "id", refPattern.id );
		
		$(this.pattern).append( $(this.imagePattern) );
		$(defs).append( this.pattern );
		$(refPattern).parent().remove();
	},
	
	/**
	 *
	 */
	getCharacterFileAndStyle : function (groupMembers) {
		let fileAndStyle = new Array();
		
		for (let i = 0; i < groupMembers.length; i++) {
			if (this.className === groupMembers[i].type) {
				
				fileAndStyle.push(groupMembers[i].file);
				fileAndStyle.push(groupMembers[i].style);
				
				this.grid.removeMemberFromGroup(i,1);
				
				return fileAndStyle;
			}
		}
	},
	
	/**
	 * Return the shape's polygon
	 */
	getPolygon : function () {	
		return this.polygon;
	},
	
	/**
	 * Return the shape's content if any (group member)
	 */
	getContent : function () {	
		//console.log("this.content", this.content);
		return this.content;
	},
	
	/**
	 * Set the shape's color (for testing purpose for now)
	 */
	setColor : function (x, y) {	
		//console.log("For testing purpose only");
		this.polygon.fill 	= "#FF0";
		this.polygon.stroke = "#FF0";
	},
	
	/**
	 * Set the shape's coordinates
	 */
	setCoordinates : function () {	
		
	}
}