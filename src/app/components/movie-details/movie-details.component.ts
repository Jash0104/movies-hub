import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '@/app/interfaces';
import { faBasketShopping, faBookmark, faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Genre from '@/app/interfaces/movies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [ FontAwesomeModule ],
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

  rankColor = "border-white"

  faIcons = {
    buy: faCartShopping,
    rent: faBasketShopping,
    heart: faHeart,
    save: faBookmark
  }
  
  constructor(
    private moviesService: MoviesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movie: Movie) => {
        this.movie = movie
        this.toggleRankColor(movie.qualification)
        this.movie.genre = this.formatGenres(movie.genre)
      },
    });
  }

  toggleRankColor(qualification: number) {
    if ( qualification <= 2.9) this.rankColor = "border-red-500"
    if ( qualification <= 3.9 && qualification >= 3) this.rankColor = "border-yellow-300"
    if ( qualification <= 5 && qualification >= 4) this.rankColor = "border-green-500"
  }

  private formatGenres(genres: Genre[]): Genre[] {
    return genres.map((genre) => {
      return genre
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ') as Genre;
    });
  }
  
  goPurchase() {
    this.router.navigateByUrl(`movies/${this.id}/purchase`)
  }

  goRent() {
    this.router.navigateByUrl(`movies/${this.id}/rent`)
  }
}
