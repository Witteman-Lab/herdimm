<!doctype html>
<html lang="en">
	<head>
		<title>Make your gang</title>
		
		<!-- META -->
		<meta charset="UTF-8">
		<meta name="description" content="Avatar creation">
		<meta name="author" content="VDPDPC">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="robots" content="noindex, nofollow">
		
		<!-- STYLES -->
		<link rel="stylesheet" href="./css/reveal.css">
		<link rel="stylesheet" href="./css/styles.css">
		
		<!-- FAVICON -->
		<link rel="icon" href="../../../witteman-lab.ico">
		
		<!-- SCRIPTS -->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	</head>
	<body id="content">
		<div class="reveal">
			<div class="slides">
				
				<h1 class="center">Composez votre communauté</h1>
				
				<!--
					Slide 1 : Introduction
					Description : Creation
				-->
				<section class="slide" id="slide_1">
					<h2 class="center">Vos informations</h2>
					
					<!--
					<form action="/action_page.php">
						First name:<br>
						<input type="text" name="firstname" value="Mickey"><br>
						Last name:<br>
						<input type="text" name="lastname" value="Mouse"><br><br>
						<input type="submit" value="Submit">
					</form>
					-->
					<button class="main-controls navigate-next" id="saveInfo" type="button">Enregistrer infos</button>
				</section>
				
				<section class="slide" id="slide_2">
					<h2 class="center">Avatars</h2>
					
					<button id="saveAvatar" type="button">Enregistrer avatars</button>
				</section>
			</div>
		</div>
		
		<!--
			Reveal
			Reveal configuration
		-->
		<script src="./js/reveal.js"></script>
		<script src="./js/reveal_config.js"></script>
			
		<script>
			var url_string = window.location.href;
			var url = new URL(url_string);
			var returnURL = url.searchParams.get("returnURL");
			console.log("returnURL:", returnURL);
			
			// Maybe we just want the last piece of Q_DL (the only part different from others)
			var pid = returnURL.split("Q_DL=")[1];
			console.log("pid:", pid);
			
			// Build the new URL with status and pid the 2 embedded data in Qualtrics)
			returnURL += "?status=completed&pid=" + pid;
			
			function insertIntoDatabase(args) {
				var object = args.data.object;
				var redirect = args.data.redirect;
				
				//TODO: Build a JSON object with data (participant and/or avatar info) to send to PHP ?
				$.ajax({
					url: "./include/ajax_sql.php",
					type: "POST",
					data: {object: object, id: pid},
					success: function (obj, textstatus) {
						console.log(object, "saved");
						if (redirect) {
							window.location.replace(returnURL);
						}
					}
				});
			}
						
			$("#saveInfo").click({object: "info", redirect: false}, insertIntoDatabase);
			$("#saveAvatar").click({object: "avatar", redirect: true}, insertIntoDatabase);
		</script>
	</body>
</html>