export type Profile = 'professional' | 'spiritual' | 'psychological' | 'youth';

export type ProfiledItem = {
  sign: string;
  profiles: Record<Profile, string>;
};

export type IdentityData = {
  sun?: ProfiledItem;
  moon?: ProfiledItem;
  ascendant?: ProfiledItem;
};

export type PlanetData = {
  sign: string;
  profiles: Record<Profile, string>;
};

export type PersonalPlanetsData = {
  mercury?: PlanetData;
  venus?: PlanetData;
  mars?: PlanetData;
};

export type SocialPlanetsData = {
  jupiter?: PlanetData;
  saturn?: PlanetData;
};

export type TranspersonalPlanetsData = {
  uranus?: PlanetData;
  neptune?: PlanetData;
  pluton?: PlanetData;
  pluto?: PlanetData;
};

export type HouseData = {
  sign: string;
  profiles: Record<Profile, string>;
};

export type HousesData = {
  [key: string]: HouseData;
};

export interface AstroReading {
  identity: IdentityData;
  personal_planets: PersonalPlanetsData;
  social_planets: SocialPlanetsData;
  transpersonal_planets: TranspersonalPlanetsData;
  houses: HousesData;
} 