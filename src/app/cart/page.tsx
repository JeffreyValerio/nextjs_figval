import Link from 'next/link'

const CartPage = () => {
  return (
    <div>
        <Link href={'/checkout'} className='bg-black text-white p-3'>CHECKOUT</Link>
    </div>
  )
}

export default CartPage