import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection, In } from 'typeorm';
import { Country } from '../entity/Country';
import { PopulationResult } from '../entity/PopulationResult';

@Resolver()
export class CountryPopulationResolver {
    @Query(() => Country!, { nullable: true })
    async get(@Arg('code', () => String) code: string) {
        return await Country.findOne({ code: code });
    }

    @Query(() => [Country]!, { nullable: true })
    async list() {
        return await Country.find();
    }

    @Query(() => [Country]!, { nullable: true })
    async filter(@Arg('codes', () => [String]) codes: [string]) {
        let countries = await Country.find({
            where: { code: In(codes) },
            order: { population: 'DESC' }
        });

        return countries;
    }

    @Query(() => PopulationResult!, { nullable: true })
    async total(@Arg('codes', () => [String]) codes: [string]) {
        const countries = await this.filter(codes);

        if (!countries || (countries && !countries.length)) {
            return null;
        }

        const countriesQuery = await getConnection()
            .getRepository(Country)
            .createQueryBuilder('country')
            .where('country.code IN (:codes)', { codes: codes })
            .select('GROUP_CONCAT(name SEPARATOR \', \')', 'summary')
            .addSelect('SUM(population)', 'total')
            .getRawOne();

        let result = new PopulationResult();

        result.summary = `The population total of ${countriesQuery.summary}`;
        result.total = countriesQuery.total;

        return result;
    }

    @Mutation(() => Boolean)
    async deletePopulation(@Arg('code', () => String) code: string) {
        let country = await Country.findOne({ code: code });

        if (country === null) {
            return false;
        }

        country.population = 0;

        await Country.update({ code }, country);

        return true;
    }

    @Mutation(() => Country!, { nullable: true })
    async updatePopulation(@Arg('code', () => String) code: string, @Arg('population', () => Int) population: number) {
        if (population < 0) {
            return null;
        }

        let country = await Country.findOne({ code: code });

        if (country === null) {
            return null;
        }

        country.population = population;

        await Country.update({ code }, country);

        return country;
    }
}