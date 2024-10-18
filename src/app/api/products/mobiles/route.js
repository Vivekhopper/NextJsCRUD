import { monConncetion } from "@/app/utils/config/db";
import { MobileModel } from "@/app/utils/models/mobiles";
import { NextResponse } from "next/server";

const connectDb = async () => {
  await monConncetion();
};

connectDb();
export async function GET() {
  const mobileData = await MobileModel.find({});

  return NextResponse.json({ mobileData });
}
export async function POST(request) {
  const { title, model, price } = await request.json();
  await MobileModel.create({
    title,
    model,
    price,
  });
  return NextResponse.json({ success: "Mobile added successfully" });
}

//put
export async function PUT(req) {
  try {
    const mobileId = req.nextUrl.searchParams.get("id");
    if (!mobileId) {
      return NextResponse.json(
        { error: "Mobile ID is required" },
        { status: 400 }
      );
    }

    const {
      newTitle: title,
      newModel: model,
      newPrice: price,
    } = await req.json();
    if (!title || !model || !price) {
      return NextResponse.json(
        { error: "All fields (title, model, price) are required" },
        { status: 400 }
      );
    }

    const updatedMobile = await MobileModel.findByIdAndUpdate(
      mobileId,
      { title, model, price },
      { new: true }
    );

    if (!updatedMobile) {
      return NextResponse.json({ error: "Mobile not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Mobile updated successfully",
      mobile: updatedMobile,
    });
  } catch (error) {
    console.error("Error updating mobile:", error);
    return NextResponse.json(
      { error: "Failed to update mobile" },
      { status: 500 }
    );
  }
}


export async function DELETE(req){
    const mobileId = req.nextUrl.searchParams.get("id");
    await MobileModel.findByIdAndDelete(mobileId)
    return NextResponse.json({"message":"deleted"})
}