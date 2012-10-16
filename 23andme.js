//https://api.23andme.com/authorize/?redirect_uri=https://jmat.googlecode.com/git/23andme.html&response_type=code&client_id=09568fd79aa7911dad7727a024936f8d&scope=basic
// response directed to http://jmat.googlecode.com/git/23andme.html, alternative URL:
//https://dl-web.dropbox.com/get/http/jmat/23andme.html?w=bba1484b&code={borrow from above}
//
UAB={ // 23and me application document object model
	code:null,
	parms:{},
	search4parms:function(){ // gets parameters from call and pushes them to .parms
		var parms = window.document.location.search.slice(1).split('&');
		parms.map(function(x){
			xx = x.split('=');
			UAB.parms[xx[0]]=xx[1]
		})

		//
	}
}



// find out what is being provided and push it to parms
UAB.search4parms();
if(!!UAB.parms.code){
	UAB.code=UAB.parms.code;
	console.log('code = '+UAB.code);
}
else if (!!localStorage.getItem('code')){ // find out if there is one in the localstorage
	UAB.code = localStorage.getItem('code');
	console.log('code = '+UAB.code);
}
else{
	console.log('23andme access code not provided')
}

// another try, this time using 23andme own library: https://api.23andme.com/docs/jslib/
var d = document.createElement('div')
d.id = 'snp_table';
document.body.appendChild(d);
d.textContent = 'loading snp table ...';

/*TTAM.snpTable('snp_table', 'rs2476601', {
            AA: 'Moderately higher odds of developing hypothyroidism.',
            AG: 'Slightly higher odds of developing hypothyroidism.',
            GG: 'Typical odds of developing hypothyroidism.',
            order: 'AA,AG,GG'
        	}, 
        	{
            width: 450
        }
    );
*/