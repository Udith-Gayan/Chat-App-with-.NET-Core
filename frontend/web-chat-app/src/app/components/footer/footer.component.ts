import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  linkedin_url = 'https://www.linkedin.com/in/udith-indrakantha/';
  github_url = 'https://github.com/Udith-Gayan/';
  medium_url = 'https://medium.com/@udith.indrakantha/';
  insta_url = 'https://www.instagram.com/udith_indrakantha/';

}
