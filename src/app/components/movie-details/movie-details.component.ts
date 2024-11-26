import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { LoggedUser, Movie } from '@/app/interfaces';
import { faArrowLeft, faBasketShopping, faBookmark, faCartShopping, faEdit, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Genre from '@/app/interfaces/movies.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { ToastService } from '@/app/services';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [ FontAwesomeModule, CommonModule, RouterLink, MatDialogModule ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit{
  @Input() id!: string

userRole!: "USER" | "ADMIN";

  movie: Movie = {
    backgroundImage: "",
    description: "",
    director: "",
    duration: "",
    genre: [],
    image: "",
    id: "",
    mainActors: [],
    qualification: 0.0,
    releaseDate: "",
    rentPrice: 0.0,
    salePrice: 0.0,
    title: ""
  };

  rankColor = "border-white"

  faIcons = {
    buy: faCartShopping,
    rent: faBasketShopping,
    heart: faHeart,
    save: faBookmark,
    back: faArrowLeft,
    edit: faEdit,
    delete: faTrash
  }
  
  constructor(
    private moviesService: MoviesService,
    private readonly router: Router,
    public dialog: MatDialog,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.moviesService.getMovieDetails(this.id).subscribe({
      next: (movie: Movie) => {
        this.movie = movie
        this.toggleRankColor(movie.qualification)
        this.movie.genre = this.formatGenres(movie.genre)
      },
      error: (error) => {
        this.router.navigateByUrl('/movies')
        this.handleErrors('Movie not found', 'Opps...')
      },
    });

    const userData = JSON.parse(localStorage.getItem("user")!) as LoggedUser
    this.userRole = userData.role
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
  
  handleErrors( message: string, title: string ) {
    this.toast.showToast({
      type: 'error',
      title,
      message
    })
  }

  goPurchase() {
    this.router.navigateByUrl(`movies/${this.id}/purchase`)
  }

  goRent() {
    this.router.navigateByUrl(`movies/${this.id}/rent`)
  }

  updateMovie() {
    this.router.navigateByUrl(`movies/update/${this.id}`)
  }

  deleteMovie() {
    this.moviesService.deleteMovie(this.id).subscribe({
      next: () => {
        this.toast.showToast({
          message: "Movie deleted successfully",
          title: "DELETE",
          type: "success"
        })

      setTimeout(() => {
        this.router.navigateByUrl('/movies');
      }, 2500);

      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'An error occured while deleting the movie...' )
      },
    })
  }

  openDeleteModal() {
    const dialog = this.dialog.open(ModalComponent, {
      width: "300px",
      data: {
        title: `You are about to delete ${this.movie.title}!`,
        message: "This action will delete your awesome movie! Are you sure?",
        type: "delete"
      }
    })

    dialog.afterClosed().subscribe((deleted: boolean) => {
      if (!deleted) return
      this.deleteMovie()
    })
  }
}
