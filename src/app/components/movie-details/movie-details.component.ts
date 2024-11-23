import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '@/app/interfaces';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  @Input() id!: string

  movie: Movie = {
    backgroundImage: "",
    description: "",
    director: "",
    duration: "",
    genre: [],
    image: "",
    id: "",
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
      next: (movie: Movie) => {
        this.movie = movie
      },
    });
  }
}
