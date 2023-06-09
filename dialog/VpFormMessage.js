// Ekrana hata cýkarmak için
function showErrorDialog(caption) {
	var width = 450; 
	var height = 200; 
	var	top = (window.innerHeight / 2) - (height / 2) ;
	var	left = (window.innerWidth / 2)  ;
	var objForm = createShowModalForm(width, height, top, left, "Error");
	
	// Hata mesajý burada ekleniyor. top 
	var CaptionLabel = createLabelEkle(caption, 35 , 60);
		CaptionLabel.style.color = "white";
		CaptionLabel.style.width = (width - 80) + "px";
		CaptionLabel.style.height = (height - 100) + "px";
		
	objForm.appendChild(CaptionLabel); 			
	
	
	var iconImage = setButtonImage(imagesFolder + "warning.svg",12, 32);
		iconImage.style.width = "36px";
		iconImage.style.height = "36px";
	objForm.appendChild(iconImage);
}