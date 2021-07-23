import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule,MatButtonModule],
  declarations: [
    HeaderComponent
  ],
  exports:[HeaderComponent,MatButtonModule],
})
export class HeaderModule {}
