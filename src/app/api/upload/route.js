import { NextResponse } from "next/server";

export async function POST(request){
    // console.log(request.body);
    
    // const data = await request.formData();
    // console.log(data);
    
    // const image = data.get('file');
    // console.log(image);
    
    const res = await request.json({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data"
        }
    })
    console.log(res);
    

    return NextResponse.json("imagen subida");
}