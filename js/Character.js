/*
 * Constructor and properties
 * 
 */
function Character (refCharacters, keys) {
	var that = this;
	this.file = keys.file;
	this.type = keys.type;
	
	//console.log($(this).get(0));
	
	/* $(this).on("click", function () { 
		that.method("test");
	}); */
}

/*
 * Prototype for managing the methods
 */
Character.prototype = {
    constructor: Character,
	
	/*
	 * Description
	 */
	method : function (message) {
		//console.log("message", message);
	}
}