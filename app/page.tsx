//"use client";

import { getServerSession } from "next-auth";
import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType, Purchase, User } from "./types/types";
import { nextAuthOptions } from "./lib/next-auth/options";
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const { contents } = await getAllBooks(); //ISR
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;

  let purchaseBookIds: string[] = [];

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" } //SSR
    );
    const purchasesData = await response.json();
    //console.log(purchasesData);

    purchaseBookIds = purchasesData.map(
      (purchaseBook: Purchase) => purchaseBook.bookId
    );
    //console.log(purchaseBookIds);
  }

  return (
    <>
      <div className="relative w-full md:h-96">
        <Image
          src="/Music2.jpg"
          alt="Header Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-1/3 left-0 transform -translate-y-1/2 p-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold font-serif">
            - No Music No Life -
          </h1>
        </div>
      </div>
      <main className="flex flex-wrap justify-center items-center md:mt-16 mt-15">
        <h2 className="text-center w-full font-bold text-3xl mb-2">音楽一覧</h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id)}
            user={user}
          />
        ))}
      </main>
    </>
  );
}
