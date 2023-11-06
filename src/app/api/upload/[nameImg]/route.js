import { NextResponse } from "next/server";
import { promisify } from 'util';
import { unlink } from 'fs';
import path from "path";
import { writeFile } from "fs/promises";


export async function PUT(request, {params}){
    const data = await request.formData();
    const image = data.get("file");
    if (!image) {
        return NextResponse.json("No se ha subido ninguna imagen", {
            status: 400,
        });
    }
    // console.log(image);

    const {nameImg} = params;

    // console.log(nameImg);
    //! Eliminamos el archivo
    const unlinkAsync = promisify(unlink);

    // Ruta del archivo a eliminar
    const filePathEliminar = path.join(process.cwd(), 'public/uploads', nameImg);

    await unlinkAsync(filePathEliminar);

    //* Creamos el nuevo archivo
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePathCrear = path.join(process.cwd(), "public/uploads", image.name);
    await writeFile(filePathCrear, buffer);

    return NextResponse.json("imagen actualizado");
}

export async function DELETE(request, {params}) {
    const {nameImg} = params;
    console.log(nameImg);
    
    const unlinkAsync = promisify(unlink);

    // Ruta del archivo a eliminar
    const filePath = path.join(process.cwd(), 'public/uploads', nameImg);

    await unlinkAsync(filePath);

    return NextResponse.json("imagen eliminada");
}