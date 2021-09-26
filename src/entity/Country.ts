import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'countrypopulation' })
export class Country extends BaseEntity {
    @Field()
    @PrimaryColumn()
    code: string;

    @Field()
    @Column()
    name: string;

    @Field(() => Int)
    @Column('int', { default: 0 })
    population: number;
}