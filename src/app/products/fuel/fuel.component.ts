import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fuel } from '../fuel.model';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit {

  @Output() fuelItems = new EventEmitter<any>();
  @Input('labels') labels: any;
  @Input('fuel') fuel: Fuel;
  @Input('type') type: string;

  monthlyCost = 0;

  constructor() { }

  ngOnInit() {
    this.monthlyCost = this.fuel.yearlyCost ? this.fuel.yearlyCost / 12 : 0;
  }

  setFuel(form): void {
    this.monthlyCost = form.value.yearlyCost ? form.value.yearlyCost / 12 : 0;
    const fuel: Fuel = {
      yearlyCost: form.value.yearlyCost,
      monthlyCost: this.monthlyCost,
      unitRate: form.value.unitRate,
      discountRate: form.value.discountRate,
      economy7: form.value.economy7 ? form.value.economy7 : 0,
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
