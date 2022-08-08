import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './components/public/public.module';
import { HomeComponent } from './components/home/home.component';
import { IpAddressComponent } from './components/ip-address/ip-address.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/ip-address/modal/modal.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IpAddressComponent,
    ModalComponent,
    AuditLogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ModalComponent ]
})
export class AppModule { }
