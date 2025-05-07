
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



