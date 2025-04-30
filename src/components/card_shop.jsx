import {NavLink} from "react-router-dom";
import ButtonShop from "./button_shop";
function CardShop({imageSrc,title, linkTo}) {
    return (
        <div className="container mx-auto">
            <div className="relative group overflow-hidden">
                <img className="w-full h-auto object-cover" src={imageSrc} alt={title} />
                <div className="absolute inset-0 group-hover:bg-black group-hover:opacity-40 transition duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition duration-300 z-10">
                    <NavLink to={linkTo}>
                        <ButtonShop/>
                    </NavLink>
                    <h2 className="text-white font-bold text-lg mt-4">POPULAR RIGHT NOW</h2>
                </div>
            </div>
        </div>
    );
}

export default CardShop;
