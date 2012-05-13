/*
 * Copyright 2012, André Fiedler < http://twitter.com/sonnenkiste >
 * licensed under the MIT license.
 *
 * Inspired by HN mobile by Lim Chee Aun < http://github.com/cheeaun/hnmobile > and
 *          by Bombay-Crushed by the SaftigeKumquat team < http://github.com/SaftigeKumquat/Bombay-Crushed >
 */

(function(w, d){
    var App = w.App,
        device = w.Device,
        viewport = App.viewport,
        menu_view = App.$('menu'),
        menu_timeout,
        transitionend = device.safari || device.chrome ? 'webkitTransitionEnd' : (device.opera ? 'oTransitionEnd' : (device.ie && device.version > 8 ? 'msTransitionEnd' : 'transitionend')),
        menu = function(show){
            clearTimeout(menu_timeout);
            
                var show = !!show,
                viewClass = viewport.classList,
                viewStyle = viewport.style,
                menuClass = menu_view.classList,
                reset = function(){
                    viewport.removeEventListener(transitionend, reset, false);
                    viewClass.remove('menu-sliding');
                    if(show){
                        viewClass.add('menu-shadow');
                    } else {
                        menuClass.add('hidden');
                        viewClass.remove('disable-events');
                    }
                    if(device.android){
                        viewClass.remove('android-fix');
                    }
				};
                
            Navigation.menuOpen = show;
            
            menuClass.remove('hidden');
            viewClass.add('disable-events');
            viewClass.add('menu-sliding');
            if(device.android){
                viewClass.add('android-fix');
            }
            viewClass.remove('menu-shadow');
			viewport.addEventListener(transitionend, reset, false);
            
            menu_timeout = setTimeout(function(){
                viewStyle.left = show ? ((w.innerWidth - 50) + 'px') : 0;
            }, 300);
        };
    
    tappable('.view header a.menu', {
        noScroll: true,
        inactiveClassDelay: 350,
        onTap: function(e, target){
            menu(!Navigation.menuOpen);
		}
	});
    
    tappable('#menu-hide-area', {
        noScroll: true,
        onTap: function(e, target){
            menu(false);
		}
	});
    
    tappable('#menu > .scroll > section > ul > li > a', {
        noScroll: true,
        inactiveClassDelay: 350,
        onTap: function(e, target){
            d.location.hash = target.hash;
            setTimeout(function(){ menu(false); }, 100);
		}
	});
    
    w.addEventListener('orientationchange', function(){
        
        // if menu is open, realign viewport
        if(!menu_view.classList.contains('hidden')){
            viewport.style.left = (w.innerWidth - 50) + 'px';
        }
        
    }, false);
    
})(window, document);