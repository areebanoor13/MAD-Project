export const FAKE_STORE_PRODUCTS_URL = 'https://fakestoreapi.com/products';

export const DEMO_PKR_PER_USD = 280;

export function mapFakeStoreProduct(apiProduct) {
  return {
    id: `api-${apiProduct.id}`,
    name: apiProduct.title,
    price: Math.round(Number(apiProduct.price) * DEMO_PKR_PER_USD),
    apiPriceUsd: Number(apiProduct.price),
    image: apiProduct.image,
    description: apiProduct.description,
    collection: 'api',
    tag: apiProduct.category,
    source: 'api',
    currency: 'PKR',
  };
}
