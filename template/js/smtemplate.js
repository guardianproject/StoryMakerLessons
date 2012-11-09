function displayTextile(textileSrc,elementId) {
		var html = convert(textileSrc);
		document.getElementById(elementId).innerHTML=html;
	}
