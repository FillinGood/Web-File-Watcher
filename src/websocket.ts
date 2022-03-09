import { Server } from 'http';
import { Server as wsServer } from 'ws';

export default function CreateWebSocket(server: Server) {
  const ws = new wsServer({ server });
  ws.on('connection', (client) => {
    console.log('connected');
    client.on("message", (data)=>{
      const msg = data.toString("utf-8");
      console.log(msg);
    })
  });
  return ws;
}
