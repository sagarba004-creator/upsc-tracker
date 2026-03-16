const API_URL = "https://script.google.com/macros/s/AKfycbwOup5jQPUKSbdPzz4jcaKLGvNNOO5IGeOw_B9QBMn0PAM2oqH108Ea7NVkANpd_gKR/exec";

export async function api(action, payload = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action, ...payload }),
  });
  const json = await res.json();
  if (json.status !== 200) throw new Error(json.error || "API error");
  return json.data;
}

export function getUser() {
  try { return JSON.parse(localStorage.getItem("upsc_user")); } catch { return null; }
}

export function setUser(user) {
  localStorage.setItem("upsc_user", JSON.stringify(user));
}

export function clearUser() {
  localStorage.removeItem("upsc_user");
}
