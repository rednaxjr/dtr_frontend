import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { IndexComponent } from './views/index/index.component';
import { IndexLayoutComponent } from './component/layout/index-layout/index-layout.component';
import { TestcrudComponent } from './views/testcrud/testcrud.component';
TestcrudComponent
export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', redirectTo: '' },
    {
        path: '',
        component: IndexLayoutComponent,
        children: [
            { path: '', component: IndexComponent, },
            { path: 'register', component: RegisterComponent, },
            { path: 'test', component: TestcrudComponent }
        ],

    }, 
   
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
//   })
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}