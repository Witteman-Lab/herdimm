//$(function() {
	let charactersFile 	= "./data/characters.json",
		facialHairFile 	= "./data/facialHair.json",
		glassesFile 	= "./data/glasses.json",
		shapesFile		= "./data/shapes.json",
		connectionsFile	= "./data/connections.json";

	let vizManager 		= new Manager(charactersFile, facialHairFile, glassesFile, shapesFile, connectionsFile);
//});