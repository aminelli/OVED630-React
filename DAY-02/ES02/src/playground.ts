
// UTILITY TYPES

// Partial<Type> - Rendere tutte le proprietà di un oggetto opzionali

interface User {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;   
    isActive: boolean;
    role: string;
}

interface UserExtended extends User {
    skills: string[];
}


function updateUser(id: number, updates: Partial<User>) {
    return {
        id,
        ...updates
    }
}

console.log(updateUser(1, { username: 'ciccio' }))
console.log(updateUser(2, { email: 'sO8x4@example.com', isActive: true }))



function updateUser2(user: User, userUpdates: Partial<User>) {
    return {
        ...user,
        ...userUpdates
    }
}

const user1: User = {
    id: 1,
    username: 'ciccio',
    email: 'sO8x4@example.com',
    role: 'admin',
    isActive: false,
    isAdmin: true
}

let user1Update = updateUser2(user1, {email: 'sO8x4@example.com', isActive: true})
console.log(user1Update)


// Awaited<Type> - Utile per estrarre il tipo risolto di una Promise

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
}

type FetchedUser2 = Awaited<Promise<ApiResponse<User>>>;



async function fetchData(): Promise<ApiResponse<User>> {
    return new Promise(
        (resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        id: 1,
                        username: 'ciccio',
                        email: 'sO8x4@example.com',
                        role: 'admin',
                        isActive: false,
                        isAdmin: true
                    },
                    error: null
                })
            })       
        }
    );
}

type FetchedUser = Awaited<ReturnType<typeof fetchData>>;

// FetchedUser => { data: User | null; error: string | null; }

async function processData() {
    const result: FetchedUser  = await fetchData();
    if (result.data) {
       const user:User = result.data; // Typescript sa che result.data è User grazie ad Awaited
       console.log(user)
    }
}

processData();


type DeepPromise  = Promise<Promise<Promise<string>>>;
type Unwrapped = Awaited<DeepPromise>; //string 




// Required<Type> - rende tutte le proprietà di un ceto tipo obbligatorie

interface OptionalTask {
    id: string
    title?: string;
    description?: string;
}

const requiredTask: Required<OptionalTask> = {
    id: '1',
    title: 'title',
    description: 'description'
}


const requiredROTask: Readonly<Required<OptionalTask>> = {
    id: '1',
    title: 'title',
    description: 'description'
}


// Record<Keys, Type> - Crea un oggetto con chiavi di tipo Keys e valori di tipo Type

type Status = 'pending' | 'processig' | 'completed' | 'failed';


type StatusMap = Record<Status, string>;

const StatusDesc: StatusMap = {
    pending: 'In attesa',
    processig: 'In corso',
    completed: 'Completato',
    failed: 'Fallito'
}

console.log("StatusDesc", StatusDesc.pending)


// Pick<Type, Keys> - Estrae le chiavi di un oggetto di tipo Type

type UserDetails = Pick<User, 'id' | 'username' | 'email'>;

const tempUser: UserDetails = {
    id: 1,
    username: 'ciccio',
    email: 'sO8x4@example.com'
}


// Omit<Type, Keys> - Estrae le chiavi di un oggetto di tipo Type

interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    dueDate: Date;
    assignedTo: string;
}

type TaskWithoutAssignedTo = Omit<Task, 'assignedTo'>;

const taskWithoutAssignedTo: TaskWithoutAssignedTo = {
    id: '1',
    title: 'title',
    description: 'description',
    status: 'pending',
    dueDate: new Date()
}
