import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import React from "react";

const DetailBook = async ({ params }: { params: { id: string } }) => {
  const book = await getDetailBook(params.id); //SSR
  //   console.log(book);

  const formattedPrice = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(book.price);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={book.thumbnail.url}
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
          alt={book.title}
        />
        <div className="p-4">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <div
            className="text-gray-700 mt-2"
            dangerouslySetInnerHTML={{ __html: book.content }}
          />

          <div className="flex justify-center items-center space-x-2">
            <p className="text-3xl text-red-600">{formattedPrice}</p>
            <p className="text-gray-400">+送料500円</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              公開日:{new Date(book.createdAt as any).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              最終更新:{new Date(book.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
