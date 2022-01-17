import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShelfComponent} from './shelf.component';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../models/product';
import {Observable, of} from 'rxjs';
import {ProductTypeEnum} from '../../models/productTypeEnum';
import {CurrencyPipe} from '@angular/common';
import {By} from '@angular/platform-browser';
import {Router} from '@angular/router';
import Spy = jasmine.Spy;

describe('ShelfComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let component: ShelfComponent;
  let currencyPipe: CurrencyPipe = new CurrencyPipe('en');
  let fixture: ComponentFixture<ShelfComponent>;
  let productsMock: Product[] = [
    {inStock: true, name: 'In Stock Product 1', price: 10, description: 'Stock Desc.', type: ProductTypeEnum.COMPANY},
    {inStock: true, name: 'In Stock Product 2', price: 90, description: 'Stock Desc. 2', type: ProductTypeEnum.FRUIT},
    {
      inStock: false,
      name: 'No Stock Product',
      price: 2190,
      description: 'No Stock Desc.',
      type: ProductTypeEnum.PROGRAMMING_LANGUAGE
    },
  ];
  let productServiceMock: Partial<ProductsService> = {
    findAll(): Observable<Product[]> {
      return of(productsMock);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShelfComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ProductsService, useValue: productServiceMock},
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
    const productCount = shelfElement.querySelector('[data-test="product-count"]')!;

    expect(productCount.textContent).toEqual('Products (3)');

    component.products = [];
    fixture.detectChanges();
    expect(productCount.textContent).toEqual('Products (0)');
  });

  it('should render containers for all products', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock.forEach(product => {
      let selector = `[data-test="${product.name + '-container'}"]`;
      const productContainerElement = shelfElement.querySelector(selector)!;

      expect(productContainerElement).toBeTruthy();
    });
  });

  it('should render information about all products', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock.forEach(product => {
      let headerSelector = `[data-test="${product.name + '-header'}"]`;
      let priceSelector = `[data-test="${product.name + '-price'}"]`;
      let descriptionSelector = `[data-test="${product.name + '-description'}"]`;
      const productHeader = shelfElement.querySelector(headerSelector)!.textContent;
      const productPrice = shelfElement.querySelector(priceSelector)!.textContent;
      const productDescription = shelfElement.querySelector(descriptionSelector)!.textContent;

      expect(productHeader).toContain(product.name);
      expect(productHeader).toContain(product.type);
      expect(productDescription).toContain(product.description);
      expect(productPrice).toContain(currencyPipe.transform(product.price));
    });
  });

  it('should render "in stock" tag for products in stock', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock
      .filter(p => p.inStock)
      .forEach(product => {
        let inStockSelector = `[data-test="${product.name + '-inStock'}"]`;
        const productInStockTag = shelfElement.querySelector(inStockSelector)!.textContent;

        expect(productInStockTag).toEqual(' In Stock ');
      });
  });

  it('should NOT render "in stock" tag for products out of stock', () => {
    const shelfElement: HTMLElement = fixture.nativeElement;

    productsMock
      .filter(p => !p.inStock)
      .forEach(product => {
        let inStockSelector = `[data-test="${product.name + '-inStock'}"]`;
        const productInStockTag = shelfElement.querySelector(inStockSelector);

        expect(productInStockTag).toBeNull()
      });
  });

  it('should route to product details on click', () => {
    let product = productsMock[0]
    let productSelector = `div[data-test="${product.name}-container"]`

    const shelfElement = fixture.debugElement.query(By.css(productSelector))!;
    shelfElement.triggerEventHandler('click', null);

    const routerCall = (routerSpy.navigateByUrl as Spy).calls.first()

    expect(routerCall.args[0]).toEqual('/product')
    expect(routerCall.args[1]).toEqual({ state: product })
  });

});
