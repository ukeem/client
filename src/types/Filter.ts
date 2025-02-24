/** @format */

export interface FilterCar {
    encarId?: string;
    minMileage?: number;
    maxMileage?: number;
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
    brand?: string;
    model?: string;
    edition?: string;
    fuel?: string;
    color?: string;
    minEngine?: number;
    maxEngine?: number;
    body?: number;
    transmission?: number;
    limit?: number;
    offset?: number;
}

export interface MinYearCarsDto {
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface MaxYearCarsDto {
    minYear: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface MinEngineCarsDto {
    minYear: number;
    maxYear: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface MaxEngineCarsDto {
    minYear: number;
    maxYear: number;
    minEngine: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface MinMileageCarsDto {
    minYear: number;
    maxYear: number;
    minEngine: number;
    maxEngine: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface MaxMileageCarsDto {
    minYear: number;
    maxYear: number;
    minEngine: number;
    maxEngine: number;
    minMileage: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface TransmissionCarsDto {
    minYear: number;
    maxYear: number;
    minEngine: number;
    maxEngine: number;
    minMileage: number;
    maxMileage: number;
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}

export interface BodyCarsDto {
    minYear: number;
    maxYear: number;
    minEngine: number;
    maxEngine: number;
    minMileage: number;
    maxMileage: number;
    transmissionIds: number[];
    brandIds: number[];
    modelIds: number[];
    editionIds: number[];
}
