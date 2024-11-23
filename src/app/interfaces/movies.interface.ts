export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: Genre[];
  director: string;
  mainActors: string[];
  duration: string;
  rentPrice: number;
  salePrice: number;
  image: string;
  qualification: number;
  releaseDate: string;
  backgroundImage: string;
}

enum Genre {
  ACTION = 'ACTION',
  ADVENTURE = 'ADVENTURE',
  ANIMATION = 'ANIMATION',
  COMEDY = 'COMEDY',
  CRIME = 'CRIME',
  DOCUMENTARY = 'DOCUMENTARY',
  DRAMA = 'DRAMA',
  FAMILY = 'FAMILY',
  FANTASY = 'FANTASY',
  HISTORY = 'HISTORY',
  HORROR = 'HORROR',
  MUSIC = 'MUSIC',
  MYSTERY = 'MYSTERY',
  ROMANCE = 'ROMANCE',
  SCIENCE_FICTION = 'SCIENCE_FICTION',
  TV_MOVIE = 'TV_MOVIE',
  THRILLER = 'THRILLER',
  WAR = 'WAR',
  WESTERN = 'WESTERN',
}

export default Genre;



