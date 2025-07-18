import {HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const auth = inject(AuthService);

  const token = auth.getToken();

  if (!token) return next(req);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  })

  const newReq = req.clone({
    headers: headers,
  })

  return next(newReq);

}
