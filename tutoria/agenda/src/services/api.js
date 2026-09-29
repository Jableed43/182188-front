const BASE_URL = 'http://localhost:3000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar ${path}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const get = (path) => request(path);
export const post = (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) });
export const patch = (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) });
export const del = (path) => request(path, { method: 'DELETE' });
