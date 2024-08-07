import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwtHelper = new JwtHelperService();
    private tokenSubject = new BehaviorSubject<string | null>(null);
    private apiUrl = 'http://localhost:3000/api/user';
    headers = {
        headers: new HttpHeaders().set('Content-Type', "application/json")
    }
    constructor(private http: HttpClient, private router: Router) {
        this.tokenSubject.next(localStorage.getItem('token'));
    }
    get token() {
        return this.tokenSubject.asObservable();
    }
    login(data: any): Observable<any> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/`, data, this.headers)
            .pipe(
                tap((response: any) => {
                    localStorage.setItem('token', response.token);
                })
            );
    }
    logout() {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.router.navigate(['/']);
        
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token ? !this.jwtHelper.isTokenExpired(token) : false;
    }
}