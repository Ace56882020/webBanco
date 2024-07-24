import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import type { ProductResponse } from '../interfaces/productResposnse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  authorId: string = '2024';

  constructor(private http: HttpClient) {}

  getProductVerify(id: any): Observable<any> {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<ProductResponse>(
      environment.endPointMidd + 'bp/products/verification',
      {
        headers: headers,
        params: { id },
      }
    );
  }

  getProducts(): Observable<any> {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorId: this.authorId,
    });
    return this.http.get<ProductResponse>(
      environment.endPointMidd + 'bp/products',
      {
        headers: headers,
      }
    );
  }

  createProduct(product: any): Observable<any> {
    const body = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.releaseDate,
      date_revision: product.revisionDate,
    };
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorId: this.authorId,
    });
    return this.http.post<ProductResponse>(
      environment.endPointMidd + 'bp/products',
      body,
      {
        headers: headers,
      }
    );
  }

  updateProduct(product: any): Observable<any> {
    const body = {
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      date_release: product.releaseDate,
      date_revision: product.revisionDate,
    };
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorId: this.authorId,
    });
    return this.http.put<ProductResponse>(
      environment.endPointMidd + 'bp/products',
      body,
      {
        headers: headers,
      }
    );
  }

  deleteProduct(id: string): Observable<any> {
    const headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorId: this.authorId,
    });
    return this.http.delete<any>(
      environment.endPointMidd + 'bp/products',
      {
        headers: headers,
        params: { id },
      }
    );
  }
}
