<?php
include('dbConnect.inc.php');


$sqlmarca="select distinct marca from productos where marca is not null order by marca asc ";
$resmarca=mysql_query($sqlmarca);
$checkmarca=mysql_num_rows($resmarca);
?>

<head><meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
<script type="text/javascript" src="js/jquery-1.4.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css" />


<script>

function prueba(){

   var e = document.getElementById("modelo_dropdown");
alert(e.options[e.selectedIndex].value);



}

function showUser(str) {
    if (str == "-1") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
            }
        }
		 var e = document.getElementById("modelo_dropdown");
         var f = e.options[e.selectedIndex].value
        xmlhttp.open("GET","getuser.php?q="+str+"&f="+f,true);
        xmlhttp.send();
    }
}
</script>
<script type="text/javascript">
function selectanho(marca_id){
	if(marca_id!="-1"){
		loadData('modelo',marca_id);
		$("#anho_dropdown").html("<option value='-1'>Selecciona año</option>");
	}else{
		$("#modelo_dropdown").html("<option value='-1'>Selecciona modelo</option>");
		$("#anho_dropdown").html("<option value='-1'>Selecciona año</option>");
	}
}

function selectmodelo(modelo_id){
	if(modelo_id!="-1"){
		loadData('anho',modelo_id);
	}else{
		$("#anho_dropdown").html("<option value='-1'>Selecciona año</option>");
	}
}

function loadData(loadType,loadId){
	var dataString = 'loadType='+ loadType +'&loadId='+ loadId;
	$("#"+loadType+"_loader").show();
    $("#"+loadType+"_loader").fadeIn(400).html('Cargando... <img src="images/loading.gif" />');
	$.ajax({
		type: "POST",
		url: "loadData.php",
		data: dataString,
		cache: false,
		success: function(result){
			$("#"+loadType+"_loader").hide();
			$("#"+loadType+"_dropdown").html("<option value='-1'>Selecciona</option>");
			$("#"+loadType+"_dropdown").append(result);
		}
	});
}
</script>
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

    <!--top section start-->




 <div id="wrap">

			<?php
			if($checkmarca > 0){
				?>

                        <form id="myform" name="myform">
							<select onchange="selectanho(this.options[this.selectedIndex].value)">
								<option value="-1">Selecciona marca</option>
								<?php
								while($rowmarca=mysql_fetch_array($resmarca)){
									?>
									<option value="<?php echo $rowmarca['marca']?>"><?php echo $rowmarca['marca']?></option>
									<?php
								}
								?>
							</select>

							<select id="modelo_dropdown" onchange="selectmodelo(this.options[this.selectedIndex].value)">
								<option value="-1">Selecciona modelo</option>
							</select>
							<span id="modelo_loader"></span>

							<select id="anho_dropdown" onchange="showUser(this.value)">
								<option value="-1">Seleciona año</option>
							</select>

                            
							<span id="anho_loader"></span>



                </form>




				<?php
			}else{
				echo 'No marca Name Found';
			}
			?>



<!--fotter section start-->
<link rel="stylesheet" type="text/css" href="css/style.css" />
<div style="padding:50px; color: black ;  font-size: xx-large;" id="txtHint">Selecciona tu vehículo para comenzar</div>

</div>

</body>
</html>
