import { SocketConnectionsService } from '../../infrastructure-interfaces/network/SocketConnectionsService';
import { Data } from '../../infrastructure-interfaces/network/data/Data';

export class SocketConnectionsServiceImpl implements SocketConnectionsService {
  sendData(socketId: String, data: Data): void {}
}
