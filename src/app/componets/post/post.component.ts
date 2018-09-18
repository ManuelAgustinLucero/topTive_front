import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]

})
export class PostComponent implements OnInit {

  public post;
  constructor(
    private _route: ActivatedRoute,
    private _PostService: PostService,

  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      var idPost = +params['id'];
      this.GetPost(idPost);
    });
  }
  public GetPost(idPost) {
    this._PostService.getPost(idPost).subscribe(
      response => {
        this.post=response;
      },
      error => {
        // Manejar errores
      }
    );
  }
}
