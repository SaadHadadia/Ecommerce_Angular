export default class Product{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public rating: number,
        public quantity?: number,
        public discount?: number,
    ) {}
    
    getFormattedPrice(): string {
        return `$${this.price.toFixed(2)}`;
    }

    getDiscountedPrice(): string {
        if (this.discount) {
            return (this.price - (this.price * this.discount / 100)).toFixed(2);
        }
        return this.getFormattedPrice();
    }
    
}