import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private storage: Storage = window.localStorage;

  public setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public getItem(key: string): string {
    return this.storage.getItem(key);
  }

  public removeItem(key: string): void {
    return this.storage.removeItem(key);
  }
}
