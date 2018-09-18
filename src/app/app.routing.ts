import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostComponent } from './componets/post/post.component';
import { PostsComponent } from './componets/posts/posts.component';
import { CreatePostComponent } from './componets/create-post/create-post.component';

import { UpdatePostComponent } from './componets/update-post/update-post.component';


const appRoutes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent  },
  { path: 'post/:id', component: PostComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'update/:id', component: UpdatePostComponent },



];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
