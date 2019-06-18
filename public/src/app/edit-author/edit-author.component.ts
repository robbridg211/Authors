import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  authors = [];
  selectAuthor: any;
  selectedAuthor: boolean = false;
  authorMessage: any;

  @Input() author: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.authorMessage = {
      status: "", 
      message: { name: ""}
  }
  }

  goAuthors() {
    this._router.navigate(['/'])
  }

  getAuthors() {
    let observation = this._httpService.getAuthors();
    observation.subscribe(data => {
      console.log("Got all authors!", data)
      this.authors = data['authors']
    });
  }

  putAuthor(author) {
    this.selectedAuthor = true;
    this.selectAuthor = author //grab author object from html and store in variable selectAuthor
    console.log("component.ts: ",this.selectAuthor)
    let observation = this._httpService.putAuthor(this.selectAuthor);
    observation.subscribe(data => {
      if (data['status'] == false) {
        this.authorMessage = data['messages'];
      }
      else {
        this.authorMessage = data['messages'];
      }
    });
    this.goAuthors();
  }


}
