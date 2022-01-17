import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.productsService
      .findAll()
      .subscribe(res => this.products = res)
  }

  viewProduct(product: Product) {
    this.router.navigateByUrl('/product', { state: product })
  }

}
