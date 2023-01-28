import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {


  info: InfoPagina = {};

  cargada = false;

  equipo: any[] = [];
  
  constructor( private http: HttpClient ) { 

    this.cargarInfo();
    this.cargarEquipo();

  }


  private cargarInfo() {

    this.http.get('assets/data/data-pagina.json')
    .subscribe( (resp: InfoPagina) => {

     this.cargada = true;
     this.info = resp;

     // console.log(resp);  Para mostrar todos los elementos del Json
    })
//  .subscribe( (resp: any) => {
//   console.log(resp.twitter);   Para mostrar un solo elemento
//  })
  }

  private cargarEquipo() {

    this.http.get('https://app-angular-ef3a1-default-rtdb.firebaseio.com/equipo.json')
    .subscribe( (resp: any) => {

     this.equipo = resp;

    //  console.log(resp); 
    })
  }

}
