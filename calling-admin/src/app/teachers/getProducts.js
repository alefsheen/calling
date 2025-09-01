import toast from "react-hot-toast";

export async function getProducts({
  search,
  sort,
  page,
  sortDirection = "asc",
  role = "user",
}) {
  let url = `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts?limit=${process.env.NEXT_PUBLIC_LIMIT_PRODUCTS}&role=${role}`;
  if (page) url += `&page=${page}`;
  if (search) url += `&search=${search}`;
  if (sort)
    url += `&sort=${sortDirection === "asc" ? "" : "-"}${sort}${
      sort !== "_id" ? ",_id" : ""
    }`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("خطایی رخ داد.");
    const result = await response.json();
    if (result.status !== "success") throw new Error("خطایی رخ داد.");

    return result.data;
    // // If append is true, we add the new data to the existing state
    // setState((prevState) =>
    //   append ? [...prevState, ...result.data] : result.data
    // );
  } catch (error) {
    console.log("دریافت اطلاعات ناموفق بود!");
    return [];
  }
}

//////////////////////////////////////////////////////////

export async function _getProducts() {
  let url = `${process.env.NEXT_PUBLIC_SERVER}/api/v1/contacts?sort=-group&role=user`;

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
