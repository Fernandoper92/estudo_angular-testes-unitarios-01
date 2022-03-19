import { UniqueIdService } from "./unique-id.service";

describe(UniqueIdService.name, () => {

    //a variavel precisa ser declarada antes do beforeEach
    let service: UniqueIdService = null;
    beforeEach(() => {
        service = new UniqueIdService();
    })

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should generate id when called with prefix`, () => {
        const id = service.generateUniqueIdWithPrefix('app');
        expect(id.startsWith('app-')).toBeTrue();

        //verifica se o tipo é true ou false de forma literal
       //expect(true).toBeTrue(); verdadeiro
        //expect(new Boolean(true)).toBeTrue(); falso

        //compara se é igual de forma literal
        //expect(true).toBe(true); verdadeiro
        //expect(new Boolean(true)).toBe(true); falso

        //verifica se o tupo é verdadeiro de forma genérica
        //expect(true).toBeTruthy(); verdadeiro
        //expect(new Boolean(true)).toBeTruthy; verdadeiro
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate IDs when called multiple times`, () => {
        const ids = new Set();
        for (let i = 0; i < 50; i++) {
            ids.add(service.generateUniqueIdWithPrefix('app'));
        }
        expect(ids.size).toBe(50);
    })

    it(`${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
    should return the number of generated IDs when called`, () => {
        service.generateUniqueIdWithPrefix('app');
        service.generateUniqueIdWithPrefix('app');
        expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
    });

    it(`${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {
        const emptyValues = [null, undefined, '', '0', '1', 'app'];
        emptyValues.forEach(emptyValue => {
            expect(() => service.generateUniqueIdWithPrefix(emptyValue))
            .withContext(`Empty value: ${emptyValue}`).toThrow();
        })
    })
});