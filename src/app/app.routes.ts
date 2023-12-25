import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserboardComponent } from './userboard/userboard.component';
import { ModeratorboardComponent } from './moderatorboard/moderatorboard.component';
import { AdminboardComponent } from './adminboard/adminboard.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'home', pathMatch:"full"},
    {path: 'profile', component: ProfileComponent},
    {path: 'user', component: UserboardComponent},
    { path: 'mod', component: ModeratorboardComponent},
    { path: 'admin', component: AdminboardComponent}




];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {}