import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  template: `
  <form [formGroup]="Contact" (ngSubmit)="contactForm()">
    <ion-item>
      <ion-label>Name</ion-label>
      <ion-input type="text" formControlName="Name"></ion-input>
    </ion-item>
    <ion-item>
    <ion-label>Email</ion-label>
    <ion-input type="text" formControlName="Email"></ion-input>
  </ion-item>
    <ion-item>
      <ion-label>Description</ion-label>
      <ion-textarea formControlName="description"></ion-textarea>
    </ion-item>
    <button ion-button type="submit" [disabled]="!todo.valid">Submit</button>
  </form>
`
})
export class ContactPage implements OnInit {
  private Contact : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.Contact = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      description: [''],
    });
  }
  logForm(){
    console.log(this.Contact.value)
  }

  ngOnInit() {
  }

}
