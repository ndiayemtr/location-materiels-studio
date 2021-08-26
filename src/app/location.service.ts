import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  materiels: any[];
  onMaterielsChanged: BehaviorSubject<any>;

  categories: any[];
  onCategoriesChanged: BehaviorSubject<any>;

  locationMateriels: any[];
  onLocationMaterielsChanged: BehaviorSubject<any>;

  form = new FormGroup({
    dateDebut: new FormControl(""),
    dateFin: new FormControl(""),
    qteTotalsMatLoc: new FormControl(""),
    prixTotalsMatLoc: new FormControl(""),

  });

  constructor(public firestore: AngularFirestore) { 
    this.onMaterielsChanged = new BehaviorSubject([]);
    this.onCategoriesChanged = new  BehaviorSubject([]);
    this.onLocationMaterielsChanged = new BehaviorSubject([]);

    this.getMateriels();
    this.getCategories();
    this.getLocationsMateriels();
  }

   //Création d'une demande de location
   demandeLocation(data) {
    return new Promise((resolve, reject) => {
    this.firestore
    .collection("demandeLocation")
    .add(data)
    .then(res => {}, err => reject(err));
   });
  }

  //liste des locations
  /* getLocationsMateriels(){
    return this.firestore.collection("demandeLocation").snapshotChanges();
  } */

  getMateriels(): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.firestore.collection("materiels-studios")
          .snapshotChanges()
          .subscribe(liste => {
            this.materiels = liste.map(c => (Object.assign(c.payload.doc.data(), { id: c.payload.doc.id })));
            this.onMaterielsChanged.next(this.materiels);
            resolve(this.materiels)
          });
  });
  }

  getLocationsMateriels():Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.firestore.collection("demandeLocation")
          .snapshotChanges()
          .subscribe(liste => {
            this.locationMateriels = liste.map(c => (Object.assign(c.payload.doc.data(), { id: c.payload.doc.id })));
            this.onLocationMaterielsChanged.next(this.locationMateriels);
            resolve(this.locationMateriels)
          });
  });

  }

  getCategories(): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.firestore.collection("categories-materiels")
          .snapshotChanges()
          .subscribe(liste => {
            this.categories = liste.map(c => (Object.assign(c.payload.doc.data(), { id: c.payload.doc.id })));
            this.onCategoriesChanged.next(this.categories);
            resolve(this.categories)
          });
  });
  }

  //Mise a jour d'une location
  update(data){
    return this.firestore
               .collection("demandeLocation")
               .doc(data.payload.doc.id);
  }

  //suppremier une location
  delete(data){
    if (confirm('Etes-vous sûre de vouloir supprimer cet enregistrement ?') == true) {
      return this.firestore
     .collection("demandeLocation")
     .doc(data.payload.doc.id)
     .delete();
    }
    return false;
  }
}
