import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';  
import { MatInputModule } from '@angular/material/input';  
import { MatSortModule } from '@angular/material/sort'; 
import { MatDialogModule} from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatFormFieldModule} from '@angular/material/form-field'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatIconModule
  ]

})
export class materialModule { }
