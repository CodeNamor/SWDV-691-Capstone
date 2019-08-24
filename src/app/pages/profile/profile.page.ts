import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
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
 
  @ViewChild('mylist', {static: false})mylist: IonList;

  constructor(private router: Router, private formBuilder: FormBuilder, private dataService: DataService, 
    private toastController: ToastController, private plt: Platform) {
      this.plt.ready().then(() => {
        //this.loadItems();
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

// Helper
async showToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}
