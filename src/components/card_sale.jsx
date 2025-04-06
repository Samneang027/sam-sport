import shoeimage from "/public/image/Air Force Air Jordan Nike.png";

function CardSale() {
    return (
        <div className="p-4 container mx-auto">
            <a href="#">
                <div className="items-center flex">
                    <div className="bg-secondary hover:bg-gray w-40 h-40 flex items-center justify-center">
                        <img src={shoeimage} alt="Air Force Air" className="max-w-full max-h-full" />
                    </div>
                </div>
                <div className="pt-2">
                    <div className="w-40 overflow-hidden whitespace-nowrap">
                        <label className="block font-bold text-2xl text-title animate-scroll" htmlFor="nameproduct">Air Force Air Jordan Nike</label>
                    </div>
                    <label className="block font-bold text-lg text-custom" htmlFor="quote">Men's Shoes</label>
                    <label className="block font-bold text-lg text-black" htmlFor="price">$140</label>
                </div>
            </a>
        </div>
    );
}export default CardSale;