import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { WalletComponent } from './wallet.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, BrowserModule],
  declarations: [WalletComponent],
})
export class WalletModule {}
