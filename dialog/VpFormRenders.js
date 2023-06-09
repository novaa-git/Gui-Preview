function createThumpImage(form, id, left, top) {
	var divCercever = document.createElement('div');  
	divCercever.style = "position:absolute; width:110px; height:115px; border:#2d3740 solid 1px; border-radius:4px; border-style: dashed; background-color:black;box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);";
 	divCercever.style.left = left + "px";
	divCercever.style.top = top + "px";
	divCercever.style.userSelect = "none";
	form.appendChild(divCercever);
	
	var img = document.createElement('img');  
	img.style = "cursor:pointer; position:absolute; width:110px; height:115px;  object-fit:contain;background-color:black;";
	img.id = id;
 	img.style.left = left + "px";
	img.style.top = top + "px";
	img.setAttribute("order", 0);
	img.style.visibility = "hidden";
	img.style.userSelect = "none";

	var CaptionLabel = createLabelEkle(id, top+ 5 , left+5);
		CaptionLabel.id = "lbl_" + id; 
		CaptionLabel.style.color = "silver";
		CaptionLabel.style.width = "100px";
		CaptionLabel.style.fontSize = "10.5px";

	var PresetType = createLabelEkle(id, top+ 20 , left+5);
		PresetType.id = "pre_" + id; 
		PresetType.style.color = "silver";
		PresetType.style.width = "100px";
		PresetType.style.fontSize = "10px";
		
	form.appendChild(img);
	form.appendChild(CaptionLabel);
	form.appendChild(PresetType);
}

function createOrgansNames() {
    var thicSelect = document.createElement("select");
        thicSelect.id = "createOrgansNamesId";
        thicSelect.className = "comboListStyle";
        thicSelect.style = "positon:absolute; height:24px; width:150px; top:35px; left : 17px;";
		
		thicSelect.appendChild(createListboxOptionItem(vp_AllPresets, -1));
		thicSelect.appendChild(createListboxOptionItem(vp_UserDefined, -2));
		for (var i=0; i < organNames.length; i++) {
			thicSelect.appendChild(createListboxOptionItem(organNames[i], i));
		}
		
        thicSelect.selectedIndex = 0;
        //thicSelect.disabled = true;
	return thicSelect;		
}

// Farklý görüntüyü kayýt etmek için test amaçlý.
function getRenderSamplesDialog(caption) {
	var renderParams = new Array(9);
	var width =390; 
	var height = 500; 
	var	top = (window.innerHeight / 2) - (height / 2) ;
	var	left = (window.innerWidth / 2)  ;
	var form = createShowModalForm(width, height, top, left, vpl_3dWindowValue);
	setFormShadowBlue(form);
	var organCombo = createOrgansNames();
	organCombo.addEventListener("change", organComboChange);
	
	function organComboChange(event) {
		var value = event.target.value;
		resimleriSifirla();
		presetOrganYukle(value);
		renderPreset();
	}
	   
	form.appendChild(organCombo); 

		
	var top = 70;
	createThumpImage(form, "rensmp1" , 17 , top);
	createThumpImage(form, "rensmp2" , 135 , top);
	createThumpImage(form, "rensmp3" , 253 , top);
	top = top + 130;
	createThumpImage(form, "rensmp4" , 17 , top);
	createThumpImage(form, "rensmp5" , 135 , top);
	createThumpImage(form, "rensmp6" , 253 , top);
	top = top + 130;
	createThumpImage(form, "rensmp7" , 17 , top);
	createThumpImage(form, "rensmp8" , 135 , top);
	createThumpImage(form, "rensmp9" , 253 , top);
	
	for (var i=0; i < 9; i++) {
		var imgElement = document.getElementById("rensmp" + i);
		if (imgElement != null)
			imgElement.ondblclick = function(event) {
				var s = event.target.getAttribute("order");
				presetSamplesSetViewport(renderParams[s]);
			}
	}

	var order = 0;
	var kontrolOrder = 0;
	var thumbnailCreator = new PresetGenerators();
 
	var saydir = 0;
	var dongu = 0;
	var isDokuz = 0;
	var fark = 0;
	
	var startPosizyon = 0;
	var endPozisyon = 9;
	var toplamPreset = presetNamesDef.length;
		
		resimleriSifirla();
		presetOrganYukle(-1); // combo ayarlanýp içerisine organ isimleri yazýlacak, index'ine göre tekrar yüklenecek herþey.
		renderPreset();
		
		var ayniDevam = false;
		
		function presetOrganYukle(index) {
		  presetNames = [];
		  toplamPreset = 0;
		  startPosizyon = 0;
		  isDokuz = 0;
		  order = 0;
		  
		  for (var i = 0; i < presetNamesDef.length;i++) {
				if ((index == -1) || (index == presetNamesDef[i][0])) {
					presetNames[toplamPreset] = presetNamesDef[i][1];
					toplamPreset += 1;
				}
		  }
		}
		
		function renderPreset() {
	 
			if ((fark > 0) && (startPosizyon == endPozisyon)) {
				startPosizyon -= 9 + fark;
				endPozisyon -= fark;
				ayniDevam = true;
				fark = 0;
				return;
			}
			
			if (isDokuz < 9) {
			
				if ((startPosizyon < endPozisyon) && (startPosizyon < toplamPreset)) {
					var xmlStringName = presetFolder + presetNames[startPosizyon] + ".xml";
					thumbnailCreator.renderPreset(g_volumeDataInfo, xmlStringName, 512, 512, imageCallback);
					startPosizyon += 1;
					order += 1;
					saydir = 1;
					isDokuz +=  1;
				}  				
			} else 
				if (isDokuz == 9) {
					startPosizyon -= (9);
				}
		}
	
		function resimleriSifirla() {
			for (var i=1; i<10;i++) {
				var imgElement = document.getElementById("rensmp" + i);
				if (imgElement != null) {
					imgElement.style.visibility = "hidden";
				}
				var lbl = document.getElementById("lbl_rensmp" +i );
				lbl.innerHTML = "";
				
				var pre = document.getElementById("pre_rensmp" +i );
				pre.innerHTML = "";
				
			}
		}
				
		function imageCallback(data) { 
			if (saydir < 2) {
			 
				var arrayBuffer = data.image;
				var bytes = new Uint8Array(arrayBuffer);
				var imgElement = document.getElementById("rensmp" + (order));
				if (imgElement != null) {
					imgElement.src = "data:image/jpg;base64," + Fovia.Util.encodeToBase64(bytes);
					imgElement.style.visibility = "visible";
					imgElement.setAttribute("order", order);
					renderParams[order] = data.renderParams;
					
					var lbl = document.getElementById("lbl_rensmp" + (order));
						lbl.innerHTML = presetNames[startPosizyon-1];
						
					var pre = document.getElementById("pre_rensmp" + (order));
						pre.innerHTML =  Fovia.RenderType[data.renderParams.renderType];
				}
				saydir += 1;
			} else {
				renderPreset();
			}
		}

		var geriButton = createButton(width,"",1);
		geriButton.style.left = "10px";
		geriButton.style.width = "30px";
		geriButton.onclick = function() {
			if (startPosizyon > 0) {
				resimleriSifirla();
				isDokuz = 0;
				if (ayniDevam == false) {
					startPosizyon -= 9;
					endPozisyon -=9;
				}
				saydir = 0;
				order = 0;
				ayniDevam = false;
				renderPreset();
			}
		}
		
		var btnBackImage = setButtonImage(imagesFolder + "backa.svg",1, -2);
		geriButton.appendChild(btnBackImage);
		 
		var ileriButton = createButton(width,"",1);
		ileriButton.style.left = "45px";
		ileriButton.style.width = "30px";
		ileriButton.onclick = function() {
			
			if (endPozisyon >= toplamPreset) 
				return; 
			
			if ((endPozisyon + 9) > toplamPreset) {
				fark = toplamPreset - endPozisyon;
				startPosizyon = toplamPreset - fark;
				endPozisyon = toplamPreset;
				
				
			} else {
				startPosizyon += 9;
				endPozisyon += 9;
			}
			
			isDokuz = 0;
			order = 0;
			saydir = 0;
			
			resimleriSifirla();			
			renderPreset();
	}
		
		var btnImageNext = setButtonImage(imagesFolder + "nexta.svg",1, -2);
		ileriButton.appendChild(btnImageNext );
		
		document.getElementById("formButtonBarId").appendChild(geriButton); 	
		document.getElementById("formButtonBarId").appendChild(ileriButton); 	
}
