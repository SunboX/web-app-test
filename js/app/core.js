/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    
    var body = d.body,
        $ = function(id){ return d.getElementById(id) },
		viewport = $('viewport'),
		tmpl = function(template, data){
    		var t = TEMPLATES[template];
			if (!t) return;
			if (!data) return t;
			return Mustache.render(t, data);
		},
		errors = {
    		connectionError: function(e){
				alert('Could not connect to server.');
				throw e;
			},
			serverError: function(e){
				alert('Server is currently unavailable. Please try again later.');
				throw e;
			}
		};
    
    w.App = {
        $: $,
        viewport: viewport,
    	tmpl: tmpl,
		errors: errors
    };
    
	
	w.addEventListener('pagehide', function(){
		amplify.store('lqfb-togo-hash', location.hash);
		var views = d.querySelectorAll('.view'),
			hackerScrollTops = {};
		for (var i=0, l=views.length; i<l; i++){
			var view = views[i],
				viewID = view.id,
				scrollSection = view.querySelector('.scroll section');
			hackerScrollTops[viewID] = scrollSection.scrollTop || 0;
		}
		amplify.store('lqfb-togo-scrolltops', hackerScrollTops);
	}, false);
	w.addEventListener('pageshow', function(){
		var hash = amplify.store('lqfb-togo-hash'),
			lqfbScrollTops = amplify.store('lqfb-togo-scrolltops');
		setTimeout(function(){
			if (hash) location.hash = hash;
			for (var id in lqfbScrollTops){
				$(id).querySelector('.scroll section').scrollTop = lqfbScrollTops[id];
			}
		}, 1);
	}, false);
	
	var $viewSections = d.querySelectorAll('.view > .scroll');
	for (var i=0, l=$viewSections.length; i<l; i++){
		var view = $viewSections[i];
		view.addEventListener('touchstart', function(){
			w.scrollTo(0, 0);
		}, false);
	}
    
	tappable('.view > header a.header-button[href]', {
		noScroll: true,
		onTap: function(e, target){
            if(target.classList.contains('menu')) return;
			location.hash = target.hash;
		}
	});
	
	tappable('.view > header h1', {
		onTap: function(e, target){
			var section = target.parentNode.nextElementSibling.firstElementChild;
			if (section.scrollTop == 0){
				// Show address bar
				var originalHeight = body.style.height;
				body.style.height = '100%';
				setTimeout(function(){
					body.style.height = originalHeight;
				}, 1);
			} else {
				// Scroll the section to top
				// Reset the overflow because the momentum ignores scrollTop setting
				var originalOverflow = section.style.overflow;
				section.style.overflow = 'hidden';
				setTimeout(function(){
					section.style.overflow = originalOverflow;
					var anim = Viper({
						object: section,
						transition: Viper.Transitions.sine,
						property: 'scrollTop',
						to: 0,
						fps: 60 // pushing the limit?
					});
					anim.start();
					anim = null;
				}, 300);
			}
		}
	});
	
	// Some useful tips from http://24ways.org/2011/raising-the-bar-on-mobile
	var supportOrientation = typeof w.orientation != 'undefined',
		getScrollTop = function(){
			return w.pageYOffset || d.compatMode === 'CSS1Compat' && d.documentElement.scrollTop || body.scrollTop || 0;
		},
		scrollTop = function(){
			if (!supportOrientation) return;
			body.style.height = screen.height + 'px';
			setTimeout(function(){
				w.scrollTo(0, 1);
				var top = getScrollTop();
				w.scrollTo(0, top === 1 ? 0 : 1);
				body.style.height = w.innerHeight + 'px';
			}, 1);
		};
	scrollTop();
	if (supportOrientation) w.onorientationchange = scrollTop;
	
    /*
	w.addEventListener('load', function(){
		var scrollCheck = setInterval(function(){
			var top = getScrollTop();
			if (top <= 1){
				clearInterval(scrollCheck);
				setTimeout(function(){
					var loader = $('apploader');
					loader.classList.add('hide');
					loader.addEventListener('webkitTransitionEnd', function(){
						loader.parentNode.removeChild(loader);
					}, false);
				}, 400);
			}
		}, 15);
	}, false);
    */

	// "Naturally" reload when an update is available
    /*
	if (w.applicationCache){
		var reload = false;
		w.applicationCache.addEventListener('updateready', function(){
			if (w.applicationCache.status == w.applicationCache.UPDATEREADY){
				w.applicationCache.swapCache();
				reload = true;
			}
		}, false);

		w.addEventListener('pageshow', function(){
			if (reload){
				 location.reload();
			} else if (!amplify.store('hacker-update-delay')){
				try { // There's nothing to update for first-time load, browser freaks out :/
					w.applicationCache.update();
					// Delay check update to after next 1 hour
					amplify.store('hacker-update-delay', 1, {
						expires: 1000*60*60 // 1 hour
					});
				} catch (e){}
			}
		}, false);
	}
    */
	
	// Use GA to track the update rate of this manifest appcache thing
	// and see how fast users are updated to the latest cache/version
    /*
	if (typeof _gaq != 'undefined' && w.applicationCache) w.addEventListener('load', function(){
		setTimeout(function(){
			var r = new XMLHttpRequest();
			r.open('GET', 'manifest.appcache', true);
			r.onload = function(){
				var text = this.responseText;
				if (!text) return;
				var version = (text.match(/#\s\d[^\n\r]+/) || [])[0];
				if (version) _gaq.push(['_trackEvent', 'Appcache', 'Version', version.replace(/^#\s/, '')]);
			};
			r.send();
		}, 1000);
	}, false);
    */
})(window, document);