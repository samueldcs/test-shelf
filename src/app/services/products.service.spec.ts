import {TestBed} from '@angular/core/testing';

import {ProductsService} from './products.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Product} from '../models/product';
import {ProductTypeEnum} from '../models/productTypeEnum';
import {environment} from '../../environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should find all products',
    () => {
      let expectedContent: Product[] = [
        {inStock: false, name: 'Product1', description: 'A product', price: 10.0, type: ProductTypeEnum.COMPANY},
        {inStock: false, name: 'Product2', description: 'Another product', price: 90.0, type: ProductTypeEnum.FRUIT},
      ];

      service
        .findAll()
        .subscribe(res => expect(res).toEqual(expectedContent))

      httpTestingController
        .expectOne(environment.serviceUrl + '/products')
        .flush(expectedContent)
    });
});
