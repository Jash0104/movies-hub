  import { Movie } from '@/app/interfaces';
  import { MoviesService } from '@/app/services';
  import { Component, Input, OnInit } from '@angular/core';
  import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
  import { faCalendar, faDollar, faDollarSign, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
  import { faAmazonPay, faApplePay, faGoogleWallet, faPaypal } from '@fortawesome/free-brands-svg-icons';
  import { Router } from '@angular/router';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { TransactionsService } from '@/app/services/transactions.service';
  import { PaymentMethod, TransactionType } from '@/app/interfaces/transactions.interface';

  @Component({
    selector: 'app-movie-transaction',
    standalone: true,
    imports: [ FontAwesomeModule, ReactiveFormsModule ],
    templateUrl: './movie-transaction.component.html',
    styleUrl: './movie-transaction.component.css'
  })
  export class MovieTransactionComponent implements OnInit {
    @Input() id!: string

    transactionType = TransactionType.PURCHASE
    price = 0

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

    icons = {
      price: faDollarSign,
      paypal: faPaypal,
      amazon: faAmazonPay,
      google: faGoogleWallet,
      apple: faApplePay,
      mail: faMailBulk,
      phone: faPhone,
      trans: faDollar,
      date: faCalendar
    }

    transactionForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      price: new FormControl(this.price, [Validators.required]),
      paymentMethod: new FormControl(PaymentMethod.PAYPAL, [Validators.required]),
      transactionType: new FormControl(this.transactionType),
    })

    constructor(
      private movieService: MoviesService,
      private transactionService: TransactionsService,
      private readonly route: Router
    ) {}

    ngOnInit() {
      this.movieService.getMovieDetails(this.id).subscribe({
        next: (movie: Movie) => {
          this.movie = movie;
          const price = (this.transactionType === "RENTAL") 
            ? this.movie.rentPrice 
            : this.movie.salePrice;

          this.price = price;
          this.transactionForm.patchValue({ price });
        }
      })
      if ( this.route.url.includes("rent") ) this.transactionType = TransactionType.RENTAL
    }

    submit() {
      this.transactionService.createATransaction({ 
        movieId: this.id,
        email: this.transactionForm.value.email!,
        paymentMethod: this.transactionForm.value.paymentMethod!,
        price: this.transactionForm.value.price!,
        transactionType: this.transactionType
      }).subscribe({
        next: (response) => console.log("Transacción exitosa", response),
        error: (err) => console.error("Error al procesar la transacción", err),
      });
    }
  }
