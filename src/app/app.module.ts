import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule,MatFormFieldModule,MatInputModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule , routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DataService } from './data.service';
import { DialogComponent } from './dialog/dialog.component';




@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    MainComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule

  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent,DialogComponent]
})
export class AppModule { }
