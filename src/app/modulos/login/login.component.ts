import { Component, OnInit } from '@angular/core';
import { CognosService } from '../../services/cognos.service';
import { UserCredentials } from '../../models/userCredentials.model';
import { LogimnService } from './login.service';

@Component({
    templateUrl : './login.component.html',
    styleUrls : ['./login.component.scss'],
    providers : [LogimnService]
})
export  class LoginComponent implements OnInit {
    cognosCredentials : string;
    loginMessage = 'Login'
    isLoading = false;
    isAuthenticaded = false;

    constructor(private api : CognosService,
        private service : LogimnService){}

    ngOnInit(){
        //verifica se já existem credenciais ativas
        if(localStorage.getItem('USER_CREDENTIALS').length > 0){
            this.login(localStorage.getItem('USER_CREDENTIALS'));
        }
    }

    login(obj : string){
        //muda a mensagem para o usuario        
        this.loginMessage = "Autenticando";

        //troca a classe do login para loading
        this.isLoading = true;


        this.service.RequestNewSession(obj)
            .subscribe(
                s => {console.log(s); this.isAuthenticaded = true;},
                err => console.log(err)
            );

        //cria uma nova seção do cognos

        // this.api.newSession(obj)
        //     .subscribe(
        //         s => {
        //             //troca a class do login para aprovado 
        //             this.isAuthenticaded = true;
                    
        //             //chama a tela para mostrar os datasets
        //             //TODO

        //             this.api.newCognosInstance();
        //         },
        //         err => {

        //         console.log(err);
        //             //troca a classe do login para reprovado
        //             //TODO
        //         },
        //     );
    }

}