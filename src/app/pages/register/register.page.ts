import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIservice } from '../../providers/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formgroup:FormGroup;
  login:AbstractControl;
  password:AbstractControl;
  email:AbstractControl;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public navParams: NavParams,public formbuilder:FormBuilder, public api:APIservice) {

    this.formgroup = formbuilder.group({
      login:['',[Validators.required,Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9 ]*')]],
      password:['',[Validators.required,Validators.maxLength(20),Validators.pattern('^[?=.*0-9a-zA-Z]*'), Validators.minLength(8)]],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}')]]
    });

    this.login = this.formgroup.controls['login'];
    this.password = this.formgroup.controls['password'];
    this.email = this.formgroup.controls['email'];

  }

  back(){
    this.navCtrl.pop();
  }

  ngOnInit(){

  }
  

   goToLogin(){
    console.log(this.formgroup.valid);
    if(this.formgroup.valid){
      this.api.enregistrer(this.login.value, this.password.value,this.email.value).subscribe(async data=>{
        console.log(data);
        let obj = JSON.parse(data['_body']);
        //console.log(obj);
        if(obj.success){
          this.navCtrl.pop();
        }else{
          let toast = await this.toastCtrl.create({
            message: obj.message,
            duration: 15000,
            position: 'bottom'
          });
          toast.present();
        }
      })
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
