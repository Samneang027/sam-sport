import ButtonAdd from "./button_add";
import shoeimage from "/public/image/Air Force Air Jordan Nike.png";
function CardDetails({content}) {
    if (!content) return null;
    return (
        <div className="flex border border-secondary content-between m-2 md:m-6 lg:m-12 container mx-auto">
            <div className="items-center flex pr-4 pl-4 md:pr-8 md:pl-8 lg:pr-12 lg:pl-12">
                <div className="bg-secondary w-36 h-50 md:w-60 md:h-60 lg:w-90 lg:h-90 flex items-center justify-center rounded-xl">
                    <img src={content.images[0] || content.thumbnail} alt="{content.name}" className="max-w-full max-h-full" />
                </div>
            </div>
            <div>
                <div className="pt-4">
                    <label className="block font-bold text-md md:text-2xl lg:text-4xl text-title" htmlFor="nameproduct">{content.name}</label>
                    <label className="font-bold text-sm md:text-xl lg:text-3xl text-custom" htmlFor="quote">{content.brand.name}</label>
                </div>
                <div className="pt-2 pb-2 md:pt-6 md:pb-6 lg:pt-12 lg:pb-12">
                    <label className="font-bold text-md md:text-2xl lg:text-4xl text-black" htmlFor="price">${content.priceOut}</label>
                </div>
                <div className="pb-4">
                    <label className="font-bold text-md md:text-2xl lg:text-4xl text-custom" htmlFor="titlesize">Stock Quantity</label>
                    <div className="bg-white border border-secondary rounded-xl w-10 md:w-15 lg:w-20">
                        <h2 className="p-2 md:p-4 font-bold text-md md:text-2xl lg:text-4xl text-center">{content.stockQuantity}</h2>
                    </div>
                </div>
                <div className="max-h-20 lg:max-h-25 overflow-y-auto pt-2 pr-4 md:pr-8 lg:pr-12">
                    <p className="text-custom text-xs lg:text-xl text-justify">{content.description}</p>
                </div>
                <ButtonAdd content={content}/>
            </div>
        </div>
    );
}export default CardDetails;