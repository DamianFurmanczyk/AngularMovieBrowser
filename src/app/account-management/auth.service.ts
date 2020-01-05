import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, pipe, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

import { User } from './User.model';

export interface AuthResp {
    email: string,
    localId: string
  }

@Injectable({providedIn: 'root'})

export class authService {
    apiKey = 'AIzaSyACf5ThbTXhogIo9sS1OuNHW9s88B5ja9s';
    user = new BehaviorSubject<User>(null);
    userReturned: User | null;
    usersLists: Observable<any[]>

    constructor(private db: AngularFireDatabase, private http: HttpClient) {
        this.user.subscribe(user => this.userReturned = user);
    }

    addToList(listType:string, data) {
        console.log(data);
        this.userReturned && this.db.object(`lists/${this.userReturned.uid}/${listType}/${data.original_title || data.title}`).set(data);
    }

    removeFromList(listType: string, key: string) {
        this.userReturned && this.db.list(`lists/${this.userReturned.uid}/${listType}`).remove(key);
    }

    signInUser (email: string, password: string) {
        console.log(email)
        console.log(password)
        return this.http.post<AuthResp>(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            tap(resp => {
                console.log(resp)
                this.setUser(resp.localId, resp.email);
            })
        );
    }

    logOut() {
        this.user.next(null);
    }

    setUser(uid, email) {
        this.user.next(new User(uid, email));
    }
    
    signUpUser (email: string, password: string) {
        return this.http.post<AuthResp>(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            tap(resp => {
                this.setUser(resp.localId, resp.email);
            })
        );
    }

}