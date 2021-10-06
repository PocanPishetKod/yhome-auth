import { v4 as getV4 } from 'uuid'

export class UuidGenerator {
    public generate(): string {
        return getV4();
    }
}