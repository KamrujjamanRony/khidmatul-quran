import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArabicComponent } from './pages/arabic/arabic.component';
import { SalatTimesComponent } from './pages/salat-times/salat-times.component';
import { HijriDateComponent } from './pages/hijri-date/hijri-date.component';
import { ForayezComponent } from './pages/forayez/forayez.component';
import { ZakatComponent } from './pages/zakat/zakat.component';
import { Blog1Component } from './components/blogs/blog1/blog1.component';
import { SelectedWritingComponent } from './pages/selected-writing/selected-writing.component';
import { Blog2Component } from './components/blogs/blog2/blog2.component';
import { ZakatCalculatorComponent } from './pages/zakat-calculator/zakat-calculator.component';
import { ZakatMasalaComponent } from './pages/zakat-masala/zakat-masala.component';
import { NoticeComponent } from './pages/notice/notice.component';

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
    path: 'kitab',
    component: Blog1Component
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
];
