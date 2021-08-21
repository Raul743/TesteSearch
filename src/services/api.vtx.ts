import fetch from "node-fetch";

const options = {
  method: "GET",
  headers: { Accept: "application/json; charset=utf-8" },
};

export function query(Query: string) {
  const url = `https://apiexamples.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?ft=${Query}`;
  const Api = fetch(url, options);
  return Api.then((res) => res.json())
    .then((json) => json)
    .catch((err) => console.error("______error_____:" + err));
}
