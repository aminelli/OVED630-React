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



// DECORATORE DI METODI

// Decoratore per misurazione performance
function MeasureTime(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`${String(propertyKey)} execution time: ${end - start} ms`);
      return result;
    };
    
    return descriptor;
  }


  // Decoratore per caching
  function Caching(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const cache = new Map<string, any>();
    
    descriptor.value = function(...args: any[]) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log(`Cache hit for ${String(propertyKey)}`);
        return cache.get(key);
      }
      
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
    
    return descriptor;
  }

  // Decoratore pre forzare retry
  function Retry(attempts: number, delay: number = 0) {
    return function(
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      
      descriptor.value = async function(...args: any[]) {
        let error: Error | null = null;
        
        for (let i = 0; i < attempts; i++) {
          try {
            return await originalMethod.apply(this, args);
          } catch (err) {
            error = err as Error;
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            
            if (delay > 0 && i < attempts - 1) {
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
        
        throw error;
      };
      
      return descriptor;
    };
  }
  
