import { Injectable } from "@angular/core";
import { Iproduct } from "./product";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class ProductService{

    getProducts():Iproduct[]{
        return[
            
        ]
    }

}