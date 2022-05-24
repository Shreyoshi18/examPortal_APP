import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest ,HTTP_INTERCEPTORS} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

//const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private login:LoginService)
    {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req
        //add jwt present in local storage 
        const token = this.login.getToken();
        console.log('inside intercepter')
        if(token !=null)
        {
            console.log('In the if condition of interceptor '+authReq)
            authReq = authReq.clone(
                {
                    setHeaders : { Authorization: 'Bearer '+token },
                }
            );
            
        }
        console.log('this is final auth '+ authReq)
        return next.handle(authReq);
    }
    
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true
    },
];