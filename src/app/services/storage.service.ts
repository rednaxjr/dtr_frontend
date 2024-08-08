import { Injectable, Inject, PLATFORM_ID } from '@angular/core'; 

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  constructor(
    
  ) {

  } 
  getItem(key: string): string | null { 
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error('Failed to get item from localStorage:', error);
      return null;
    } 
  }

  getToken() { 
    try {
      
      return localStorage.getItem("token");
    } catch (error) {
      console.error('Failed to get item from localStorage:', error);
      return null;
    } 
  }
 
  setItem(key: string, value: string): void {

    try {
      localStorage.setItem(key, value);
      console.log("sulod diria")
      this.getItem("token")
    } catch (error) {
      console.error('Failed to set item in localStorage:', error);
    }
  } 
  removeItem(key: string): void {

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from localStorage:', error);
    }
  }
 
  clear(){ 
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}
