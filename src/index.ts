import http from 'http';
import CreateWeb from './web';

(async () => {
  const app = await CreateWeb();
  const server = http.createServer();
  server.on('request', app);
  server.listen(8080);
})();
