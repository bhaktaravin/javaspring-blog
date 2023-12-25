import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from "./app.routes";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { httpInterceptorProviders } from "./httpInterceptor";
import { CommonModule } from "@angular/common";
@NgModule({
    declarations: [
    AppComponent,
    HomeComponent,
    

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        CommonModule
    ],

    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
    
})


export class AppModule {}