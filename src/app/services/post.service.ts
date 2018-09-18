import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { global } from '../global/global';
import 'rxjs/add/operator/map';
@Injectable()
export class PostService {

  public url: string;
  private headers= new Headers({'Content-Type':'application/x-www-form-urlencoded'});

  constructor(private _http: Http) {
    this.url = global.url;
  }
   
  getAllPosts(){
    return this._http.get(this.url + 'admin/posts/',{headers: this.headers})
                    .map(res => res.json());
  }
  postCreate(post){
    return this._http.post(this.url + 'admin/posts/create',post,{headers: this.headers})
                    .map(res => res.json());
  }
  getPost(id){
    return this._http.get(this.url + 'admin/posts/'+id,{headers: this.headers})
                    .map(res => res.json());
  }
  deletePost(id){
    return this._http.delete(this.url + 'admin/posts/'+id+'/delete',{headers: this.headers})
                    .map(res => res.json());
  }
  postUpdate(post,id){
    return this._http.post(this.url + 'admin/posts/'+id+'/edit',post,{headers: this.headers})
                    .map(res => res.json());
  }
}
