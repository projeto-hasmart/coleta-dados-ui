import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _data: Map<string, FormGroup> = new Map<string, FormGroup>();

  constructor() {}

  public getItemState(item: string): Observable<FormGroup> {
    const result = this._data.get(item);
    this._data.set(item, null);

    return of(result);
  }

  public updateStorage(item: string, state: any): void {
    this._data.set(item, state);
  }
}
