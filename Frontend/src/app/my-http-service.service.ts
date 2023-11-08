import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyHttpServiceService {
  constructor(private http: HttpClient) {}

  getData(sortOption:string) {
    return this.http.get(`http://localhost:3000/api/v1/products/${sortOption}`, {
      withCredentials: true,
    });
  }

  setData(data: any) {
    return this.http.post('http://localhost:3000/api/v1/add-product/', data,{
      withCredentials:true
    });
  }

  deleteProduct(id: any) {
    return this.http.delete(`http://localhost:3000/api/v1/single-product/${id}`,{
      withCredentials:true
    });
  }

  updateProduct(data: any, id: any) {
    return this.http.put(`http://localhost:3000/api/v1/edit-product/${id}`, data,{
      withCredentials:true
    });
  }

  getSingleProduct(id: any) {
    return this.http.get(`http://localhost:3000/api/v1/single-product/${id}`,{
      withCredentials:true
    });
  }

  addToCart(id: any) {
    return this.http.get(`http://localhost:3000/api/v1/add-to-cart/${id}`,{
      withCredentials:true
    });
    
  }

  getCartProduct() {
    return this.http.get(`http://localhost:3000/api/v1/cart`,{
      withCredentials:true
    });
  }

  removeFromCart(id: any) {
    return this.http.delete(`http://localhost:3000/api/v1/add-to-cart/${id}`,{
      withCredentials:true
    });
  }

  incrementQuantity(id: any) {
    return this.http.get(
      `http://localhost:3000/api/v1/incrementQuantity/${id}`,{
        withCredentials:true
      }
    );
  }

  decrementQuantity(id: any) {
    return this.http.get(
      `http://localhost:3000/api/v1/decrementQuantity/${id}`,{
        withCredentials:true
      }
    );
  }

  registerUser(data: any) {
    return this.http.post(`http://localhost:3000/api/v1/register`, data);
  }

  loginUser(data: any) {
    return this.http.post(`http://localhost:3000/api/v1/login`, data,{
      withCredentials:true
    });
  }

  logoutUser() {
    return this.http.get(`http://localhost:3000/api/v1/logout`,{
      withCredentials:true
    });
  }

  getUser(){
    return this.http.get(`http://localhost:3000/api/v1/user`,{
      withCredentials:true
    })
  }

  paymentMade(){
    return this.http.get(`http://localhost:3000/api/v1/payment-made`,{
      withCredentials:true,
    })
  }

  getMyOrders(){
    return this.http.get(`http://localhost:3000/api/v1/my-orders`,{
      withCredentials:true,
    })
  }
}
