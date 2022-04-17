import { Component, OnInit } from '@angular/core';
import { WeatherWidgetMainComponent } from '../weather-widget-main/weather-widget-main.component';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat: any;
  lon: any;
  weather: any;
  locationIsDefined:boolean = true;
  locationDefinedEnableCity = false;
  constructor(private weatherService: WeatherWidgetMainComponent) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation() {
    if('geolocation' in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude
        this.lon = success.coords.longitude
        
        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data => {
          this.weather = data;
        });
      }, (error) => {
        if(error.code == error.PERMISSION_DENIED) {
          this.locationIsDefined = false;
          this.locationDefinedEnableCity = true;
        }
      });
    }
  }

  getCity(city: string) {
    this.weatherService.getWeatherDataByCityName(city).subscribe((data:any) => {
      this.weather = data;

      this.lat = data.coord.lat;
      this.lon = data.coord.lon;

    });
  }

  getCoords(event: any){
   
    console.log(event.coords.lng);
    this.lat = event.coords.lat;
    this.lon = event.coords.lng;

    this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(data =>{
      this.weather = data;
    })
  }
}
