// app/products/[id]/ProductActionsWrapper.jsx
'use client'

import AddToCartButton from '@/components/AddToCartButton';

export default function ProductActionsWrapper({ productId }) {
  return (
    <AddToCartButton
      productId={productId}
      className="px-6 py-3 rounded-lg font-semibold flex-1"
    />
  );
}
