/*
 * Constructor and properties
 * 
 */
function Group (refCustomizer, refManager, charactersGroupId, maxCharactersInGroup) {
	this.refCustomizer 			= refCustomizer;
	this.refManager 			= refManager;
	this.charactersGroupId 		= charactersGroupId;
	this.maxCharactersInGroup 	= maxCharactersInGroup;
	this.members 				= new Array();
	this.membersToUse 			= new Array();
	this.memberNumber			= 0;
	
	this.refManager.setRefGroup(this);
	
	// Temporary?
	sessionStorage.removeItem("group");
			
	this.buildGroupContainer();
}

/*
 * Prototype for managing the methods
 */
Group.prototype = {
    constructor: Group,
	
	/**
	 * 
	 * TODO: Make "selectedMember" a property or something loaded from JSON
	 * TODO: Make "#groupCreation" a property or something loaded from JSON
	 */
	buildGroupContainer : function () {
		let that = this;
		const id = "group";
		
		$("#groupCreation").append("<div id=\"" + id + "\"><h2>Your group</h2></div>");
		
	
		for (let i = 0; i < this.maxCharactersInGroup; i++) {
			//$("#" + id).append("<p class=\"memberTitle\" id=\"memberTitle" + i + "\">Member</p>");
			$("#" + id).append("<div class=\"selectedMember\" id=\"selectedMember" + i + "\"></div>");
		}
		
		// $("#groupCreation").append("<button class=\"main-controls navigate-next\" id=\"continuer\" type=\"button\">Continuer</button>");
		$("#groupCreation").append("<button id=\"continue\" type=\"button\">Continue</button>");
		// $("#groupCreation").append("<a class=\"\" id=\"continuer\" href=\"./viz/\">Continuer</button>");
		
		$("#continue").on("click", function () {
			that.setGroupConfig();
		});
	},
	
	/**
	 *
	 */
	addNewGroupMember : function (customized, groupId, style, type) {
		let svgContent = customized.getSVG().get(0).documentElement;
		
		let file = customized.get(0).data.split("characters/")[1];
		let groupMember = new GroupMember(style, this.memberNumber, type, file, $(svgContent));
		
		this.members.push(groupMember);
		//this.membersToUse = this.members.slice();
		//this.membersToUse.push(groupMember);
		this.addToGroup(customized, style);
	},
	
	/**
	 * 
	 * TODO: Make "selectedMember" a property or something loaded from JSON
	 */
	addToGroup : function (customized, style) {
		$("#selectedMember" + this.memberNumber)
			.html(customized.clone() // cloning it so it is not removed from the list of character
				
				// set the new id
				.attr("id", "member" + parseInt(this.memberNumber))
				
				// set the class
				.attr("class", "member") 
				
				// To make sure we perform those actions only when loaded
				.on("load", function () {
					$(this).setSVGStyle(style);
				})
			);
			
		this.memberNumber++;
	},
	
	/**
	 * 
	 */
	getMembers : function () {
		return this.members;
		//return this.membersToUse;
	},
	
	applyMembersStyle : function () {
		for (let i = 0; i < this.members.length; i++) { //membersToUse
			this.members[i].setStyle();
		}
	},
	
	/**
	 * 
	 */
	setGroupConfig : function () {		
		//let group = new Object();
		//group.shapes = new Array();
		
		for(let i = 0; i < this.members.length; i++) {
			let member = this.members[i];
			let shape = new Object();
		   
			shape.className  = member.type;
			//shape.fill 	 = "";
			//shape.stroke 	 = "";
			shape.content 	 = member.file;
			shape.style 	 = member.style;
			shape.svgContent = member.svgContent;
		   
			//group.shapes.push(shape);
		}
		
		// let jsonGroup = JSON.stringify(group);
		/*let jsonGroup = JSON.stringify(group);
		
		if (typeof(Storage) !== "undefined") {
			sessionStorage.removeItem("group");

			if (sessionStorage.getItem("group") === null) {
				sessionStorage.setItem("group", jsonGroup);
			} else {
				console.log("sessionStorage.getItem(\"group\") !== null");
			}
		} else {
			console.log("typeof(Storage) === \"undefined\"");
		}*/
		
		//Reveal.next();
		this.refManager.loadVizData();
	}
}