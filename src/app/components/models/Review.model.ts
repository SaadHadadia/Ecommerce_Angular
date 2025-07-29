export default class Review {
    constructor(
        public rating?: number,
        public comment?: string,
        public date?: string,
        public reviewerName?: string,
        public reviewerEmail?: string,
    ) { }

}