import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faClock, faDollarSign, faFilm, faImage, faList, faPlus, faStar, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Genre from '@/app/interfaces/movies.interface';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [ ReactiveFormsModule, FontAwesomeModule ],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent implements OnInit{
  movieForm: FormGroup;

  icons = {
    film: faFilm,
    user: faUser,
    clock: faClock,
    dollar: faDollarSign,
    image: faImage,
    star: faStar,
    calendar: faCalendar,
    list: faList,
    trash: faTrash,
    plus: faPlus
  };

  genres: (keyof typeof Genre)[] = [
    "ACTION",
    'ADVENTURE',
    'ANIMATION',
    'COMEDY',
    'CRIME',
    'DOCUMENTARY',
    'DRAMA',
    'FAMILY',
    'FANTASY',
    'HISTORY',
    'HORROR',
    'MUSIC',
    'MYSTERY',
    'WESTERN',
    'WAR',
    'TV_MOVIE',
    'THRILLER',
    'ROMANCE'
  ]

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: [this.genres, Validators.required],
      director: ['', Validators.required],
      mainActors: [this.fb.array([]), Validators.required],
      duration: ['', Validators.required],
      rentPrice: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      qualification: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      releaseDate: ['', Validators.required],
      backgroundImage: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.addActor();
  }

  get mainActorsFormArray() {
    return this.movieForm.get('mainActors') as FormArray;
  }

  addActor() {
    this.mainActorsFormArray.push(this.fb.control('', Validators.required));
  }

  removeActor(index: number) {
    this.mainActorsFormArray.removeAt(index);
  }

  onGenreChange(event: any) {
    const selectedGenre = event.target.value;
    const currentGenres = [...(this.movieForm.get('genre')?.value || [])];
    
    if (event.target.checked) {
      if (!currentGenres.includes(selectedGenre)) {
        currentGenres.push(selectedGenre);
      }
    } else {
      const index = currentGenres.indexOf(selectedGenre);
      if (index > -1) {
        currentGenres.splice(index, 1);
      }
    }
    
    this.movieForm.patchValue({ genre: currentGenres });
  }

  isGenreSelected(genre: string): boolean {
    const currentGenres = this.movieForm.get('genre')?.value || [];
    return currentGenres.includes(genre);
  }
}
