(function(w){
    var platform = w.Device.platform.name,
        viewport = w.App.viewport,
        menu_view = w.App.$('menu'),
        menu_timeout,
        menu = function(show){
            clearTimeout(menu_timeout);
            
            var show = !!show,
                viewClass = viewport.classList,
                viewStyle = viewport.style,
                menuClass = menu_view.classList,
                reset = function(){
    				viewport.removeEventListener('webkitTransitionEnd', reset, false);
    				viewClass.remove('menu-sliding');
                    if(show){
        	            viewClass.add('menu-shadow');
                    } else {
                        menuClass.add('hidden');
                        viewClass.remove('disable-events');
                    }
                    if(platform === 'android'){
                        viewClass.remove('android-fix');
                    }
				};
            
            menuClass.remove('hidden');
            viewClass.add('disable-events');
            viewClass.add('menu-sliding');
        	if(platform === 'android'){
                viewClass.add('android-fix');
        	}
        	viewClass.remove('menu-shadow');
			viewport.addEventListener('webkitTransitionEnd', reset, false);
            
            menu_timeout = setTimeout(function(){
                viewStyle.left = show ? ((w.innerWidth - 50) + 'px') : 0;
            }, 300);
        }
    
    tappable('.view > header a.menu', {
    	noScroll: true,
        inactiveClassDelay: 350,
		onTap: function(e, target){
            menu(menu_view.classList.contains('hidden'));
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
            alert(target.hash);
		}
	});
    
    w.addEventListener('orientationchange', function(){
        
        // if menu is open, realign viewport
        if(!menu_view.classList.contains('hidden')){
            viewport.style.left = (w.innerWidth - 50) + 'px';
        }
        
    }, false);
    
})(window);