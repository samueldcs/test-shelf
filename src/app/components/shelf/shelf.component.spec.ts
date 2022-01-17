import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShelfComponent} from './shelf.component';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import {Observable, of} from 'rxjs';
import {ProductTypeEnum} from '../../models/productTypeEnum';

describe('ShelfComponent', () => {
  let component: ShelfComponent;
  let fixture: ComponentFixture<ShelfComponent>;
  let productsMock: Product[] = [
    { inStock: true, name: 'In Stock Product 1', price: 10, description: 'Stock Desc.', type: ProductTypeEnum.COMPANY },
    { inStock: true, name: 'In Stock Product 2', price: 90, description: 'Stock Desc. 2', type: ProductTypeEnum.FRUIT },
    { inStock: false, name: 'No Stock Product', price: 2190, description: 'No Stock Desc.', type: ProductTypeEnum.PROGRAMMING_LANGUAGE },
  ]
  let productServiceMock: Partial<ProductsService> = {
    findAll(): Observable<Product[]> {
      return of(productsMock);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfComponent ],
      providers: [
        { provide: ProductsService, useValue: productServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display product count', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;
    const productCount = shelfElement.querySelector('[data-test="product-count"]')!

    expect(productCount.textContent).toEqual('Products (3)');

    component.products = [];
    fixture.detectChanges()
    expect(productCount.textContent).toEqual('Products (0)');
  });

  it('should render containers for all products', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock.forEach(product => {
      let selector = `[data-test="${product.name + '-container'}"]`
      const productContainerElement = shelfElement.querySelector(selector)!

      expect(productContainerElement).toBeTruthy()
    })
  });

  it('should render information about all products', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock.forEach(product => {
      let selector = `[data-test="${product.name + '-header'}"]`
      const productContainerElement = shelfElement.querySelector(selector)!.textContent

      expect(productContainerElement).toContain(product.name)
      expect(productContainerElement).toContain(product.type)
    })
  });

});
