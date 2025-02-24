/** @format */

export interface Brand {
    id: number;
    brand: string;
}

export interface Model {
    id: number;
    model: string;
}

export interface Edition {
    id: number;
    edition: string;
}

export interface Fuel {
    id: number;
    fuel: string;
}

export interface Color {
    id: number;
    color: string;
}

export interface Engine {
    id: number;
    engine: number;
}

export interface Body {
    id: number;
    body: string;
}

export interface Transmission {
    id: number;
    transmission: string;
}

export interface Option {
    id: number;
    option: string;
}

export interface Photo {
    id: number;
    photo: string;
}

export interface Car {
    id: number;
    encarId: string;
    mileage: number;
    clazz: string | null;
    year: number;
    price: number;
    createdAt: string;
    brand: Brand;
    model: Model;
    edition: Edition;
    fuel: Fuel;
    color: Color;
    engine: Engine;
    body: Body;
    transmission: Transmission;
    options: Option[];
    photos: Photo[];
}
