import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, NavController, AlertController, NavParams} from '@ionic/angular';
import { APIservice } from '../../providers/api.service';
import { MealpopsPage } from '../mealpops/mealpops.page';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage {

  src = "assets/imgs/tarte.jpg";
  titre = "Tarte Delissiouza";
  recette_id: any;
  recette: any;
  serving: any;  //`REC_YIELDNB`,
  calories: any;  //`REC_TOTALCALORIES`,
  graisses: any;  //`REC_TOTALFAT`,
  glucides: any;  //`REC_TOTALCARBS`,
  proteines: any;  //`REC_PROTEIN`,
  instructions: any;  //`REC_INSTRUCTIONS` 

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public popoverController: PopoverController,
    private modal: ModalController,
    public api: APIservice
  ) {
    this.recette = [];
    this.getRecette();

  }

  getRecette() {
    this.recette_id = this.navParams.get('recette_id');
    this.api.getRecette(this.recette_id).subscribe(data => {
      var obj = JSON.parse(data["_body"]);
      if (obj.success) {
        //console.log(obj)
        this.recette = obj.result;
      }
    });
  }

  close() {
    this.modal.dismiss();
  }
  ionViewDidLoad() {
    console.log('chargement');
    this.getRecette();
  }
  async Planner() {
    var customTemplate =
      '<ion-toggle>enable</ion-toggle>' +
      '<label class="item item-input"><input type="text" placeholder="your address"></label>';

    const alert = await this.alertController.create({
      message: customTemplate,
      buttons: ['OK']

    });

     alert.present();

  }
  async openMealpops() {
    const modalMagasin = await this.modal.create({
      component: MealpopsPage, 
      componentProps: {
        recette : this.recette 
      }
    });
    modalMagasin.present();
  }
}
