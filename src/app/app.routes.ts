import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
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
import { Blog4Component } from './components/blogs/blog4/blog4.component';
import { MainComponent } from './layouts/main/main.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { JewelryPriceComponent } from './pages/admin/jewelry-price/jewelry-price.component';
import { HijriDateAdjComponent } from './pages/admin/hijri-date-adj/hijri-date-adj.component';
import { BoyanListComponent } from './pages/admin/boyan-list/boyan-list.component';
import { BoyanEditComponent } from './pages/admin/boyan-edit/boyan-edit.component';
import { BoyanAddComponent } from './pages/admin/boyan-add/boyan-add.component';
import { NoticeListComponent } from './pages/admin/notice-list/notice-list.component';
import { NoticeAddComponent } from './pages/admin/notice-add/notice-add.component';
import { NoticeEditComponent } from './pages/admin/notice-edit/notice-edit.component';
import { FortyDorudComponent } from './pages/bivhag/forty-dorud/forty-dorud.component';
import { DoyayeAbuDardaRaComponent } from './pages/bivhag/doyaye-abu-darda-ra/doyaye-abu-darda-ra.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
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
        path: 'zakat-masala/3',
        component: Blog3Component
      },
      {
        path: 'forty-dorud',
        component: FortyDorudComponent
      },
      {
        path: 'doyaye-abu-darda-ra',
        component: DoyayeAbuDardaRaComponent
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
        path: 'selected-writings/4',
        component: Blog4Component
      },
      {
        path: 'notice',
        component: NoticeComponent
      },
      {
        path: 'audio/:type',
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
    ]
  },
  {
    path: 'a',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'jewelry-price', pathMatch: 'full' },
      {
        path: 'jewelry-price',
        component: JewelryPriceComponent
      },
      {
        path: 'hijri-date-adj',
        component: HijriDateAdjComponent
      },
      {
        path: 'boyan-list',
        component: BoyanListComponent
      },
      {
        path: 'boyan-list/add',
        component: BoyanAddComponent
      },
      {
        path: 'boyan-list/edit/:id',
        component: BoyanEditComponent
      },
      {
        path: 'notice-list',
        component: NoticeListComponent
      },
      {
        path: 'notice-list/add',
        component: NoticeAddComponent
      },
      {
        path: 'notice-list/edit/:id',
        component: NoticeEditComponent
      },
    ]
  },

];
