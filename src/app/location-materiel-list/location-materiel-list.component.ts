import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-materiel-list',
  templateUrl: './location-materiel-list.component.html',
  styleUrls: ['./location-materiel-list.component.scss']
})
export class LocationMaterielListComponent implements OnInit {

  locationMateriels: any[];

  materiels: any[];
  locationDMateriel: any[];



  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
   // console.log('test',  this.locationService.getLocationsMateriels().subscribe(res => (this.locationMateriels=res)))
    //this.locationService.getLocationsMateriels().subscribe(res => (this.locationMateriels=res));
    this.locationService.onMaterielsChanged.subscribe((res) =>{
      this.materiels = res;
      console.log("this.materiels", this.materiels);
      this.createMaterielsorSelect();
    })

    this.locationService.onLocationMaterielsChanged.subscribe((res) =>{
      this.locationDMateriel = res;
      console.log("this.locationDMateriel", this.locationDMateriel);
      this.createMaterielsorSelect();
      
    })
  }

  createMaterielsorSelect(): void{
    if (this.materiels && this.materiels.length > 0 && this.locationDMateriel && this.locationDMateriel.length > 0 ) {
      this.locationMateriels = [];
      this.locationDMateriel.forEach(element => {
        console.log('element.locationMateriels.refMateriel',element);
        console.log('*******je teste********',element.locationMateriels[0].refMateriel);
        this.locationMateriels.push({
          location: element,
          materiels: this.materiels.filter((mat) => {return mat.id == element.locationMateriels[0].refMateriel})
        });
      });      
    }
    console.log('locationDMateriel',this.locationMateriels);
  }

 /*  getLocationMateriels = () =>
    this.locationService.getLocationsMateriels()
                        .subscribe(res => (this.locationMateriels=res)); */
  
                    
                        
   /*  getLocationMateriels(){
      this.locationService.getLocationsMateriels()
                        .subscribe(res => (this.locationMateriels=res));
      console.log('affiche Mat',this.locationMateriels);

    } */
                        

    deleteLocation = data => this.locationService.delete(data);

    modifiecommande = data =>this.locationService.update(data);
  

}
