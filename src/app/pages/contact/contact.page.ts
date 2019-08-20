import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  submitted = false;
  contactForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, public toast: ToastController) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: [''],
        message: ['']
    }, {});
}

  showToast() {
    this.toast.create({
      message: 'Thank you for your message.',
      duration: 2000,
      animated: true,
      showCloseButton: true,
      closeButtonText: "OK",
      cssClass: "my-toast",
      position: "middle"
    }).then((obj) => {
      obj.present();
    });
  }
  onSubmit() {
    this.showToast()

    this.contactForm.reset()
  }

}
