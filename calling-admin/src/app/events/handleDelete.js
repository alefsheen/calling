export async function handleDelete(publisher, setProducts) {
  const confirmed = window.confirm("آیا از حذف این کاربر اطمینان دارید؟");
  if (confirmed) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/v1/events/${publisher._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("خطایی در حذف کاربر پیش آمد.");
      // Remove the deleted product from the list
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== publisher._id)
      );
    } catch (error) {
      console.error(error);
    }
  }
}
