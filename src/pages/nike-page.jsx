import React, { useEffect , useState } from "react";
import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/cristiano-ronaldo-nike.jpg";
import { getAllProduct } from "/service/product";
import CardSale from "../components/card_sale";
function NikePage() {
    const [products,setProducts] = useState([]);
        //UseEffect (called-back function, dependency)
        useEffect(()=> {
          const fetchProduct = async ()=>{
            const data = await getAllProduct();
            setProducts(data);
          };
          fetchProduct();
        },[]);
console.log("Product",products);
  // Filter products by category name === 'Clothes'
  const filteredProducts = products.filter(
    (product) => product.category?.name === "Clothes"
  );
    return (
        <div>
            <Menu/>
            <section className="mt-16 p-4 md:p-8 lg:p-12">
                <img src={profile} alt="ronaldonike" />
            </section>
            <section className="flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredProducts.map((product) =>(
                        <CardSale
                            key={product.id}
                            title={product.title}
                            slug={product.category?.name}
                            price={`$${product.price}`}
                            images={product.images[0]}
                        />
                    ))}
                </div>
            </section>
            <Footer/>
        </div>
    );
}export default NikePage;