import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CommonService} from "../services/common.service";
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
declare var $: any;
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  order_id;
  orderDetails;
  constructor(
    public formBuilder: FormBuilder,
    public api: CommonService,
    public router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(_value => {
      this.order_id = _value.id;
    });
    this.form = this.formBuilder.group({
      order_number: ['', Validators.required],
      order_due_date: ['', Validators.required],
      customer_buyer_name: ['', Validators.required],
      customer_address: ['', Validators.required],
      customer_phone: ['', Validators.required],
      order_amount: ['', Validators.required],
    });

    this.getSingleOrder(this.order_id);
  }

  getSingleOrder(id:any){
    this.api.getSingleOrder(id).subscribe((data: any)=>{
      if(data.data && data.meta.status === 1){
        this.orderDetails = data.data[0];
      }
      
      this.form.setValue({
        order_number: this.orderDetails.order_number,
        order_due_date:new Date(this.orderDetails.order_due_date).toISOString().split('T')[0],
        customer_buyer_name: this.orderDetails.customer_buyer_name,
        customer_address: this.orderDetails.customer_address,
        customer_phone: this.orderDetails.customer_phone,
        order_amount: this.orderDetails.order_amount
      });
    });
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
        user_id: this.order_id,
        order_number: this.form.value.order_number,
        order_due_date: this.form.value.order_due_date,
        customer_buyer_name: this.form.value.customer_buyer_name,
        customer_address: this.form.value.customer_address,
        customer_phone: this.form.value.customer_phone,
        order_amount: this.form.value.order_amount,

      };
      this.api.updateOrder(orderDetails).subscribe((data: any) => {
        if(data && data.meta.status === 1){
          this.toastrService.success(data.meta.message, 'success');
          this.router.navigate(['/']);
        }
      })
    }
  }

}
