import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private login: LoginService) {



    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //add the jwt token(localstorage) request
let authreq=req;
        const token = this.login.getToken();
        console.log("inside interceptor");
        // console.log("token test"+token);
        
        
        if (token != null) {
authreq=authreq.clone({setHeaders:{Authorization:`Bearer ${token}`}
});
        }
        // throw new Error("Method not implemented.");
        return next.handle(authreq);
    }

}


export const authInterceptorProviders=[{

    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
}]