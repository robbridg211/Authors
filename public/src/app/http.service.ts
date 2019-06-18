import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors() {
    return this._http.get('/authors')
  }
  getAuthor(author) {
    console.log("**************", author._id)
    return this._http.get('/author/' + author._id)
  }
  postAuthor(newAuthor) {
    return this._http.post('/author', newAuthor)
  }
  putAuthor(author) {
    return this._http.put('/author/' + author._id, author)
  }
  destroyAuthor(author) {
    return this._http.get('/delete/' + author)
  }
}
