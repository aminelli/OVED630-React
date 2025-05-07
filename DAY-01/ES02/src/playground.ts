
// PROGRAMMAZIONE FUNZIONALE


// Funzione pure vs impure

// Funzione impura - modifica lo stato esterno

let total = 0;

function addTotal(value: number): number {
    total += value;
    return total;
}


// Funzione pura - non modifica lo stato esterno

function add(a: number, b:number):number {
    return a + b;
}



/// IMMUTABILITA' OGGETTI

//  Approcciò mutabile (da evitare)

interface User {
    name: string,
    age: number,
    email: string
}


const user: User = { name: "Tony", age: 33, email: "B2K6w@example.com" };
user.age = 34; // Mutazione dell'oggetto originale


// Approccio immutabile (preferibile)
function updateUserAge(user: User, newAge: number): User {
    return { ...user, age: newAge };
}

const updatedUser = updateUserAge(user, 34);



// IMMUTABILITA' ARRAY

// Approccio mutabile
const numbers = [1, 2, 3, 4, 5];
numbers.push(6);

// Approccio immutabile
function addNumber(numbers: number[], newNumber: number): number[] {
    return [...numbers, newNumber];
}

const updatedNumbers = addNumber(numbers, 6);


// APPROCCIO AVANZATO AL CONCETTO DI IMMUTABILITA' X GLI OGGETTI

interface Address {
    street: string,
    city: string,
    country: string
}

interface Employee {
    name: string,
    age: number,
    address: Address
    skills: string[]
}

let obj1 : Employee = {
    name: "John",
    age: 30,
    address: {
        street: "123 Main St",
        city: "New York",
        country: "USA"
    },
    skills: []
}

obj1.address.street = "456 Elm St";


// Funzione immutabile per aggiornare l'indirizzo
function updateEmployeCity(employee: Employee, newCity: string): Employee {
    return {
         ...employee,
         address: {
             ...employee.address,
             city: newCity
         }
    };
}

function addEmployeeSkill(employee: Employee, newSkill: string): Employee {
    return {
         ...employee,
         skills: [...employee.skills, newSkill]
    };
}


// Immutabilitaà con readonly

interface Point2D {
    readonly x: number,
    readonly y: number
}


const point: Point2D = {
    x: 1,
    y: 2
}

const point2: Point2D = { ...point, y: 3 };

// Array ReadOnly

const numbers2: ReadonlyArray<number> = [1, 2, 3, 4, 5];

const config = {
    apiUrl: "https://api.example.com",
    token: "abc123",
    timeout : 5000,
    retries: 3
} as const;




// COMPOSIZIONI DI FUNZIONI

// Compose e pipe
const toUpper = (s: string) => s.toUpperCase();
const exclaim = (s: string) => `${s}!`;
const trim = (s:string) => s.trim();

const compose = <T>(...fns: Function[]) => 
    (x: T) => fns.reduceRight((v, f) => f(v), x);

const shout = compose(toUpper, exclaim, trim);

console.log(shout("hello"));

const pipe = <T>(x: T, ...fns: Function[]) => fns.reduce((v, f) => f(v), x);

const shout2 = pipe("hello", toUpper, exclaim, trim);
console.log(shout2);

// Esempi avanzati

// Versione avanzata di compose
function composeAdvanced<R>(
    ...fns: Array<(a: any) => any>
  ): (a: any) => R {
    return fns.reduceRight(
      (prevFn, nextFn) => 
        (value: any) => nextFn(prevFn(value)),
      value => value
    ) as (a: any) => R;
  }
  
  // Versione avanzata di pipe
  function pipeAdvanced<T extends any[], R>(
    ...fns: [(arg: T[0]) => any, ...Array<(a: any) => any>]
  ): (...args: T) => R {
    return (...args: T) => {
      return fns.reduce(
        (result, fn, idx) => idx === 0 ? fn(args[0]) : fn(result),
        undefined as any
      ) as R;
    };
  }

interface User2 {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Funzioni per manipolare array di utenti
const filterAdmins = (users: User2[]): User2[] => 
  users.filter(user => user.role === 'admin');

const sortByName = (users: User2[]): User2[] => 
  [...users].sort((a, b) => a.name.localeCompare(b.name));

const getEmails = (users: User2[]): string[] => 
  users.map(user => user.email);

const formatEmails = (emails: string[]): string => 
  emails.join(', ');

// Composizione avanzata
const getAdminEmailsFormatted = composeAdvanced<string>(
  formatEmails,
  getEmails,
  sortByName,
  filterAdmins
);

// Dati di test
const users: User2[] = [
  { id: 1, name: "Mario Rossi", email: "mario@example.com", role: "user" },
  { id: 2, name: "Anna Bianchi", email: "anna@example.com", role: "admin" },
  { id: 3, name: "Carlo Verdi", email: "carlo@example.com", role: "admin" },
  { id: 4, name: "Elena Neri", email: "elena@example.com", role: "user" }
];

console.log(getAdminEmailsFormatted(users)); 


// Funzione per il currying
function curry<T, U, V>(fn: (t: T, u: U) => V): (t: T) => (u: U) => V {
    return (t: T) => (u: U) => fn(t, u);
  }
  
  // Esempio
  function add2(a: number, b: number): number {
    return a + b;
  }
  
  const curriedAdd = curry(add2);
  const add5 = curriedAdd(5);
  console.log(add5(3)); // 8
  
  // Combinazione di currying e composizione
  const multiply = (a: number, b: number): number => a * b;
  const curriedMultiply = curry(multiply);
  const double = curriedMultiply(2);
  const increment = (x: number): number => x + 1;
  
  const doubleAndIncrement = pipe(
    double,
    increment
  );
  
  const doubleAndIncrement2 = pipe(
    increment,
    double
  );
  


  console.log(doubleAndIncrement(5)); // 11

// Gestione errori nelle composition

  // Tipo Result per gestire successo/fallimento
type Result<T> = { success: true; value: T } | { success: false; error: Error };

// Funzioni che restituiscono Result
const safeDivide = (a: number, b: number): Result<number> => {
  if (b === 0) {
    return { success: false, error: new Error("Division by zero") };
  }
  return { success: true, value: a / b };
};

// Funzione per comporre funzioni con gestione degli errori
function composeResult<T, U, V>(
  f: (u: U) => Result<V>,
  g: (t: T) => Result<U>
): (t: T) => Result<V> {
  return (t: T) => {
    const resultG = g(t);
    if (!resultG.success) return resultG as unknown as Result<V>;
    return f(resultG.value);
  };
}

