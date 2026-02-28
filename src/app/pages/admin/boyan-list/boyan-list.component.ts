import { Component, inject } from '@angular/core';
import { BoyanService } from '../../../features/services/boyan.service';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-boyan-list',
    templateUrl: './boyan-list.component.html',
    styleUrl: './boyan-list.component.css',
    imports: [CoverComponent, RouterLink, CommonModule]
})
export class BoyanListComponent {
  boyanService = inject(BoyanService);
  router = inject(Router);
  allBoyan$?: Observable<any[]>;
  deleteSubscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    if (!this.allBoyan$) {
      this.allBoyan$ = this.boyanService.getAllBoyan();
      // this.allBoyan$.subscribe(boyan => console.log(boyan));
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
    this.deleteSubscription = this.boyanService.deleteBoyan(id).subscribe({
      next: () => {
        this.allBoyan$ = this.boyanService.getAllBoyan();
      },
    });
  }

  ngOnDestroy(): void {
    this.deleteSubscription?.unsubscribe();
  }

}
