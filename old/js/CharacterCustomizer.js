/*
 * Constructor and properties
 */
// function CharacterCustomizer (refCharacters, characterCustomizerId, charactersGroupId, maxCharactersInGroup) {
function CharacterCustomizer (refCharacters, refManager, characterCustomizerId, charactersGroupId, maxCharactersInGroup, facialHairFile, glassesFile) {
	this.refCharacters 			= refCharacters;
	this.refManager 			= refManager;
	this.characterCustomizerId 	= "#" + characterCustomizerId;
	this.charactersGroupId 		= "#" + charactersGroupId;
	this.maxCharactersInGroup 	= maxCharactersInGroup;
	this.actualNumberInGroup 	= 0;
	this.group 					= new Group(this, this.refManager, this.charactersGroupId, this.maxCharactersInGroup);
	this.closeButtonId 			= "close";
	this.addButtonId 			= "add";
	this.facialHair 			= this.loadFacialHair(facialHairFile);
	this.glasses 				= this.loadGlasses(glassesFile);
	this.style;
	this.classes;
	this.customizedCharacter;

	this.refManager.setRefCharacterCustomizer(this);
}

/*
 * Prototype for managing the methods
 */
CharacterCustomizer.prototype = {
    constructor: CharacterCustomizer,

	/**
	 *
	 */
	bindKeysActions : function () {
		let that = this;

		// $(document).keypress(function(e) { // keypress doesn't capture the Escape key
		$(document).keyup(function(e) {
			// switch (e.which) {
			switch (e.key) {
				// case 13:
				case "Enter":
					that.addToGroup();
					break;
				// case 27:
				case "Escape":
					that.hideCustomizer();
					break;
				default:
			}
		});
	},

	/**
	 *
	 */
	unbindKeysActions : function () {
		// Turn off the keyup listener previously binded in the bindKeysActions method
		$(document).off("keyup");
	},

	/**
	 * TODO: REUSE the $(when) jQuery method for both loadFacialHair and loadGlasses altogether
	 */
	loadFacialHair : function (file) {
		let that = this;

		// Get the JSON data file for the characters
		$.getJSON( file, function(jsonObj) {})

		// When loading success
		.done(function(jsonObj) {
			that.facialHair = jsonObj;
		})

		// In case it fails
		.fail(function(fail) {
			alert("Loading the file has failed.");
			return null;
		})

		// In case we want something to ALWAYS happen (while success or fail)
		.always(function() {});
	},

	/**
	 * TODO: REUSE the $(when) jQuery method for both loadFacialHair and loadGlasses altogether
	 */
	loadGlasses : function (file) {
		let that = this;

		// Get the JSON data file for the characters
		$.getJSON( file, function(jsonObj) {})

		// When loading success
		.done(function(jsonObj) {
			that.glasses = jsonObj;
		})

		// In case it fails
		.fail(function(fail) {
			alert("Loading the file has failed.");
			return null;
		})

		// In case we want something to ALWAYS happen (while success or fail)
		.always(function() {});
	},

	/**
	 * TODO: Make the Facial hair and Glasses stuff in another method outside?
	 */
	buildCustomizer : function () {
		// Usual object's reference for scoping issues withing methods
		let that = this;

		// TODO: Make this in a method outside?
		// Facial hair elements
		let facialHairFolder = this.facialHair.folder;
		let facialHairs = this.facialHair.facialHair;

		// TODO: Make this in a method outside?
		// Glasses elements
		let glassesFolder = this.glasses.folder;
		let glasses = this.glasses.glasses;

		// Variables for the "Close" and "Add" buttons
		let closeButton = "<button id=\"" + this.closeButtonId + "\">Close<br /><span class=\"shortcut\">[Esc]</span></button>";
		let addButton = "<button id=\"" + this.addButtonId + "\">Add to group<br /><span class=\"shortcut\">[Enter]</span></button>";

		// Variables for color picker (spectrum)
		// Maybe let go of the label
		let hairSpectrum = "<label>Hair color: </label><input type=\"text\" class=\"colorPicker\" id=\"hairSpectrum\" />";
		let skinSpectrum = "<label>Skin color: </label><input type=\"text\" class=\"colorPicker\" id=\"skinSpectrum\" />";

		// Add the components to the customizer
		$(this.characterCustomizerId).prepend(closeButton);
		$(this.characterCustomizerId).prepend(hairSpectrum);


		////////////////////////////////////////////////////////////////////////
		// Facial hair elements
		// TODO: Make this in a method outside?
		// TODO: Make IDs properties from JSON?
		////////////////////////////////////////////////////////////////////////
		$(this.characterCustomizerId).append("<div id=\"" + this.facialHair.containerId + "\">");
		// $("#" + this.facialHair.containerId).html("<span class=\"helper\"></span><img id=\"selectedFacialHair\" src=\"" + facialHairFolder + facialHairs.facialHair1.file + "\">");
		$("#" + this.facialHair.containerId).append("<p class=\"accessoryTitle\">Facial hair</p>");
		$("#" + this.facialHair.containerId).append("<span class=\"helper\"></span><img id=\"selectedFacialHair\" src=\"\">");
		$("#" + this.facialHair.containerId).append("<div id=\"listFacialHair\"></div>");

		// Build the list of facial hair
		this.buildAccessoriesList(facialHairs, facialHairFolder, "facialHair", "listFacialHair");

		$("#listFacialHair").hide();
		$("#" + this.facialHair.containerId).on("click", function () {
			$("#listFacialHair").toggle();
			if ($("#listGlasses").css("visibility") === "visible") {
				$("#listGlasses").hide();
			}
		});


		////////////////////////////////////////////////////////////////////////
		// Glasses elements
		// TODO: Make this in a method outside?
		// TODO: Make IDs properties from JSON?
		////////////////////////////////////////////////////////////////////////
		$(this.characterCustomizerId).append("<div id=\"" + this.glasses.containerId + "\">");
		// $("#" + this.glasses.containerId).html("<span class=\"helper\"></span><img id=\"selectedGlasses\" src=\"" + glassesFolder + glasses.glasses1.file + "\">");
		$("#" + this.glasses.containerId).append("<p class=\"accessoryTitle\">Glasses</p>");
		$("#" + this.glasses.containerId).append("<span class=\"helper\"></span><img id=\"selectedGlasses\" src=\"\">");
		$("#" + this.glasses.containerId).append("<div id=\"listGlasses\"></div>");

		// Build the list of glasses
		this.buildAccessoriesList(glasses, glassesFolder, "glasses", "listGlasses");

		$("#listGlasses").hide();
		$("#" + this.glasses.containerId).on("click", function () {
			$("#listGlasses").toggle();
			if ($("#listFacialHair").css("visibility") === "visible") {
				$("#listFacialHair").hide();
			}
		});

		$(this.characterCustomizerId).append(skinSpectrum);
		$(this.characterCustomizerId).append("<br />" + addButton);

		// TODO: Improve this part
		// Action triggered on click of the "Close" button
		$("#" + this.closeButtonId).on("click", function () {
			// Hide the customizer
			that.hideCustomizer();
		});
		// Action triggered on click of the "Add" button
		$("#" + this.addButtonId).on("click", function () {
			// Add the character to the group
			that.addToGroup();
		});

		/* $(".colorPicker").spectrum({
		//$("#hairSpectrum, #hairSpectrum").spectrum({
			showInitial: true,
			showInput: true
		}); */
	},

	/**
	 *
	 */
	buildAccessoriesList : function (accessories, folder, type, list) {
		let that = this;

		// $("#" + list).append("<p class=\"noAccessory\">None</p>");
		$("#" + list).append("<img class=\"noAccessory\" id=\"no" + type + "\" src=\"\">");
		$("#no" + type).on("click", function () {
			that.changeSelectedAccessory(this, type, src = "");
		});

		for (const key of Object.keys(accessories)) {
			let accessory = accessories[key];
			let src = folder + accessory.file;

			// $("#" + list).append("<span class=\"helper\"></span><img id=\"" + key + "\" src=\"" + src + "\">");
			$("#" + list).append("<img class=\"accessory\" id=\"" + key + "\" src=\"" + src + "\">");

			// Click action for every accessory
			$("#" + key).on("click", function () {
				that.changeSelectedAccessory(this, type, src);
			});
		}
	},

	/**
	 *
	 */
	changeSelectedAccessory : function (selectedAccessory, type, src) {
		console.log("selectedAccessory", selectedAccessory);
		if (type === "facialHair") {
			$("#selectedFacialHair").get(0).src = src;
		} else if (type === "glasses") {
			$("#selectedGlasses").get(0).src = src;
		}
	},

	/**
	 *	For getting a darker shade for the hair or skin
	 *	TODO: Improve
	 */
	getDarkerShade : function (selectedColorToHex) {

		const proportion = 0.8;

		let red 	= selectedColorToHex.substr(1,2);
		let green 	= selectedColorToHex.substr(3,2);
		let blue 	= selectedColorToHex.substr(5,2);

		let dec_red 	= parseInt(red, 16);
		let dec_green 	= parseInt(green, 16);
		let dec_blue 	= parseInt(blue, 16);

		dec_red 	*= proportion;
		dec_green 	*= proportion;
		dec_blue 	*= proportion;

		dec_red = Math.round(dec_red);
		dec_green = Math.round(dec_green);
		dec_blue = Math.round(dec_blue);

		let hex_red 	= dec_red.toString(16);
		let hex_green 	= dec_green.toString(16);
		let hex_blue 	= dec_blue.toString(16);

		if (hex_red.length === 1) {
			hex_red = "0" + hex_red.toString();
		}
		if (hex_green.length === 1) {
			hex_green = "0" + hex_green.toString();
		}
		if (hex_blue.length === 1) {
			hex_blue = "0" + hex_blue.toString();
		}

		return "#" + hex_red + hex_green + hex_blue;
	},

	/**
	 *
	 * TODO: Make "#customized" ou "customized" a property or something loaded from JSON
	 */
	setColorPickers : function (picker, initialColor) {
		// Usual object's reference for scoping issues withing methods
		let that = this;
		let cls;
		let cls_darker;

		// TODO: Maybe improve
		if (picker === "#skinSpectrum") {
			cls = "cls-3";
			cls_darker = "cls-4";
		} else if (picker === "#hairSpectrum") {
			cls = "cls-5";
			cls_darker = "cls-6";
		}

		$(picker).spectrum({
			color: initialColor,
			showInitial: true,

			//Do nothing here because the color change is applied on the "move" trigger and not the "change" trigger (button "choose")
			change: function() {},

			// Revert the color change get back to the previous color
			// NOTE: I (Martin) had to adapt the spectrum.js file (MIT license) to be able to call its "revert" method
				// Comments have been added in the file with my name (Martin Tremblay-Breault) where I adapted the code to find them more rapidly
			revert: function (initialColor) {
				that.changeColors(initialColor, cls, cls_darker);
			},

			// Apply the color to the customized character instantly
			// User still can cancel and get back to the previous color by clicking on the "cancel" link, which will call the revert method of the spectrum
			move: function(selectedColor) {
				that.changeColors(selectedColor, cls, cls_darker);
			}
		});
	},

	/**
	 * Change the customized character's colors
	 */
	changeColors : function (selectedColor, cls, cls_darker) {
		let darkerShade = this.getDarkerShade(selectedColor.toHexString());

		this.setNewStyle($("#customized"), cls, selectedColor.toHexString());
		this.setNewStyle($("#customized"), cls_darker, darkerShade);
	},

	/**
	 * Customize the character
	 */
	customize : function (character) {
		// Display/show the customizer
		this.customizedCharacter = character;
		this.showCustomizer();

		// Add the character in the customizer interface
		this.customizeCharacter();

		// Build the customizer AFTER calling customizeCharacter() otherwise any new content will be replaced by the html() method
		this.buildCustomizer();
	},

	/**
	 * Display/show the customizer
	 */
	showCustomizer : function () {
		$(this.characterCustomizerId).show();
		this.bindKeysActions();
		this.refCharacters.disableClickAction();
	},

	/**
	 * Hide the customizer
	 * TODO: Get that "wrap_" prefix automatically
	 */
	hideCustomizer : function () {
		$(this.characterCustomizerId).hide();
		// "Unselects" the character
		$(".wrap_character").removeClass("selected");
		this.unbindKeysActions();

		if (this.actualNumberInGroup < this.maxCharactersInGroup) {
			this.refCharacters.enableClickAction();
		}

	},

	/**
	 * Clear the interface
	 */
	clearInterface : function () {
		$(this.characterCustomizerId).empty();
	},

	/**
	 * Add the character (a clone of it) in the customizer interface so it can be customized
	 * TODO: Make "#customized" ou "customized" a property or something loaded from JSON
	 */
	customizeCharacter : function (/*character*/) {
		// Usual object's reference for scoping issues withing methods
		let that = this;
		// New (unique) id to set to the character being customized
		// Maybe make it a property?
		let newID = "customized"

		// Prepping the character to be customized
		$(this.characterCustomizerId)
			.addClass("selected") // add the class to the original character
			.html(this.customizedCharacter.clone() // cloning it so it is not removed from the list of characters
				.removeClass("selected") // remove the class from the clone, not the original one
				.attr("id", newID) // set the new id
				// To make sure we perform those actions only when loaded
				// Not sure it is necessary though (because I don't think the cloning action triggers the loading of the file)
				// Maybe remove it if really not necessary, but a good thing to keep just in case
				.on("load", function () {
					that.getCharacterStyle($(this))
				})
			);
	},

	/**
	 * Get the character's style content
	 */
	getCharacterStyle : function (/*character*/) {
		// Get the style content
		let svg = this.customizedCharacter.getSVG().children().children()[0];
		let defs = $(svg).get(0);
		let style = $(defs).children().html();

		// Set the style property (initial style)
		this.setStyle(style);

		// Get styles for hair and skin
		this.getStyleElements();
	},

	/**
	 * Set the style property
	 */
	splitStyles : function () {
		this.classes = this.style.split(".");

		if (this.classes[0] === "") {
			this.classes.shift();
		}
	},

	/**
	 * Set the style property
	 * TODO: Revise the procedure, it works but doesn't seem very clean
	 */
	setStyle : function (style) {
		this.style = style;
		this.splitStyles();
	},

	/**
	 * Return the style propertyto other objects
	 * Don't know if it will be used
	 */
	getStyle : function () {
		return this.style;
	},

	/**
	 * Set the new style based on color selections
	 */
	setNewStyle : function (characterToCustomize, cls, color) {
		let newStyle = "";

		// Parse the classes so we get the initial hair and skin colors
		for (let i = 0; i < this.classes.length; i++) {
			let newClass = this.classes[i];

			if (this.classes[i].indexOf(cls) !== -1) {

				let posPound = this.classes[i].indexOf("#");
				let posSemicolon = this.classes[i].indexOf(";");
				let oldColor = this.classes[i].substring(posPound, posSemicolon);

				newClass = this.classes[i].replace(oldColor, color);
			}

			newStyle += "." + newClass;
		}

		this.setStyle(newStyle);

		let svgDoc = characterToCustomize.getSVG().get(0);
		$(svgDoc).find("style").remove();
		characterToCustomize.setSVGStyle(newStyle);
	},

	/**
	 * Get the different elements (classes) from the style argument
	 */
	getStyleElements : function () {
		this.splitStyles();

		// Parse the classes so we get the initial hair and skin colors
		for (let i = 0; i < this.classes.length; i++) {
			let cls = this.classes[i].split(":");

			// Hair color (cls-6 for darker shade)
			if (cls[0].indexOf("cls-5") !== -1) {
				let hairColor = cls[1].split(";")[0];
				this.setColorPickers("#hairSpectrum", hairColor)
			}

			// Skin color (cls-4 for darker shade)
			// 		NOTE: For now, if it's a baby, skin color is held in cls-2 class...
			// 		Hopefully, the next batch of characters will be more constant in its classes...
			if (cls[0].indexOf("cls-3") !== -1) {
				let skinColor = cls[1].split(";")[0];
				this.setColorPickers("#skinSpectrum", skinColor)
			}
		}
	},

	/**
	 * Add the character to the group (a.k.a the gang)
	 * TODO: Make "#customized" ou "customized" a property or something loaded from JSON
	 * TODO: Manage the type argument ("Avatar", "Vulnerable", "Other")
	 */
	addToGroup : function () {
		let that = this;
		let type = "comm";

		if (this.actualNumberInGroup < this.maxCharactersInGroup) {
			let groupId = "group_" + this.actualNumberInGroup;

			if(this.actualNumberInGroup === 0) {
				type = "avatar";
			} else if (this.actualNumberInGroup === 1 || this.actualNumberInGroup === 2) {
				type = "vulnerable";
			}

			this.actualNumberInGroup++
			this.group.addNewGroupMember($("#customized"), groupId, this.style, type);

			if (this.actualNumberInGroup === this.maxCharactersInGroup) {
				$("#continueAnimation").css("visibility", "visible");
				this.refCharacters.disableClickAction();
			}
		}

		this.style = "";
		this.hideCustomizer();
	}
}
