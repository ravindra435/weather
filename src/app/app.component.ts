import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
// import { NgxSpinnerService } from 'ngx-spinner';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weatherData:any = []
  data: any = {}
  title = 'weather-data';
  constructor(private service:WeatherService,
    // private spinner:NgxSpinnerService
    ){}
  

  ngOnInit() {
   
  }
  onSubmit(form: NgForm) {
    this.getwheatherData();
  }
  getwheatherData(){
    let data = {
     
    q: this.data.q,
    appid:'15ca787f2d191cf1f09525804a2ce85d'
     
    }
    // this.spinner.show()
    console.log(data);
    
    this.service.getwheatherData(data).subscribe((res:any) => {
console.log(res);
// this.spinner.hide();
      const respData = res['list']
      let temp :any = []
      respData.forEach((item:any) =>{
              const convertDate = moment(new Date(item.dt_txt)).format('DD/MM/YYYY')
              console.log(convertDate);
              const findExitDateIndex = temp.findIndex((dateItem:any)=> dateItem.date == convertDate)
              if(findExitDateIndex != -1){
                temp[findExitDateIndex].items.push(item)
              }else{
                temp.push({date : convertDate , items:[item]})

              }

              
      })

      this.weatherData= temp.map((obj:any)=>{
        
        let minValue = 0
        let maxValue = 0
        let humidity = 0
        let pressure = 0

        
        obj.items.forEach((objItem:any) =>{
          console.log(objItem);
          
          minValue += objItem.main.temp_min
          maxValue += objItem.main.temp_max
          humidity += objItem.main.humidity
          pressure += objItem.main.pressure

        })
    
        return{
          date:obj.date,
          min:minValue/obj.items.length,
          max:maxValue/obj.items.length,
          humidity:humidity/obj.items.length,
          pressure:pressure/obj.items.length
        }


      })

      console.log({temp});
      console.log(this.weatherData);

      

    })
  }


}
