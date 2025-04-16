function Card({ imageSrc, title }) {
    return (
        <div className="bg-primary hover:bg-brown w-28 md:w-50 lg:w-70 mx-auto">
            <div className="h-32 md:h-56 lg:h-82 flex justify-center items-center">
                <img className="max-h-full max-w-full object-contain" src={imageSrc} alt={title} />
            </div>
            <div className="h-16 lg:h-28 flex justify-center items-center">
                <h2 className="text-sm md:text-xl lg:text-3xl font-semibold text-white text-center">{title}</h2>
            </div>
        </div>
    );
}
export default Card;