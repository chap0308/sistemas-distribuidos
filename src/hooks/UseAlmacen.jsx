"use client"
import { useContext } from "react";
import {AlmacenContext} from "@/context/AlmacenProvider"

const UseAlmacen = () => {
    const values = useContext(AlmacenContext);
    if (!values) throw new Error("valores no encontrados");
    return values;
};

export default UseAlmacen;
