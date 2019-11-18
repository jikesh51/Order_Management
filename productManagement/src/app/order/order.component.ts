import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CommonService} from "../services/common.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import swal from 'sweetalert2';
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userData: any;
  orderList: any;
  form: FormGroup;
  submitted = false;
  edit = false;
  orderTotal;
  constructor(
    public formBuilder: FormBuilder,
    public api: CommonService,
    public router: Router,
    private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('Authorized_user'));
    if(!this.userData) this.router.navigate(['/login']);

    this.getOrderList(this.userData.id);

    this.form = this.formBuilder.group({
      order_number: ['', Validators.required],
      order_due_date: ['', Validators.required],
      customer_buyer_name: ['', Validators.required],
      customer_address: ['', Validators.required],
      customer_phone: ['', Validators.required],
      order_amount: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  getOrderList(id:any){
   this.api.totalOrder(id).subscribe((data:any)=>{
     this.orderList = data.data;
     this.orderTotal = data.extra;
   });
  }

  dateTime(date){
    return new Date(date).toISOString().split('T')[0]
  }

  changeValue(event: any) {
    if (event.keyCode >= 48 && event.keyCode <= 57) {
        return true;
    } else {
        return false;
    }
  }
  onSubmit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      let orderDetails = {
        user_id: this.userData.id,
        order_number: this.form.value.order_number,
        order_due_date: this.form.value.order_due_date,
        customer_buyer_name: this.form.value.customer_buyer_name,
        customer_address: this.form.value.customer_address,
        customer_phone: this.form.value.customer_phone,
        order_amount: this.form.value.order_amount,

      };
      this.api.newOrder(orderDetails).subscribe((data: any) => {
        if(data && data.meta.status === 1){
          this.toastrService.success(data.meta.message, 'success');
          $('#exampleModal').modal("hide");
          this.getOrderList(this.userData.id);
          this.router.navigate(['/']);
        }
      })
    }
  }

  deleteOrder(id: any){
    swal.fire({
      title: "Delete Order",
      text: "Once deleted the order, you will not be able to recover again!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel it'
    }).then((result) => {
      if(result.value){
        this.api.deleteOrder(id).subscribe((data)=>{
          if (data.meta.status === 1){
            swal.fire('Deleted!', data.meta.message, 'success');
            this.getOrderList(this.userData.id);
            this.router.navigate(['/']);
          }
        });
      }else{
        swal.fire("Cancelled!");
      }
    });
  }
}
