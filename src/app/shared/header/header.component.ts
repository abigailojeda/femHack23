import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logo ='./assets/img/femHackLogo.svg'
  public illustration ='./assets/img/usersIllustration.svg'

  constructor() { }

  ngOnInit(): void {
  }

}
