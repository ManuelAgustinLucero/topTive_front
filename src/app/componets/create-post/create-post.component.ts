import { Component, OnInit,ElementRef, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Post } from '../../model/post';
import { PostService } from '../../services/post.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  providers: [PostService, FormBuilder]

})
export class CreatePostComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _PostService: PostService,
    private _router: Router

  ) {   
     this.createForm();
  }

  public post=new Post;
  public alert=false;
  public image="https://increasify.com.au/wp-content/uploads/2016/08/default-image.png";
  form: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;


  ngOnInit() {
  }
  onPost() { 
    const formModel = this.form.value;
    if(  formModel.avatar != null){
      this.post.image = formModel.avatar.value;
    }

    this._PostService.postCreate(this.post).subscribe(
      response => {
        if(!response.error){
          this.alert=true;
        }
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
