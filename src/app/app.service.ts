import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_BASE="http://localhost:8080";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http:HttpClient
  ) {}

getAll(){
  return this.http.get(`${API_BASE}/Productos`);

}

create(productos:any){
  return this.http.post(`${API_BASE}/Productos`, productos);

}

update(id:String, productos:any){
  return this.http.put(`${API_BASE}/Productos/${id}`, productos);

}

delete(id:String){
  return this.http.delete(`${API_BASE}/Productos/${id}`);

}
}
