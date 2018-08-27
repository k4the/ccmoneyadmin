import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fuel } from '../fuel.model';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.css']
})
export class FuelComponent implements OnInit {

  @Output() fuelItems = new EventEmitter<any>();
  @Input('labels') labels: any;
  @Input('fuel') fuel: Fuel;
  @Input('type') type: string;

  constructor() { }

  ngOnInit() {
  }

  setFuel(form): void {
    const fuel: Fuel = {
      yearlyCost: form.value.yearlyCost,
      unitRate: form.value.unitRate,
      discountRate: form.value.discountRate,
      economy7: form.value.economy7,
      standingCharge: form.value.standingCharge
    };
    this.fuel = fuel;
    const item = {
      type: this.type,
      fuel: this.fuel
    };
    this.fuelItems.emit(item);
  }
}
