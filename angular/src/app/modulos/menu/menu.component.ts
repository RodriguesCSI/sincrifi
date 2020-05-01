import { Component } from "@angular/core";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AlertDialog } from '../../services/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
    selector : 'menu-component',
    templateUrl : './menu.component.html',
    styleUrls : ['./menu.component.scss']
})
export class MenuComponent {
    constructor(
		private route : Router,
		private dialog : MatDialog){}
	
	
	analisarCaso(){
		this.route.navigate(['main']);
	}
}