import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonImg = '';
  name = '';
  type='';
  hp = [];
  attack = [];
  defense = [];
  speed = [];
  pokemonEvolute = '';
  pokemonEvolute1 = '';


  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService, private http: HttpClient) {

    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);


      }
    )
  }

  ngOnInit(): void {
  }

  getPokemon(id) {
    this.pokemonService.getPokemons(id).subscribe(
      res => {

        this.pokemon = res;
        console.log(res)
        this.name = res.name;
        this.hp = res.stats[0].base_stat;
        this.attack = res.stats[1].base_stat;
        this.defense = res.stats[2].base_stat;
        this.speed = res.stats[5].base_stat;


        this.pokemonImg = this.pokemon.sprites.front_default;
        for (let i = 1; i <= 427; i++) {
        this.pokemonService.getEvolutes(i).subscribe(

          res => {
            if(this.name === res.chain.species.name){
              this.pokemonEvolute = res.chain.evolves_to[0].species.name;
              this.pokemonEvolute1 = res.chain.evolves_to[0].evolves_to[0].species.name;
            }
            if(this.name === res.chain.evolves_to[0].species.name) {
              this.pokemonEvolute = res.chain.evolves_to[0].evolves_to[0].species.name;
            }




          },
          err => {
            console.log(err);
          }
        )}

      },
      err => {
        console.log(err);
      }
    )
  }




}
