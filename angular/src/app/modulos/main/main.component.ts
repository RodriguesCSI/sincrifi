import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Cognos from '../../dependencies/CognosApi.js';
//import { MainService } from './main.service';
import { environment } from '../../../environments/environment';
import { UserCredentials } from 'src/app/models/userCredentials.model.js';
import { CognosService } from '../../services/cognos.service';

declare var CognosApi : any;

@Component({
	selector : 'main-app',
	templateUrl : './main.component.html',
	styleUrls : ['./main.component.css'],
	providers : [CognosService]
})
export class MainComponent implements OnInit, AfterViewInit{
	apiCognos : any;
	userCredentials : UserCredentials;

	constructor(
		private cognosSerice : CognosService
	){}

	ngOnInit(){
		this.cognosSerice.newSession('{	"api_endpoint_url": "https://us-south.dynamic-dashboard-embedded.cloud.ibm.com/daas/","apikey": "VEPrYmg13XKQuF19teE4Aw4_LRXZr0Dz9tfZpAzY22DJ","client_id": "3973b3e7-ee95-49d6-a6b3-4ad7b108bf09","client_secret": "220f5f2eaace56eca12444def9c9fb2470d8459c","iam_apikey_description": "Auto-generated for key 58502f69-c8b8-4f0d-ab5e-2d968ac999f9","iam_apikey_name": "Credenciais de teste","iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager","iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/b2bba75c982545ea814ba60b04c16d9c::serviceid:ServiceId-ab3b23bf-bd57-4954-adec-757e0632c474"}');
	}

	ngAfterViewInit(){
		
	}
}

