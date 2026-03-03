import { mergeArrays } from "../utils/mergeArray";
import { server_url } from "./socket";

export function updateRating(id, param, rate) {
  // Update present status in backend
  fetch(`${server_url}/api/v1/contacts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [param]: rate }),
  })
    .then((res) => res.json())
    .then((updatedContact) => {
      // Update state with new present status
      console.log(updatedContact);
      //   setContacts((prevContacts) =>
      //     prevContacts.map((contact) =>
      //       contact.id === updatedContact.id ? updatedContact : contact
      //     )
      //   );
    })
    .catch((err) => {
      console.log(err);
      // toast("خطا در ثبت ارزیابی!");
    });
}

export async function fetchEvents(setEvents, setLoadingError) {
  try {
    const res = await fetch(`${server_url}/api/v1/events?sort=-date`);
    const data = await res.json();
    setEvents(data.data || []);
  } catch (err) {
    console.error("Failed to fetch events:", err);
    setLoadingError(
      "خطا در بارگذاری برنامه‌ها، لطفا از اتصال دستگاه خود به اینترنت مطمئن شوید."
    );
  }
}

export async function fetchContactsByEvent(
  setContacts,
  eventID,
  setLoadingError
) {
  try {
    // fetchContacts
    const res1 = await fetch(`${server_url}/api/v1/contacts`);
    const data1 = await res1.json();
    const contacts = data1.data.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );

    // presents
    const res3 = await fetch(
      `${server_url}/api/v1/callings?eventID=${eventID}&fields=contactID,present,message1_recorder,message2_recorder`
    );
    const data3 = await res3.json();
    const presents = data3.data;

    // merge
    setContacts(mergeArrays(contacts, presents));
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    setLoadingError(
      "خطا در بارگذاری محتوا، لطفا از اتصال دستگاه خود به اینترنت مطمئن شوید."
    );
  }
}

export async function fetchContacts(
  setContacts,
  setLastEvent,
  setLoadingError
) {
  try {
    // fetchContacts
    const res1 = await fetch(`${server_url}/api/v1/contacts`);
    const data1 = await res1.json();
    const contacts = data1.data.sort((a, b) =>
      a.lastName.localeCompare(b.lastName)
    );

    // getLastEvent
    const res2 = await fetch(`${server_url}/api/v1/events?limit=1&sort=-date`);
    const data2 = await res2.json();
    const lastEvent = data2.data[0];

    // presents
    const res3 = await fetch(
      `${server_url}/api/v1/callings?eventID=${lastEvent?._id}&fields=contactID,present,message1_recorder,message2_recorder`
    );
    const data3 = await res3.json();
    const presents = data3.data;

    // merge
    setContacts(mergeArrays(contacts, presents));
    setLastEvent(lastEvent);

    // setLoadingError(null);
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    // setLoadingError("fetchContacts error");
    setLoadingError(
      "خطا در بارگذاری محتوا، لطفا از اتصال دستگاه خود به اینترنت مطمئن شوید."
    );
  }
}

export async function fetchContact(setContacts, setLoadingError, id = "") {
  try {
    const res = await fetch(`${server_url}/api/v1/contacts/${id}`);
    const data = await res.json();
    setContacts(data.data.sort((a, b) => a.lastName.localeCompare(b.lastName)));
    setLoadingError(null);
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    // setLoadingError("fetchContact error");
    setLoadingError(
      "خطا در بارگذاری محتوا، لطفا از اتصال دستگاه خود به اینترنت مطمئن شوید."
    );
  }
}

// export async function fetchEvent(setEvent) {
//   try {
//     const res = await fetch(`${server_url}/api/v1/events`);
//     const data = await res.json();

//     setEvent(data.event);
//   } catch (err) {
//     console.error("Failed to fetch Event:", err);
//   }
// }

// export async function getLastEvent() {
//   try {
//     const res = await fetch(`${server_url}/api/v1/events?limit=1&sort=-date`);
//     const data = await res.json();

//     return data?.data[0];
//   } catch (err) {
//     console.error("Failed to fetch getLastEvent:", err);
//     // return { eventName: "عدم اتصال به اینترنت" };
//   }
// }

export async function fetchCallings(setCallings, id) {
  try {
    const res = await fetch(
      `${server_url}/api/v1/callings?contactID=${id}&sort=-date`
    );
    const data = await res.json();
    // console.log(data);
    setCallings(data.data);
  } catch (err) {
    console.error("Failed to fetch fetchCallings:", err);
  }
}

export async function getPresents(eventID) {
  try {
    const res = await fetch(
      `${server_url}/api/v1/callings?eventID=${eventID}&fields=contactID,present`
    );
    const data = await res.json();
    return data.data;
    console.log(data);
    // setCallings(data.data);
  } catch (err) {
    console.error("Failed to fetch getPresents:", err);
  }
}

export async function updateCallings(body) {
  try {
    const res = await fetch(`${server_url}/api/v1/callings`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch updateCallings:", err);

    // console.error(error);
  }
}

//////////////////////////////////////////////////////////
export async function fetchEvaluations(setEvaluations, id) {
  try {
    const res = await fetch(
      `${server_url}/api/v1/evaluations?contactID=${id}&sort=-date`
    );
    const data = await res.json();
    // console.log(data);
    setEvaluations(data.data);
  } catch (err) {
    console.error("Failed to fetch fetchCallings:", err);
  }
}

export async function updateEvaluations(body) {
  try {
    const res = await fetch(`${server_url}/api/v1/evaluations`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch updateCallings:", err);

    // console.error(error);
  }
}
