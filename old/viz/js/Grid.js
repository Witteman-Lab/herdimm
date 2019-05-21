/*
 * Grid (Prototype syntax)
 * 
 * @param {object} 	shapes 		- Object containing the properties of the shapes.
 * @param {object} 	connections - Object containing the properties of the connections.
 * @param {array} 	gridIds 	- Array containing ids of the shapes to be displayed.
 */
function Grid (shapes, connections, gridIds, group, refGroupObject) {
	this.shapeArray = new Array();
	this.elem = document.getElementById(shapes.containerId);
	this.params = { width: $("#"+this.elem.id).width(), height: $("#"+this.elem.id).height() };
	this.groupMembers;
	this.refGroupObject = refGroupObject;
	
	// Creation of the Two instance
	this.two = new Two(this.params).appendTo(this.elem);
	//console.log("this.two", this.two);
	//console.log("this.two width x height", this.two.width + " x " + this.two.height);
	
	// Creation of the Raphael instance
	//this.paper = Raphael(0, 0, this.params.width, this.params.height);
	
	// Creation of the Snap instance
	//this.snap = Snap(this.params.width, this.params.height);
	//this.snap.attr("id", "testSnap");
	
	// For D3
	this.connections = d3.select("svg")
						 .append("g")
						 .attr("id","connections");
						 
	//console.log("this.connections", this.connections);
	//console.log("this.connections.size()", this.connections.size());
	
	this.shapeParams = {
		"shapeSize" 	: shapes.shapeSize,
		"sidesNumber" 	: shapes.sidesNumber,
		"cap" 			: shapes.cap,
		"margin" 		: shapes.margin,
		"fill" 			: shapes.fill,
		"stroke" 		: shapes.stroke,
		"infectedColor" : shapes.infectedColor,
		"opacity" 		: shapes.opacity,
		"linewidth" 	: shapes.linewidth
	}
	
	this.connectionParams = {
		"linewidth" : connections.linewidth,
		"stroke" 	: connections.strokeColor
	}
	
	this.parseArrays(shapes, connections, gridIds, group, refGroupObject);
}

/*
 * Prototype for managing the methods
 * 	parseArrays(): 
 * 	getTwoRef(): 
 * 	centerGroup(): 
 * 	makeLinks(): 
 */
Grid.prototype = {
    constructor: Grid,
	
	/**
	 * Parse the arrays
	 * 
	 * @param {object} 	shapes 		 	- Object containing the properties of the shapes.
	 * @param {object} 	connections  	- Object containing the properties of the connections.
	 * @param {array} 	gridIds 	 	- Array containing ids of the shapes to be displayed.
	 * @param {object} 	groupMembers 	- The group of person chosen by the participant
	 * @param {object} 	refGroupObject 	- Reference to the Javascript Group object
	 */
	parseArrays : function (shapes, connections, gridIds, groupMembers, refGroupObject) {
		var shapesGroup = new Array();
		
		this.groupMembers = this.parseGroup(groupMembers);
		//this.refGroupObject = this.parseRefGroupObject(refGroupObject);
		
		console.log("refGroupObject", refGroupObject);
		
		for(var i = 0; i < gridIds.length; i++){
			for(var j = 0; j < gridIds[i].length; j++){
				if (gridIds[i][j] !== ""){
					var shape = new Shape(
						this,
						shapes.shapes[gridIds[i][j].className],
						gridIds[i][j].id,
						groupMembers,
						refGroupObject,
						j,
						i,
						this.shapeParams
					);
					shapesGroup.push(shape.getPolygon());
				}
			}
		}
		
		// Gather all the shapes into a group (for easier management (e.g. for centering))
		this.group = this.two.makeGroup(shapesGroup);	
		//console.log("this.group", this.group);
		//console.log("this.group.getBoundingClientRect()", this.group.getBoundingClientRect());

		//console.log("this.group.getBBox()", this.group.getBBox());
		
		this.centerGroup(this.two.width / 2, this.two.height / 2);
		//$('.my-class')[0].getBBox().width;
		
		// Update the Two instance for rendering the shapes created
		this.two.update();
		
		this.makeLinks(connections.connections);
	},
	
	/**
	 * 
	 */
	parseGroup : function (group) {
		return $.parseJSON(group);
	},
	
	/**
	 * 
	 */
	parseRefGroupObject : function (refGroupObject) {
		return $.parseJSON(refGroupObject);
	},
	
	/**
	 * 
	 */
	removeMemberFromGroup : function (positionMemberToDelete) {
		this.groupMembers.shapes.splice(positionMemberToDelete, 1);
	},
	
	
	/**
	 * 
	 */
	getGroupObject : function () {
		return this.refGroupObject;
	},
	
	/**
	 * 
	 */
	getGroupMembers : function () {
		return this.groupMembers.shapes;
	},
	
	/**
	 * Return the reference of Two
	 */
	getTwoRef : function () {	
		return this.two;
	},
	
	/**
	 * Center the group of shapes
	 */
	centerGroup : function (x, y) {	
		this.group.center();
		this.group.translation.set(x, y);
		
		this.two.update();
	},
	
	/**
	 * Build links between shapes (in development process)
	 */	
	makeLinks : function (connections) {	
		// *********************************************************************************************************
		// Using Two.js
		// *********************************************************************************************************
		
		// ************************************************************************************
		// Get rid of the margin stuff, should not be required, let alone with arbitrary values
		// Not supposed to do that
		// Need to find out why the coordinates are offset and require margins
		// ************************************************************************************
		/*var marginTop = 60;
		var marginLeft = 10;
		
		var line = this.two.makeLine(
			source.position().left + marginLeft,
			source.position().top  - marginTop,
			target.position().left + marginLeft,
			target.position().top  - marginTop); 
			
		line.linewidth = linewidth;
		line.stroke = stroke;
		
		// Update the stage
		this.two.update();
		
		// Call to animate the link
		this.animateLink($("#"+line.id).get(0));*/
		
		// *********************************************************************************************************
		// Using Raphael.js
		// *********************************************************************************************************
		/*var offset = parseInt(this.shapeParams.shapeSize);
		var line = this.paper.path(["M",
									source.position().left + offset,
									source.position().top  + offset,
									"L",
									target.position().left + offset,
									target.position().top  + offset]);
		
		line.attr("stroke-width", linewidth);
		line.attr("stroke", stroke);
		line.attr("id", "test");
		console.log(line);
		// Call to animate the link
		this.animateLink(line[0]);*/
		
		// *********************************************************************************************************
		// Using Snap.svg.js
		// *********************************************************************************************************
		/*var offset = parseInt(this.shapeParams.shapeSize);
		var line = this.snap.line(
			source.position().left + offset,
			source.position().top  + offset,
			target.position().left + offset,
			target.position().top  + offset);
		//console.log(line);
		line.attr("stroke-width", linewidth);
		line.attr("stroke", stroke);
		
		this.animateLink(line);*/
		
		// *********************************************************************************************************
		// Using D3.js
		// *********************************************************************************************************
		// *******************************************
		// This offset stuff should be revised !!!!!!!
		// *******************************************
		var offset 	= parseInt(this.shapeParams.shapeSize);
		var offsetX = offset / 2;
		var offsetY = offset * 3;
			
		for (let i = 0; i < connections.length; i++) {
			let source 	= $("." + connections[i].source);
			let target 	= $("." + connections[i].target);
			let next	= $(connections[i].next);
			
			var lineData = [{
				"x": source.position().left + offsetX,
				"y": source.position().top - offsetY
			},{
				"x": target.position().left + offsetX,
				"y": target.position().top - offsetY
			}];
			
			var lineFunction = d3.line()
				.x(function(d) { return d.x; })
				.y(function(d) { return d.y; });
				
			var line = d3.select("#connections")
			//var line = d3.select("#" + this.group.id)
				.append("path")
				.attr("d", lineFunction(lineData))
				.attr("stroke", this.connectionParams.stroke)
				.attr("stroke-width", this.connectionParams.linewidth);
										
			this.animateLink(line, source, target, next);
		}
	},
	
	/**
	 * Animate the link (in development process)
	 * 
	 * Animation are not working in Edge or IE11 other than with D3
	 */
	animateLink : function (path, source, target, next) {
		let that = this;
		// *********************************************************************************************************
		// Using Two + Raphael
		// *********************************************************************************************************
		/*var length = path.getTotalLength();
		
		//Clear any previous transition
		path.style.transition = path.style.WebkitTransition = 'none';
		
		//Set up the starting positions
		path.style.strokeDasharray = length + " " + length;
		path.style.strokeDashoffset = length;
		
		//Trigger a layout so styles are calculated & the browser and picks up the starting position before animating
		path.getBoundingClientRect();
		
		//Define our transition
		path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
		
		//Go!
		path.style.strokeDashoffset = '0';*/
		
		// *********************************************************************************************************
		// Using Raphael
		// *********************************************************************************************************
		
		
		// *********************************************************************************************************
		// Using Snap
		// *********************************************************************************************************
		/*var length = path.getTotalLength();
		console.log(length + " " + length);
		this.snap.attr({
			"stroke-dasharray": length + " " + length,
			// "stroke-dasharray": length,
			"stroke-dashoffset": length
		});
		
		this.snap.animate(
			{"stroke-dashoffset": 0},
			1000
		);*/
		
		// ********************************************************************************************************************************************
		// Using D3
		// .ease(d3.) [ .easeElastic | .easeBounce | .easeLinear | .easeSin | .easeQuad | .easeCubic | .easePoly | .easeCircle | .easeExp | .easeBack ]
		// ********************************************************************************************************************************************
		var length = path.node().getTotalLength();
		
		path
			.attr("stroke-dasharray", length + " " + length)
			.attr("stroke-dashoffset", length)
			.transition()
			.duration(1000)
			.delay(1000)
			.ease(d3.easeLinear)
			.attr("stroke-dashoffset", 0)
			.on( "start", function () {
				that.infectShape(source);
			})
			.on( "end", function () {
				if (next.length > 0) {
					that.makeLinks(next);
				}
				that.infectShape(target);
			});
	},
	
	/**
	 * Build the "transformers" around community (in development process)
	 */
	infectShape : function (shape) {
		d3.select("#" + shape.get(0).id)
			.transition()
			.duration(1000)
			.attr("stroke", this.shapeParams.infectedColor)
			.attr("fill", this.shapeParams.infectedColor);
		
		//shape.css({fill: this.shapeParams.infectedColor, stroke: this.shapeParams.infectedColor, transition: "1.0s"});
		
		/* shape.animate({
			fill: "#FF0000",
			stroke: "#FF0000"
		}, transition: "1.0s", function() {
			console.log("Animation complete");
		}); */
	},
	
	/**
	 * Build the "transformers" around community (in development process)
	 */
	makeTransformers : function (targets, strokewidth) {
		targets.attr("stroke-width", strokewidth);
	}
}
