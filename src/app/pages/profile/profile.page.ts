import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, Item } from '../../services/storage.service';
import { ToastController, IonList, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  submitted = false;
  profileForm: FormGroup;

  items: Item[] = [];
 
  newItem: Item = <Item>{};
 
  @ViewChild('mylist', {static: false})mylist: IonList;

  constructor(private router: Router, private formBuilder: FormBuilder, private storageService: StorageService, 
    private toastController: ToastController, private plt: Platform) {
      this.plt.ready().then(() => {
        this.loadItems();
      });
    }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
        name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        zipcode: [''],
        email: [''],
        pTheatre: [''],
        radius: [''],
        favMovie: [''],
        favAct: ['']
    }, {});
}

// CREATE
addItem() {
  this.newItem.modified = Date.now();
  this.newItem.id = Date.now();

  this.storageService.addItem(this.newItem).then(item => {
    this.newItem = <Item>{};
    this.showToast('Item added!')
    this.loadItems(); // Or add it to the array directly
  });
}

// READ
loadItems() {
  this.storageService.getItems().then(items => {
    this.items = items;
  });
}

// UPDATE
updateItem(item: Item) {
  item.title = `UPDATED: ${item.title}`;
  item.modified = Date.now();

  this.storageService.updateItem(item).then(item => {
    this.showToast('Item updated!');
    this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
    this.loadItems(); // Or update it inside the array directly
  });
}

// DELETE
deleteItem(item: Item) {
  this.storageService.deleteItem(item.id).then(item => {
    this.showToast('Item removed!');
    this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
    this.loadItems(); // Or splice it from the array directly
  });
}

// Helper
async showToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}
