import { IcCartShopping } from '../icons/IcCartShopping';
import { useCart } from '../../context/CartContext';
export function Cart() {
  const { state } = useCart();
  return (
    <>
      <div className="p-2">
        <IcCartShopping />
      </div>
      {/* <span className="absolute top-0 right-0 text-red-600">3</span> */}
    </>
  );
}
