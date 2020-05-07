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
        links:[
          { tipo: 'GitHub',
            link: 'https://github.com/DarVoid/',
            icon: '<i class="fab fa-github"></i>'
          },
          { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/djorge7/',
            icon: '<i class="fab fa-linkedin"></i>'
          },
        ]
      },
      {name: 'Tiago',
      photoSrc: 'assets/tiago.png',
      links:[
        { tipo: 'GitHub',
          link: 'https://github.com/tiagorafael982',
          icon: '<i class="fab fa-github"></i>'
        }
      ]
      },
      {name: 'Ricardo Campos',
      photoSrc: 'assets/ricardo.png',
      links:[
        { tipo: 'GitHub',
          link: 'https://github.com/tiagorafael982',
          icon: '<i class="fab fa-github"></i>'
        },
        { tipo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/camposricardo/',
        icon: '<i class="fab fa-linkedin"></i>'
        },
        { tipo: 'Website',
        link: 'http://www.ccc.ipt.pt/~ricardo/',
        icon: '<i class="fas fa-globe-americas"></i>'
        },

      ]
      },

    ];
  }

  ngOnInit(): void {
  }

}
