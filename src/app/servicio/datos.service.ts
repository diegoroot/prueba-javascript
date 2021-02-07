import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  api = 'api/orders/technical-admission-test/';

  constructor(private httpc: HttpClient) { }

  consulta(fecha): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('token', '?jrTGbLNA&jxWL*&Y/$*Q:2]v=hGpH-');
    formData.append('order_date', fecha);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpc.get<any>('https://devback.ventasremotas.com/orders/technical-admission-test/?token=?jrTGbLNA%26jxWL*%26Y/$*Q:2]v=hGpH-&order_date='+fecha, { headers: headers })
  }
}
