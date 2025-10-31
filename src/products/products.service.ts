import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertProductDTO } from './dto/upsert-product.dto';

@Injectable()
export class ProductsService {
    private products: Array<any>;
    
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

    create(product: UpsertProductDTO) {
        // last id porque eu quero controlar o próximo id
        let last_id = 0;
        if (this.products.length != 0) {
            last_id = this.products[this.products.length - 1].id;
        }
        const newProduct = {
            "id": last_id + 1,
            ...product
        };
        this.products.push(newProduct);
       
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