/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w){

	var lqfb_api = w.lqfb_api;
		
	lqfb_api.areas = function(success, error){
		lqfb_api.query('/area', null, null, success, error);
	};
		
	lqfb_api.initiativesByArea = function(area_id, success, error){
		lqfb_api.query('/initiative', { area_id: area_id }, null, success, error);
	};

	lqfb_api.initiative = function(id, success, error){
		lqfb_api.query('/initiative', { id: id }, null, success, error);
	};
	
})(window);