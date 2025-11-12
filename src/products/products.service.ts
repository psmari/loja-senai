import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertProductDTO } from './dto/upsert-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    private products: Array<any>;
    
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) {
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
        return this.productsRepository.find();
    }

    async create(product: UpsertProductDTO) {
        const newProduct = this.productsRepository.create(product);        
        await this.productsRepository.save(newProduct);
        
        return {
            "message": "Produto Criado!"
        };
    }

    update(id: number, product: UpsertProductDTO) {
        // [ 1, 2, 3, 4 ]
        const index = this.products.findIndex((p) => p.id == id);
        if(index == -1) {
            throw new NotFoundException('Produto não encontrado!')
        }
        this.products[index] = {
            'id': this.products[index].id,
            // spread
            ...product
        }
        
        return {
            "message": "Produto Atualizado!"
        };
    }

    delete(id: number) {
        this.products = this.products.filter((p) => p.id != id);
        return {
            "message": "Produto removido!"
        }
    }
}