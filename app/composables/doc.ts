import * as Y from 'yjs';
import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from 'yjs/provider/websocket.js'

const ydoc = new Y.Doc();
const wsProvider = new WebsocketProvider('ws://localhost:8000', 'ema-docs', ydoc);
const indexeddbPersistence = new IndexeddbPersistence('ema-docs', ydoc);

wsProvider.on('status', event => {
  console.log(event.status) // logs "connected" or "disconnected"
})

indexeddbPersistence.whenSynced.then(() => {
  console.log('synced');
})