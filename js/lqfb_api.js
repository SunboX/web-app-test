(function(w){
    
	var date = function(){
			return +new Date();
		},
		req = function(url, success, error){
			var r = new XMLHttpRequest();
			if (!success) success = function(){};
			if (!error) error = function(){};
			if (false /* LQFB API doesn't support CORS by now */ & 'withCredentials' in r){ // CORS
				try {
					r.open('GET', url + '?' + date(), true);
					r.onload = function(){
						try {
							success(JSON.parse(this.responseText));
						} catch(e){
							error(e);
						}
					};
					r.onerror = error;
					r.send();
				} catch (e){
					error(e);
				}
			} else {
				var s = document.createElement('script'),
					callback = 'callback' + date();
				w[callback] = success;
				s.onerror = error;
				s.src = url + '?callback=' + callback;
				document.body.appendChild(s);
			}
		};
	
	var lqfb_api = {
		
		url: 'http://apitest.liquidfeedback.org:25520/',
		
		areas: function(success, error){
			req(lqfb_api.url + 'area' , success, error);
		},
		
		initiativesByArea: function(area_id, success, error){
			req(lqfb_api.url + 'initiative/?area_id=' + area_id, success, error);
		},

		initiative: function(id, success, error){
			req(lqfb_api.url + 'initiative/?id=' + id, success, error);
		}
		
	};
	
	w.lqfb_api = lqfb_api;
	
})(window);