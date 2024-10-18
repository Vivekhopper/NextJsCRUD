import { MobileModel } from "@/app/utils/models/mobiles"
import { NextResponse } from "next/server";


export async function GET(res,context){
    // console.log("this is context"+context)
    const id=context.params.id
    const product=await MobileModel.findById(id);
    return NextResponse.json({product})
}