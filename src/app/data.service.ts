import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public sqlite: SQLite) { 
    this.sqlite.create({name: "data.db", location: "default"})      .then((db : SQLiteObject) => {
    }, (error) => {
            console.log("ERROR: ", error);
    });     
  }
}
