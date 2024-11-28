import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendar, faClock, faDollarSign, faFilm, faImage, faList, faPlus, faStar, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import Genre from '@/app/interfaces/movies.interface';
import { MoviesService } from '@/app/services';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [ ReactiveFormsModule, FontAwesomeModule, NgIf, NgFor ],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.css'
})
export class CreateMovieComponent implements OnInit {
  movieForm!: FormGroup;
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
  genres = Object.values(Genre);
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private moviesService: MoviesService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.addActor();
  }

  private initializeForm(): void {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      genre: [[], [Validators.required, Validators.minLength(1)]],
      director: ['', [Validators.required, Validators.minLength(2)]],
      mainActors: this.fb.array([], Validators.required),
      duration: ['', [Validators.required, Validators.pattern('^[0-9]+h [0-9]+min$')]],
      rentPrice: [0, [Validators.required, Validators.min(0)]],
      salePrice: [0, [Validators.required, Validators.min(0)]],
      releaseDate: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  get mainActorsFormArray(): FormArray {
    return this.movieForm.get('mainActors') as FormArray;
  }

  addActor(): void {
    this.mainActorsFormArray.push(
      this.fb.control('', [Validators.required, Validators.minLength(2)])
    );
  }

  removeActor(index: number): void {
    this.mainActorsFormArray.removeAt(index);
  }

  toggleGenre(genre: string): void {
    const currentGenres = [...this.movieForm.get('genre')?.value || []];
    const index = currentGenres.indexOf(genre);

    if (index === -1) {
      currentGenres.push(genre);
    } else {
      currentGenres.splice(index, 1);
    }

    this.movieForm.patchValue({ genre: currentGenres });
  }

  isGenreSelected(genre: string): boolean {
    return this.movieForm.get('genre')?.value?.includes(genre) || false;
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.movieForm.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.movieForm.valid && this.selectedFile) {
      const formData = new FormData();
      const formValue = this.movieForm.value;

      const genres: any = []
      // Append all form fields to FormData
      Object.keys(formValue).forEach(key => {
        if (key === 'image') {
          formData.append('file', this.selectedFile as any);
        } else if (key === 'genre') {
          // genres.push( ...formValue['genre'] )
          formValue[key].forEach((genre: string) => {
            formData.append('genre', genre);
          });
        } else if (key === 'mainActors') {
          formValue[key].forEach((actor: string) => {
            formData.append('mainActors[]', actor);
          });
        } else {
          formData.append(key, formValue[key]);
        }
      });

      formData.append("qualification", "4.3")
      // formData.append("genre", `[${genres.toString()}]` )

      this.moviesService.createMovie(formData).subscribe({
        next: (response) => {
          console.log('Movie created successfully', response);
          this.movieForm.reset();
          this.selectedFile = null;
          this.imagePreview = null;
        },
        error: (error) => {
          console.error('Error creating movie', error);
        }
      });
    }
  }
}
