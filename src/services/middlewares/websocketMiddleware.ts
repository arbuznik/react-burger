import { Middleware } from "redux";
import { RootState } from "../store";
import { IWSActions } from "../../types/types";

export const websocketMiddleware = (
  url: string,
  actions: IWSActions,
  token?: string
): Middleware<{}, RootState> => {
  return (store) => (next) => (action) => {
    let socket: WebSocket | null = null;

    const { dispatch } = store;
    const { type } = action;

    if (type === actions.open().type) {
      const endpoint = url + (token ? `?token=${token}` : "");
      socket = new WebSocket(endpoint);
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
        } else {
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
