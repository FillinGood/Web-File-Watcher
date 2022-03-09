import http from 'http';
import CreateWebSocket from './websocket';
import CreateWeb from './web';

(async () => {
  const app = await CreateWeb();
  const server = http.createServer();
  const ws = CreateWebSocket(server);
  server.on('request', app);
  server.listen(8080);
})();
