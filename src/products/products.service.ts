import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    private products;

    constructor() {
        this.products = [
        {
            "id": 1,
            "name": "Biscoito"
        },
        {
            "id": 2,
            "name": "Morango"
        }
        ]
    }

    findAll() {
        return this.products;
    }

    create(product: CreateProductDTO) {
        // last id porque eu quero controlar o próximo id
        const last_id: number = this.products[this.products.length - 1].id;
        const newProduct = {
            "id": last_id + 1,
            ...product
        };
        this.products.push(newProduct);
       
        return {
            "message": "Produto Criado!"
        };
    }
}