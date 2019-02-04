/**
 * Constructor and properties
 */
function Manager (charactersFile, facialHairFile, glassesFile, shapesFile, connectionsFile) {
	this.refCharacters;
	this.refCharacterCutomizer;
	this.refGroup;
	this.refGrid;
	
	// Store it in properties so we can use it later
	this.shapesFile 	 = shapesFile;
	this.connectionsFile = connectionsFile;
	
	this.initCharacters(charactersFile, facialHairFile, glassesFile);
}

/**
 * Prototype for managing the methods
 */
Manager.prototype = {
    constructor: Manager,
	
	/**
	 *
	 */
	initCharacters : function (charactersFile, facialHairFile, glassesFile) {
		var that = this;
		
		// Get the JSON data file for the characters
		$.getJSON( charactersFile, function(jsonObj) {} )
		
		// When loading success
		.done(function(jsonObj) {
			that.refCharacters = new Characters(that, jsonObj, facialHairFile, glassesFile);
		})
		
		// In case it fails
		.fail(function(fail) {
			alert("Loading the configuration file has failed.");
		})
		
		// In case we want something to ALWAYS happen (while success or fail)
		.always(function() {} );
	},
	
	/**
	 *
	 */
	loadVizData : function () {
		var that = this;
		
		$.when(
			$.getJSON("./data/shapes.json"),
			$.getJSON("./data/connections.json")
		)
		
		.done(function(shapes, connections) {
			Reveal.next();
			// Not really used at the moment, more for a visual representation of the grid structure
				// 0 = No shape
				// 1 = Presence of a shape
			let gridArray = new Array();
			gridArray = [
				[0,0,1,0,0,0,1,0,0,0,0,0,0,0], //2
				[0,1,0,1,0,1,0,1,0,1,0,1,0,0], //6
				[1,0,1,0,0,0,1,0,1,0,1,0,1,0], //6
				[0,1,0,1,0,1,0,1,0,1,0,1,0,0], //6
				[1,0,1,0,1,0,1,0,1,0,1,0,1,0], //7
				[0,1,0,1,0,1,0,1,0,1,0,1,0,0], //6
				[0,0,0,0,1,0,1,0,1,0,0,0,1,0], //4
				[0,0,0,1,0,1,0,1,0,1,0,0,0,1], //5
				[0,0,1,0,1,0,1,0,1,0,0,0,1,0], //5
				[0,0,0,1,0,1,0,1,0,1,0,1,0,1], //6
				[0,0,1,0,1,0,1,0,1,0,1,0,1,0], //6
				[0,0,0,1,0,0,0,1,0,1,0,1,0,1], //5
				[0,0,1,0,1,0,0,0,1,0,1,0,1,0], //5
				[0,1,0,1,0,0,0,1,0,0,0,1,0,1], //5
				[0,0,1,0,1,0,0,0,1,0,0,0,1,0], //4
				[0,1,0,1,0,1,0,1,0,1,0,0,0,0], //5
				[1,0,1,0,1,0,1,0,1,0,1,0,0,0], //6
				[0,1,0,0,0,1,0,1,0,1,0,0,0,0], //4
				[1,0,0,0,0,0,1,0,1,0,1,0,0,0], //4
				[0,0,0,0,0,1,0,0,0,1,0,0,0,0], //2
				[0,0,0,0,0,0,1,0,0,0,0,0,0,0]  //1
			];
			
			// ********************************************************************************************************************
			// TODO
			// Think about a way to build a small tool that could build this kind of structure using the previous array (gridArray)
			// It could facilitate adaptation by other people
			// ********************************************************************************************************************
			let gridIds = new Array();						
			gridIds = [
				["","",{"className":"gen", "id":"hex1"},"","","",{"className":"gen", "id":"hex2"},"","","","","","",""],
				["",{"className":"gen", "id":"hex3"},"",{"className":"gen", "id":"hex4"},"",{"className":"gen", "id":"hex5"},"",{"className":"gen", "id":"hex6"},"",{"className":"gen", "id":"hex7"},"",{"className":"gen", "id":"hex8"},"",""],
				[{"className":"gen", "id":"hex9"},"",{"className":"gen", "id":"hex10"},"","","",{"className":"gen", "id":"hex11"},"",{"className":"gen", "id":"hex12"},"",{"className":"gen", "id":"hex13"},"",{"className":"gen", "id":"hex14"},""],
				["",{"className":"gen", "id":"hex15"},"",{"className":"gen", "id":"hex16"},"",{"className":"gen", "id":"hex17"},"",{"className":"gen", "id":"hex18"},"",{"className":"gen", "id":"hex19"},"",{"className":"gen", "id":"hex20"},"",""],
				[{"className":"gen", "id":"hex21"},"",{"className":"gen", "id":"hex22"},"",{"className":"gen", "id":"hex23"},"",{"className":"gen", "id":"hex24"},"",{"className":"gen", "id":"hex25"},"",{"className":"gen", "id":"hex26"},"",{"className":"gen", "id":"hex27"},""],
				["",{"className":"gen", "id":"hex28"},"",{"className":"gen", "id":"hex29"},"",{"className":"vulnerable", "id":"hex30"},"",{"className":"gen", "id":"hex31"},"",{"className":"gen", "id":"hex32"},"",{"className":"gen", "id":"hex33"},"",""],
				["","","","",{"className":"gen", "id":"hex34"},"",{"className":"comm", "id":"hex35"},"",{"className":"vulnerable", "id":"hex36"},"","","",{"className":"gen", "id":"hex37"},""],
				["","","",{"className":"gen", "id":"hex38"},"",{"className":"comm", "id":"hex39"},"",{"className":"comm", "id":"hex40"},"",{"className":"gen", "id":"hex41"},"","","",{"className":"gen", "id":"hex42"}],
				["","",{"className":"gen", "id":"hex43"},"",{"className":"gen", "id":"hex44"},"",{"className":"comm", "id":"hex45"},"",{"className":"comm", "id":"hex46"},"","","",{"className":"gen", "id":"hex47"},""],
				["","","",{"className":"gen", "id":"hex48"},"",{"className":"gen", "id":"hex49"},"",{"className":"avatar", "id":"hex50"},"",{"className":"gen", "id":"hex51"},"",{"className":"gen", "id":"hex52"},"",{"className":"gen", "id":"hex53"}],
				["","",{"className":"gen", "id":"hex54"},"",{"className":"gen", "id":"hex55"},"",{"className":"comm", "id":"hex56"},"",{"className":"gen", "id":"hex57"},"",{"className":"gen", "id":"hex58"},"",{"className":"gen", "id":"hex59"},""],
				["","","",{"className":"gen", "id":"hex60"},"","","",{"className":"gen", "id":"hex61"},"",{"className":"gen", "id":"hex62"},"",{"className":"gen", "id":"hex63"},"",{"className":"gen", "id":"hex64"}],
				["","",{"className":"gen", "id":"hex65"},"",{"className":"gen", "id":"hex66"},"","","",{"className":"gen", "id":"hex67"},"",{"className":"gen", "id":"hex68"},"",{"className":"gen", "id":"hex69"},""],
				["",{"className":"gen", "id":"hex70"},"",{"className":"gen", "id":"hex71"},"","","",{"className":"gen", "id":"hex72"},"","","",{"className":"gen", "id":"hex73"},"",{"className":"gen", "id":"hex74"}],
				["","",{"className":"gen", "id":"hex75"},"",{"className":"gen", "id":"hex76"},"","","",{"className":"gen", "id":"hex77"},"","","",{"className":"gen", "id":"hex78"},""],
				["",{"className":"gen", "id":"hex79"},"",{"className":"gen", "id":"hex80"},"",{"className":"gen", "id":"hex81"},"",{"className":"gen", "id":"hex82"},"",{"className":"gen", "id":"hex83"},"","","",""],
				[{"className":"gen", "id":"hex84"},"",{"className":"gen", "id":"hex85"},"",{"className":"gen", "id":"hex86"},"",{"className":"gen", "id":"hex87"},"",{"className":"gen", "id":"hex88"},"",{"className":"gen", "id":"hex89"},"","",""],
				["",{"className":"gen", "id":"hex90"},"","","",{"className":"gen", "id":"hex91"},"",{"className":"gen", "id":"hex92"},"",{"className":"gen", "id":"hex93"},"","","",""],
				[{"className":"gen", "id":"hex94"},"","","","","",{"className":"gen", "id":"hex95"},"",{"className":"gen", "id":"hex96"},"",{"className":"gen", "id":"hex97"},"","",""],
				["","","","","",{"className":"gen", "id":"hex98"},"","","",{"className":"gen", "id":"hex99"},"","","",""],
				["","","","","","",{"className":"gen", "id":"hex100"},"","","","","","",""]
			];

			//let group = sessionStorage.getItem("group");
			that.refGrid = new Grid(that, shapes[0], connections[0], gridIds/*, group*/);
		})
	
		// Actions take place here when loading fails
		.fail(function(fail) {
			alert("Loading data files failed.");
		})
		
		// Actions take place here every time (fail or success)
		.always(function() {});
	},
	
	/**
	 *
	 */
	setRefCharacterCustomizer : function (ref) {
		this.refCharacterCutomizer = ref;
	},
	
	/**
	 *
	 */
	setRefGroup : function (ref) {
		this.refGroup = ref;
	},
	
	/**
	 *
	 */
	setRefGrid : function (ref) {
		this.refGrid = ref;
	},
	
	/**
	 *
	 */
	getRefGroup : function () {
		return this.refGroup;
	}
}