/*
 * Constructor and properties
 * 
 */
// function Characters (jsonObj) {
function Characters (refManager, jsonObj, facialHairFile, glassesFile) {
	this.refManager = refManager;
	
	// For test purpose only, to delete after
	this.type = "object"; // img | object
	
	this.characters = jsonObj.characters;
	this.containerId = jsonObj.containerId;
	this.className = jsonObj.className;
	this.characterCustomizerId = jsonObj.characterCustomizerId;
	this.charactersGroupId = jsonObj.charactersGroupId;
	this.charactersSize = jsonObj.charactersSize;
	this.folder = jsonObj.folder;
	this.refCharacters = new Array();
	this.maxCharactersInGroup = jsonObj.maxCharactersInGroup;
	this.characterCustomizer = new CharacterCustomizer(this, this.refManager, this.characterCustomizerId, this.charactersGroupId, this.maxCharactersInGroup, facialHairFile, glassesFile); // or jsonObj.characterCustomizerId if property not used anywhere else
	
	//this.manageSubtitle("Create your own avatar");
	
	// ECMAScript 5 (does not work)
	//this.parse5();
	
	// ES6 (works)
	this.parseES6();
	
	// ES2017 (works)
	//this.parseES2017();
}

/*
 * Prototype for managing the methods
 */
Characters.prototype = {
    constructor: Characters,
	
	/**
	 * Return the folder containing the medias for the characters
	 * Might not be used after all
	 */ 
	getFolder : function () {
		return this.folder;
	},
	
	/**
	 * 
	 */ 
	manageSubtitle : function (subtitle) {
		$("<h2>").html("");
		$("<h1>").insertAfter("<h2>" + subtitle + "</h2>");
	},
	
	/**
	 * Return the file's name, without the extension (e.g. .svg)
	 */ 
	getFileName : function (file) {
		let filename = file.split(".")[0];
		return filename;
	},
	
	/**
	 * ES6
	 */ 
	parseES6 : function () {
		let character;
		let isLast = false;
		let numberOfCharacters = Object.keys(this.characters).length;
		let counter = 0;
		
		for (const key of Object.keys(this.characters)) {
			let character = new Character(this, this.characters[key]);
			
			this.refCharacters.push(character);
			
			counter++;
			if (counter === numberOfCharacters) {
				isLast = true;
			}
			
			this.buildCharactersDisplay(character, isLast);
		}
	},
	
	/**
	 * ES2017
	 * To use if it's compatible with most (all?) browsers
	 * Keep using ES6 for now
	 */ 
	parseES2017 : function () {
		Object.entries(this.characters).forEach(
			([key, value]) => console.log(key, value)
		);
	},
	
	/**
	 *
	 */
	buildCharactersDisplay : function (character, isLast) {
		// Usual object's reference for scoping issues withing methods
		var that = this;
		// Container for the loader 
		var loader = $("#loader");
		// Container for the characters 
		var container = $("#" + this.containerId);
		
		// Get the file's name to get unique ids
		let id = this.getFileName(character.file);
		let elementToCreate;
		
		// Use that prefix to distinguish the object and its wrapper
		const prefix = "wrap_";

		// Using img tag is much more simpler to manage, but it does not allow to modify the SVG's content (keep for the moment though)
		if (this.type === "img") {
			elementToCreate = "<img src=\"" + this.folder + character.file + "\" alt=\"" + id + "\" class=\"" + this.className + "\" id=\"" + id + "\" />\n";
		// We use object tag because it allows for modifying the SVG's content
		// The problem is that object tags can't listen to triggers such as click events, so we need to wrap it with something (whether it is <a> <span> <p> or <div>)
		// I would like to use the wrap() method below, but we encounter some problems at the moment, so we simply go that way
		} else {
			elementToCreate = "<div class=\"" + prefix + this.className + "\" id=\"" + prefix + id + "\" \">\n";
			elementToCreate += "<object type=\"image/svg+xml\" data=\"" + this.folder + character.file + "\" class=\"" + this.className + "\" id=\"" + id + "\">\n";
			elementToCreate += "Your browser does not support SVG\n";
			elementToCreate += "</object>\n";
			elementToCreate += "</div>\n";
			
			// Using this wrap method would be nice and simpler, but I encounter some problems at the moment, so keep in reserve for maybe later
			//$("." + this.className).wrap(wrapper);
		}

		$("#" + this.containerId).append(elementToCreate);
	
		// Wait for the SVG file to be loaded 
		$("#" + id).on("load", function(){
			
			// If it is the last SVG file to be loaded 
			if (isLast) {	
				// Hide the loader
				loader.hide();
			
				// Show the container with all the characters
				// TODO: Get the group id differently 
				container.css("visibility", "visible");
				$("#group").css("visibility", "visible");
			}
			
			// Since we need to wrap the object tags with something (the parent) that can listen to triggers...
			$(this).parent().on("click", function() {
				that.onclick(this);
			});
		})

	},
	
	onclick : function (obj) {
		let that = this;
		
		$("." + this.className).removeClass("selected");
		$(obj).addClass("selected");
		
		that.characterCustomizer.clearInterface();
		
		// If we trigger something on the parent, we need to send the children in argument
		that.characterCustomizer.customize($(obj).children());
	},
	
	disableClickAction : function () {
		$(".wrap_character").css("cursor", "auto");
		$(".wrap_character").off("click");
	},
	
	enableClickAction : function () {
		let that = this;
		
		$(".wrap_character").css("cursor", "pointer");
		$(".wrap_character").on("click", function () {
			that.onclick(this);
		});
	}
}