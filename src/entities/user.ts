import { Column, Entity, Long, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuidV4} from "uuid";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userDocument: string;

    @Column()
    creditCardToken: string;

    @Column()
    value: number


    constructor() {
        if (!this.id) {
          this.id = uuidV4();
        }
      }
}