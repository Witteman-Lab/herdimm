Reveal.initialize({
	// Transition style : "none" / "fade" / "slide" / "convex" / "concave" / "zoom"
	transition: "fade",
	// Display (true) or not (false) controls in the bottom right corner
	controls: false,
	// Display (true) or not (false) a presentation progress bar
	progress: false,
	// Enable (true) or disable (false) keyboard shortcuts for navigation
	keyboard: false,
	// Disable the slide overview mode
	overview: false,
	// Disable vertical centering of slides
	center: false,
	// Number of slides away from the current that are visible
	// Temporary value: 100 so the avatar configuration is not resetted (not sure why); should not be really useful in the end
	viewDistance: 10
});

Reveal.configure({
	keyboard: {
		//13: 'next', // go to the next slide when the ENTER key is pressed
		//27: function() {}, // do something custom when ESC is pressed
		//32: 'next' // don't do anything when SPACE is pressed (i.e. disable a reveal.js default binding)
	}
});

Reveal.addEventListener("slidechanged", function(event) {
	// event.previousSlide | event.currentSlide | event.indexh | event.indexv
	switch(event.currentSlide.id) {
		// 
		case "groupCreation":
			break;
		// 
		case "groupPresentation":
			break;
		default:
	}
} );