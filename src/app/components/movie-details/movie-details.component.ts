import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../interfaces/movies';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  @Input() id!: string

  movie: Movies = {
    backgroundImage: "",
    description: "",
    director: "",
    duration: "",
    genre: [],
    image: "",
    mainActors: [],
    qualification: 0,
    releaseDate: "",
    rentPrice: 0,
    salePrice: 0,
    title: ""
  };

  constructor(
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movie: Movies) => {
        console.log(movie.backgroundImage);
        
        this.movie = movie
      },
    });
  }
}
