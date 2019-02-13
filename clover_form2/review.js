function restoreForm() {	
	var form_list = ["eligibility", "basics-long", "contact-long", "medical-long", "payment", "signature"];
	form_list.forEach(function(form_name) {
		console.log(form_name);
	
		if (sessionStorage.getItem(form_name) != null) {
			data = sessionStorage.getItem(form_name)
			
			$.each(data.split('&'), function (index, elem) {
			   var vals = elem.split('=');		   
			   
			   console.log(vals[0])
			   name = "preview-long-" + vals[0].substring(vals[0].lastIndexOf("-")+1, vals[0].length);
			   console.log(name)
			   console.log(vals[1])
			   
			   if(	$("[name='" + name + "'][value='" + vals[1] + "']").attr("type") == "radio" | 
					$("[name='" + name + "'][value='" + vals[1] + "']").attr("type") == "checkbox"
					){
				  $("[name='" + name + "'][value='"+vals[1]+"']").click();	   
			   } else {
				  $("[name='" + name + "']").val(decodeURIComponent(vals[1]));
			   }
			   
			});
		}
	});
}
function back(loc) {
    $('#wizard-back').click(function(e) {
	  e.preventDefault();	  	  
	  window.location = loc	  
	});
}
function next(loc, form_name) {
    $('#enroll-submit').click(function(e) {
	  e.preventDefault();	  
	  window.location = loc  
	});
}