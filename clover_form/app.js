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
	  form_data = $( "form" ).serializeArray()
	  if(typeof form_data[4] != 'undefined')
	  	if(form_data[4].name == "eligibility-eligibility_is_current_member" & form_data[4].value == "True")
	  	sessionStorage.setItem("short", true);

	  form_data = $( "form" ).serialize()
	  sessionStorage.setItem(form_name, form_data);	 
	  window.location = loc  
	});
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function injectScript(src, id) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.id = id;
        script.addEventListener('load', resolve);
        script.addEventListener('error', () => reject('Error loading script.'));
        script.addEventListener('abort', () => reject('Script loading aborted.'));
        document.head.appendChild(script);
    });
}


$( document ).ready(function() {
	if(getUrlVars()["assist"] == "1" | typeof sessionStorage.getItem("assist") != 'undefined'){
	  injectScript('https://static.zdassets.com/ekr/snippet.js?key=1a86e8b3-8486-4af3-a9ee-dd35b2139c0d', "ze-snippet")
	    .then(() => {
	        console.log('Script loaded!');
	    }).catch(error => {
	        console.log(error);
	    });
	}
});