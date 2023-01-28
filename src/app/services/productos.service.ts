
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

cargando = true;
productos : any = [];


  constructor( private http: HttpClient ) { 

    this.cargarProductos();

  }

  private cargarProductos() {


    this.http.get('https://app-angular-ef3a1-default-rtdb.firebaseio.com/productos_idx.json')
            .subscribe( (resp: Producto) => {
                                //any
        this.productos = resp; 
        this.cargando = false;
        //console.log(resp);
      

    });
  }
}
