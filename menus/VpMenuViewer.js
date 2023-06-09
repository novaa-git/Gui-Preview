function createViewportMenu(sender, index, owner) {
	
	var menuID = document.getElementById(menuContentName + index);
	if (menuID != null) {
		sender.removeChild(menuID);
		//return false;
	}
	
	var arrowTop = 12;
	
	var newContent = document.createElement("div");
		newContent.className  = "dropdown-content";
 		newContent.id = menuContentName + index;
 
  var menuHeight = 0; 		
  newContent.style.borderRadius = "0px";

	var menuItems = menuItemsViewportMenus; 

	if (owner.id == "downButton" + index) {
		menuItems = menuItemsExports;
		newContent.style["border-top-left-radius"] = "5px";
		newContent.style["border-top-right-radius"] = "5px";
	} else {
		newContent.style["border-bottom-left-radius"] = "5px";
		newContent.style["border-bottom-right-radius"] = "5px";
	}
  
	for (var i=0; i < menuItems.length;i++) {
			if ((menuItems[i][0] == "-1") && (menuItems[i][1] == "-1") && (menuItems[i][2] == "-1")) {
				newContent.appendChild(getNewCizgi()); // cizgi 
				menuHeight += 1;
			} else 
			if ((menuItems[i][1] == "-1") && (menuItems[i][2] == "-1")) {
				arrowTop += 19;
				menuHeight += 19;
				newContent.appendChild(getNewBaslik(menuItems[i][0])); // baslık
				
			} else
			if ((menuItems[i][2] == "-1")) {
				arrowTop += 27;
				menuHeight += 27;
				newContent.appendChild(getNewMenuItem(menuItems[i][0], menuItems[i][1]));

			} else 
				if ((menuItems[i][2] != "-1")) {
					
					var childItem = getNewMenuItem(menuItems[i][0], menuItems[i][1], menuItems[i][1]);
					setArrowIcon(childItem, arrowTop);
					
					var subMenu = menuItems[i][2];
						createViewportChildMenu(sender, menuItems[i][1], subMenu);
					newContent.appendChild(childItem);	
					arrowTop += 27;			
					menuHeight += 27;		
				} 
		}
	
	
	newContent.menuHeight = menuHeight ;
	sender.appendChild(newContent);
	return true;
}

function showViewportMenuClick(sender, index, position) {
	  activewViewPort = index; 
    var widgetName =  "ViewCanvasWidget" + index;
    var element = document.getElementById(widgetName);
	  var widgetName2 =  "HDVR";
    
    var element2 = document.getElementById(widgetName2);
		createViewportMenu(element2, index, sender);

		var menuID = document.getElementById(menuContentName + index);
		var isShow = isMenuShow(menuID);

		if (isShow	== false)
			showHideMenuItem(sender,index, position);
			else {
					closeAllMenus();
				}
}


