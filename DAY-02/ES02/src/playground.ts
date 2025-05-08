// npm install reflect-metadata
import 'reflect-metadata'

const classMetadataKey = Symbol('classMetadata');

// Decoratori di Classe

// Decorator factory per la versione di una classe
function Version(version:string) {
    return function<T extends {new(...args:any[]):{}}>(constructor:T) {
        Reflect.defineMetadata(classMetadataKey, version, constructor);
        return class extends constructor {
            version = version;
        }
    }
}


// Decorator per loggare la creazione di un oggetto
function LogClass(target:Function) {
    console.log(`Creating: ${target.name}`);

    //
    const original = target.prototype.constructor;
    
    target.prototype.constructor = function(...args:any[]) {
        console.log(`Creating: ${target.name}`);
        original.apply(this, args);
    }
}


function Singleton<T extends new (...args: any[]) => any>(target: T) : T {
    let instance: InstanceType<T>;

    // Sostituire il construttore originale con quello nuovo
    const newConstructor = function(...args: any[]) {
        if (!instance) {
            instance = new target(...args);
        }
        return instance;
    } as unknown as T;

    // Copiano il prototype del construttore per mantenere l'ereditaarietà prototipale
    newConstructor.prototype = target.prototype;

    return newConstructor;
}


// Uso combinato dei decorator

@Singleton
@LogClass
@Version('1.0')
class APIService {
    constructor (public url:string) {}

    fetch() {
        console.log(`Fetching data from ${this.url}`);
    }
}

const api1 = new APIService('https://api.com');
const api2 = new APIService('https://api.com');

console.log(api1 === api2);

const classData = Reflect.getMetadata(classMetadataKey, APIService);
console.log("Dati della classe:", classData);

