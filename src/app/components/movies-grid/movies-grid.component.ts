import { Component, OnInit } from '@angular/core';
import { MoviesService } from '@/app/services';
import { Movie } from '@/app/interfaces';

@Component({
  selector: 'app-movies-grid',
  standalone: true,
  imports: [],
  templateUrl: './movies-grid.component.html',
  styleUrl: './movies-grid.component.css'
})
export class MoviesGridComponent implements OnInit {

  constructor(
    private readonly moviesService: MoviesService
  ) {}

  movies: Movie[] = []

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: ( movies: Movie[] ) => {
        this.movies = movies
      }
    })
    
  }

}
