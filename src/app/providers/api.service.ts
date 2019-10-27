import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/*
  Generated class for the APIservice provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  export class APIservice {
    private baseUrl = /*'http://mealcheck.eu/api/';*/'http://10.35.36.110:8888/api2/public/';	
    
    constructor(public http: HttpClient) {

    }

    //--------FRIGO------------
    getFrigoByIdUser(idUser){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { id_user: idUser };
      return this.http.post(this.baseUrl + 'frigo.php/getByIdUser', JSON.stringify(dayta), requestOptions); 
    }

    getMagasinByIdUser(idUser){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { id_user: idUser };
      return this.http.post(this.baseUrl + 'frigo.php/getMagasin', JSON.stringify(dayta), requestOptions); 
    }

    deleteFrigo(userid){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {id_user:userid};

      return this.http.post(this.baseUrl+'frigo.php/deleteFrigo',JSON.stringify(dayta),requestOptions);
    }

    deleteIng(userid, idING) {
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {
        id_user: userid,
        id_ingredient: idING
      };
      return this.http.post(this.baseUrl + 'frigo.php/delete', JSON.stringify(dayta), requestOptions);
    }

    addIngredientToFrigo(userId,ingredientId){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {
        id_user:userId, 
        id_ingredient:ingredientId
      };

      console.log(dayta);
      return this.http.put(this.baseUrl+'frigo.php/add',JSON.stringify(dayta),requestOptions);
    }
    //-------------------------

    //--------Recette------------
    getLivreByIdUserIdIng(userId,ingredientId) {
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userId,
        id_ing: ingredientId
      };
      return this.http.post(this.baseUrl + 'recette.php/getLivreByIdUserIdIng', JSON.stringify(dayta), requestOptions);
    }
    getRecette(recetteId){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {id_recette:recetteId};
      return this.http.post(this.baseUrl+'recette.php/getById',JSON.stringify(dayta), requestOptions);
    }

    getLivreByIdUser(userId){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {id_user:userId};
      return this.http.post(this.baseUrl+'recette.php/getLivreByIdUser',JSON.stringify(dayta),requestOptions);
    }
    //--------------------------- 

    //----------MealPlanner------
    contains(userid,recetteid,moment){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        id_recette: recetteid,
        moment: moment
       };
      return this.http.post(this.baseUrl + 'mealplanner.php/contains', JSON.stringify(dayta), requestOptions); 
    }

    deleteRepasMealPlanner(repasid){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_repas: repasid
       };
      return this.http.post(this.baseUrl + 'mealplanner.php/delete', JSON.stringify(dayta), requestOptions); 
    }
    addRepas(userid,recetteid,moment){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        id_recette: recetteid,
        moment: moment
       };
      return this.http.post(this.baseUrl + 'mealplanner.php/add', JSON.stringify(dayta), requestOptions); 
    }

    getSuivi(userid, date1, date2){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        date1 : date1,
        date2 : date2
       };
      return this.http.post(this.baseUrl + 'profil.php/getMealTracerByDate', JSON.stringify(dayta), requestOptions); 
    }

    getMealTracer(userid, date1, date2){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        date1 : date1,
        date2 : date2
       };
      return this.http.post(this.baseUrl + 'profil.php/mealTracer', JSON.stringify(dayta), requestOptions); 
    }

    getNbOccurenceRep(userid,recetteid){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        id_recette: recetteid,
       };
      return this.http.post(this.baseUrl + 'mealplanner.php/getCounterRepas', JSON.stringify(dayta), requestOptions); 
    }

    getAllRepasById(id){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { id_user: id };
      return this.http.post(this.baseUrl + 'mealplanner.php/getAllRepasByIdUser', JSON.stringify(dayta), requestOptions); 
    }
    //---------------------------
    

    

    

    getListeCourse(userid, date1, date2){
      var headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = { 
        id_user: userid,
        date1 : date1,
        date2 : date2
       };
      return this.http.post(this.baseUrl + 'mealplanner.php/getListeCourse', JSON.stringify(dayta), requestOptions); 
    }

    /*

    getFrigo(id){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {id_user:id};
      return this.http.post(this.baseUrl+'frigo/getbyID',JSON.stringify(dayta),requestOptions);
    }

    getAllFrigo(){
      return 	this.http.get(this.baseUrl+'frigo/getFrigos').map(res =>res.json());
    }
     


    setNote(id,note,userid){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {
            id_recette:id,
            note:note,
            id_user:userid
          };
      return this.http.post(this.baseUrl+'recette/note',JSON.stringify(dayta),requestOptions);
    }
    */
    //---------Login--------------
    getUserById(id){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {id_user:id};
      return this.http.post(this.baseUrl+'profil.php/getInfoUser',JSON.stringify(dayta), requestOptions);
    }
    login(Username,Password){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {username:Username,
             password:Password};
            //let fin = this.http.post(this.baseUrl+'login/login',JSON.stringify(dayta),requestOptions);
      return this.http.post(this.baseUrl+'user.php/login',JSON.stringify(dayta),requestOptions);

    }

    forgotPassword(email){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {email:email}
            //let fin = this.http.post(this.baseUrl+'login/login',JSON.stringify(dayta),requestOptions);
      return this.http.post(this.baseUrl+'user.php/resetPassword',JSON.stringify(dayta),requestOptions);
    }
    enregistrer(Username,Password,Email){
      var headers = new HttpHeaders();
      headers.append('Content-Type','application/json;charset=utf-8');
      const requestOptions = {
        headers: headers
      };
      var dayta = {username:Username,
              password:Password,
              email:Email};
              console.log(dayta);
      return this.http.post(this.baseUrl+'user.php/register',JSON.stringify(dayta),requestOptions);  
      }

      getcategories(){
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        const requestOptions = {
        headers: headers
      };
        return this.http.get(this.baseUrl + 'categorie.php/getall', requestOptions); 
      }

      existUser(userid){
        var headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json;charset=utf-8');
        const requestOptions = {
        headers: headers
      };
        var dayta = { 
          id_user: userid
         };
        return this.http.post(this.baseUrl + 'user.php/exist', JSON.stringify(dayta), requestOptions); 
      }
      //----------------------------
}