import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
  providers: [PostService, FormBuilder]

})
export class UpdatePostComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _PostService: PostService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.createForm();

  }
  public image="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";
  public post;

  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;

  ngOnInit() {
    this._route.params.subscribe(params => {
      var idPost = +params['id'];
      this._PostService.getPost(idPost).subscribe(
        response => {
          this.post= new Post();
          this.post.id=response.id;
          this.post.title=response.title;
          this.post.description=response.description;
          this.post.image=response.image;
          this.image=response.image;
        },
        error => {
          // Manejar errores
        }
      );
    });

  }
  onPost() {
    const formModel = this.form.value;
    if(  formModel.avatar != null){
      this.post.image = formModel.avatar.value;
    }
   
    this._PostService.postUpdate(this.post,this.post.id).subscribe(
      response => {
        this._router.navigate(["/post/", response.id]);
      },
      error => {
      }
    );
  }
  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

    // convertir imagen noticia en base64
    onFileChange(event) {
      let reader = new FileReader();
      if (event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.get('avatar').setValue({
            filename: file.name,
            filetype: file.type,
            value: "data:image/png;base64," + reader.result.split(',')[1]
          })
        };
      }
    }
     //previsualizar IMAGEN noticia
     uploadImage(event: any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.image = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  
}
