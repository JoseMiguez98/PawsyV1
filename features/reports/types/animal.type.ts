export type AnimalSpecies = "dog" | "cat" | "other";
export type AnimalSize = "small" | "medium" | "large";

export interface Animal {
  id: string;
  species: AnimalSpecies;
  breed?: string;
  color: string;
  size: AnimalSize;
  photos: string[];
}
