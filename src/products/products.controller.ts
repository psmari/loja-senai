import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/')
    findAll() {
        return this.productsService.findAll();
    }

    @Post('/')
    create(@Body() productBody: CreateProductDTO) {
        return this.productsService.create(productBody);
    }
}