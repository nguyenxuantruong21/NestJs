/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PRODUCTS_MESSAGE } from 'src/messages/products';

const CATEGORY = 'electronics';
@Injectable()
export class ProductsService {
  private filePath = path.join(process.cwd(), 'data', 'products.json');

  private readProducts(): any[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new HttpException(
        PRODUCTS_MESSAGE.READ_FILE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private writeProducts(products: any[]): void {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(products, null, 2),
        'utf8',
      );
    } catch (error) {
      throw new HttpException(
        PRODUCTS_MESSAGE.WRITE_FILE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const products = this.readProducts();
      return {
        success: true,
        message: PRODUCTS_MESSAGE.GET_ALL_PRODUCTS_SUCCESS,
        data: products,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const products = this.readProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new HttpException(
          PRODUCTS_MESSAGE.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        success: true,
        message: PRODUCTS_MESSAGE.GET_PRODUCT_DETAIL_SUCCESS,
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(body: CreateProductDto) {
    try {
      const products = this.readProducts();
      const newProduct = { id: Date.now(), ...body };
      products.push(newProduct);
      this.writeProducts(products);
      return {
        success: true,
        message: PRODUCTS_MESSAGE.CREATED_PRODUCT_SUCCESS,
        data: newProduct,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updatedProduct: UpdateProductDto) {
    try {
      const products = this.readProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        throw new HttpException(
          PRODUCTS_MESSAGE.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      this.writeProducts(products);
      return {
        success: true,
        message: PRODUCTS_MESSAGE.UPDATED_PRODUCT_SUCCESS,
        data: products[productIndex],
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const products = this.readProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new HttpException(
          PRODUCTS_MESSAGE.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      if (product.category === CATEGORY) {
        throw new HttpException(
          PRODUCTS_MESSAGE.CANNOT_DELETE_PRODUCT,
          HttpStatus.FORBIDDEN,
        );
      }
      const updatedProducts = products.filter((product) => product.id !== id);
      this.writeProducts(updatedProducts);
      return {
        success: true,
        message: PRODUCTS_MESSAGE.DELETED_PRODUCT_SUCCESS,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
