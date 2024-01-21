import { TestBed } from '@angular/core/testing';

import { InterceptorServices } from './interceptor.interceptor';

describe('Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorServices
      ]
  }));
 
  it('should be created', () => {
    const interceptor: InterceptorServices = TestBed.inject(InterceptorServices);
    expect(interceptor).toBeTruthy();
  });
});
