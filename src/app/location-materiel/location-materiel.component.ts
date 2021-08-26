import { Component, Input, OnInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-materiel',
  templateUrl: './location-materiel.component.html',
  styleUrls: ['./location-materiel.component.scss']
})
export class LocationMaterielComponent implements OnInit {

  materiels: any[];
  categories: any[];

  materielsEtCategories: any[];
  locationMateriels = [];

  refMateriels = [];

  qte: number = 1;
  prixTotals: number;
  qteTotals : number;

 //addMateriels = materiel => this.locationMateriels.push(materiel);
 addMateriels(materiel){
     this.materiels.forEach((mat) => {
      if (mat.nom == materiel) {
        this.locationMateriels.push({
          materiels: mat,
          qte:1,
          prixTotal: mat.prixLocation
        });
      }
  }); 

  console.log('prixLocation', this.locationMateriels['materiels'])
  
  console.log('this.locationMateriels', this.locationMateriels); 
  }

  onKeypress(qte: any){
    console.log('qte', this.qte)
  }

  removeMateriel = materiel => {
    let index = this.locationMateriels.indexOf(materiel);
    if (index > -1) this.locationMateriels.splice(index, 1);
   };

 

  constructor(public locationService: LocationService) { }

  ngOnInit(): void {
    // this.locationService.getMateriels().then((res) =>{
    //   this.materiels = res;
    //   console.log("this.materiels", this.materiels);
    // })
    // this.locationService.getCategories().then((res) =>{
    //   this.categories = res;
    //   console.log("this.categories", this.materiels);
    // })

    // Promise.all([
    //   this.locationService.getMateriels(),
    //   this.locationService.getCategories()
    // ]).then((responses)  =>{
    //   console.log("responses", responses);
    //   this.materiels = responses[0];
    //   this.categories = responses[1];
        //this.createMaterielsorSelect();
    // })

    this.locationService.onMaterielsChanged.subscribe((res) =>{
      this.materiels = res;
      console.log("this.materiels", this.materiels);
      this.createMaterielsorSelect();
    })

    this.locationService.onCategoriesChanged.subscribe((res) =>{
      this.categories = res;
      console.log("this.categories", this.categories);
      this.createMaterielsorSelect();
      
    })

  }

  createMaterielsorSelect(): void{
    if (this.materiels && this.materiels.length > 0 && this.categories && this.categories.length > 0 ) {
      this.materielsEtCategories = [];
      this.categories.forEach(element => {
        this.materielsEtCategories.push({
          categorie: element,
          materiels: this.materiels.filter((mat) => {return mat.categorie == element.id})
        });
      });      
    }
    console.log('materielsEtCategories',this.materielsEtCategories);
  }

  onSubmit() {
    this.prixTotals = 0;
    this.qteTotals = 0;
    this.locationMateriels.forEach(element => {
      element.prixTotal = element.qte*element.materiels.prixLocation;
      this.prixTotals += element.prixTotal;
      this.qteTotals += element.qte;
      this.refMateriels.push({
        refMateriel: element.materiels.id,
        qte: element.qte,
        prixTotal: element.prixTotal
      });
      console.log('this.refMateriels', element.materiels.id);
    });
    //this.locationService.form.value.locationMateriels = this.locationMateriels;
    this.locationService.form.value.locationMateriels = this.refMateriels;
    this.locationService.form.value.prixTotalsMatLoc = this.prixTotals;
    this.locationService.form.value.qteTotalsMatLoc = this.qteTotals;

    let data = this.locationService.form.value;
    console.log(data);
  this.locationService.demandeLocation(data).then(res => {''
    });
   }

}
