
$(function()
{

let resultado;

$("#prov").keyup(function()
{
		 
		
		let prov = $("#prov").val();
		let variable =  {dato1: prov};		
		let datos ={metodo:"buscar",variable:variable};
		$.post("provincias.php",datos, function(data) 
		{
			resultado = JSON.parse(data);
           	
			let arrayprov= new Array();

			for(let i=0; i<resultado.length; i++)
			{
				arrayprov[i]= resultado[i].provincia;
			}	

			$(function()
			{
			   $("#prov").autocomplete({
			      source: arrayprov,
			      select: function(event, ui)
			      {
				    let selec= $("#prov").val(ui.item.value);
				    let id_capital=0;
				    let longitud=0;
				    let latitud=0;
				    for(let i=0; i<resultado.length;i++)
				    {
				    	if(resultado[i].provincia==selec[0].value)
				    	{
				    		id_capital=resultado[i].capital_id;
				    		longitud=resultado[i].longitud;
				    		latitud=resultado[i].latitud;
				    		break;
				    	}	
				    }	
				    
				    let seleccionada= selec[0].value;
				    let variable1 =  {dato1: seleccionada, dato2: id_capital};
				    let datos2 ={metodo:"buscarCiudad",variable:variable1};

				    $.post("provincias.php", datos2 ,function(data2)
				    {
				    	let resultado2 = JSON.parse(data2);
            			
            			$("#inp").append("<p id='titulo'>Ciudades de "+seleccionada+"</p>");
            			$("#inp").append("<hr/>");
            			for(let i=0; i<resultado2.length; i++)
            			{
            				let p= "<p>"+resultado2[i].municipio+"</p>";
            				$("#inp").append(p);
            				$("#inp").append("<hr/>");
            			}	
            			
            			initMap(resultado2, id_capital, longitud, latitud);

				    });
				   }

			 
			    });


			});


		});		


	});


});

var marker=null;

function initMap(resultado2, id_capital, longitud, latitud) 
{
		let lat= parseFloat(latitud);
		let lon= parseFloat(longitud);

  var myLatLng = {lat: lat, lng: lon};

  var map = new google.maps.Map(document.getElementById('mapa'),
   {

	    zoom: 8,
	    center: myLatLng
   });
	

	for(let i=0; i<resultado2.length;i++)
	{
		let latitud= parseFloat(resultado2[i].latitud);

	
		let longitud= parseFloat(resultado2[i].longitud);

		let posicion=  {lat: latitud,lng: longitud};
		marker = new google.maps.Marker({
	    position:posicion,
	    map: map,
	    draggable: true,
    	animation: google.maps.Animation.DROP,
	    title: resultado2[i].municipio

 		 });
		 
	}	
}





