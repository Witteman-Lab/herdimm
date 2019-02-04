/**
 * Constructor and properties
 */
function GroupMember (style, memberNumber, type, file, svgContent) {
	this.style = style;
	this.memberNumber = memberNumber;
	this.type = type;
	this.file = file;
	this.svgContent = svgContent;
	
	//this.test();
	//this.setStyle();
}

/**
 * Prototype for managing the methods
 */
GroupMember.prototype = {
    constructor: GroupMember,
	
	/**
	 *
	 */
	test : function () {
		console.log("this.style", 		 this.style);
		console.log("this.memberNumber", this.memberNumber);
		console.log("this.type", 		 this.type);
		console.log("this.file", 		 this.file);
		console.log("this.svgContent", 	 this.svgContent);
	},
	
	/**
	 *
	 */
	setStyle : function () {
		console.log("this.svgContent", this.svgContent);
		console.log("this.style", this.style);
		// this.svgContent.setSVGStyle(this.style);
		$(this.svgContent).setSVGStyle(this.style);
		/* this.svgContent.get(0).on("load", function () {
			console.log("this", this);
			this.setSVGStyle(this.style);
		}); */
	}
}