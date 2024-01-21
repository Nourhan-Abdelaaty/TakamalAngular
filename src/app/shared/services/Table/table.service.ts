/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform, QueryList } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { NgbdSortableHeader, SortColumn, SortDirection, SortEvent } from './sortable.directive';

interface SearchResult {
	countries: any[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(countries: any[], column: SortColumn, direction: string): any[] {
	if (direction === '' || column === '') {
		return countries;
	} else {
		return [...countries].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}
//Important
function matches(country: any, term: any, pipe: PipeTransform) {
  return (
    country.NameAr?.toLowerCase().includes(term.trim().toLowerCase()) ||
    country.Code?.toLowerCase().includes(term.trim().toLowerCase())
  )
}

@Injectable({ providedIn: 'root' })

export class TableService {
	// public _loading$ = new BehaviorSubject<boolean>(true);
	public _search$ = new Subject<void>();
	public _DyamicArr$ = new BehaviorSubject<any[]>([]);
	public _total$ = new BehaviorSubject<number>(0);
  public Length : number = 0
  headers!: QueryList<NgbdSortableHeader>;
	public _state: State = {
		page: 1,
		pageSize: 10,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe) {

	}

	get DyamicArr$() {
		return this._DyamicArr$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	// get loading$() {
	// 	return this._loading$.asObservable();
	// }
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
    searchTerm.trim()
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

  public start(arr:any[],totalData:number){
    this.Length = arr.length
    if(arr.length > 0){
      this._search$
      .pipe(
        // tap(() => this._loading$.next(true)),
        // debounceTime(200),
        switchMap(() => this._search(arr,totalData)),
        // delay(200),
        // tap(() => this._loading$.next(false)),
      )
      .subscribe((result) => {
        this._DyamicArr$.next(result.countries);
        this._total$.next(result.total);
      });
      this._search$.next();

    }
    // else {
    //   this._search$.unsubscribe()
    // }
  }

  public onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
      console
			if (header.sortable !== column) {
				header.direction = '';
			}
		});
		this.sortColumn = column;
		this.sortDirection = direction;
	}

	public _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	public _search(arr:any[],totalData:number): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
		// 1. sort
		let countries = sort(arr, sortColumn, sortDirection);
		// 2. filter
		countries = countries.filter((country) => matches(country, searchTerm.trim(), this.pipe));
		const total = totalData;
		// 3. paginate
		countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ countries, total });
	}
}
