import React, { useEffect , useState } from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/cristiano-ronaldo-nike.jpg";
import { getAllProduct } from "/service/product";
import CardSale from "../components/card_sale";
function NikePage() {
    const [products,setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
        useEffect(()=> {
          const fetchProduct = async ()=>{
            const data = await getAllProduct();
            setProducts(data.content);
          };
          fetchProduct();
        },[]);
console.log("Nike Product",products);
    const filteredProducts = products.filter(
        (content) => {
            const matchesCategory = content.brand.uuid === "1c4d7cd1-accb-4132-a9e2-2772b25cb9a9";
            const matchesSearch = content.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        }
    );
    return (
        <div>
            <Menu searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <section className="mt-16 p-4 md:p-8 lg:p-12">
                <img src={profile} alt="ronaldonike" />
            </section>
            <section className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10">
                {filteredProducts.map((content) => (
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
}export default NikePage;