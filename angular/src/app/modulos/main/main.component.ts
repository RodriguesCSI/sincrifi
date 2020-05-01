import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialog } from '../../services/dialog/dialog.component';

import * as Cognos from '../../dependencies/CognosApi.js';
//import { MainService } from './main.service';
import { environment } from '../../../environments/environment';
import { UserCredentials } from '../..//models/userCredentials.model.js';
import { Session } from '../../models/session.model';
import { CognosService } from '../../services/cognos.service';

declare var CognosApi : any;

@Component({
	selector : 'main-app',
	templateUrl : './main.component.html',
	styleUrls : ['./main.component.css'],
	providers : [CognosService]
})
export class MainComponent implements OnInit{
	apiCognos : any;
	userCredential : UserCredentials;
	session : Session;

	loading = true;

	constructor(
		private cognosSerice : CognosService,
		private route : Router,
		private dialog : MatDialog
	){
		
		this.userCredential = new UserCredentials(
				localStorage.get("CREDENTIAL"));

		this.session = new Session(
				localStorage.get("SESSION"));

	}

	ngOnInit(){

		this.createSession();
	}

	async createSession(){
		this.apiCognos = this.cognosSerice.newSession(this.userCredential)
			.subscribe(
				s => {
					this.cognosSerice.newCognosInstance();
					this.cognosSerice.createNewDashboard();
				},

				err => {
					this.showMessage("Error:", err);
				}
			);
	
		this.loading = false;
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

