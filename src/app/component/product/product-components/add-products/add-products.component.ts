import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss'],
})
export class AddProductsComponent implements OnInit {
  adminForm!: FormGroup;
  isIdValid: boolean = false;
  minDate: string;
  titleMsg = '';
  today = new Date();
  disableBtn: boolean = false;
  dateRevision: string = '';
  proudctData: any | null = '';
  validId: boolean = false;
  isLoading: boolean = true;
  public utils = inject(Utils);

  constructor(
    private productSrv: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private toastSrv: ToastService,
    private localStorageSrv: LocalStorageService,
    private dataSrv: DataService
  ) {
    this.minDate = this.today.toISOString().split('T')[0];
    this.proudctData = this.dataSrv.getData();
  }


  // Lógica para cambiar el estado de isLoading
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
  ngOnInit(): void {
    this.buildForm();
    if (this.proudctData.id != null || this.proudctData.id != undefined) {
      this.refillForm(this.proudctData);
      this.disableBtn = true;
    } else {
    }
    console.log(this.proudctData);
  }

  getProductoId() {
    console.log('object', this.adminForm.value.id);
    this.productSrv
      .getProductVerify(this.adminForm.value.id)
      .subscribe((resp) => {
        this.isIdValid = resp;
        console.log(resp);
        //animacion de carga de datos
        setTimeout(() => {
          // this.loadingSrv.hideLoading()
        }, 250);
      });
  }

  //validacion del formulario
  buildForm() {
    this.adminForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      releaseDate: new FormControl('', [Validators.required]),
      revisionDate: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  refillForm(product: any) {
    console.log(product);
    const releaseDate = new Date(product.releaseDate);
    const releaseYearDate = new Date(
      releaseDate.getFullYear(),
      releaseDate.getMonth(),
      releaseDate.getDate()
    );
    const revisionDate = new Date(product.revisionDate);
    const revisionYearDate = new Date(
      revisionDate.getFullYear(),
      revisionDate.getMonth(),
      revisionDate.getDate()
    );

    this.adminForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      logo: product.logo,
      releaseDate: this.utils.formatDateEdit(releaseYearDate),
      revisionDate: this.utils.formatDate(revisionYearDate),
    });
    setTimeout(() => {
      // this.loadingSrv.hideLoading()
    }, 250);
  }

  genereteDate() {
    const currentDate = new Date(this.adminForm.value.releaseDate);
    const nextYearDate = new Date(
      currentDate.getFullYear() + 1,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    this.adminForm.patchValue({
      revisionDate: this.utils.formatDate(nextYearDate),
    });

    this.adminForm.value.revisionDate =
      this.utils.formatDateSubmit(nextYearDate);
    this.dateRevision = this.adminForm.value.revisionDate;
    console.log(this.adminForm.value.revisionDate);
  }

  resetForm() {
    this.adminForm.reset();
  }
  submitForm() {
    if (this.adminForm.valid) {
      if (this.proudctData.id != null || this.proudctData.id != undefined) {
        this.titleMsg = 'Actualización de producto';
        this.updateProduct();
      } else {
        this.titleMsg = 'Creación de producto';
        this.createProduct();
      }
    } else {
      this.toastSrv.info('Info', 'Campos incompletos!');
    }
  }

  createProduct() {
    if (this.dateRevision === '') {
      this.adminForm.value.revisionDate = this.utils.formatDateValue(
        this.adminForm.value.revisionDate
      );
    } else {
      this.adminForm.value.revisionDate = this.dateRevision;
    }
    this.productSrv.createProduct(this.adminForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.toastSrv.success('Exitosa', this.titleMsg);
        this.router.navigate(['product']);
      },
      (error) => {
        this.toastSrv.error('Error', error);
      }
    );
  }

  updateProduct() {
    if (this.dateRevision === '') {
      this.adminForm.value.revisionDate = this.utils.formatDateValue(
        this.adminForm.value.revisionDate
      );
    } else {
      this.adminForm.value.revisionDate = this.dateRevision;
    }
    this.productSrv.updateProduct(this.adminForm.value).subscribe(
      (resp) => {
        this.toastSrv.success('Exitosa', this.titleMsg);
        this.router.navigate(['product']);
      },
      (error) => {
        this.toastSrv.error('Error', error.status);
      }
    );
  }
}
