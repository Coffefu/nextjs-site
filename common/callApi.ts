const { NEXT_PUBLIC_ENVIRONMENT } = process.env;

export default async function callApi(
  endpoint: string,
  method?: string,
  payload?: { [key: string]: string },
  options?: { [key: string]: string },
  jwt: string = ""
) {
  const config: RequestInit = {
    method: method || "get",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload && JSON.stringify(payload),
    ...options,
  };

  if (jwt) {
    config.headers = {
      "Content-Type": "application/json",
      "jwt-token": jwt,
    };
  }

  const res = await fetch(
    `http://localhost:8000${NEXT_PUBLIC_ENVIRONMENT || ""}/api` + endpoint,
    config
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return json;
    });

  return await res;
}
