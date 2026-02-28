import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForayezService } from '../../features/services/forayez.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../components/shared/confirm-modal/confirm-modal.component';
import { BanglaPipe } from '../../features/pipe/bangla.pipe';
import { LoaderComponent } from "../../components/loader/loader.component";
@Component({
  selector: 'app-forayez',
  templateUrl: './forayez.component.html',
  styleUrl: './forayez.component.css',
  imports: [FormsModule, CommonModule, ConfirmModalComponent, BanglaPipe, LoaderComponent]
})
export class ForayezComponent {
  forayezService = inject(ForayezService);
  model: any;
  result = signal<any>(null);
  blockRules = signal<any>([]);
  acceptRules = signal<any>([]);
  asset = signal<any>("1");
  isHusband = signal<boolean>(false);
  isWife = signal<boolean>(false);
  loading = signal<boolean>(false);
  private forayezSubscription?: Subscription;
  confirmModal = signal<boolean>(false);
  confirmModal1 = signal<boolean>(false);
  confirmModal2 = signal<boolean>(false);
  confirmModal3 = signal<boolean>(false);
  confirmModal4 = signal<boolean>(false);
  confirmModal5 = signal<boolean>(false);
  confirmModal6 = signal<boolean>(false);
  confirmModal7 = signal<boolean>(false);
  confirmModal8 = signal<boolean>(false);
  confirmModal9 = signal<boolean>(false);

  closeModal() {
    this.confirmModal.set(false);
    this.confirmModal1.set(false);
    this.confirmModal2.set(false);
    this.confirmModal3.set(false);
    this.confirmModal4.set(false);
    this.confirmModal5.set(false);
    this.confirmModal6.set(false);
    this.confirmModal7.set(false);
    this.confirmModal8.set(false);
    this.confirmModal9.set(false);
  }

  constructor() {
    // Initialize model properties
    this.model = {
      tk: null,
      son: null,
      daughter: null,
      husband: null,
      wife: null,
      father: null,
      mother: null,
      brother: null,
      sister: null,
      grandfather: null,
      grandmother: null,
      uncle: null,
      grandnanny: null,
      BmB: null,
      BmS: null,
      BpB: null,
      BpS: null,
      BSo: null,
      grandson: null,
      granddaughter: null,
      cousin: null,
      Ex1: null,
      Ex2: null,
    };
  }

  onFormSubmit() {
    this.loading.set(true);
    const { tk, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, BSo, grandson, granddaughter, cousin, Ex1, Ex2 } = this.model;
    if ((son || daughter || husband || wife || father || mother || brother || sister || grandfather || grandmother || uncle || grandnanny || BmB || BmS || BpB || BpS || BSo || grandson || granddaughter || cousin) && (husband < 2 && wife < 5 && mother < 2 && father < 2 && grandfather < 2)) {

      const formData = new FormData();

      formData.append('Asset', this.asset());
      formData.append('TK', tk || '');
      formData.append('Son', son || '');
      formData.append('Dau', daughter || '');
      formData.append('Hus', husband || '');
      formData.append('Wif', wife || '');
      formData.append('Fat', father || '');
      formData.append('Mot', mother || '');
      formData.append('Bro', brother || '');
      formData.append('Sis', sister || '');
      formData.append('GrF', grandfather || '');
      formData.append('GrM', grandmother || '');
      formData.append('GrN', grandnanny || '');
      formData.append('Unc', uncle || '');
      formData.append('USo', cousin || '');
      formData.append('BmB', BmB || '');
      formData.append('BmS', BmS || '');
      formData.append('BpB', BpB || '');
      formData.append('BpS', BpS || '');
      formData.append('BSo', BSo || '');
      formData.append('GrS', grandson || '');
      formData.append('GrD', granddaughter || '');
      formData.append('Ex1', Ex1 || '');
      formData.append('Ex2', Ex2 || '');

      this.forayezSubscription = this.forayezService.addForayez(formData)
        .subscribe({
          next: (response) => {
            this.result.set(response);
            // Scroll to the top of the page
            setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }), 1000);

            if (this.result()?.notFound) {
              this.confirmModal.set(true);
            }

            const bRules = this.getBlockRules(this.model);
            this.blockRules.set(bRules);
            const aRules = this.getAcceptRules(this.model);
            this.acceptRules.set(aRules);

            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error Calculate:', error);
            this.loading.set(false);
          }
        });
    } else {
      console.error("validation failed")
      this.loading.set(false);
    }
  }

  onClear(event: any) {
    event.preventDefault();
    this.model = {
      tk: null,
      son: null,
      daughter: null,
      husband: null,
      wife: null,
      father: null,
      mother: null,
      brother: null,
      sister: null,
      grandfather: null,
      grandmother: null,
      uncle: null,
      grandnanny: null,
      BmB: null,
      BmS: null,
      BpB: null,
      BpS: null,
      BSo: null,
      grandson: null,
      granddaughter: null,
      cousin: null,
      Ex1: null,
      Ex2: null,
    };
    this.result.set(null);
  }

  getBlockRules(V: any): string[] {
    const b = " বঞ্চিত হয়েছে ।";
    const st = " জীবিত থাকার কারনে ";

    const ASon = V.son > 0 ? "পুত্র," : "";
    const ADau = V.daughter > 0 ? "কন্যা," : "";
    const AHus = V.husband > 0 ? "স্বামী," : "";
    const AWif = V.wife > 0 ? "স্ত্রী," : "";
    const AFat = V.father > 0 ? "পিতা," : "";
    const AMot = V.mother > 0 ? "মাতা," : "";
    const ABro = V.brother > 0 ? "ভাই," : "";
    const ASis = V.sister > 0 ? "বোন," : "";
    const AGrF = V.grandfather > 0 ? "দাদা," : "";
    const AGrM = V.grandmother > 0 ? "দাদী," : "";
    const AGrN = V.grandnanny > 0 ? "নানী," : "";
    const AUnc = V.uncle > 0 ? "চাচা," : "";
    const AUSo = V.cousin > 0 ? "চাচাতো ভাই," : "";
    const ABmB = V.BmB > 0 ? "বৈমাত্রের ভাই," : "";
    const ABmS = V.BmS > 0 ? "বৈমাত্রের বোন," : "";
    const ABpB = V.BpB > 0 ? "বৈপিত্রের ভাই," : "";
    const ABpS = V.BpS > 0 ? "বৈপিত্রের বোন," : "";
    const AGrS = V.grandson > 0 ? "পুত্রের পুত্র (নাতি)," : "";
    const AGrD = V.granddaughter > 0 ? "পুত্রের কন্যা (নাতনী)," : "";
    const ABSo = V.BSo > 0 ? "ভাইয়ের পুত্র," : "";
    const AEx1 = V.Ex1 > 0 ? "u " : "";
    const AEx2 = V.Ex2 > 0 ? "u " : "";

    let BGrF, BGrM, BGrN, BBro, BSis, BUnc, BUSo, BBmB, BBmS, BBpB, BBpS, BGrS, BGrD;

    BGrF = (V.grandfather > 0 && V.father > 0) ? " পিতা জীবিত থাকার কারনে দাদা বঞ্চিত হয়েছে" : "";

    BGrM = (V.grandmother > 0 && ((V.father > 0 || V.mother > 0))) ? AFat + AMot + st + AGrM.slice(0, -1) + b : "";
    BGrN = (V.grandnanny > 0 && ((V.father > 0 || V.mother > 0 || V.grandfather > 0))) ? AFat + AMot + st + AGrN.slice(0, -1) + b : "";
    BBro = (V.brother > 0 && ((V.father > 0 || V.son > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + AGrS + AGrF + st + ABro.slice(0, -1) + b : "";

    BSis = (V.sister > 0 && ((V.father > 0 || V.son > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + AGrS + AGrF + st + ASis.slice(0, -1) + b : "";

    if (V.daughter > 0 && V.sister > 0 || V.daughter > 0 && V.BmS > 0 || V.BmS > 0 && V.granddaughter > 0) {
      BUnc = (V.uncle > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.grandson > 0 || V.grandfather > 0 || V.BmB > 0))) ? AFat + ASon + ABro + AGrS + AGrF + ABmB + ADau + ASis + ABmS + AGrD + st + AUnc.slice(0, -1) + b : "";
      BUSo = (V.cousin > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.sister > 0 || V.grandson > 0 || V.grandfather > 0 || V.uncle > 0 || V.BmB > 0))) ? AFat + ASon + ABro + ASis + AGrS + AGrF + AUnc + ABmB + ADau + ASis + ABmS + AGrD + st + AUSo.slice(0, -1) + b : "";
    } else {
      BUnc = (V.uncle > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.grandson > 0 || V.grandfather > 0 || V.BmB > 0))) ? AFat + ASon + ABro + AGrS + AGrF + ABmB + st + AUnc.slice(0, -1) + b : "";
      BUSo = (V.cousin > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.sister > 0 || V.grandson > 0 || V.grandfather > 0 || V.uncle > 0 || V.BmB > 0))) ? AFat + ASon + ABro + ASis + AGrS + AGrF + AUnc + ABmB + st + AUSo.slice(0, -1) + b : "";
    }

    BBmB = (V.BmB > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.sister > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + ABro + ASis + AGrS + AGrF + st + ABmB.slice(0, -1) + b : "";
    BBmS = (V.BmS > 0 && ((V.father > 0 || V.son > 0 || V.brother > 0 || V.sister > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + ABro + ASis + AGrS + AGrF + st + ABmS.slice(0, -1) + b : "";
    BBpB = (V.BpB > 0 && ((V.father > 0 || V.son > 0 || V.daughter > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + ADau + AGrS + AGrF + st + ABpB.slice(0, -1) + b : "";
    BBpS = (V.BpS > 0 && ((V.father > 0 || V.son > 0 || V.daughter > 0 || V.grandson > 0 || V.grandfather > 0))) ? AFat + ASon + ADau + AGrS + AGrF + st + ABpS.slice(0, -1) + b : "";
    BGrS = (V.grandson > 0 && ((V.son > 0))) ? ASon + st + AGrS.slice(0, -1) + b : "";
    BGrD = (V.granddaughter > 0 && ((V.son > 0))) ? ASon + st + AGrD.slice(0, -1) + b : "";

    const BlockA: string[] = [
      BGrF, BGrM, BGrN, BBro, BSis, BUnc, BUSo, BBmB, BBmS, BBpB, BBpS, BGrS, BGrD
    ];

    // Remove empty strings from array
    const Block = BlockA.filter(s => !!s);

    return Block;
  }

  getAcceptRules(V: any): string[] {
    // Initialize variables
    let AFat = '';
    let AMot = '';

    //---------Fat----------------
    if (V.father > 0 && V.son + V.daughter + V.grandson + V.granddaughter === 0) {
      AFat = "সন্তান-সন্ততি অথবা এদের নিম্নস্তরের কেউ না থাকার কারণে পিতা শুধুমাত্র আসাবা (অবশিষ্ট ভোগী) হবে।";
    }
    if (V.father > 0 && V.son + V.grandson > 0) {
      AFat = " পিতা শুধুমাত্র আসাবা (অবশিষ্ট ভোগী) হবে।";
    }
    if (V.father > 0 && V.son + V.grandson === 0) {
      AFat = "সন্তান-সন্ততি অথবা এদের নিম্নস্তরের কেউ না থাকার কারণে পিতা শুধুমাত্র আসাবা (অবশিষ্ট ভোগী) হবে।";
    }

    //---------Mot----------------
    if (V.mother > 0 && V.son + V.daughter + V.grandson + V.granddaughter === 0 && V.brother + V.sister + V.BpS + V.BmB + V.BmB + V.BmS < 2) {
      AMot = "সন্তান-সন্ততি অথবা এর নিম্নস্তরের অথবা একাধিক ভাই বোন না থাকার কারণে মাতা ১/৩ অংশ পাবে।";
    }

    const BlockA: string[] = [AFat, AMot];

    // Remove empty strings from array
    const Block = BlockA.filter(s => !!s);

    return Block;
  }

  onHusbandChange() {
    if (this.model.wife > 0) {
      this.confirmModal1.set(true);
      this.model.husband = '';
    }
    if (this.model.husband > 1) {
      this.confirmModal3.set(true);
      this.model.husband = 1;
    }
  }

  onWifeChange() {
    if (this.model.husband > 0) {
      this.confirmModal2.set(true);
      this.model.wife = '';
    }
    if (this.model.wife > 4) {
      this.confirmModal4.set(true);
      this.model.wife = 4;
    }
  }

  onFatherChange() {
    if (this.model.father > 1) {
      this.confirmModal5.set(true);
      this.model.father = 1;
    }
  }
  onMotherChange() {
    if (this.model.mother > 1) {
      this.confirmModal6.set(true);
      this.model.mother = 1;
    }
  }
  onGrandfatherChange() {
    if (this.model.grandfather > 1) {
      this.confirmModal7.set(true);
      this.model.grandfather = 1;
    }
  }

  ngOnChanges() {
    console.log('asset changed to:', this.asset);
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.forayezSubscription?.unsubscribe();
  }

}
