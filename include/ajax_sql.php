<?php
/*
 * Connection to the database
 */
function connectToDB() {
	$servername = "localhost";
	$username 	= "qualtrics";
	$password 	= "!Test_Qualtrics.2018";
	$dbname 	= "test";
	
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Check connection
	if ($conn->connect_error) {
		echo "Connection failed: " . $conn->connect_error;
		die("Connection failed: " . $conn->connect_error);
	}
	//echo "Connected successfully";
	return $conn;
}

/*
 * Insert participant's info into database
 * @param {string} id - Participant's id.
 */ 
function insertInfoDB($pid) {
	// Create connection with the database
	$conn = connectToDB();
	
	// ---------------------------------------
	// Participant's data (dummy data for now)
	// ---------------------------------------
	$gender 	= "Male"; //mysqli_real_escape_string($conn, "Male");
	$age 		= mt_rand(18,99);
	$ethnicity 	= "Caucasian";
	
	// Prepare the statement (offers a protection against SQL injection)
	$stmt = $conn->prepare("INSERT INTO participant (pid, gender, age, ethnicity) VALUES (?, ?, ?, ?)");
	// Bind parameters to the statement (i=Integer, s=String, d=Double, b=Blob)
	$stmt->bind_param("ssis", $pid, $gender, $age, $ethnicity);
	// Execute the statement
	$stmt->execute();
	
	if($stmt->affected_rows === 0) {
		alert('No rows updated');
		exit('No rows updated');
	} else {
		console.log($stmt->affected_rows, "row(s) inserted");
	}
	
	// Close the statement
	$stmt->close();
	
	// Close connection with the database
	$conn->close();
}

/*
 * Insert avatars info into database
 * @param {string} id - Participant's id.
 */ 
function insertAvatarDB($pid) {
	// Create connection with the database
	$conn = connectToDB();
	
	// Prepare the statement (offers a protection against SQL injection)
	$stmt = $conn->prepare("INSERT INTO avatar (isSelf, skinColor, hairColor, hairType, glasses, pid) VALUES (?, ?, ?, ?, ?, ?)");
	
	// ----------------------------------
	// Avatar's data (dummy data for now)
	// ----------------------------------
	$isSelf 	= TRUE;
	$skinColor 	= "#CD45A7";
	$hairColor 	= "#38F5DE";
	
	// TODO: Parse a JSON object received in argument ?
	for ($x = 1; $x <= 9; $x++) {
		// -------------
		// More avatar's data
		// -------------
		$hairType 	= mt_rand(0,12);
		$glasses 	= mt_rand(0,5);
		
		// Bind parameters to the statement (i=Integer, s=String, d=Double, b=Blob)
		$stmt->bind_param("issiis", $isSelf, $skinColor, $hairColor, $hairType, $glasses, $pid);
		
		// Execute the statement
		$stmt->execute();
		
		if($stmt->affected_rows === 0) {
			//alert('No rows updated');
			exit('No rows updated');
		} else {
			console.log($stmt->affected_rows, "row(s) inserted");
		}
	}
	
	// Close the statement
	$stmt->close();
	
	// Close connection with the database
	$conn->close();
}

// Get the parameters sent by $.ajax()
if(isset($_POST["object"]) && !empty($_POST["object"])) {
	switch($_POST["object"]) {
        case "info"   : insertInfoDB($_POST["id"]);break;
        case "avatar" : insertAvatarDB($_POST["id"]);break;
        // ...etc...
    }
}
?>