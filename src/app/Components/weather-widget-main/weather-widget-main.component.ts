import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = 'c937e57f947fc3b374274e8e78ee1521';
  units = 'metric';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getWeatherDataByCoords(lat: number, lon: number){
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('appid', this.apiKey)
    .set('units', 'metric')

    return this.http.get(this.url, { params });
  }

  getWeatherDataByCityName(city: string){
    let params = new HttpParams()
    .set('q', city)
    .set('units', 'metric')
    .set('appid', this.apiKey)

    return this.http.get(this.url, { params });

  }
  
}
