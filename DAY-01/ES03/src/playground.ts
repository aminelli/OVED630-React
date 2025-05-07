import { execute } from "fp-ts/lib/StateT";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
  role: string;
}


type UserKeys = keyof User; // "id" | "name" | "email" | "createdAt" | "isActive" | "role


type FormModel<User> = {
  [K in keyof User]: {
    value: User[K];
    touched: boolean;
    error?: string;
  }
}


// Accesso sicuro alle proprietà

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}


const user: User = {
  id: 1,
  name: "Luca",
  email: "Kb6oN@example.com",
  createdAt: new Date(),
  isActive: true, 
  role: "admin"
} 

const name = getValue(user, "name");
const email = getValue(user, "email");

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
}


type NullableUser = Nullable<User>;

let miavar: NullableUser = {
  id: null,
  name: null,
  email: null,
  createdAt: null,
  isActive: null,
  role: null
} 


miavar.id?.toString()


// Versione avanzata con logica condizionale e infer

type IfEquals<X, Y, A = X, B = never> = 
  (<T>() => T extends X ? 1 : 2) extends 
  (<T>() => T extends Y ? 1 : 2) ? A : B;

  // Rimuove a runtime i readonly dalle proprietà di un oggetto
type WritableKeys<T> = {
  [K in keyof T]-?: IfEquals<{
    [Q in K]: T[K]
  }, {
    -readonly [Q in K]: T[K]
  }, K, never> 
}

type FormModel2<User> = {
  [K in WritableKeys<User> as keyof User ]: {
    value: K;
    touched: boolean;
    error?: string;
  }
}




// Mapped Types

// Rendere tutte le proprietà di un oggetto opzionali
type Optional<T> = {
  [K in keyof T]?: T[K];
}

// Esempio avanzato: rendere proprietà readonly o modificabile

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
}

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
}

let userRO: ReadOnly<User> = {
  id: 1,
  name: "Luca",
  email: "Kb6oN@example.com",
  createdAt: new Date(),
  isActive: true, 
  role: "admin"
} 


// userRO.id = 2


// Esempio avanzato: filtro di proprietà in base al tipo
type FilterByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
}


let obj01: FilterByValueType<User, string> = {
  name: "Luca",
  email: "Kb6oN@example.com",
  role: "admin"
}


// CONDITIONAL TYPES

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

function fethData() : Promise<String[]> {
  return new Promise((resolve) => resolve(["a", "b", "c"]))
}

type FecthResult = ReturnType<typeof fethData>;

// Estrarre i tipi dei parametri da una funzione
type Parameters< T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : any;


function greet(name: string, age: number) {
  console.log(`Ciao ${name}, tu hai ${age} anni!`)
}

type GreetParams = Parameters<typeof greet>; // [String, Number]


// Estrarre i tipi dei parametri di ritorno da una funzione
type ReturnParameters< T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;