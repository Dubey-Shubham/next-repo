import { NextResponse } from "next/server"

export async function POST() {
    console.log("hello from the server")

    return NextResponse.json({
        success: true
    })
}

// this is route handler
// route handler are shorter than server action