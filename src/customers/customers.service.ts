import { Injectable } from "@nestjs/common";
import { UpsertDTO } from "./dto/upsert.dto";

@Injectable()
export class CustomersService {
   private customers: Array<object>;
   // método especial - ele é chamado na criação
   constructor() {
     this.customers = [
        {
            "nome": "Félix",
            "idade": 18
        }
     ]
   }

   get() {
    return this.customers;
   }

   create(customer: UpsertDTO) {
     this.customers.push(customer);

     return {
        "message": "Salvo com sucesso"
     };
   }
}