import { SocketCustomEvents } from "../enums/socket";

export class mdRegisterSocketEvent {
  event: SocketCustomEvents;
  payload: any;
  constructor(_event: SocketCustomEvents, _payload: any)
  {
    this.event = _event;
    this.payload = _payload;
  }
}
