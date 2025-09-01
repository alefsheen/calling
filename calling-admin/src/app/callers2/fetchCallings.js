import toast from "react-hot-toast";

export async function fetchAllCallings() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/v1/callings`
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    toast("ثبت نمره ضروری است!");
  }
}
export async function fetchAllContacts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts`
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    toast("ثبت نمره ضروری است!");
  }
}
