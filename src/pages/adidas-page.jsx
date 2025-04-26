import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/adidas messi.jpg";
function AdidasPage() {
    return (
        <div>
            <Menu/>
            <section className="mt-16 p-4 md:p-8 lg:p-12 container mx-auto">
                <img src={profile} alt="adidasmessi" />
            </section>
            <Footer/>
        </div>
    );
}export default AdidasPage;