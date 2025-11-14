import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { UpsertProductDTO } from './dto/upsert-product.dto'

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

    async update(id: number, product: UpsertProductDTO) {
        // [ 1, 2, 3, 4 ]
        const productFound = await this.productsRepository.findOne({
            where: {id}
        });

        if(!productFound) {
            throw new NotFoundException('Produto não encontrado!');
        }
        
        await this.productsRepository.update(id, product);
        
        return {
            "message": "Produto Atualizado!"
        };
    }

    async delete(id: number) {
        await this.productsRepository.delete(id)
        return {
            "message": "Produto removido!"
        }
    }
}