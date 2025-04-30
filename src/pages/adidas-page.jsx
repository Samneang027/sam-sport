import React, {useEffect, useState} from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/adidas messi.jpg";
import { getAllProduct } from "/service/product";
import CardSale from "../components/card_sale";
function AdidasPage() {
    // call product
    const [products, setProducts] = useState([]);
    // search product
    const [searchTerm, setSearchTerm] = useState("");
    
    //UseEffect (called-back function, dependency)
    useEffect(() => {
        const fetchProduct = async ()=>{
            const data = await getAllProduct();
            setProducts(data.content);
        };
        fetchProduct();
    },[]);
    console.log("Adidas Product" ,products);
    // Filter product by category name === 'Furniture'
    const filteredProducts = products.filter(
        (content) => {
            const matchesCategory = content.brand.uuid === "2f3a7f65-6d47-4dcc-a56f-79e7b1ca1687";
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