import { Component, inject } from '@angular/core';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { NoticeService } from '../../../features/services/notice.service';

@Component({
    selector: 'app-notice-list',
    imports: [CoverComponent, RouterLink, CommonModule],
    templateUrl: './notice-list.component.html',
    styleUrl: './notice-list.component.css'
})
export class NoticeListComponent {
  noticeService = inject(NoticeService);
  router = inject(Router);
  allNotice$?: Observable<any[]>;
  deleteSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    if (!this.allNotice$) {
      this.allNotice$ = this.noticeService.getAllNotice();
    }
  }

  sortItems(data: any = []): any {
    if (data) {
      if (data?.length === 0) {
        return data;
      }

      return data.sort((a: any, b: any) => a.serial
        - b.serial
      );
    }
  }

  onDelete(id: any): void {
    const confirmation = window.confirm('Are you sure you want to delete this item?');

    if (confirmation) {
      this.confirmDelete(id);
    }
  }

  confirmDelete(id: any): void {
    this.deleteSubscription = this.noticeService.deleteNotice(id).subscribe({
      next: () => {
        this.allNotice$ = this.noticeService.getAllNotice();
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

}
