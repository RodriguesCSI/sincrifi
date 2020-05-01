import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CognosService } from '../../services/cognos.service';
import { UserCredentials } from '../../models/userCredentials.model';
import { LoginService } from './login.service';
import { AlertDialog } from '../../services/dialog/dialog.component';

@Component({
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.scss'],
    providers : [LoginService]
})
export  class LoginComponent {
	credential = "";
	loading = false;

    constructor(private api : CognosService,
		private route : Router,
		private service : LoginService,
		private dialog : MatDialog
       ){}


    login(){

		if(!this.valida(this.credential)){
			this.showMessage("Não foi possível realizar o login!", "Credencial Inválida.");			
			return;
		}
	
		this.loading = true;


		this.service.RequestNewSession(this.credential)
			.subscribe(
				s => {
					localStorage.add("CREDENTIAL", this.credential);
					localStorage.add("SESSION", s);

					this.route.navigate(['menu']);
					
					this.loading = false;;
				},
				err => {
					this.showMessage("Erro:", err.status);
					this.loading = false;
				}
			);
			
    }

	valida(obj : string) : boolean{
		var cred = new UserCredentials(obj);
		
		if(cred.api_endpoint_url.length == 0)
			return false;

        if(cred.apikey.length == 0)
			return false;

        if(cred.client_id.length == 0)
			return false;

        if(cred.client_secret.length == 0)
			return false;

        if(cred.iam_apikey_description.length == 0)
			return false;

        if(cred.iam_apikey_name.length == 0)
			return false;

        if(cred.iam_role_crn.length == 0)
			return false;

        if(cred.iam_serviceid_crn.length  == 0)
			return false;

		return true;
		 
	}

	
	showMessage(titulo : string, corpo : string){
		this.dialog.open(AlertDialog, {
			data : { 
				title : titulo,
				motive : corpo
			}
		})
	}

}
