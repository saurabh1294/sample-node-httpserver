const projects = require('./data-store');
let server = require('http');

let projectResponse = [
    {
        "id" : 1,
        "name" : "Multitasking Demo"
    },
	
    {
        "id" : 2,
        "name" : "Siteminder Demo"
    },
]

//create a server object:
server.createServer(function (req, res) {
	console.log('URL is', req.url);
	let url = req.url;
  if (url === '/projects' || url === '/') {
	  switch(req.method) {
		  case 'POST':
			console.log('POST');
			let body = [];
			req.on('data', (chunk) => {
			  body.push(chunk);
			}).on('end', () => {
			  req = Buffer.concat(body).toString();
			  console.log('Pushing', req, 'to projects JSON array');
			  projects.push(JSON.parse(req));
			});
			break;
			
		  case 'GET':
			(url === '/projects') ? res.write(JSON.stringify(projects, null, 4)) : 
				res.write(`Welcome to nodejs server demo. URL endpoints are GET: /projects and
				POST /projects with sample request {
				   "id" : 5,
				   "name" : "Multitasking Demo"
				}`);
			break;
			
		  default:
			console.log('Method not supported');
	  }
   } else {
	   res.statusCode = 404;
	   res.write('Route not found');
	   res.end();
	   // res.write({err: 'route not found'});
   }
   // res.write('Hello World!');
   res.end();
}).listen(8080);

  console.log('server listening on port 8080');

module.exports = server;
