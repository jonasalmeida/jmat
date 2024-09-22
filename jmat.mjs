function saveFile (x,fileName) { // x is the content of the file
	// var bb = new Blob([x], {type: 'application/octet-binary'});
	// see also https://github.com/eligrey/FileSaver.js
	var bb = new Blob([x]);
   	var url = URL.createObjectURL(bb);
	var a = document.createElement('a');
   	a.href=url;
	if (fileName){
		if(typeof(fileName)=="string"){ // otherwise this is just a boolean toggle or something of the sort
			a.download=fileName;
		}
		a.click() // then download it automatically 
	}
	URL.revokeObjectURL(url) // memory garbage collected as discussed in https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL_static
	return a
}

export{
	saveFile
}