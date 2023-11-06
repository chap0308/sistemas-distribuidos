import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";


export async function POST(request){
        
    // const datos = await request.json();
    // console.log(datos);

    const data = await request.formData();
    const image = data.get("file");
    // console.log(image);
    if (!image) {
        return NextResponse.json("No se ha subido ninguna imagen", {
            status: 400,
        });
    }
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), "public/uploads", image.name);
    await writeFile(filePath, buffer);

    return NextResponse.json({
        message: "Imagen subida correctamente",
        status: 200,
    });
}