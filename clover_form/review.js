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