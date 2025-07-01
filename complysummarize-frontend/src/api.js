const API_BASE = "http://localhost:5000/api";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function uploadPdf(file, token) {
  const formData = new FormData();
  formData.append("pdf", file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
}

export async function createSummary(pdfPath, token) {
  const res = await fetch(`${API_BASE}/summaries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ pdfPath }),
  });
  return res.json();
}

export async function getSummaries(token) {
  const res = await fetch(`${API_BASE}/summaries`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
