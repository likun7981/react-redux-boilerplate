const debug = require('debug')('app:bin:www');
const ip = require('internal-ip');
const detect = require('detect-port');

let port = process.env.PORT || 3000;
const host = ip.v4();

detect(port)
  .then((_port) => {
    if (port !== _port) {
      debug(`Port: ${port} was occupied, try port: ${_port}`);
      port = _port;
    }
    debug(`Server will running at :
  =====================================
      Local: http://${host}:${port}.       
   External: http://localhost:${port}.     
  =====================================`);
    const server = require('../build/server');
    server.listen(port, (err) => {
      if (err) throw err;
    });
  });
