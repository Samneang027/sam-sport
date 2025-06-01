import React, {useEffect, useState} from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/adidas messi.jpg";
import { getAllProduct } from "/service/product";
import CardSale from "../components/card_sale";
function AdidasPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        const fetchProduct = async ()=>{
            const data = await getAllProduct();
            setProducts(data.content);
        };
        fetchProduct();
    },[]);
    console.log("Adidas Product" ,products);
    const filteredProducts = products.filter(
        (content) => {
            const matchesCategory = content.brand.uuid === "ab9e0c21-08b4-4d9b-8559-d488b8553a1f";
            const matchesSearch = content.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;

        }
    );
    return (
        <div>
            <Menu searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <section className="mt-16 p-4 md:p-8 lg:p-12 container mx-auto">
                <img src={profile} alt="adidasmessi" />
            </section>
            <section className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
                    {filteredProducts.map((content) =>(
                        <CardSale
                            key={content.uuid}
                            uuid={content.uuid}
                            name={content.name}
                            brand={content.brand?.name}
                            priceOut={`$${content.priceOut}`}
                            images={content.images[0] || content.thumbnail}
                        />
                    ))}
                </div>
            </section>
            <Footer/>
        </div>
    );
}export default AdidasPage;