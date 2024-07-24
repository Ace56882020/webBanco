import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductResponse } from 'src/app/interfaces/productResposnse';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { LocalStorageService } from '../../../../services/localStorage.service';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import LoadingComponent from 'src/app/component/loading/loading.component';

@Component({
  standalone: true,
  imports: [
    NgbPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    LoadingComponent
  ],
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  titlePage = 'Productos';
  lbl_name: string = 'Nombre del Producto';
  lbl_description: string = 'Descripción';
  lbl_date_release: string = 'Fecha de Liberación';
  lbl_date_restructuring_: string = 'Fecha de Restructuración';
  lbl_img: string = 'Logo';
  searchText: string = '';
  lbl_settings: string = 'Opciones';
  productList: any[] = [];
  sizePerPage = 5;
  pageInitial = 1;

  constructor(
    private productSrv: ProductService,
    private router: Router,
    private loadingSrv: LoadingService,
    private dataSrv: DataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadingSrv.show();
    this.getProducts();
    localStorage.removeItem('PRODUCT_ID');
    if (![5, 10, 15, 20].includes(this.sizePerPage)) {
      this.sizePerPage = 5;
    }
  }

  getProducts() {
    this.productSrv.getProducts().subscribe(
      (data) => {
        this.productList = [];
        data.forEach((element: any) => {
          this.productList.push(element);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSearch() {
    if (this.searchText.trim() === '') {
      this.getProducts();
    } else {
      this.productList = this.productList.filter((product) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }


  fn_addProduct() {
    this.dataSrv.setData({
      id: null,
    });
    this.router.navigate(['product/add-product']);
  }

  fn_editProduct(product: ProductResponse) {
    this.dataSrv.setData({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      releaseDate: product.date_release,
      revisionDate: product.date_revision,
    });
    this.router.navigate(['product/add-product']);
  }

  // eliminar categoria
  fn_deleteProduct(product: any) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { id: product.id, name: product.name },
      disableClose: true,
      width:'40',
      height:'30%'
    });
    dialogRef.afterClosed().subscribe((resp: any) => {
      console.log(`Dialog result: ${resp}`);
      this.getProducts();
    });

  }
}
