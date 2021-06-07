export async function fetchAuth(userData) {

  const url = '/api/products/getProducts';
  const dataForFetch = {}
  const method = 'GET';

  console.log(url)
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong ');
  }

  return data;
}
