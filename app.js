
(function(){
	console.log('app :-)');
	// 1st experiment - unconstrained script tag loading
	var s = document.createElement('script');
	s.src = document.location.hash.slice(1);
	document.body.appendChild(s);
})()