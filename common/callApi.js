import axios from "axios";

const { NEXT_PUBLIC_ENVIRONMENT } = process.env;

export default async function callApi(
  endpoint,
  method,
  payload,
  options,
  jwt = false
) {
  const config = {
    method: method | "get",
    responseType: "json",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: payload && JSON.stringify(payload),
    ...options,
  };

  if (jwt) {
    config.headers["jwt-token"] = jwt;
  }

  const res = await fetch(`https://cofefu.ru${NEXT_PUBLIC_ENVIRONMENT || ''}` + endpoint, config)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json;
        });

    return await res;
}