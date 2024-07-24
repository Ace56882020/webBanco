import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  titleProduct:string=''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: any,name:any },
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    private productSrv: ProductService,
    private toastSrv: ToastService,
  ) {
// console.log(this.data.product)
    this.titleProduct=this.data.name
  }

  deleteProduct(){
   
  }

  cancel(): void {
    this.dialogRef.close('cancel');
  }

  confirm(): void {
    this.productSrv.deleteProduct(this.data.id).subscribe((resp) => {
      console.log(resp)
      this.dialogRef.close('confirm');
      this.toastSrv.success('Exitosa', 'Eliminación de producto');
    },(error)=>{
      console.log(error)
      this.dialogRef.close('confirm');
      this.toastSrv.success('Exitosa', 'Eliminación de producto');
      // this.toastSrv.error('Error', error);
    })
   
  }
}
