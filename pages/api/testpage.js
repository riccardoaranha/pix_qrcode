export default (req, res) => {
	
	const fs = require('fs');
	//const path = require('path')
	let x = fs.readFileSync('assets/testpage.html');

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(x); 
	res.end();
}