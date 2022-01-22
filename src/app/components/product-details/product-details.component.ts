import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  prod: Product;

  constructor(private router: Router) {
    this.prod = this.router.getCurrentNavigation()?.extras.state as Product;
  }
}
