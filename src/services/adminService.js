import { toQuery } from "../helpers/objectToQuery";
import { post, getToken, patchToken, postToken } from "../utils/request";

export const login = async (options) => {
  const result = await post("admin/auth/login", options)
  return result;
}

export const getDashboard = async (token) => {
  const result = await getToken("admin/dashboard", token)
  return result;
}

export const getMyAccount= async (token) => {
  const result = await getToken("admin/my-account", token)
  return result;
}

export const editMyAccount = async (token, options) => {
  const result = await patchToken(`admin/my-account/edit`, token, options)
  return result;
}

// Products
export const getProducts = async (token, options) => {
  const query = toQuery(options);
  const result = await getToken("admin/products"+ `?${query}`, token)
  return result;
}

export const createProduct = async (token, options) => {
  const result = await postToken("admin/products/create", token, options);
  return result;
} 

export const editProduct = async (token, id, options) => {
  const result = await patchToken(`admin/products/edit/${id}`, token, options)
  return result;
} 

export const detailProduct = async (token, id) => {
  const result = await getToken(`admin/products/detail/${id}`, token)
  return result;
} 

export const deleteProduct = async (token, id) => {
  const result = await patchToken(`admin/products/delete/${id}`, token)
  return result;
} 
// End Products

// Products Category
export const getProductsCategory = async (token, options) => {
  const query = toQuery(options);
  const result = await getToken("admin/products-category"+ `?${query}`, token)
  return result;
}

export const createProductsCategory = async (token, options) => {
  const result = await postToken("admin/products-category/create", token, options);
  return result;
} 

export const editProductsCategory = async (token, id, options) => {
  const result = await patchToken(`admin/products-category/edit/${id}`, token, options)
  return result;
} 

export const detailProductsCategory = async (token, id) => {
  const result = await getToken(`admin/products-category/detail/${id}`, token)
  return result;
}

export const deleteProductCategory = async (token, id) => {
  const result = await patchToken(`admin/products-category/delete/${id}`, token)
  return result;
} 
// End Products Category