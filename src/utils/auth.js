export function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "/login"; // or use router.push
}
