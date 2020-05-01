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
	newSession(credentials) : Observable<number>{
		return new Observable( observer => {

			this.http
				.post<string>(
					'https://sincrifi-server.mybluemix.net/session',
					JSON.stringify(
						{
							clientId: this.credentials.client_id,
							clientSecret: this.credentials.client_secret,
							webDomain: window.location.href
						}
					
					),
					{
						headers: new HttpHeaders()
						.set('Content-Type', 'application/json')
					}
				)
				.subscribe(// recebe o retorno da seção e já instancia um novo objeto da api
					s => {
						this.session = new Session(s);//armazena a nova seção do usuario
						observer.next(200);
						console.log(s);
					},
					
					err => {
						observer.error(err.status);
					}
				);

			});
			
	}
	
	public async newCognosInstance(){
		this.api = new CognosApi({
						cognosRootURL: this.credentials.api_endpoint_url,
						sessionCode: this.session.sessionCode,
						initTimeout: 10000,
						node: document.getElementById('dashboard')
					});

		await this.api.initialize();

		console.log(this.api.dashboard);
	}

	public async createNewDashboard(){
		await this.api.dashboard.createNew();
	}
}
