import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { APIservice } from '../../providers/api.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})

export class ForgotPasswordPage {
  email:AbstractControl;
  formgroup:FormGroup;
  constructor(public api: APIservice, public navCtrl: NavController, public toastCtrl: ToastController, public formbuilder:FormBuilder, public navParams: NavParams) {
    this.formgroup = formbuilder.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}')]]
    });

    this.email = this.formgroup.controls['email'];
  }

  back(){
    this.navCtrl.pop();
  }

  public resetPassword(){
    this.api.forgotPassword(this.email.value).subscribe(async data=>{
      let obj = JSON.parse(data['_body']);
      let toast = await this.toastCtrl.create({
        message: obj.message,
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

}
