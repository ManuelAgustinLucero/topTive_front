import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostComponent } from './componets/post/post.component';
import { PostsComponent } from './componets/posts/posts.component';
import { CreatePostComponent } from './componets/create-post/create-post.component';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { NotifierModule } from 'angular-notifier';
import { UpdatePostComponent } from './componets/update-post/update-post.component';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsComponent,
    CreatePostComponent,
    UpdatePostComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpModule,
    FormsModule,
    NotifierModule.withConfig( {
      // Custom options in here
    } )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
