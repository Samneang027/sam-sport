import shoeimage from "/public/image/Air Force Air Jordan Nike.png";
function OrderList() {
    return (
        <div className="p-4 flex">
            <div className="items-center flex">
                <div className="bg-secondary hover:bg-gray w-20 h-20 flex items-center justify-center">
                    <img src={shoeimage} alt="Air Force Air" className="max-w-full max-h-full" />
                </div>
            </div>
            <div className="pl-2">
                <div className="w-40 overflow-hidden whitespace-nowrap">
                    <label className="block font-bold text-md text-title animate-scroll" htmlFor="nameproduct">Air Force Air Jordan Nike</label>
                </div>
                <label className="block font-bold text-xs text-custom" htmlFor="quote">Men's Shoes</label>
                <div className="pb-4 flex">
                    <label className="pt-2 font-bold text-xs md:text-2xl lg:text-4xl text-title" htmlFor="titlesize">Sizes</label>
                    <div className="bg-white border border-secondary rounded-xl w-10 md:w-15 lg:w-20">
                        <h2 className="p-2 md:p-4 font-bold text-xs md:text-2xl lg:text-4xl text-center text-title">20</h2>
                    </div>
                </div>
            </div>
            <div className="w-40 text-center">
                <label className="font-bold text-md text-title " htmlFor="price">$140</label>
            </div>
        </div>
    );
}export default OrderList;