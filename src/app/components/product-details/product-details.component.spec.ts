import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductDetailsComponent} from './product-details.component';
import {Product} from '../../models/product';
import {ProductTypeEnum} from '../../models/productTypeEnum';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  let currencyPipe = new CurrencyPipe('en');
  let mockProduct: Product = {
    name: 'Mock Product',
    type: ProductTypeEnum.COMPANY,
    price: 190.00,
    description: 'A very cool mocked product',
    inStock: true
  };

  class RouterStub {
    getCurrentNavigation = () => ({
      extras: {
        state: mockProduct
      }
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the received product', () => {
    expect(component).toBeTruthy();

    const componentDom: HTMLElement = fixture.nativeElement;

    const productName = componentDom.querySelector('[data-test="product-name"]')!;
    const productType = componentDom.querySelector('[data-test="product-type"]')!;
    const productPrice = componentDom.querySelector('[data-test="product-price"]')!;
    const productDescription = componentDom.querySelector('[data-test="product-description"]')!;
    const productInStock = componentDom.querySelector('[data-test="product-in-stock"]')!;

    expect(productName.textContent).toContain(mockProduct.name);
    expect(productType.textContent).toContain(mockProduct.type);
    expect(productPrice.textContent).toContain(currencyPipe.transform(mockProduct.price));
    expect(productDescription.textContent).toContain(mockProduct.description);
    expect(productInStock.textContent).toEqual(' In Stock ');
  });
});
