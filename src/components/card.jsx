import shoeimage from "/public/image/Air Force Air Jordan Nike.png";
function Card() {
    return (
        <div className="bg-primary hover:bg-brown w-35 h-45 md:w-50 md:h-60 lg:w-70 lg:h-90">
            <a href="#">
                <img className="pt-4 pb-4 lg:pt-8 lg:pb-8" src={shoeimage} alt="Air Jordan" />
                <h2 className="text-md md:text-xl lg:text-3xl font-semibold text-white text-center">Air Force Air Jordan Nike</h2>
            </a>
        </div>
    );
} export default Card;