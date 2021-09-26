import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class PopulationResult {
    @Field()
    summary: string;

    @Field(() => Int)
    total: number;
}