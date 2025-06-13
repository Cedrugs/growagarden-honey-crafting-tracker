type MutationType = 'Pollinated' | 'Honey Glazed';

export interface Plant {
    name: string;
    honey: number;
    mutation: MutationType;
    weight: number;
    icon: string;
}