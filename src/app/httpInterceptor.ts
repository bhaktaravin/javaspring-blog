import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "./services/storage.service";
import { EventbusService } from "./services/eventbus.service";
import { Observable, catchError, throwError } from "rxjs";
import { EventData } from "./services/event";



@Injectable() 
export class HttpRequestInterceptor implements HttpInterceptor {

    private isRefreshing = false; 
    constructor(private storageService: StorageService, private eventBusService: EventbusService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true

        });

        return next.handle(req).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        );
    }


    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if(!this.isRefreshing) {
            this.isRefreshing = true;

            if(this.storageService.isLoggedIn()) {

                this.eventBusService.emit(new EventData('logout', null));

            }
        }

        return next.handle(request);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
]