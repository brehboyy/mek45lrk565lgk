import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController } from '@ionic/angular';
import { APIservice } from '../../providers/api.service';
import { Storage } from '@ionic/storage';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-mealpops',
  templateUrl: './mealpops.page.html',
  styleUrls: ['./mealpops.page.scss'],
})
export class MealpopsPage {
  recette:any;
  id_recette:number;
  buttonColor: string[];
  value:string;
  isactiveicon:boolean=false;
  colorBtn:boolean=true;
  isactivedate:boolean=false;
  moments=['09:00:00', '12:00:00', '16:00:00', '19:00:00'];
  moment:any;
  userid:number = -1;
  constructor(public toastCtrl:ToastController, public storage:Storage, public api:APIservice, public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
    this.buttonColor = ['dark','dark','dark','dark'];
    storage.ready().then(() => {
      storage.get('id_user').then((val) => {
        this.userid = val;
      })
    });
  }

  ionViewDidLoad() {
  }
   dismiss(){
     this.modalCtrl.dismiss();
  }
  ionViewWillLoad(){
    this.recette = this.navParams.get('recette');
  }
  color() {
    if(this.isactiveicon&&this.isactivedate){
        this.colorBtn = false;
    }

  }
  select(icon){
    this.isactiveicon = true;
    console.log(icon)  
    for(let i=0;i<4;i++){
      this.buttonColor[i] = 'dark';
    }
    this.buttonColor[icon] = 'primary';
    this.color();
    this.moment=this.moments[icon];
  }

  getDate(){
    if(this.value!=""){
      this.isactivedate = true;      
    }
    this.color();
  }

  addValider(){
    let date = "";
    date = this.value+" "+this.moment;
    //let recetteid = this.navParams.get('recetteid');

    this.api.addRepas(this.userid,this.recette.REC_Identifier , date).subscribe(async data => {
      var obj = JSON.parse(data["_body"]);
      let toast = await this.toastCtrl.create({
        message: obj.message,
        duration: 1500,
        position: 'top'
      });
      toast.present();
    });
    this.modalCtrl.dismiss();
  }

}
