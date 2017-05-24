<?php  




include ("ConexionBBDD.php");


function buscar($variables)
{

 $datos = strtolower(trim($_POST['variable']['dato1']));


 $query= "SELECT provincia, capital_id, latitud, longitud from provincias where provincia like '$datos%'";
	
 $con = new ConexionBBDD();

 $data= $con->obtener($query);


echo json_encode($data);

 }

 function buscarCiudad($variable1)
 {
 	$prov= $_POST['variable']['dato1'];
 	
 	$query = "SELECT municipio, id, latitud, longitud  from municipios where provincia_id=(select id from provincias where provincia='$prov') LIMIT 5";
 
 	$con = new ConexionBBDD();

 	$data2= $con->obtener($query);


 	echo json_encode($data2);

 }

switch ($_POST['metodo']) 
{
	case 'buscar': echo buscar($_POST['variable']);
		
		break;
	case 'buscarCiudad': echo buscarCiudad($_POST['variable']);
		
		break;	
	
	default:
		
		break;
}


?>
