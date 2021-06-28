import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/domain/country';
import { State } from 'src/app/domain/state';
import { CheckOutFormService } from 'src/app/services/check-out-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  expirationMonths! : number[] ;
  expirationYears! : number[] ;
  checkoutFormGroup! : FormGroup;
  totalPrice : number = 0;
  totalQuantity : number = 0;
  countries : Country[] = [];
  ShippingAddressStates : State [] = [];
  BillingAddressStates : State [] = [];

  constructor(private formBuilder : FormBuilder,
              private checkOutFromService : CheckOutFormService) { }

  ngOnInit(): void {
     
    this.buildCheckoutForm();
    this.checkOutFromService.getExpirationYearList().subscribe(
      data => this.expirationYears = data
    );
    
    const currentMonth = new Date().getMonth() + 1;
    this.checkOutFromService.getMonthList(currentMonth).subscribe(
      data => this.expirationMonths = data
    );

    this.checkOutFromService.getCountryList().subscribe(
      data => this.countries = data
    );
  }
   
  private buildCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });
  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }

  copyShippingAddresstoBillingAddress(event:any){
    if( event && event.target &&  event.target.checked){ 
      this.BillingAddressStates = this.ShippingAddressStates;
      this.checkoutFormGroup.controls.billingAddress
          .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else
    {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  handleMonthAndYear(){
    const selectedYear = Number(this.checkoutFormGroup.controls.creditCard.value.expirationYear);
    const currentYear = new Date().getFullYear();
    if(selectedYear == currentYear){
      const currentMonth = new Date().getMonth() + 1;
      this.checkOutFromService.getMonthList(currentMonth).subscribe(
        data => this.expirationMonths = data
      );
    }else{
      this.checkOutFromService.getMonthList(1).subscribe(
        data => this.expirationMonths = data
      );

    }
  }
  
  getState(formGroupName  : string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    this.checkOutFromService.getStateList(countryCode).subscribe(
      data => { 
          if(formGroupName == 'shippingAddress'){
            this.ShippingAddressStates = data;
          } else {
            this.BillingAddressStates = data;
          }
        
      }
    );
  }

}
