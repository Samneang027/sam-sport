import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import logoadidas from "/public/image/logo-adidas.jpg";
import adidasslide from "/public/image/adidas-slide.jpg";
import logonike from "/public/image/logo-nike.jpg";
import nikeslide from "/public/image/nike-slide.jpg";
import logopuma from "/public/image/logo-puma.jpg";
import pumaslide from "/public/image/puma-grealish.jpg";

function HeaderSlide() {
    return (
        <div className="mt-12 w-full">
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >
                {[logoadidas, adidasslide, logonike, nikeslide, logopuma, pumaslide].map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <img
                            src={image}
                            alt={`slide-${index}`}
                            className="w-full h-[250px] md:h-[450px] lg:h-[600px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HeaderSlide;
