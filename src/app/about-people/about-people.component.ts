import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-people',
  templateUrl: './about-people.component.html',
  styleUrls: ['./about-people.component.scss']
})
export class AboutPeopleComponent implements OnInit {
  public people: Array<any>;
  constructor() {
    this.people = [
      {name: 'Jorge',
      photoSrc: 'assets/fotoJorge.png',
      githubLink: 'https://github.com/DarVoid/',
      linkedIn: 'https://www.linkedin.com/in/djorge7/'
      },
      {name: 'Tiago',
      photoSrc: 'assets/fotoJorge.png',
      githubLink: 'https://github.com/DarVoid/',
      linkedIn: 'https://www.linkedin.com/in/djorge7/'
      },

    ];
  }

  ngOnInit(): void {
  }

}
