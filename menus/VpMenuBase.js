var menuContentName = "ViewportMenu";
var childMenuContentName = "ViewportMenuChild";

var activeSubMenu = null;
var activeMenu = null;

var cizgi = [-1, -1, -1];

var 
	MENU_POS_TOP_TO_BOTTOM = 0;
	MENU_POS_BOTTOM_TO_TOP = 1;


var subMenuOptions = 
[
	["Viewport Resets", "EVENT_VIEWPORT_RESETS", -1], 
	["Dicom Label", "EVENT_DICOM_LABELS", -1], 
	["Show - Hide Ruler", "EVENT_RULERS_LABELS", -1], 
	["Synronize Viewer", "EVENT_SYNRONIZE", -1]
];

var subMenu3D = 
[
  ["MPR Window", "sbV1", -1], 
	["Volume Rendering", "sbV2", -1], 
	["3D Reading (Fly-Through)", "sbV3", -1], 
	["3D Mip", "sbV4", -1],
	["Oblique", "sbV5", -1]
];

var subMenu2DVindow = 
[
	["Default", "wW1", -1], 
	["Abdomen", "wW2", -1], 
	["Angio", "wW3", -1], 
	["Brain", "wW4", -1], 
	["Bone", "wW5", -1], 
	["Liver", "wW6", -1], 
	["Lung", "wW7", -1], 
	["Soft Tisue", "wW8", -1], 
	["Mediastinum", "wW9", -1] 
];

var	subMenu3DVindow = 
[
	["Bone Cut Planes", "3d1", -1], 
	["Bone", "3d2", -1], 
	["Bone Muscle", "3d3", -1], 
	["Bone Skin", "3d4",-1], 
	["Bone Transparent", "3d5",-1], 
	
	["MR Transparent Brain", "3d6",-1], 
	["Color Transparent", "3d7",-1], 
	["Lung", "3d8",-1],
	["Lung Film", "3d9",-1],
	["Mpr 3d", "3d10",-1],
	["Mpr Soft", "3d11",-1],
	["Pet Start", "3d12",-1],
	cizgi, 
	["CT Fusion Mip", "3d13",-1],
	["CT Fusion Mip 3d", "3d14",-1],
	["PT Fusion Heat Map", "3d15",-1],
	["PT Fusion Heat Map 3d", "3d16",-1],
	cizgi, 
	["X-Ray Bone", "3d17",-1],
	["X-Ray Film", "3d18",-1],
	cizgi, 
	["Presets Settings..", "3dV5", -1]
];

var mouseMenu = 
[
	["Length", "MA_LENGTH", -1], 
	["Text", "wW2", -1], 
	["Circle", "wW3", -1] 
];

var menuItemsViewportMenus = 
[ 
    [vpl_viewportType, "EVENT_3D", subMenu3D],
		[vpl_2dWindowValue, "EVENT_VIN", subMenu2DVindow],
		[vpl_3dWindowValue, "EVENT_3dVIN", subMenu3DVindow],
		cizgi,
		[vpl_3dPresetSettings, "EVENT_PRESETS", -1],
		cizgi,
	[vpl_Orientation, -1, -1],  
		[vpl_Axial, "EVENT_AXIAL", -1], 
		[vpl_Sagittal, "EVENT_SAGITTAL", -1], 
		[vpl_Coronal, "EVENT_CORONAL", -1],
		[vpl_RightMouse, "MOUSE_OPTIONS", mouseMenu],
		cizgi,   
	[vpl_Export, -1, -1],  
		[vpl_ExportImage, "E1", -1], 		
		[vpl_SendToPacs, "E2", -1], 		
 		cizgi,
		[vpl_Options, "EVENT_OPTIONS", subMenuOptions],
		cizgi,
		[vpl_ResetWindow, "EVENT_RESET", -1] 		
];

var menuItemsExports = 
[ 
	[vpl_Export, -1, -1],
		[vpl_ExportPrint, "EXP_PRINT", -1],
		[vpl_ExportDownload, "EXP_DOWNLOADS", -1],
		[vpl_SendToPacs, "EXP_SENDPACS", -1],
		[vpl_ExportDicom, "EXP_DICOMS", -1],
		cizgi,
	[vpl_Evidence, -1, -1],
		[vpl_ExportEvidence, "EXP_EVIDENCE1", -1],
		[vpl_EvidenList, "EXP_EVIDENCE2", -1]
];


function getNewCizgi() {
	var newCizgi = document.createElement("cizgi");
	return newCizgi;		
}


function setArrowIcon(sender, top) {
    var arrowContent = document.createElement("div");
	    arrowContent.style.position = "absolute";
		arrowContent.style.display ="block";
		arrowContent.style.inset ="0px 20px 0px auto";
		arrowContent.style.width="6px";
		arrowContent.style.height="6px";
		arrowContent.style.borderTop="2px solid rgb(95, 95, 95)";
		arrowContent.style.borderRight="none";
		arrowContent.style.borderBottom="none";
		arrowContent.style.borderLeft="2px solid rgb(95, 95, 95)";
		arrowContent.style.borderImage="initial";
		arrowContent.style.transform="rotate(135deg)";
		arrowContent.style.top = top + "px";
	sender.appendChild(arrowContent);	
}

function createViewportChildMenu(sender, index, submenu) {
	var newContent = document.createElement("div");
		newContent.className  = "dropdown-content";
 		newContent.id = childMenuContentName + index;
		newContent.style.display = "none";
		newContent.style["z-index"] = 99;
		newContent.style.borderRadius = "5px";
		  
		newContent.onmouseover = function (event) { 
			if (activeMenu != null) {
				activeMenu.style.backgroundColor = "black";
			}
			
		}
		newContent.onmouseout = function (event) { 
		}
		
		for (var i=0; i < submenu.length;i++) {
			if ((submenu[i][0] == "-1") && (submenu[i][1] == "-1")) {
				newContent.appendChild(getNewCizgi()); // cizgi 
			} else 
				newContent.appendChild(getNewSubMenuItem(submenu[i][0],submenu[i][1]));
		}
 	sender.appendChild(newContent);
}


function getNewBaslik(caption) {
	var newBaslik = document.createElement("baslik");
		newBaslik.innerHTML = caption;
		newBaslik.style.userSelect =  "none";
		newBaslik.onmouseover = function (event) { 
		hideChildMenuItem();
	}
	return newBaslik;		
}

function getNewMenuItem(caption, id, child_id) {
	var newMenuItem = document.createElement("menuitem");
		newMenuItem.innerHTML = caption;
		newMenuItem.id = id;
		newMenuItem.style.userSelect =  "none";

		newMenuItem.onclick = menuItemClick;

		newMenuItem.onmouseover = function (event) { 
			hideChildMenuItem();
			activeMenu = newMenuItem;
			showHideChildMenuItem(newMenuItem, child_id);
			activeMenu.style.backgroundColor = "black";
		}
				
		newMenuItem.onmouseout = function (event) { 
			if (activeMenu != null)
				activeMenu.style.backgroundColor = "transparent";
			
		}
	return newMenuItem;		
}

function getNewSubMenuItem(caption, id) {
	var newMenuItem = document.createElement("menuitem");
		newMenuItem.innerHTML = caption;
		newMenuItem.style.userSelect =  "none";
		newMenuItem.id = id;
		newMenuItem.onclick = menuItemClick;
	return newMenuItem;		
}

function hideChildMenuItem() {
	if (activeSubMenu != null) {
		activeSubMenu.style.display = "none";	
		
	if (activeMenu != null)
		activeMenu.style.backgroundColor = "transparent";
		
	}
}

function closeAllMenus() {
	hideChildMenuItem();
	MenuClose();
}	

function MenuClose() {
	var dropdowns = document.getElementsByClassName("dropdown-content");
	var i;
	for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
    }
}

function isMenuShow(menuID) {
    return menuID.classList.contains("show");
}

function ViewportMenuClose(event) {
	hideChildMenuItem();
	var menuNames = 
		[
		"menusBtn0", "menusBtn1", "menusBtn2", "menusBtn3", "menusBtn4", "menusBtn5",  // viewport menus
		"emenuBtn0", "emenuBtn1", "emenuBtn2", "emenuBtn3", "emenuBtn4", "emenuBtn5",  // export menus
		"downButton0","downButton1","downButton2","downButton3","downButton4","downButton5"


		];
	var devam = menuNames.includes(event.target.id);
	if (devam == false) {
		MenuClose();
	}
}

function showHideChildMenuItem(sender, index) {
	var ustCerceve = document.getElementById("ustCerceve");
	var ustRect = ustCerceve.getBoundingClientRect();
	var rect = sender.getBoundingClientRect();
	var left = rect.left- 55;
	var top = rect.top - 55;

	if (ustRect.x == 0)	
		left = rect.left + rect.width-4; 

		var menuID = document.getElementById(childMenuContentName + index);
	if  (menuID == null) {
		return;
	}

	if (menuID.style.display == "none") {
		menuID.style.display = "block";
		menuID.style.left = left + "px";
		menuID.style.top = top + "px";
		activeSubMenu = menuID;
	}
	else {
		menuID.style.display = "none";		
		activeSubMenu = null;
	}
}

function showHideMenuItem(sender, index, menuposition) {
	MenuClose();
	activeViewportId = index;	
	var ustCerceve = document.getElementById("ustCerceve");
	var ustRect = ustCerceve.getBoundingClientRect();
	var senderRect = sender.getBoundingClientRect();
	var pencere = document.getElementById("ViewCanvasParent" + index);
	
	var menuID = document.getElementById(menuContentName + index);

	var rect = pencere.getBoundingClientRect();
	var left = rect.x -  ustRect.x + parseInt(sender.style.left);
	var top = rect.y - 21;

	if (menuposition == MENU_POS_TOP_TO_BOTTOM) {
		console.log(menuID.menuHeight);
		
	} else
		if (menuposition == MENU_POS_BOTTOM_TO_TOP) {
			top = senderRect.top - (senderRect.height * 2)  - menuID.menuHeight - 5;
		}

	var isShow = false;
    var i;
    for (i = 0; i < menuID.length; i++) {
      var menuItem = menuID[i];
      if (menuItem.classList.contains('show')) {
        menuItem.classList.remove('show');
        isShow = true;
      }
    }    
    if (isShow == false) {
    	reposMenuTopLeft(left, top, menuID);
			menuID.classList.toggle("show");
    }
}


function reposMenuTopLeft(left,top, menu) {
	menu.style.left = left + "px";
	menu.style.top = top + "px";
}
