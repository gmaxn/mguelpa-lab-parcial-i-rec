import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepartidorService } from 'src/app/services/repartidor.service';

@Component({
  selector: 'app-repartidor-grid',
  templateUrl: './repartidor-grid.component.html',
  styleUrls: ['./repartidor-grid.component.css']
})
export class RepartidorGridComponent implements OnInit {

  @Output() selection: EventEmitter<any> = new EventEmitter<any>();

  @Input() repartidores: any[] = [];
  
  @Input() filtered: any[] = [];

  public _filterTerm: string = '';

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.repartidores;
  }

  constructor(
    private repaService: RepartidorService
  ) { }

  ngOnInit(): void {
    this.repaService.getAll().subscribe({
      next: repartidores => {
        this.repartidores = repartidores;
        this.filtered = repartidores;
      },
      error: err => console.log(err)
    });
  }

  onSelect(repartidor: any) {
    this.selection.emit(repartidor);
  }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.repartidores.filter(
      (r: any) =>  (
        r.nombre.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
        r.origen.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  // trigger(action:string, appointment: Appointment) {
  //   this.action.emit({
  //     action: action,
  //     appointment: appointment
  //   });
  // }
}
