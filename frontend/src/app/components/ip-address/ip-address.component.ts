
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IpAddressService } from 'src/app/services/ip-address.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.scss']
})
export class IpAddressComponent implements OnInit {

  ip_addresses: any;
  loggedIn = false;
  successType: any;
  successMessage!: String;
  
  @Input() public ip_address: any;

  constructor(
    private ipAddressService: IpAddressService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadIpAddresses();
    this.loggedIn = localStorage.getItem('token') !== null;

    if(!this.loggedIn){
      this.router.navigateByUrl('/welcome');
    }
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

  view(id: Number){
    this.ipAddressService.find(id).subscribe(
      (data) => {
        this.ip_address = data;
        this.openModal(false);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  openModal(newForm: boolean) {
    if(newForm){
      const modalRef = this.modalService.open(ModalComponent);

      modalRef.componentInstance.passEntry.subscribe((data: any) => {
        
        this.successType = data.type;
        this.successMessage = data.message;
        
        this.modalService.dismissAll();
        this.loadIpAddresses();
      })
    }else{
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.ip_address = this.ip_address;
      modalRef.componentInstance.passEntry.subscribe((data: any) => {
        
        this.successType = data.type;
        this.successMessage = data.message;
        
        this.modalService.dismissAll();
        this.loadIpAddresses();
      })
    }
  }
}