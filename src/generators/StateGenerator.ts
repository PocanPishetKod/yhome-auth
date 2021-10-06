import { UuidGenerator } from "./UuidGenerator";

export class StateGenerator {
    public generate(): string {
        return new UuidGenerator().generate();
    }
}