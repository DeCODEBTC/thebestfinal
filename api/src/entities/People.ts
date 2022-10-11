import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("people")
export class People {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;
}
