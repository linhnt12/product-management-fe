import { toQuery } from "../helpers/objectToQuery";
import { get, post } from "../utils/request";

export const home = async () => {
  const result = await get("");
  return result;
}

export const getProducts = async(options) => {
  const query = toQuery(options);
  const result = await get ("products" + `?${query}`);
  return result;
}

export const getCategory = async (slug, options) => {
  const query = toQuery(options);
  const result = await get(`products/${slug}` + `?${query}`);
  return result;
}

export const getProductDetail = async (slug) => {
  const result = await get(`products/detail/${slug}`);
  return result;
}

export const getSearchResult = async (keyword) => {
  const result = await get(`search?keyword=${keyword}`);
  return result;
}

export const addToCart = async (id, options) => {
  const result = await post (`cart/add/${id}`, options);
  return result;
}

export const getCart = async () => {
  const result = await get (`cart`);
  return result;
}

export const deleteCartItem = async (id) => {
  const result = await get (`cart/delete/${id}`);
  return result;
}

export const updateCartItem = async (id, quantity) => {
  const result = await get (`cart/update/${id}/${quantity}`);
  return result;
}

export const checkoutOrder = async (options) => {
  const result = await post (`checkout/order`, options);
  return result;
}

export const getOrder = async (id) => {
  const result = await get (`checkout/success/${id}`);
  return result;
}