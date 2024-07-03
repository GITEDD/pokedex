import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokemonResponse } from './interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data  = await this.http.get<PokemonResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    const pokemonList = data.results.map((pokemon) => {
      const regex: RegExp = /\/pokemon\/(\d+)\//;
      const match: RegExpMatchArray | null = pokemon.url.match(regex);
      return {
        ...pokemon,
        no: match[1],
      };
    });

    await this.pokemonModel.insertMany(pokemonList);
    return 'Seed executed success';
  }
}
