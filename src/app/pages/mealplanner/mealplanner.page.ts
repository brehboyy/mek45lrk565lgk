import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { APIservice } from '../../providers/api.service';
import { RecettePage } from '../recette/recette.page';

@Component({
  selector: 'app-mealplanner',
  templateUrl: './mealplanner.page.html',
  styleUrls: ['./mealplanner.page.scss'],
})
export class MealplannerPage {
	moments = ["matin", "midi" , "collation", "soir"];
	aujourdhui:string;
	text: string;
	userid:number;
	auj : Date;
	mealplannersAll: any;
  mealplanner: any;
	hasAnswered = false;
  constructor(public api:APIservice, public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public modalCtrl: ModalController) {
  	this.auj = new Date();
    //this.aujourdhui = this.auj.toDateString();
    this.userid=this.navParams.get('userid');
    console.log(this.moments);
    this.getRepasbyId();
  }

  jourSuivant(bool){
  	//si vrai jour suivant sinon jour precedent
  	if(bool)
  		this.auj.setDate(this.auj.getDate() + 1);
  	else
  		this.auj.setDate(this.auj.getDate() - 1);
  	this.getDayAuj();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealplannerPage');
    
  }

  getRepasbyId(){
    this.api.getAllRepasById(this.userid).subscribe(data => {
      var obj = JSON.parse(data["_body"]);
      this.text = obj.message;
      console.log(obj);
      this.mealplannersAll = obj.mealplanner;
      this.getDayAuj();
      console.log('mealplannerAll', this.mealplannersAll);
      console.log('iduser',this.userid);
    });
  }



  closeView(){
  	this.modalCtrl.dismiss();
  }

  getDayAuj(){
    switch (this.auj.getDay()) {
      case 0:
         this.aujourdhui = "Dimanche  " + this.auj.getDate() + "/" + (this.auj.getMonth()  + 1);
        break;
      case 1:
          this.aujourdhui = "Lundi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 2:
          this.aujourdhui = "Mardi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 3:
          this.aujourdhui = "Mercredi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 4:
          this.aujourdhui = "Jeudi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 5:
          this.aujourdhui = "Vendredi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      case 6:
          this.aujourdhui = "Samedi  " + this.auj.getDate() + "/" + (this.auj.getMonth() + 1);
          break;
      
      default:
        this.aujourdhui = "Erreur";
        break;
    }
    this.mealplanner= [];
    for (let i = 0; i < this.mealplannersAll.length; i++) {
      let dateWindows = new Date(this.auj);
      let parser = this.mealplannersAll[i].date.split(/[^0-9]/);
      let dateRepas = new Date(parser[0],(parseInt(parser[1])-1),parser[2],parser[3],parser[4],parser[5]);
      //new Date(this.mealplannersAll[i].date);
      dateRepas.setHours(0,0,0,0);
      dateWindows.setHours(0,0,0,0);
      if(dateRepas.valueOf() === dateWindows.valueOf()){
        this.mealplanner.push(this.mealplannersAll[i]);
      }
    }
    console.log("test", this.mealplanner);
    
  }

  deleteRepas(repas) {
    this.api.deleteRepasMealPlanner(repas.id).subscribe(async data => {
      var obj = JSON.parse(data["_body"]);
      console.log(obj.message);
      if(obj.success){
        let toast = await this.toastCtrl.create({
          message: repas.Titre + " supprimmé du MealPlanner",
          duration: 1000,
          position: 'top'
        });
        toast.present();
        this.getRepasbyId();
      }
    })
  }

  async openDetails(recette_id) {
    const modalRecette = await this.modalCtrl.create({
      component: RecettePage, 
      componentProps: { 
        recette_id: recette_id 
      }
    });
    modalRecette.present();
  }
}