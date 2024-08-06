import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Get item from localStorage
  getItem(key: string): string | null {
    if (this.isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.error('Failed to get item from localStorage:', error);
        return null;
      }
    }
    return null; // Not in browser environment
  }

  getToken() {
    if (this.isBrowser) {
      try {
        return localStorage.getItem("1231asda2edawd1");
      } catch (error) {
        console.error('Failed to get item from localStorage:', error);
        return null;
      }
    }
    return null; // Not in browser environment
  }

  // Set item in localStorage
  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.error('Failed to set item in localStorage:', error);
      }
    }
  }

  // Remove item from localStorage
  removeItem(key: string): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Failed to remove item from localStorage:', error);
      }
    }
  }

  // Clear all items in localStorage
  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Failed to clear localStorage:', error);
      }
    }
  }
}
