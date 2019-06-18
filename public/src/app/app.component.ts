import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Favorite Authors';
  authors = [];
  newAuthor: any;
  selectAuthor: any;
  selectedAuthor: boolean = false;
  authorMessage: any;
  authorID: any;

  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) {}

  ngOnInit() {
    this.getID();
    // this.selectedAuthor = false;
    this.getAuthors();
    this.newAuthor = {name: ""}
    this.authorMessage = {
      status: "", 
      message: { name: ""}
  }
}

  getAuthors() {
    let observation = this._httpService.getAuthors();
    observation.subscribe(data => {
      console.log("Got all authors!", data)
      this.authors = data['authors']
    });
  }

  getID() {
    this._route.params.subscribe((params: Params) => {
      this.authorID = params['id'];

    });
  }

  getAuthor(author) {
    this.selectAuthor = author
    console.log(this.selectAuthor)
    let observation = this._httpService.getAuthor(this.selectAuthor);
    observation.subscribe(data => {
      console.log("Got selected author!", data)
    });
  }

  postAuthor() {
    console.log(this.selectAuthor)
    let observation = this._httpService.postAuthor(this.newAuthor);
    observation.subscribe(data => {
      if (data['status'] == "Error") {
        
        this.authorMessage = data['error'];
      } else {
        this.authorMessage = {
          status: data['status'],
          message: {name: ""}
        };
        console.log("DaAAAAAATA: ", data)
        console.log(data['error'])

        setTimeout(() => { this.ngOnInit(); }, 2000);
      }
    });
  }

// NOW IN THE EDIT COMPONENT

  putAuthor(author) {
    this.selectedAuthor = true;
    this.selectAuthor = author //grab author object from html and store in variable selectAuthor
    console.log(this.selectAuthor)
    let observation = this._httpService.putAuthor(this.selectAuthor);
    observation.subscribe(data => {
      if (data['status'] == false) {
        this.authorMessage = data['messages'];
      }
      else {
        this.authorMessage = data['messages'];
        setTimeout(() => { this.getAuthors() }, 2000);
      }
    });
  }
  
  destroyAuthor(authorID) {
    let obs = this._httpService.destroyAuthor(authorID);
    obs.subscribe(data => {
      if (data['status'] == false) {
        this.authorMessage = data['messages'];
      }
      else {
        this.authorMessage = data['messages'];
        console.log("deleted author!", authorID)
        setTimeout(() => { this.ngOnInit() });
      }
    });
  }


}
