var activeModalForm = null;

function setButtonImage(src, left, top) {
	var img = document.createElement("img");
		img.type = "image";
		img.src = src;
		img.style = "position:absolute; width:24px; height:24px;";
		img.style.left =  left +  "px";
		img.style.top =  top +  "px";
    return img; 				
}

function createButton(width, caption, sira) {
	var buttonTamam = document.createElement("button");
		buttonTamam.className  = "formButton";
		buttonTamam.style.position = "absolute";
		buttonTamam.style.top = "5px";
		var pos = (width - 85 );
		
		buttonTamam.innerHTML = caption;
		if (sira == 0) {
			buttonTamam.style.left = (pos) + "px";
		} else 
		if (sira == 1) {
			buttonTamam.style.left = (pos - 85) + "px";
		}
		buttonTamam.style.background = "rgb(51 63 73)";
		buttonTamam.style.border =  "1px solid rgb(51 63 73)";
		buttonTamam.style.width = "70px";
		buttonTamam.style.height = "20px";  
     return buttonTamam; 				
}

function createLabelEkle(caption, top, left) {
	var CaptionLabel = document.createElement("div");
		CaptionLabel.style.position = "absolute";
		CaptionLabel.style.top = top + "px";
		CaptionLabel.style.left = left + "px";
		CaptionLabel.style.width = "200px";
		CaptionLabel.style.height = "18px";
		CaptionLabel.style.color = "#718392";
		CaptionLabel.innerHTML = caption;
		CaptionLabel.style.fontSize = "12.5px";
		CaptionLabel.style.fontFamily =  "monospace";
		CaptionLabel.style.textShadow = "1px 1px black";
		CaptionLabel.style.userSelect = "none";
    return CaptionLabel;			
}

function setFormShadowRed(form) {
	//form.style.boxShadow = "0 2px 18px rgb(255 39 153 / 23%)";
}

function setFormShadowBlue(form) {
	//form.style.boxShadow = "rgb(3 169 244 / 40%) 0px 1px 8px";
}

function createShowModalForm(width, height, top, left, caption) {
	var modalCanvas = document.createElement("div");
	modalCanvas.className  = "modalCanvas";
	activeModalForm = modalCanvas;
		
	var modalPanel = document.createElement("div");
		modalPanel.className  = "canvasContent";
		modalPanel.style.width = width - 2 +"px";
		modalPanel.style.height =  height - 2 +"px";
		modalPanel.style.top = top + 1 + "px";
		modalPanel.style.left = left + 1+ "px";
	
	var panelCaptionBar = document.createElement("div");
		panelCaptionBar.className = "canvasTitle";
		panelCaptionBar.style.position = "absolute";
		panelCaptionBar.style.top = "0px";
		panelCaptionBar.style.left = "0px";
		panelCaptionBar.style.width = (width-2) + "px";
		panelCaptionBar.style.height = "24px";
		panelCaptionBar.setAttribute("isMouseDown", 0);
		
		var mousePosition;
		var offset = [0,0];
		var isDown = false;

		panelCaptionBar.onmousedown = function(event) {
			isDown = true;
			 offset = [
				event.clientX,
				event.clientY
			];
		}
		
		panelCaptionBar.onmouseup = function(event) {
			isDown = false;
		}

		panelCaptionBar.onmouseleave = function(event) {
			isDown = false;
		}
		
		panelCaptionBar.onmousemove = function(event) {
			if (isDown) {
			  mousePosition = {
				x : event.clientX,
				y : event.clientY
			 };
			
			 var xPos = mousePosition.x - offset[0];
			 var defx = parseInt(modalPanel.style.left);
			 defx +=xPos;
			 modalPanel.style.left = defx + "px";
			
			 var yPos = mousePosition.y - offset[1];
			 var defy = parseInt(modalPanel.style.top);
			 defy += yPos;	 
			 modalPanel.style.top = defy + "px";
			
			offset = [
				event.clientX,
				event.clientY
			];
          }
		}
		

	var CaptionLabel = createLabelEkle(caption, 3 , 10);
		panelCaptionBar.appendChild(CaptionLabel); 			
	
	modalPanel.appendChild(panelCaptionBar); 			
		
	var buttonBar = document.createElement("div");
		buttonBar.style.position = "absolute";
		buttonBar.id = "formButtonBarId";
		buttonBar.style.top = (height - 36) + "px";
		buttonBar.style.left = "0px";
		buttonBar.style.width = (width-2) + "px";
		buttonBar.style.height = "34px";  
		buttonBar.style.backgroundColor = "#0000003b";
		modalPanel.appendChild(buttonBar); 			
			
		var tamamButton = createButton(width,"OK",0);
			buttonBar.appendChild(tamamButton); 	

	var canvasClose = document.createElement("span");
		canvasClose.className  = "canvasClose";
		canvasClose.style.position = "absolute";
		canvasClose.style.left = (width - 30)  + "px";
		canvasClose.style.top = "3px";
		panelCaptionBar.appendChild(canvasClose); 			
		
		modalCanvas.appendChild(modalPanel); 
	document.body.appendChild(modalCanvas); 
	
	canvasClose.onclick = function() {
		activeModalForm = null;
		document.body.removeChild(modalCanvas); 
	}
	
	tamamButton.onclick = function() {
		activeModalForm = null;
		document.body.removeChild(modalCanvas); 
	}
	return modalPanel;
}

function closeActiveForm() {
	if (activeModalForm != null) {
		document.body.removeChild(activeModalForm); 
		activeModalForm = null;
	}
}




