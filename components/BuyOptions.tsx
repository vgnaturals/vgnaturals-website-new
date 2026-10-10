
"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";
import Link from "next/link";

export default function BuyOptions({ p }: { p: Product }) {
  const [i, setI] = useState(0);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const whatsapp =
    "https://wa.me/919044210088?text=" +
    encodeURIComponent(
      `Hello VG Naturals, I would like to enquire about ${p.name}. Required quantity: . Delivery location: .`
    );

  if (p.status !== "ready") {
    return (
      <div className="space-y-3">
        <p className="font-bold text-amber-700">
          {p.status === "fresh"
            ? "Availability confirmation required"
            : "Coming Soon — enquiries open"}
        </p>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          {p.status === "fresh" ? "Check Availability" : "Enquire Now"}
        </a>

        <Link
          className="btn btn-outline ml-2"
          href={
            "/bulk-supply?product=" +
            encodeURIComponent(p.name)
          }
        >
          Enquiry Form
        </Link>
      </div>
    );
  }

  const selectedVariant = p.variants[i];

  if (!selectedVariant) {
    return <p>Product variant unavailable.</p>;
  }

  return (
    <div className="space-y-4">
      <label className="block font-semibold">
        Select pack size

        <select
          className="field mt-2"
          value={i}
          onChange={(e) => {
            setI(Number(e.target.value));
            setAdded(false);
          }}
        >
          {p.variants.map((v, j) => (
            <option key={v.label} value={j}>
              {v.label} — ₹{v.price}
            </option>
          ))}
        </select>
      </label>

      <p className="text-2xl font-bold text-green-800">
        ₹{selectedVariant.price}
      </p>

      <button
        type="button"
        className="btn"
        onClick={() => {
          add({
            slug: p.slug,
            name: p.name,
            variant: selectedVariant.label,
            price: selectedVariant.price,
            image: p.image,
          });
          setAdded(true);
        }}
      >
        Add to Cart
      </button>

      <Link
        href="/cart"
        className="btn btn-outline ml-2"
      >
        {added ? "View Cart" : "Cart"}
      </Link>

      <p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="text-green-800 underline"
        >
          Request bulk quote via WhatsApp
        </a>
      </p>
    </div>
  );
}
