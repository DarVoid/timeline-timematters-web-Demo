import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { KeywordExctractionComponent } from './keyword-exctraction/keyword-exctraction.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FrameComponent } from './frame/frame.component';
import { ScoreComponent } from './score/score.component';
import { ChartsModule } from 'ng2-charts';
import {MatTabsModule} from '@angular/material/tabs';
import { SafePipe } from './safe.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutPeopleComponent } from './about-people/about-people.component';
import { AboutRelatedWorkComponent } from './about-related-work/about-related-work.component';
import { MultiDocComponent } from './multi-doc/multi-doc.component';
import { QueryComponent } from './query/query.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LinhaTemporalComponent } from './linha-temporal/linha-temporal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KeywordExctractionComponent,
    FrameComponent,
    ScoreComponent,
    SafePipe,
    LandingPageComponent,
    AboutPeopleComponent,
    AboutRelatedWorkComponent,
    MultiDocComponent,
    QueryComponent,
    LinhaTemporalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    HttpClientModule,
    ChartsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
