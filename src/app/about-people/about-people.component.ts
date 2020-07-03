import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-people',
  templateUrl: './about-people.component.html',
  styleUrls: ['./about-people.component.scss']
})
export class AboutPeopleComponent implements OnInit {
  public people1: Array<any>;
  public people2: Array<any>;
  public people3: Array<any>;
  public people4: Array<any>;
  public people5: Array<any>;
  public developer1: Array<any>;
  public developer2: Array<any>;
  constructor() {
    this.developer1 = [
      {name: 'Jorge Duque',
        photoSrc: 'assets/fotoJorge.png',
        profession: 'Web Developer',
        links:[
          { tipo: 'GitHub',
            link: 'https://github.com/DarVoid/',
            icon: '<i class="fab fa-github"></i>'
          },
          { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/djorge7/',
            icon: '<i class="fab fa-linkedin"></i>'
          },
          { tipo: 'Email',
            link: 'mailto://jorgeraposoduque@gmail.com',
            icon: '<i class="far fa-envelope"></i>'
          }
        ]
      }
    ];
    this.developer2 = [
      {name: 'Tiago Cândido',
      photoSrc: 'assets/tiago.png',
      profession: 'Web Developer',
      links:[
        { tipo: 'GitHub',
          link: 'https://github.com/tiagorafael982',
          icon: '<i class="fab fa-github"></i>'
        },
        { tipo: 'LinkedIn',
        link: 'https://www.linkedin.com/in/tiago-c%C3%A2ndido-4590951a8/',
        icon: '<i class="fab fa-linkedin"></i>'
      },
      { tipo: 'Email',
        link: 'mailto://tiago-rafael_98@hotmail.com',
        icon: '<i class="far fa-envelope"></i>'
      }
      ]
      }
    ]
    this.people1 = [
      {
        name: 'Ricardo Campos',
        photoSrc: 'assets/RCampos.jpg',
        profession: 'Professor and Researcher',
        links:[
          { tipo: 'LinkedIn',
          link: 'https://www.linkedin.com/in/camposricardo/',
          icon: '<i class="fab fa-linkedin"></i>'
          },
          { tipo: 'Website',
          link: 'http://www.ccc.ipt.pt/~ricardo/',
          icon: '<i class="fas fa-globe-americas"></i>'
          },
          { tipo: 'Email',
            link: 'mailto://ricardo.campos@ipt.pt',
            icon: '<i class="far fa-envelope"></i>'
          }]
      }];
      this.people2 = [
        {
          name: 'Gaël Dias',
          photoSrc: 'assets/GD.jpg',
          profession: 'Professor and Researcher',
          links:[
            { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/ga%C3%ABl-dias-98132949/',
            icon: '<i class="fab fa-linkedin"></i>'
            },
            { tipo: 'Website',
            link: 'https://dias.users.greyc.fr/',
            icon: '<i class="fas fa-globe-americas"></i>'
            },
            { tipo: 'Email',
            link: 'mailto://gael.dias@unicaen.fr ',
            icon: '<i class="far fa-envelope"></i>'
            }]
        }
      ];

      this.people3 = [
        {
          name: 'Alípio Jorge',
          photoSrc: 'assets/Alipio.jpg',
          profession: 'Professor and Researcher',
          links:[
            { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/al%C3%ADpio-jorge-29085813/',
            icon: '<i class="fab fa-linkedin"></i>'
            },
            { tipo: 'Website',
            link: 'https://www.dcc.fc.up.pt/~amjorge/',
            icon: '<i class="fas fa-globe-americas"></i>'
            },
            { tipo: 'Email',
            link: 'mailto://amjorge@fc.up.pt',
            icon: '<i class="far fa-envelope"></i>'
            }]
        }
      ];
      
      this.people4 = [
        {
          name: 'Célia Nunes',
          photoSrc: 'assets/CN.jpg',
          profession: 'Professor and Researcher',
          links:[
            { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/c%C3%A9lia-nunes-7523a968/',
            icon: '<i class="fab fa-linkedin"></i>'
            },
            { tipo: 'Website',
            link: 'http://www.mat.ubi.pt/~celia/',
            icon: '<i class="fas fa-globe-americas"></i>'
            },
            { tipo: 'Email',
            link: 'mailto://celian@ubi.pt',
            icon: '<i class="far fa-envelope"></i>'
            }]
        }
      ];

      this.people5 = [
        {
          name: 'Jorge Mendes',
          photoSrc: 'assets/JM.jpg',
          profession: 'Software Developer',
          links:[
            { tipo: 'LinkedIn',
            link: 'https://www.linkedin.com/in/jorge-mendes-75733815a/',
            icon: '<i class="fab fa-linkedin"></i>'
            },
            { tipo: 'GitHub',
            link: 'https://github.com/JMendes1995/',
            icon: '<i class="fab fa-github"></i>'
            },
            { tipo: 'Email',
            link: 'mailto://mendesjorge49@gmail.com',
            icon: '<i class="far fa-envelope"></i>'
            }]
        }
      ];
  }

  ngOnInit(): void {
  }

}
