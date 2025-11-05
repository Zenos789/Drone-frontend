import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const DRONE_ID = process.env.NEXT_PUBLIC_DRONE_ID || "";

if (!API_BASE) {
  console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
}
if (!DRONE_ID) {
  console.warn("NEXT_PUBLIC_DRONE_ID is not set");
}

export async function fetchConfig() {
  const url = `${API_BASE}/configs/${DRONE_ID}`;
  const res = await axios.get(url);
  return res.data;
}

export async function fetchLogs() {
  const url = `${API_BASE}/logs/${DRONE_ID}`;
  const res = await axios.get(url);
  return res.data;
}

export async function postLog(payload) {
  const url = `${API_BASE}/logs`;
  const res = await axios.post(url, payload);
  return res.data;
}
