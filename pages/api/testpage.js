export default (req, res) => {
	
	const fs = require('fs');
	//const path = require('path')
	
	try {
		res.writeHead(200, {'Content-Type': 'text/html'});
		let x = fs.readFileSync('assets/testpage.html');
		res.write(x); 
	}
	catch {
		res.write(404);
	}
	res.end();
}