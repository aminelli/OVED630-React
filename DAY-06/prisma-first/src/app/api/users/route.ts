import { UserService } from "@/lib/services/user.service";
import { APIResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";


export async  function GET() {
    try {
        const users = await UserService.getAllUsers();

        const response: APIResponse = {
            success: true,
            data: users,
        }   

        return NextResponse.json(response);


    } catch (error) {
         const response: APIResponse = {
            success: false,
            error: 'Errore in fatch Utenti' 
        }   

        return NextResponse.json(response, {status: 500});

    }
}


export async  function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const user = await UserService.createUser(body);

        const response: APIResponse = {
            success: true,
            data: user,
            message: "Utente creato con successo"
        }   

        return NextResponse.json(response, {status: 201});


    } catch (error: any) {
         const response: APIResponse = {
            success: false,
            error: error.message ||  'Errore in fcreazione utente' 
        }   

        return NextResponse.json(response, {status: 400});

    }
}