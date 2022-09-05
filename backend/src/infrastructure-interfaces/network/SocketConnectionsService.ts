import { Data } from './data/Data';

export interface SocketConnectionsService {
  sendData(socketId: String, data: Data): void;
}
