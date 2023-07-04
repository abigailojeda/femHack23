import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public sectionToShow : number = 0
  public rightArrow:string='./assets/img/rightArrow.svg'
  public leftArrow:string='./assets/img/leftArrow.svg'
  public illustration ='./assets/img/usersIllustration.svg'


  constructor() { }

  ngOnInit(): void {
  }

  // public changeSectionToShow(section:number){
  //   this.sectionToShow = section
  // }
  // public add(){
  //   this.sectionToShow ++
  // }
  // public sustract(){
  //   this.sectionToShow --
  // }

}
