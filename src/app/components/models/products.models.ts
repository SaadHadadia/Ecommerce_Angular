export default class Product{
    constructor(
        public _id: number,
        public title: string,
        public description: string,
        public price: number,
        public discountedPrice: number | null,
        public image: string,
        public rating: number,
        public stock?: number,
        public brand?: string,
        public category?: string,
        public isNew?: boolean,
        public type?: string,
        public size?: string[],
    ) {}
    
}