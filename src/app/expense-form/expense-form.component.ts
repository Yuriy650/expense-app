import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RatesService} from '../services/rates.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {
  form!: FormGroup;
  currentRates!: any;
  formData: any = [];
  total: number = 0;

  constructor(
    public fetchRates: RatesService,
  ) {

  }
  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      expense: new FormControl('', [Validators.required]),
      count: new FormControl(null, [Validators.required])
    });
   this.fetchRates.fetchRates()
      .subscribe(response => {
        this.currentRates = response
      })

  }

  submit() {
    const newExpense = {id: Date.now(), ...this.form.value}
    this.formData = [...this.formData];
    this.formData.unshift(newExpense);
    this.form.reset();
  }

  handleOnClick() {
    this.formData = [...this.formData]
    this.formData.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
  }

  deleteOnClick(id: any): void {
    this.formData = this.formData.filter((item: { id: any }) => item.id !== id)
  }

  getTotal() {
    this.total = 0;
    this.formData = [...this.formData]
    this.formData.map((item: any) => {
      switch (item.currency) {
        case 'EUR':
          this.total += item.count * this.currentRates.rates.PLN;
          break;
        case 'USD':
          this.total += item.count / this.currentRates.rates.USD * this.currentRates.rates.PLN;
          break;
        default:
          this.total += item.count
          console.log(this.total)
      }
    })
    return this.total;
  }
}
