import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

declare const $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [PostService]

})
export class PostsComponent implements OnInit {

  public posts;

  constructor(
    private _PostService: PostService,
  ) {
  }

  ngOnInit() {
    this.GetPosts();
  }

  public GetPosts() {
    this._PostService.getAllPosts().subscribe(
      response => {
        this.posts = response;
      },
      error => {
        // Manejar errores
      }
    );
  }

  deletePost(idPost) {
    this._PostService.deletePost(idPost).subscribe(
      response => {
        this.GetPosts();
      },
      error => {
        // Manejar errores
      }
    );
  }
}
