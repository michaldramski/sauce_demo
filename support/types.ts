export type SortOptionsType =
    | 'Name (A to Z)'
    | 'Name (Z to A)'
    | 'Price (low to high)'
    | 'Price (high to low)';

export enum SortOptionsEnum {
    AZ = 'Name (A to Z)',
    ZA = 'Name (Z to A)',
    LowToHigh = 'Price (low to high)',
    HighToLow = 'Price (high to low)',
}
