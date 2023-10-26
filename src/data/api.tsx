export async function getItems() {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = (await response.json()) as unknown;
  return data;
}
export async function deleteItem(id: number) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
  const data = (await response.json()) as unknown;
  console.log(data);
  return data;
}
export async function getAllUsers() {
  const response = await fetch('https://fakestoreapi.com/users');
  const data = (await response.json()) as unknown;
  // console.log(data);
  return data;
}
