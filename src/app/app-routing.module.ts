import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { CategoryComponent } from './pages/user/category/category.component';
import { CategoryQuizComponent } from './pages/user/category-quiz/category-quiz.component';
import { PreStartComponent } from './pages/user/pre-start/pre-start.component';
import { QuizStartComponent } from './pages/user/quiz-start/quiz-start.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, pathMatch:'full'
  },
  {
    path: 'signup', component: SignupComponent, pathMatch: 'full'
  },
  {
    path: 'login', component:LoginComponent,pathMatch:'full'
  },
  {
    path:'admin-dashboard', 
    component: DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path:'',
        component: WelcomeComponent
      },
      {
        path:'profile',
        component: ProfileComponent
      },
      {
        path:'categories/view',
        component:ViewCategoriesComponent
      },
      {
        path:'categories/add',
        component:AddCategoriesComponent

      },
      {
        path:'quizzes',
        component:ViewQuizzesComponent
      },
      {
        path:'quizzes/add',
        component:AddQuizComponent
      },
      {
        path:'quizzes/update/:qId',
        component:UpdateQuizComponent
      },
      {
        path:'viewQuizQuestions/:id/:title',
        component:ViewQuizQuestionsComponent
      },
      {
        path:'addQuestions/:id/:title',
        component:AddQuestionComponent
      },
      {
        path:'question/update/:quesid',
        component:UpdateQuestionComponent
      }
    ]
  },
  {
    path:'user-dashboard', 
    component:UserDashboardComponent,
    canActivate: [UserGuard],
    children:[
      {
        path:'category',
        component:CategoryComponent
      },
      {
        path:'quiz',
        component:QuizComponent
      },
      {
        path:'quiz/:id',
        component:CategoryQuizComponent
      },
      {
        path:'instructions/:qid',
        component:PreStartComponent
      }
    ]
  },
  {
    path:'quiz-start/:qid',
    component:QuizStartComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
