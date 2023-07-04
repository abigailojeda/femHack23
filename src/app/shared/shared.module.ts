import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [FooterComponent, MenuComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [FooterComponent, MenuComponent, HeaderComponent],
})
export class SharedModule {}
