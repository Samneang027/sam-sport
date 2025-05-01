import shoeimage from "/public/image/Air Force Air Jordan Nike.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useCart } from '../contexts/CartContext';
function OrderList({content}) {
    const { updateQuantity, removeFromCart } = useCart();
    if (!content) return null;
    return (
        <div className="p-4 flex border-1 border-secondary justify-between container mx-auto">
            <div className="items-center flex">
                <div className="bg-secondary hover:bg-gray w-20 h-20 md:w-40 md:h-40 flex items-center justify-center">
                    <img src={content.images[0] || content.thumbnail} alt="content.name" className="max-w-full max-h-full" />
                </div>
            </div>
            <div className="pl-2 md:w-90 lg:w-150">
                <div className="w-40 md:w-90 lg:w-150 overflow-hidden whitespace-nowrap">
                    <label className="block font-bold text-md md:text-2xl lg:text-4xl text-title animate-scroll" htmlFor="nameproduct">{content.name}</label>
                </div>
                <label className="block font-bold text-xs md:text-lg lg:text-2xl text-custom" htmlFor="quote">{content.brand.name}</label>
                <div className="pb-2 flex">
                    <label className="pt-2 md:pt-4 font-bold text-xs md:text-lg lg:text-2xl text-title" htmlFor="titlesize">Stock Quantity</label>
                    <div className="bg-white border border-secondary rounded-xl w-10 md:w-15 lg:w-20">
                        <h2 className="p-2 md:p-4 font-bold text-xs md:text-lg lg:text-2xl text-center text-title">{content.stockQuantity}</h2>
                    </div>
                </div>
                <div className="flex justify-between bg-secondary p-1 md:p-3 lg:p-4 rounded-full">
                    <FontAwesomeIcon icon={faCircleMinus} className="text-red-500 text-2xl md:text-3xl lg:text-4xl cursor-pointer hover:text-red-700" onClick={() => updateQuantity(content.uuid, -1)}/>
                    <input type="number" className="w-20 text-center md:text-lg lg:text-2xl" value={content.quantity || 1}/>
                    <FontAwesomeIcon icon={faCirclePlus} className="text-green-500 text-2xl md:text-3xl lg:text-4xl cursor-pointer hover:text-green-700" onClick={() => updateQuantity(content.uuid, 1)}/>
                </div>
            </div>
            <div className="w-50 text-center">
                <label className="font-bold text-md md:text-2xl lg:text-4xl text-title " htmlFor="price">${(content.priceOut * (content.quantity || 1)).toFixed(2)}</label>
                <button onClick={() => removeFromCart(content.uuid)} className="block pt-15 md:pt-27 lg:pt-30"><FontAwesomeIcon icon={faTrash} className="text-red-500 text-2xl md:text-3xl lg:text-4xl cursor-pointer hover:text-red-700" /></button>
            </div>
        </div>
    );
}export default OrderList;