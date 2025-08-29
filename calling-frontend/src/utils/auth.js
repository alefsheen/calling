export const getCurrentUser = () => {
  const user = localStorage.getItem("javanesafa_auth");
  return user ? JSON.parse(user) : null;
};
