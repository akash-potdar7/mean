import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Title } from '@angular/platform-browser'; // This lets you change title el text of the html.
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  showPage: boolean = false;
  titie: string;
  language: string;

  constructor(private titleService: Title, private translateService: TranslateService) { }

  ngOnInit(): void {
    let lang = navigator.language.trim().toLowerCase();
    lang = lang.split('-')[0];
    this.language = lang;
    console.log(this.language);
    this.getTranslaions();
  }

  getTranslaions() {
    this.translateService.use('messageResource_' + this.language);
    this.translateService.get(["header.title.ams"]).subscribe((response: string) => {
      this.setTitle(response['airim.dashboard.title']);
    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
    this.showPage = true;
  };

}
