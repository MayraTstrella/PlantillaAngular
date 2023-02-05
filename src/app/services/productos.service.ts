
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltro: Producto[] = [];


  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise<void>((resolve, reject) => {
      this.http.get<Producto[]>('https://app-angular-ef3a1-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp) => {
          //any
          this.productos = resp;
          this.cargando = false;
          console.log(resp);

          resolve();

        });
    })


  }


  getProducto(id: string) {
    return this.http.get(`https://app-angular-ef3a1-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string) {

    if ( this.productos.length === 0 ) {
      // le cargo los productos
      this.cargarProductos().then( () => {
        // se va a ejecutar desp de tener los productos
        //aplico el filtro
        this.filtrarProductos( termino );
      });

    } else {
      // aplico el filtro
      this.filtrarProductos( termino );

    }

   

  }


 private filtrarProductos( termino: string ) {

  this.productoFiltro = [];
  // console.log(this.productos);

  termino = termino.toLowerCase();

  this.productos.forEach( prod => {

    const nwTitulo = prod.titulo.toLowerCase();

    if (prod.categoria.indexOf( termino ) >= 0 || nwTitulo.indexOf( termino ) >= 0 ) {
      this.productoFiltro.push( prod );
    }
  })
 }

}
