import { fetchContacts } from "./fetchContacts";
import { socket } from "./socket";

export function handle_socket_server(setContacts, setLoadingError) {
  // socket.on("sendToAll", (type, contact) => {
  //   setContacts((contacts) =>
  //     contacts.map((_contact) =>
  //       contact._id === _contact._id ? contact : _contact
  //     )
  //   );
  // });
  // socket.on("connect", () => {
  //   fetchContacts(setContacts, setLoadingError);
  // });
}
