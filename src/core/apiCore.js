import { API } from "../config";
import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortby=${sortBy}&order=desc&limit=4`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data ={skip, limit, filters}
    return fetch(`${API}/products/by/search`, {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
      })
          .then(response => {
              return response.json();
          })
          .catch(err => {
              console.log(err);
          });
  };

  export const list = (params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    
    return fetch(`${API}/products/search?${query}`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getProduct = (productId) => {
    return fetch(`${API}/product/${productId}`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const relatedList = (productId) => {
    return fetch(`${API}/products/related/${productId}`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`,{
        method:'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}
//router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}