/*
 * Hexagon
 */
function Hexagon(grid, obj, generalParams) {
    /*************
	* Properties *
	*************/
	var that = this;
	
	this.column = parseInt(obj.column);
	this.fill = obj.fill;
	this.id = obj.id;
	this.line = parseInt(obj.line);
	this.linewidth = parseInt(obj.linewidth);
	this.opacity = obj.opacity;
	this.stroke = obj.stroke;
	this.grid = grid;
	
	this.shapeSize = parseInt(generalParams.shapeSize);
	this.margin = parseInt(generalParams.margin);
	
	var x = this.column * ((2 * this.shapeSize + this.linewidth) + this.margin);
	// Okay for now, but to revisit
	var y = this.line 	* (this.shapeSize + this.margin);
	
	var polygon = this.grid.getTwoRef().makePolygon(x, y, this.shapeSize, generalParams.sidesNumber);

	polygon.fill = this.fill || "#FFF";
	polygon.opacity = this.opacity || 1;
	polygon.stroke = this.stroke || "#F00";
	polygon.linewidth = this.linewidth || 8;
	polygon.cap = generalParams.cap || "round";
	
	/**********
	* Methods *
	**********/
	this.setColor = function(){
		
	}
	
	this.setCoordinates = function(){
		
	}
	
	this.grid.getTwoRef().update();
	
	$(polygon._renderer.elem)
		.css('cursor', 'pointer')
		.mouseenter(function(e) {
			polygon.fill = getRandomColor();
		})
		.mouseleave(function(e) {
			polygon.fill = that.fill;
		})
		.bind('mouseenter mouseleave', function() {
			that.grid.getTwoRef().update();
		});
		
	function getRandomColor() {
		return 'rgb('
		  + Math.floor(Math.random() * 255) + ','
		  + Math.floor(Math.random() * 255) + ','
		  + Math.floor(Math.random() * 255) + ')';
	  }
}