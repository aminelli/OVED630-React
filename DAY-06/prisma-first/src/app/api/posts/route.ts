import { PostService } from "@/lib/services/post.service";
import { APIResponse } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async  function GET() {
    try {
        const posts = await PostService.getAllPosts();

        const response: APIResponse = {
            success: true,
            data: posts,
        }   

        return NextResponse.json(response);


    } catch (error) {
         const response: APIResponse = {
            success: false,
            error: 'Errore in fatch Posts' 
        }   

        return NextResponse.json(response, {status: 500});

    }
}


export async  function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const post = await PostService.createPost(body);

        const response: APIResponse = {
            success: true,
            data: post,
            message: "Post creato con successo"
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