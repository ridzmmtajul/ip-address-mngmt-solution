import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IpAddressService } from 'src/app/services/ip-address.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  ip_addresses: any;
  closeResult = '';
  loggedIn = false;
  form!: FormGroup; 
  formTitle!: String;

  labels: Array<any> = []; 
  selected_id!: '';
  selected_ip_address!: '';

  @Input() public ip_address: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter()

  constructor(
    private ipAddressService: IpAddressService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadIpAddresses();
    this.loggedIn = localStorage.getItem('token') !== null;

    if(!this.loggedIn){
      this.router.navigateByUrl('/welcome');
    }

    if(this.ip_address){
      this.selected_id = this.ip_address.id;
      this.selected_ip_address = this.ip_address.ip_address;
      this.labels = JSON.parse(this.ip_address.labels);
     }
     
    this.formTitle = !this.selected_id ? 'New IP Address' : 'Edit IP Address';

    const is_disabled = this.ip_address && this.selected_ip_address ? true : false;

    this.form = this.fb.group({
      ip_address: [{value: '', disabled: is_disabled}, [Validators.required, customValidator()]]
    });
  }

  get ipAddress(): FormControl{
    return this.form.get('ip_address') as FormControl;
  }

  loadIpAddresses(){
    this.ip_addresses = this.ipAddressService.loadIpAddresses().subscribe(
      (res) => {
        this.ip_addresses = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  submit(){
    !this.selected_id ? this.save() : this.update();
  }

  save(){
    const formData = this.form.getRawValue();
    const data = {
      ip_address: formData.ip_address,
      labels: this.labels
    }

    if(data.ip_address && !this.ipAddress.errors){
      this.ipAddressService.submit(data).subscribe(
        (res) => {
          this.passBack('success', res);
        },
        (err) => {
          this.passBack('danger', err.error.message);

          console.log(err);
        })
    }else{
      alert('Input fields invalid')
    }
  }

  update(){
    const data = {
      id: this.selected_id,
      ip_address: this.selected_ip_address,
      labels: this.labels
    }

    this.ipAddressService.update(data).subscribe(
      (res) => {
        this.passBack('success', res);
      },
      (err) => {
        this.passBack('danger', err.error.message);

        console.log(err);
      })
  }

  addLabel(label: String){
    const formData = this.form.getRawValue();
    const ip_address = formData.ip_address;

    if(label && ip_address){
      if(this.selected_id){
        this.labels.push(label);
        this.update();
      }else{
        this.labels.push(label);
      }
    }
  }

  removeLabel(label: String){
    
    if(this.selected_id){
      this.labels = this.labels.filter((x) => x !== label);
      this.update();
    }else{
      this.labels = this.labels.filter((x) => x !== label);
    }
  }

  updateLabel(label: String, labelLatest: String){
    this.removeLabel(label);
    this.addLabel(labelLatest);

    this.update();
  }

  passBack(type: any, message: String){
    this.passEntry.emit({type, message});
  }
}

export function customValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

    if (regex.test(control.value)) {
      return null;
    }

    return { ipError: true };
  };
}
