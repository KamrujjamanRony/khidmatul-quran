import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArabicComponent } from './pages/arabic/arabic.component';
import { SalatTimesComponent } from './pages/salat-times/salat-times.component';
import { HijriDateComponent } from './pages/hijri-date/hijri-date.component';
import { ForayezComponent } from './pages/forayez/forayez.component';
import { ZakatComponent } from './pages/zakat-page/zakat/zakat.component';
import { Blog1Component } from './components/blogs/blog1/blog1.component';
import { SelectedWritingComponent } from './pages/bivhag/selected-writing/selected-writing.component';
import { Blog2Component } from './components/blogs/blog2/blog2.component';
import { ZakatCalculatorComponent } from './pages/zakat-page/zakat-calculator/zakat-calculator.component';
import { ZakatMasalaComponent } from './pages/zakat-page/zakat-masala/zakat-masala.component';
import { NoticeComponent } from './pages/notice/notice.component';
import { Blog3Component } from './components/blogs/blog3/blog3.component';
import { KitabComponent } from './pages/bivhag/kitab/kitab.component';
import { AudioComponent } from './pages/boyan/audio/audio.component';
import { VideoComponent } from './pages/boyan/video/video.component';
import { AboutComponent } from './pages/about/about.component';
import { KhankaComponent } from './pages/about/khanka/khanka.component';
import { ShayekComponent } from './pages/about/shayek/shayek.component';
import { ShajaraComponent } from './pages/about/shajara/shajara.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'salat-times',
    component: SalatTimesComponent
  },
  {
    path: 'hijri-date',
    component: HijriDateComponent
  },
  {
    path: 'forayez',
    component: ForayezComponent
  },
  {
    path: 'gold-price',
    component: ZakatComponent
  },
  {
    path: 'zakat-calculator',
    component: ZakatCalculatorComponent
  },
  {
    path: 'zakat-masala',
    component: ZakatMasalaComponent
  },
  {
    path: 'zakat-masala/1',
    component: Blog3Component
  },
  {
    path: 'kitab',
    component: KitabComponent
  },
  {
    path: 'selected-writings',
    component: SelectedWritingComponent
  },
  {
    path: 'selected-writings/1',
    component: Blog1Component
  },
  {
    path: 'selected-writings/2',
    component: Blog2Component
  },
  {
    path: 'arabic',
    component: ArabicComponent
  },
  {
    path: 'notice',
    component: NoticeComponent
  },
  {
    path: 'audio',
    component: AudioComponent
  },
  {
    path: 'video',
    component: VideoComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'about/খানকার_পরিচয়',
    component: KhankaComponent
  },
  {
    path: 'about/শায়খের_জীবনী',
    component: ShayekComponent
  },
  {
    path: 'about/শাজারা',
    component: ShajaraComponent
  },
];
