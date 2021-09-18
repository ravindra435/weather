import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}


  getwheatherData(data:any){
   
    let params = new HttpParams();
      params = params.set('q',data.q).set('appid',data.appid)
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast',{  params: params })
  }
}
