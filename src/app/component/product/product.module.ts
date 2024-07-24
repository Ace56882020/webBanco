import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ListProductsComponent } from './product-components/list-products/list-products.component';
import { AddProductsComponent } from './product-components/add-products/add-products.component';
import { DeleteProductComponent } from './product-components/delete-product/delete-product.component';
import LoadingComponent from '../loading/loading.component';


@NgModule({
  declarations: [
    ProductComponent,
    DeleteProductComponent,
    
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ListProductsComponent,
    AddProductsComponent,
    LoadingComponent
  ],
  exports:[ListProductsComponent]
})
export class ProductModule { }
