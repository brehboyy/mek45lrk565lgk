import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { APIservice } from '../../providers/api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {

  formgroup:FormGroup;
  login:AbstractControl;
  password:AbstractControl;
  constructor(public storage:Storage,
    public navCtrl: NavController,
    public api:APIservice,
    public modal: ModalController,
    public formbuilder:FormBuilder,
    public toastCtrl:ToastController) {

      this.formgroup = formbuilder.group({
        login:['',[Validators.required,Validators.maxLength(20)]],
        password:['',[Validators.required,Validators.maxLength(20), Validators.minLength(8)]]
      });

      this.login = this.formgroup.controls['login'];
      this.password = this.formgroup.controls['password'];

  }

  public goToRegister(){
    //const modalRegister = this.modal.create('RegisterPage');
    //modalRegister.present();
    this.navCtrl.navigateForward('/register');
  }

  goToForgotpassword(){
    this.navCtrl.navigateForward('/forgot-password');
  }
  
  public goToHome(){
    if(this.formgroup.valid){
      this.api.login(this.login.value, this.password.value).subscribe(async data => {
        if(data['success']){
          this.storage.set('id_user', parseInt(data['result']));
          this.navCtrl.navigateForward('/home');
        }else{
          let toast = await this.toastCtrl.create({
            message: data['message'] ? data['message'] : "Aucune connexion n'a pu être établie",
            duration: 15000,
            position: 'bottom'
          });
          await toast.present();
        }
      });
    }
    
  }










  // showactionsheet() {
  //   let actionsheet = this.actionctrl.create( {
  //     title: 'My favorite list',
  //     buttons : [
  //       {
  //         text:'Delete',
  //         role:'destructive',
  //         handler: () => {
  //           console.log("Hey deleted successfully")
  //         }
  //       },
  //       {
  //         text:'Share',
  //         handler: () => {
  //           console.log("Hey Shared successfully")
  //         }
  //       },
  //       {
  //         text:'Cancel',
  //         role:'cancel',
  //         handler: () => {
  //           console.log("Hey cancelled successfully")
  //         }
  //       }
  //     ]
  //   });

  //   actionsheet.present();
  // }

}