"use client";

import Image from "next/image";
import Link from "next/link";
import { BookType, User } from "../types/types";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed" as "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "1000",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: "1001",
};

type BookProps = {
  book: BookType;
  isPurchased: boolean;
  user: User;
};

// eslint-disable-next-line react/display-name
const Book = ({ book, isPurchased, user }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  // const { data: session } = useSession();
  // const user: any = session?.user;
  const router = useRouter();

  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: book.title,
            price: book.price,
            userId: user?.id,
            bookId: book.id,
          }),
        }
      );

      const responseData = await response.json();

      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchaseClick = () => {
    if (isPurchased) {
      alert("その商品は購入済みです。");
    } else {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      //ログインページにリダイレクト
      router.push("/api/auth/signin");
    } else {
      //Stripeで決済
      startCheckout();
    }
  };
  const formattedPrice = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(book.price);

  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a
          onClick={handlePurchaseClick}
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="mt-2 text-lg text-slate-600">この商品は...</p>
            <div className="flex">
              <p className="text-3xl text-red-600">{formattedPrice}</p>
              <p className="text-gray-400 align-text-bottom">+送料</p>
            </div>
          </div>
        </a>

        {showModal && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h3 className="text-xl mb-4">この商品を購入しますか？</h3>
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;
