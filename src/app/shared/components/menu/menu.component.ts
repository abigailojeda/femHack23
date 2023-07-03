import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() selectSection = new EventEmitter<number>();
  constructor() { }

  public changeSection(section:number){
    this.selectSection.emit(section)
  }

}
