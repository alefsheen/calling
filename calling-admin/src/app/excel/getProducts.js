import toast from "react-hot-toast";

export async function getProducts() {
  let url = `${process.env.NEXT_PUBLIC_LIARA_MEKYAL_NODE}/api/v1/contacts`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("خطایی رخ داد.");
    const result = await response.json();
    if (result.status !== "success") throw new Error("خطایی رخ داد.");
    return result.data;
  } catch (error) {
    toast("دریافت اطلاعات ناموفق بود");
    console.log("دریافت اطلاعات ناموفق بود!");
    return [];
  }
}
