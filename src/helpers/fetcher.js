// https://api-krajanka.up.railway.app${ENDPOINT}
// http://localhost:3000${ENDPOINT}

export default async function fetcher(ENDPOINT, method = "GET", body = null) {
  const response = await fetch(
    `https://api-krajanka.up.railway.app${ENDPOINT}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
      credentials: "include",
    }
  );
  const data = await response.json();

  if (!data.ok) throw data.message;

  if (data.result) {
    return data.result;
  } else {
    return data.message;
  }
}
