(function(w, d){
    var body = d.body,
		$ = function(id){ return d.getElementById(id) },
		viewport = $('viewport'),
        area_list = $('area_list'),
        menu_view = $('menu'),
		hideAllViews = function(){
			var views = d.querySelectorAll('.view');
			for (var i=0, l=views.length; i<l; i++){
				views[i].classList.add('hidden');
			}
		},
		flip = function(opts){
			var inEl = opts.in,
				outEl = opts.out,
				inClass = inEl.classList,
				outClass = outEl.classList,
				direction = opts.direction,
				fn = opts.fn,
				flipWise = {
					clockwise: ['flip-out-to-left', 'flip-in-from-left'],
					anticlockwise: ['flip-out-to-right', 'flip-in-from-right']
				},
				wise = flipWise[direction],
				reset = function(){
					inEl.removeEventListener('webkitAnimationEnd', reset, false);
					body.classList.remove('viewport-flip');
					outClass.add('hidden');
					inClass.remove('flip');
					outClass.remove('flip');
					outClass.remove(wise[0]);
					inClass.remove(wise[1]);
					if (fn) fn.apply();
				};
			body.classList.add('viewport-flip');
			inClass.remove('hidden');
			outClass.add('flip');
			inClass.add('flip');
			inEl.addEventListener('webkitAnimationEnd', reset, false);
			outClass.add(wise[0]);
			inClass.add(wise[1]);
		},
		slide = function(opts){
			var inEl = opts.in,
				outEl = opts.out,
				inClass = inEl.classList,
				outClass = outEl.classList,
				direction = opts.direction,
				fn = opts.fn,
				slideWise = {
					rtl: ['slide-out-to-left', 'slide-in-from-right'],
					ltr: ['slide-out-to-right', 'slide-in-from-left']
				}
				wise = slideWise[direction],
				reset = function(){
					inEl.removeEventListener('webkitAnimationEnd', reset, false);
					outClass.add('hidden');
					outClass.remove('sliding');
					inClass.remove('sliding');
					outClass.remove(wise[0]);
					inClass.remove(wise[1]);
					inHeader.classList.remove('transparent');
					outHeader.classList.remove('transparent');
					if (fn) fn.apply();
				};
			var inHeader = inEl.querySelector('header'),
				outHeader = outEl.querySelector('header');
			inClass.remove('hidden');
			outClass.add('sliding');
			inClass.add('sliding');
			inEl.addEventListener('webkitAnimationEnd', reset, false);
			inHeader.classList.add('transparent');
			outHeader.classList.add('transparent');
			outClass.add(wise[0]);
			inClass.add(wise[1]);
		},
        menu = function(show){
            var show = !!show,
                viewClass = viewport.classList,
                viewStyle = viewport.style,
                menuClass = menu_view.classList,
                reset = function(){
    				viewport.removeEventListener('webkitTransitionEnd', reset, false);
    				viewClass.remove('menu-sliding');
                    if(show){
                        viewStyle.left = '100%';
                        viewStyle.marginLeft = '-50px';
        	            viewClass.add('menu-shadow');
                    } else {
                        viewStyle.left = 0;
                        viewStyle.marginLeft = 0;
                        menuClass.add('hidden');
                    }
				};
            viewStyle.marginLeft = 0;
            viewStyle.left = show ? 0 : ((window.innerWidth - 50) + 'px');
            menuClass.remove('hidden');
    		viewClass.add('menu-sliding');
        	viewClass.remove('menu-shadow');
			viewport.addEventListener('webkitTransitionEnd', reset, false);
            viewStyle.left = show ? ((window.innerWidth - 50) + 'px') : 0;
        },
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
	
	var currentView = null,
		currentItemID = null;
	
	var routes = {
		'/': function(){
			var view = $('view-areas');
			if (!currentView){
				hideAllViews();
				view.classList.remove('hidden');
			} else if (currentView == 'about'){
				flip({
					in: view,
					out: $('view-' + currentView),
					direction: 'anticlockwise'
				});
			} else if (currentView != 'home'){
				slide({
					in: view,
					out: $('view-' + currentView),
					direction: 'ltr'
				});
			}
			currentView = 'home';
		}
	};
	
	Router(routes).configure({
		on: function(){
			amplify.store('lqfb-togo-hash', location.hash);
		},
		notfound: function(){
			location.hash = '/';
		}
	}).init(amplify.store('lqfb-togo-hash') || '/');
	
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
    
	tappable('.view > header a.menu', {
		noScroll: true,
		onTap: function(e, target){
            menu(menu_view.classList.contains('hidden'));
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
	
	var areasScroll = d.querySelector('#view-areas .scroll'),
		areasScrollSection = areasScroll.querySelector('section'),
		markupAreas = function(data, i){
			var html = '';
			var a = d.createElement('a');
			data.result.forEach(function(item){
				item.i = i++;
				html += tmpl('area-list-item', item);
			});
			return html;
		},
		loadAreas = function(data){
			area_list.innerHTML = markupAreas(data);
		},
		loadingAreas = false,
		reloadAreas = function(opts){
			if (loadingAreas) return;
			if (!opts) opts = {};
			var news = amplify.store('hacker-news');
			if (news){
				var delay = opts.delay;
				if (delay){
					loadingAreas = true;
					area_list.innerHTML = '';
					areasScroll.classList.add('loading');
					setTimeout(function(){
						loadingAreas = false;
						areasScroll.classList.remove('loading');
						loadAreas(news);
					}, delay);
				} else {
					loadAreas(news);
				}
			} else {
				loadingAreas = true;
				area_list.innerHTML = '';
				areasScroll.classList.add('loading');
				lqfb_api.areas(function(data){
					loadingAreas = false;
					areasScroll.classList.remove('loading');
					if (!data || data.error){
						errors.serverError();
						return;
					}
					amplify.store('lqfb-areas', data, {
						expires: 1000*60*5 // 5 minutes
					});
					loadAreas(data);
				}, function(e){
					loadingAreas = false;
					errors.connectionError(e);
				});
			}
		};
	
	reloadAreas();
    
	// Auto-reload news for some specific situations...
	w.addEventListener('pageshow', function(){
		setTimeout(function(){
			if (currentView == 'home' && area_list.innerHTML && !amplify.store('hacker-news')){
				reloadAreas();
			}
		}, 1);
	}, false);
	
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