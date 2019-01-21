/*
 * Constructor and properties
 * TODO: This object (Avatar) should eventually inherit from a parent object (Person? Community?)
 * TODO: Other objects, such as Community (?) or People (?) would also inherit that parent object
 */
function Avatar (jsonObj) {
	// Get the reference of the avatar's SVG object by selecting its id
	this.svgObject = $("#" + jsonObj.svgObjectId);
	
	// Get the reference of the avatar's style tag by selecting its id
	// this.avatarStyle = $("#" + jsonObj.avatarStyleId);
	this.avatarStyle;
	
	this.style;
	
	// Some properties that might be useful during animation
	this.typeOfCharacter = "avatar";
	this.isVaccinated = false;
	this.isInfected = false;
	this.relationship = "self";
	this.label = "me";
	this.vaccineDuration = 0;
	
	// Instantiation of the Avatar's customizer
	this.customizer = new AvatarCustomizer(this, jsonObj);
}

/*
 * Prototype for managing the methods
 */
Avatar.prototype = {
    constructor: Avatar,
	
	/*
	 * Return the avatar's customizer reference
	 */
	/* getCustomizer : function () {
		return this.customizer;
	}, */
	
	/*
	 * Return the avatar's customizer reference
	 */
	/* getStyle : function () {
		return this.style;
	}, */
	
	/*
	 * Return the avatar's SVG object
	 */
	/* getAvatarSVGObject : function () {
		return this.svgObject;
	}, */
	
	/*
	 * Set the avatar's skin color
	 */
	/* setSkinColors : function (color3, color4) {
		this.cls3color = color3;
		this.cls4color = color4;
	}, */
	
	/*
	 * Set the avatar's hair color
	 */
	/* setHairColors : function (color5, color6) {
		this.cls5color = color5;
		this.cls6color = color6;
	}, */
	
	/*
	 * Loads the corresponding SVG file that matches the selected type of hair
	 */
	loadSVGFileFromHairSelection : function (obj, cls3color, cls4color, cls5color, cls6color) {
		var that = this;
		
		// Sets the data attribute
		this.svgObject.attr("data", "./medias/" + obj.id + ".svg");
		
		// Waits for the new SVG file to be loaded 
		this.svgObject.on("load", function(){ 
			that.changeAvatarColors(cls3color, cls4color, cls5color, cls6color);
		});
	},
	
	/*
	 * Changes the avatar's style by replacing the SVG file's <style> element using the values passed in parameters
	 * Requires 4 colors (2 for the hair; 2 for the skin)
	 * TODO: Generalize the cls-1 and cls-2 part
	 */
	changeAvatarColors : function (cls3color, cls4color, cls5color, cls6color) {
		var that = this;
		
		// cls-1 and cls-2 seem to be for the t-shirt color
		// For now, we do not modify the t-shirt color (maybe later?)
		this.style = ".cls-1{fill:#D06133;}.cls-2{fill:#F67944;}.cls-3{fill:" + cls3color + ";}.cls-4{fill:" + cls4color + ";}.cls-5{fill:" + cls5color + ";}.cls-6{fill:" + cls6color + ";}#avatarCircle{fill: #FFF;stroke: #999;}";
		
		this.svgObject.setSVGStyle(this.style);
	},
	
	/**
	 * Clone the avatar to use in other slides
	 * 
	 * @param {boolean} 		emptyHtml - boolean value whether we empty the target's html content before cloning, otherwise avatars will add up in the container
	 * @param {jquery object} 	source	  - source to be cloned
	 * @param {jquery object} 	target 	  - target where we want the clone to be appened to
	 * @param {string} 			newId 	  - the new id we want to give the clone to avoid id duplicates
	 */
	cloneAvatar : function (emptyHtml, source, target, newId) {
		var that = this;
		
		// Might not be useful if the application does not allow to got back and change the avatar's characteristics
		if (emptyHtml) {
			target.empty();
		}
		
		// We might want to consider not cloning if we don't need to go back to the avatar creator
		//source.appendTo(target);
		source.clone().appendTo(target).attr({"id": newId});
		
		$("#" + newId).on("load", function(){
			$(this).setSVGStyle(that.style);
		});
	}
}