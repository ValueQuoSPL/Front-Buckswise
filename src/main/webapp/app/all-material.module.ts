import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
} from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    exports: [
        MatButtonModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule,
        MatInputModule, MatExpansionModule, CdkTableModule, CdkTreeModule, MatAutocompleteModule, MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,        MatButtonToggleModule,
        MatCardModule,        MatCheckboxModule,
        MatChipsModule,        MatStepperModule,
        MatDatepickerModule,        MatDialogModule,
        MatDividerModule,        MatExpansionModule,
        MatGridListModule,        MatIconModule,
        MatInputModule,        MatListModule,
        MatMenuModule,        MatNativeDateModule,
        MatPaginatorModule,        MatProgressBarModule,
        MatProgressSpinnerModule,        MatRadioModule,
        MatRippleModule,        MatSelectModule,
        MatSidenavModule,        MatSliderModule,
        MatSlideToggleModule,        MatSnackBarModule,
        MatSortModule,        MatTableModule,
        MatTabsModule,        MatToolbarModule,
        MatTooltipModule,        MatTreeModule,
    ],
  })

export class MaterialModule { }
