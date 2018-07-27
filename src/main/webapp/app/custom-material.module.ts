import {NgModule} from '@angular/core';

import {MatNativeDateModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
    ],
    exports: [
      MatButtonModule, MatMenuModule, MatTabsModule, MatExpansionModule, MatGridListModule, MatDatepickerModule,
      MatFormFieldModule, MatNativeDateModule, MatInputModule, MatCardModule, MatDialogModule
    ],
  })

export class CustomMaterialModule { }
