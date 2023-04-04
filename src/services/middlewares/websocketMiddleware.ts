import { Middleware } from "redux";
import { IWSActions } from "../../types/types";
import { RootState } from "../store";

export const websocketMiddleware = (
  actions: IWSActions
): Middleware<{}, RootState> => {
  return (store) => (next) => (action) => {
    let socket: WebSocket | null = null;

    const { dispatch } = store;
    const { type, payload } = action;

    if (type === actions.initSocket().type) {
      socket = new WebSocket(payload);
    }

    if (socket) {
      socket.onopen = () => {
        console.log("socket opened");
      };

      socket.onerror = () => {
        dispatch(actions.onError("Websocket connect error"));
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);

        if (parsedData.success) {
          dispatch(actions.onMessage(parsedData));
        }

        if (!parsedData.success) {
          dispatch(actions.onError(parsedData.message));
        }
      };

      socket.onclose = () => {
        console.log("socket closed");
      };

      if (type === actions.close().type) {
        socket.close(1000);
      }
    }
    next(action);
  };
};
