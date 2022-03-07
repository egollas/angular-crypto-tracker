import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class LocalStorageService {
  public static LOCAL_STORAGE_KEY = 'crypto-wallet';

  public static setInfo(data: any) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, jsonData);
  }

  public static loadInfo() {
    const data = localStorage.getItem(this.LOCAL_STORAGE_KEY) as string;
    if (data && data.length > 0) return JSON.parse(data);
  }

  public static clearInfo() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
