import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { AdminComponent } from './layouts/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'gold-price', pathMatch: 'full' },
      // {
      //   path: '',
      //   loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'salat-times',
      //   loadComponent: () => import('./pages/salat-times/salat-times.component').then(m => m.SalatTimesComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'hijri-date',
      //   loadComponent: () => import('./pages/hijri-date/hijri-date.component').then(m => m.HijriDateComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'forayez',
      //   loadComponent: () => import('./pages/forayez/forayez.component').then(m => m.ForayezComponent),
      //   data: { preload: true },
      // },
      {
        path: 'gold-price',
        loadComponent: () => import('./pages/zakat-page/zakat/zakat.component').then(m => m.ZakatComponent),
        data: { preload: true },
      },
      {
        path: 'zakat-calculator',
        loadComponent: () => import('./pages/zakat-page/zakat-calculator/zakat-calculator.component').then(m => m.ZakatCalculatorComponent),
        data: { preload: true },
      },
      {
        path: 'zakat-masala',
        loadComponent: () => import('./pages/zakat-page/zakat-masala/zakat-masala.component').then(m => m.ZakatMasalaComponent),
        data: { preload: true },
      },
      {
        path: 'zakat-masala/3',
        loadComponent: () => import('./components/blogs/blog3/blog3.component').then(m => m.Blog3Component),
        data: { preload: true },
      },
      {
        path: 'selected-writings',
        loadComponent: () => import('./pages/bivhag/selected-writing/selected-writing.component').then(m => m.SelectedWritingComponent),
        data: { preload: true },
      },
      {
        path: 'selected-writings/1',
        loadComponent: () => import('./components/blogs/blog1/blog1.component').then(m => m.Blog1Component),
        data: { preload: true },
      },
      {
        path: 'selected-writings/2',
        loadComponent: () => import('./components/blogs/blog2/blog2.component').then(m => m.Blog2Component),
        data: { preload: true },
      },
      {
        path: 'selected-writings/4',
        loadComponent: () => import('./components/blogs/blog4/blog4.component').then(m => m.Blog4Component),
        data: { preload: true },
      },
      // {
      //   path: 'notice',
      //   loadComponent: () => import('./pages/notice/notice.component').then(m => m.NoticeComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'audio/:type',
      //   loadComponent: () => import('./pages/boyan/audio/audio.component').then(m => m.AudioComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'video',
      //   loadComponent: () => import('./pages/boyan/video/video.component').then(m => m.VideoComponent),
      //   data: { preload: true },
      // },
      // {
      //   path: 'about',
      //   loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
      //   data: { preload: true },
      // },
      {
        path: 'about/খানকার_পরিচয়',
        loadComponent: () => import('./pages/about/khanka/khanka.component').then(m => m.KhankaComponent),
        data: { preload: true },
      },
      {
        path: 'about/শায়খের_জীবনী',
        loadComponent: () => import('./pages/about/shayek/shayek.component').then(m => m.ShayekComponent),
        data: { preload: true },
      },
      {
        path: 'about/শাজারা',
        loadComponent: () => import('./pages/about/shajara/shajara.component').then(m => m.ShajaraComponent),
        data: { preload: true },
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
        loadComponent: () => import('./pages/admin/jewelry-price/jewelry-price.component').then(m => m.JewelryPriceComponent),
        data: { preload: true },
      },
      {
        path: 'hijri-date-adj',
        loadComponent: () => import('./pages/admin/hijri-date-adj/hijri-date-adj.component').then(m => m.HijriDateAdjComponent),
        data: { preload: true },
      },
      {
        path: 'boyan-list',
        loadComponent: () => import('./pages/admin/boyan-list/boyan-list.component').then(m => m.BoyanListComponent),
        data: { preload: true },
      },
      {
        path: 'boyan-list/add',
        loadComponent: () => import('./pages/admin/boyan-add/boyan-add.component').then(m => m.BoyanAddComponent),
        data: { preload: true },
      },
      {
        path: 'boyan-list/edit/:id',
        loadComponent: () => import('./pages/admin/boyan-edit/boyan-edit.component').then(m => m.BoyanEditComponent),
        data: { preload: true },
      },
      {
        path: 'notice-list',
        loadComponent: () => import('./pages/admin/notice-list/notice-list.component').then(m => m.NoticeListComponent),
        data: { preload: true },
      },
      {
        path: 'notice-list/add',
        loadComponent: () => import('./pages/admin/notice-add/notice-add.component').then(m => m.NoticeAddComponent),
        data: { preload: true },
      },
      {
        path: 'notice-list/edit/:id',
        loadComponent: () => import('./pages/admin/notice-edit/notice-edit.component').then(m => m.NoticeEditComponent),
        data: { preload: true },
      },
    ]
  },

];
