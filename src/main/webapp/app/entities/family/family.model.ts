import { BaseEntity } from 'app/shared';

export class Family implements BaseEntity {
    constructor(
        public id?: number,
        public fname?: string,
        public mname?: string,
        public lname?: string,
        public email?: string,
        public mobile?: number,
        public almobile?: number,
        public occupation?: string,
        public company?: string,
    ) {
    }
}
