import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsService {
  private filePath = path.join(process.cwd(), 'data', 'products.json');

  private readProducts(): any[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  private writeProducts(products: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf8');
  }

  findAll() {
    return this.readProducts();
  }

  findOne(id: number) {
    const products = this.readProducts();
    return products.find((product) => product.id === id);
  }

  create(product: any) {
    const products = this.readProducts();
    const newProduct = { id: Date.now(), ...product };
    products.push(newProduct);
    this.writeProducts(products);
    return products;
  }

  update(id: number, updatedProduct: any) {
    let products = this.readProducts();
    products = products.map((product) =>
      product.id === id ? { ...product, ...updatedProduct } : product,
    );
    this.writeProducts(products);
    return products;
  }

  remove(id: number) {
    let products = this.readProducts();
    products = products.filter((product) => product.id !== id);
    this.writeProducts(products);
    return products;
  }
}
