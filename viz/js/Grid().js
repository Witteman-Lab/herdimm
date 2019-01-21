/*
 * Grid
 * @param {object} gridJsonObj - Object containing the properties of the grid.
 * @param {array} gridIds - Array containing ids of the shapes to be displayed.
 */
//function Grid(gridJsonObj, gridArray, gridIds) {
function Grid(gridJsonObj, gridIds) {
    /*************
	* Properties *
	*************/
	this.shapeArray = new Array();
	this.elem = document.getElementById(gridJsonObj.containerId);

	//this.params = { width: 800, height: 600 };
	this.params = { width: $("#"+this.elem.id).width(), height: $("#"+this.elem.id).height() };
	this.two = new Two(this.params).appendTo(this.elem);
	
	console.log("this.two", this.two);
	
	this.generalParams = {
		"shapeSize" 	: gridJsonObj.shapeSize,
		"sidesNumber" 	: gridJsonObj.sidesNumber,
		"cap" 			: gridJsonObj.cap,
		"margin" 		: gridJsonObj.margin,
		"fill" 			: gridJsonObj.fill,
		"stroke" 		: gridJsonObj.stroke,
		"opacity" 		: gridJsonObj.opacity,
		"linewidth" 	: gridJsonObj.linewidth
	}
	
	
	/**********
	* Methods *
	**********/
	/* 
	 * Parse the arrays 
	 */
	this.parseArrays = function() {
		var shapesGroup = new Array();
		//var groupX = 0;
		//var groupY = 0;
		
		for(var i = 0; i < gridIds.length; i++){ //gridArray
			for(var j = 0; j < gridIds[i].length; j++){ //gridArray
				if (gridIds[i][j] !== ""){
					var shape = new Shape(
						this,
						gridJsonObj.shapes[gridIds[i][j].className],
						gridIds[i][j].id,
						j,
						i,
						this.generalParams
					);
					shapesGroup.push(shape.getPolygon());
				}
			}
		}
		
		// Gather all the shapes into a group (for easier management)
		this.group = this.two.makeGroup(shapesGroup);
		this.centerGroup(this.two.width / 2, this.two.height / 2);
		
		// Update the Two instance for rendering the shapes created
		this.two.update();
		
		this.makeLink();
	}
	
	/* 
	 * Return the reference of Two
	 */
	this.getTwoRef = function() {
		return this.two;
	}
	
	
	/* 
	 * Center the group of shapes
	 */
	this.centerGroup = function(x, y) {
		this.group.center();
		this.group.translation.set(x, y);
		
		this.two.update();
	}
	
	/* 
	 * Build links between shapes
	 */
	this.makeLink = function() {
		var source = $(".hex58");
		var target = $(".hex26");
		
		console.log(source.position().left, source.position().top, target.position().left, target.position().top);
		
		var line = this.two.makeLine(source.position().left, source.position().top, target.position().left, target.position().top);
		
		console.log("line", line);
		
		this.two.update();
	}
	
	
	/****************
	* Initial calls *
	****************/
	this.parseArrays();
}