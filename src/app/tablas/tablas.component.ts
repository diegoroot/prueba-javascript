import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DatosService } from '../servicio/datos.service';
import * as delay from 'delay';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {

  f1: any;
  nuevoObjeto = {}

  constructor(private datos: DatosService) {

  }

  async ngOnInit() {
    await this.datos.consulta('2016/12/04').subscribe(data => {
      this.f1 = data.data
      this.datos.consulta('2016/12/11').subscribe(data => {
        this.f1 = this.f1.concat(data.data);
        this.datos.consulta('2016/12/18').subscribe(data => {
          this.f1 = this.f1.concat(data.data);
        })
      })
    })
    await delay(1500);
    this.f1.forEach(x => {
      if (!this.nuevoObjeto.hasOwnProperty(x.seller_code)) {
        this.nuevoObjeto[x.seller_code] = {
          profesionales: [],
          nombre: x.seller_name
        }
      }

      //Agregamos los datos de profesionales. 
      this.nuevoObjeto[x.seller_code].profesionales.push({
        visits_date: x.visits_date,
        visits_amount: x.visits_amount,
        orders_amount: x.orders_amount,
        visits_without_sale_amount: x.visits_without_sale_amount
      })

    })
    for (let element in this.nuevoObjeto) {
      var newDiv = document.createElement("button");
      newDiv.style.width = '360px'
      newDiv.style.background = '#a6ddf2'
      newDiv.style.marginLeft = '20px'
      newDiv.setAttribute("id", 'bt'+element);
      newDiv.onclick = function(){
        if(document.getElementById(element).style.display=='none'){
          document.getElementById(element).style.width = '262px'
          document.getElementById(element).style.marginTop = '10px'
          document.getElementById(element).style.marginLeft = '40px'
          document.getElementById(element).style.display= 'block';
        }else{
          document.getElementById(element).style.display= 'none';
        }
      };
      var newContent = document.createTextNode(element + " - " + this.nuevoObjeto[element]['nombre']);
      newDiv.appendChild(newContent);
      var currentDiv = document.getElementById(element);
      document.body.insertBefore(newDiv, currentDiv);
      var body = document.getElementsByTagName("body")[0];
      var tabla = document.createElement("table");
      tabla.setAttribute("id", element);
      var tblBody = document.createElement("tbody");
      var tit = ['Fecha', 'Visitas', 'Pedidos', 'No ventas']
      var hilera = document.createElement("tr");
      for (let i = 0; i < 4; i++) {
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(tit[i]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
      tblBody.appendChild(hilera);
      let fil = this.nuevoObjeto[element]['profesionales'];
      for(let fi in fil){
        hilera = document.createElement("tr");
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(fil[fi]['visits_date']);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        var celda2 = document.createElement("td");
        var textoCelda2 = document.createTextNode(fil[fi]['visits_amount']);
        celda2.appendChild(textoCelda2);
        hilera.appendChild(celda2);
        var celda3 = document.createElement("td");
        var textoCelda3 = document.createTextNode(fil[fi]['orders_amount']);
        celda3.appendChild(textoCelda3);
        hilera.appendChild(celda3);
        var celda4 = document.createElement("td");
        var textoCelda4 = document.createTextNode(fil[fi]['visits_without_sale_amount']);
        celda4.appendChild(textoCelda4);
        hilera.appendChild(celda4);
        tblBody.appendChild(hilera);
      }
      var fechas = ['2016/12/04', '2016/12/11','2016/12/18']
      let u =0;
      if(fil.length<3){
        let i = fil.length
        while(i<3){
        hilera = document.createElement("tr");
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(fechas[u]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
        var celda2 = document.createElement("td");
        var textoCelda2 = document.createTextNode('0');
        celda2.appendChild(textoCelda2);
        hilera.appendChild(celda2);
        var celda3 = document.createElement("td");
        var textoCelda3 = document.createTextNode('0');
        celda3.appendChild(textoCelda3);
        hilera.appendChild(celda3);
        var celda4 = document.createElement("td");
        var textoCelda4 = document.createTextNode('0');
        celda4.appendChild(textoCelda4);
        hilera.appendChild(celda4);
        tblBody.appendChild(hilera);
          i++;
          u++;
        }
      }



      tabla.appendChild(tblBody);
      body.appendChild(tabla);
      document.getElementById(element).style.display= 'none';
      tabla.setAttribute("border", "1");
      let br = document.createElement("br");
      body.appendChild(br);





    }
  }



}
