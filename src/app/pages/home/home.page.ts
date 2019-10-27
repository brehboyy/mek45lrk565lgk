import { Component, ViewChild } from '@angular/core';
import { PopoverController, NavController, ModalController, ActionSheetController } from '@ionic/angular';
//import { AddToMealplannerComponent } from '../../components/add-to-mealplanner/add-to-mealplanner';
import { APIservice } from '../../providers/api.service';
import { Storage } from '@ionic/storage';
import { RecettePage } from '../recette/recette.page';
import { MealplannerPage } from '../mealplanner/mealplanner.page';
import { MagasinPage } from '../magasin/magasin.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {


  userid = 1;
  tabs: any = [];
  Ingredients: any;
  vue: boolean = true;
  Recettes: any;

  traduire: boolean;
  ingredients: any;
  categories: any;
  id: number;
  id_cat: number;
  text: any;
  ingredientsSAVE: any;
  test: any;
  del: boolean;
  hasAnswered = false;
  add: boolean;
  displayCat: boolean;
  shouldSwipe: boolean = true;
  supCat: number[];
  tabIng: any;
  display: number;
  rechercher: boolean;


  constructor(public actionDeco: ActionSheetController, public storage: Storage, public api: APIservice, public popoverController: PopoverController, public navCtrl: NavController, private modal: ModalController) {
    this.tabs = ["page1", "page2"];
    this.api.getcategories().subscribe(data => {
      if (data['success']) {
        this.text = data['message'];
        this.categories = data['result'];
        this.categories.push({"CAT_Identifier" : 0, "CAT_Name" : "Tous"});
      }
    });
    //this.categories = [{ "ID_cat": 1, "Nom": "carrot" }, { "ID_cat": 2, "Nom": "fat" }, { "ID_cat": 3, "Nom": "gluten" }, { "ID_cat": 4, "Nom": "spices" }, { "ID_cat": 5, "Nom": "fruit" }, { "ID_cat": 6, "Nom": "meat" }, { "ID_cat": 7, "Nom": "nuts" }, { "ID_cat": 8, "Nom": "seafood" }, { "ID_cat": 9, "Nom": "sugar" }, { "ID_cat": 10, "Nom": "milk" }, { "ID_cat": 11, "Nom": "sauces" }, { "ID_cat": 12, "Nom": "other" }];
    storage.ready().then(() => {
      storage.get('id_user').then((val) => {
        this.userid = val;
        this.getLivre();
        this.getFrigo();
      })
    });
    this.id_cat = 2;
  }

  afficheIng(cat) {
    this.id_cat = cat;
  }
/*
  tobook() {
    this.SwipedTabsSlider.slideTo(0, 500);
  }
  tofrigo() {
    this.SwipedTabsSlider.slideTo(1, 500);
  }*/
  getFrigo() {
    if (this.userid) {
      this.api.getFrigoByIdUser(this.userid).subscribe(data => {
        if (data['success']) {
          this.Ingredients = data['result'];
        }
      });
    }
  }

  getLivre() {
    if (this.userid) {
      this.api.getLivreByIdUser(this.userid).subscribe(data => {
        if (data['success']) {
          this.Recettes = data['result'];
        }
      });
    }
  }

  deleteIng(ing) {
    if (this.userid != null) {
      this.api.deleteIng(this.userid, ing.MI_Identifier).subscribe(data => {
        this.text = data['message'];
        this.getFrigo();
      });
    }
  }/*
  changement() {
    console.log(this.SwipedTabsSlider._activeIndex)
    if (this.SwipedTabsSlider._activeIndex == 0) {
      this.vue = !this.vue;
      this.getLivre();
    }
    else if (this.SwipedTabsSlider._activeIndex == 1) {
      this.vue = !this.vue;
      this.getFrigo();
    }

  }*/
  async openRecette(recette_id) {
    const modalRecette = await this.modal.create({
      component: RecettePage, 
      componentProps: { 
        recette_id: recette_id 
      }
    });
    modalRecette.present();
  }

/*
  async openProfil(recette_id) {
    const modalRecette = await this.modal.create({
      component: CopiePage, 
      componentProps: { 
        userid: this.userid
      }
    });
    modalRecette.present();
  }*/

  async openMP(recette_id) {
    const modalRecette = await this.modal.create({
      component: MealplannerPage, 
      componentProps: { 
        userid: this.userid
      }
    });
    modalRecette.present();
  }

  async magasin() {
    const modalMagasin = await this.modal.create({
      component: MagasinPage, 
      componentProps: { 
        userid: this.userid, id_cat: this.id_cat == 0 ? 2 : this.id_cat
      }
    });
    modalMagasin.onDidDismiss().then((id_cat) => {
      console.log(id_cat);
      this.getFrigo();
    });
    modalMagasin.present();
  }
  /*
  async presentPopover(ev: any) {
    console.log(ev);
    const popover = await this.popoverController.create({
      component: AddToMealplannerComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }*/
  async presentDeco() {
    let actionSheet = await this.actionDeco.create({
      buttons: [
        {
          text: 'Deconnexion',
          role: 'destructive',
          handler: () => {
            this.storage.set('id_user', 0);
            this.navCtrl.navigateRoot('/login');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  lockSwipe() {
    //this.SwipedTabsSlider.lockSwipes(true);
    this.shouldSwipe = false;
  }
  /*
  unlockSwipe() {
    if (!this.shouldSwipe) {
      this.SwipedTabsSlider.lockSwipes(false);
      this.SwipedTabsSlider.slidePrev();
      this.shouldSwipe = true;
    }
  }*/
}
