import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { IndexComponent } from './views/index/index.component';
import { IndexLayoutComponent } from './component/layout/index-layout/index-layout.component';
import { TestcrudComponent } from './views/testcrud/testcrud.component';
import { UserLayoutComponent } from './component/layout/user-layout/user-layout.component';
import { HomeComponent } from './views/user/home/home.component';
 
import { ProfileComponent } from './views/user/profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { HistoryComponent } from './views/user/history/history.component';
import { ReportComponent } from './views/user/report/report.component';
import { OcrComponent } from './views/ocr/ocr.component';

TestcrudComponent
export const routes: Routes = [
    
    {
        path: '',
        component: IndexLayoutComponent,
        children: [
            // { path: '', component: IndexComponent, },
            { path: '', component: OcrComponent },
            { path: 'register', component: RegisterComponent, },
            { path: 'test', component: TestcrudComponent },
            // { path: 'ocr', component: OcrComponent }
        ],
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], data: {title: 'Dashboard'}},
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
            { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
            { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },

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