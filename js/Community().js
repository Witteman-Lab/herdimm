/*
 * Constructor and properties
 * 
 */
function Community (jsonObj) {
	this.characters = jsonObj.characters;
	this.containerId = jsonObj.containerId;
	this.charactersSize = jsonObj.charactersSize;
	this.folder = jsonObj.folder;
	this.refCharacters = new Array();
	
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
Community.prototype = {
    constructor: Community,
	
	// ES6
	parseES6 : function () {
		let character;
		for (const key of Object.keys(this.characters)) {
			//console.log(key, this.characters[key]);
			let character = new Character(this.folder, this.characters[key]);
			console.log("character", character);
			this.refCharacters.push(character);
		}
		console.log("this.refCharacters", this.refCharacters);
	},
	
	// ES2017
	parseES2017 : function () {
		Object.entries(this.characters).forEach(
			([key, value]) => console.log(key, value)
		);
	}
}