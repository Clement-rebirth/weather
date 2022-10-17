export interface City {
  nom: string;
  code: string;
  _code: number;
  departement: {
    code: string;
    nom: string;
  };
}
