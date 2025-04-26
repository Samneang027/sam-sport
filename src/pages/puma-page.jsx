import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/puma macore.jpg";
function PumaPage() {
    return (
        <div>
            <Menu/>
            <section className="mt-16 p-4 md:p-8 lg:p-12 container mx-auto">
                <img src={profile} alt="pumamacore" />
            </section>
            <Footer/>
        </div>
    );
}export default PumaPage;