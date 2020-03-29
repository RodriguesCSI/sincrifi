import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from '../models/userCredentials.model';
import { Session } from '../models/session.model';


declare var CognosApi : any;

//irá conter todas as chamadas para a api do Cognos Dashboard
@Injectable()
export class CognosService {
	private credentials : UserCredentials;
	private api : any;
	private session : Session;
	
	
	constructor(private http : HttpClient){
		
	}
	
	//retorna o código http da operação
	newSession(credentialsObj : string) : Observable<number>{
		return new Observable( observer => {
			this.credentials = new UserCredentials(credentialsObj);

			this.http
				.post<string>(
					this.credentials.api_endpoint_url + 'v1/session',
					JSON.stringify(
						{
							'expiresIn' : 3600,
							'webDomain' : 'us-south.dynamic-dashboard-embedded.cloud.ibm.com'
							
						}
					),
					{
						headers: new HttpHeaders()
						.set('Content-Type', 'application/json')
						.set('Host', 'us-south.dynamic-dashboard-embedded.cloud.ibm.com')
						.set('Authorization', 'Basic ' + btoa(this.credentials.client_id+':'+this.credentials.client_secret))
					}
				)
				.subscribe(// recebe o retorno da seção e já instancia um novo objeto da api
					s => {
						this.session = new Session(s);//armazena a nova seção do usuario
						observer.next(200);
					},
					
					err => {
						observer.error(err.status);
					}
				);

			});
			
	}
	
	public newCognosInstance(){
		this.api = new CognosApi({
						cognosRootURL: this.credentials.api_endpoint_url,
						sessionCode: this.session.sessionCode,
						initTimeout: 10000,
						node: document.getElementById('dashboard')
					});

		console.log(this.api.dashboard);
	}
}
