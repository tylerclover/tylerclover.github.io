function restoreForm(form_name) {	
	if (sessionStorage.getItem(form_name) != null) {
		data = sessionStorage.getItem(form_name)
		
		$.each(data.split('&'), function (index, elem) {
		   var vals = elem.split('=');		   		   
		   if(	$("[name='" + vals[0] + "'][value='" + vals[1] + "']").attr("type") == "radio" | 
				$("[name='" + vals[0] + "'][value='" + vals[1] + "']").attr("type") == "checkbox"
				){
			  $("[name='" + vals[0] + "'][value='"+vals[1]+"']").click();	   
		   } else {
			  $("[name='" + vals[0] + "']").val(decodeURIComponent(vals[1]));
		   }
		   
		});
	}
}
function back(loc) {
    $('#wizard-back').click(function(e) {
	  e.preventDefault();	  	  
	  window.location = loc	  
	});
}
function next(loc, form_name) {
    $('#wizard-next').click(function(e) {
	  e.preventDefault();	  

	  // Check enrollment type
	  //form_data = $( "form" ).serializeArray()
	  //if(form_data[4].name == "eligibility-eligibility_is_current_member" & form_data[4].value == "True")
	  //	sessionStorage.setItem("short", true);

	  form_data = $( "form" ).serialize()
	  sessionStorage.setItem(form_name, form_data);	 
	  window.location = loc  
	});
}
