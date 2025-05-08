
// MERGING


interface Person {
  name: string;
  age: number;
}

interface Person {
  job: string;
}

interface Person {
  role: string;
}


let me: Person = {
  name: 'Antonio',
  age: 30,
  job: 'Developer',
  role: 'Software Engineer'
}



interface Vehicle {
  name: string;
}

interface Car extends Vehicle {
  model: string;
}

interface Cloner {
  clone(vehicle: Vehicle): Vehicle;
}


interface Cloner {
  clone(vehicle: Car): Car;
}

interface Document {
  createElement(tagName: any): Element;
}


interface Document {
  createElement(tagName: 'div'): HTMLDivElement;
  createElement(tagName: 'a'): HTMLDivElement;
}


interface Document {
  createElement(tagName: 'p'): HTMLDivElement;
  createElement(tagName: string): HTMLDivElement;
  createElement(tagName:  "canvas"): HTMLCanvasElement;
}


// mixin

type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin che aggiunge la possibilità di loggare
function Loggable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    log(message: string) {
      console.log(`[LOG]: ${message}`);
    }
  };
}

// Mixin che aggiunge la gestione di timestamp
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();

    updateTimestamp() {
      this.updatedAt = new Date();
    }
  };
}

// Classe di base
class BaseEntity {
  id: number;
  constructor(id: number) {
    this.id = id;
  }
}

// Composizione dei mixin
const ComposedEntity = Timestamped(Loggable(BaseEntity));

const LogggableEntity = Loggable(BaseEntity);
const TimestampedEntity = Timestamped(BaseEntity);

class UserEntity extends ComposedEntity {
  name: string;
  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }
}

class UserEntity2 extends LogggableEntity {

} 

