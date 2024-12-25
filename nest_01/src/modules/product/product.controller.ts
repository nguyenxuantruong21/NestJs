import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreateProductDto) {
    try {
      return await this.productsService.create(body);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(+id, updateProductDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.productsService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
