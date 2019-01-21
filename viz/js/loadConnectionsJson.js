$(window).on("load", function(){
	// Load the shapes JSON file
	var jqxhr = $.getJSON( "./data/connections.json", function(jsonObj) {
	})
		// Actions take place here when loading is successful
		.done(function(jsonObj) {
			console.log("jsonObj", jsonObj);
		})
		// Actions take place here when loading failed
		.fail(function(fail) {
			//console.log(fail);
			alert("Loading the configuration file has failed.");
		})
		// Actions take place here every time (fail or success)
		.always(function() {
			//console.log("complete");
		});
});