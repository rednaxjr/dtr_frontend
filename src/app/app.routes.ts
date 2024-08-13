import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { IndexComponent } from './views/index/index.component';
import { IndexLayoutComponent } from './component/layout/index-layout/index-layout.component';
import { TestcrudComponent } from './views/testcrud/testcrud.component';
import { UserLayoutComponent } from './component/layout/user-layout/user-layout.component';
import { HomeComponent } from './views/user/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './views/user/profile/profile.component';

TestcrudComponent
export const routes: Routes = [

    {
        path: '',
        component: IndexLayoutComponent,
        children: [
            { path: '', component: IndexComponent, },
            { path: 'register', component: RegisterComponent, },
            { path: 'test', component: TestcrudComponent }
        ],
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], data: {
                    title: 'Dashboard'
                }
            },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },

        ],
    },
    { path: '', redirectTo: '/', pathMatch: 'full' },

];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
//   })
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }