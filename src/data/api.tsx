export async function getItems() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = (await response.json()) as unknown;
  return data;
}
