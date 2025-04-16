import Footer from "../components/footer";
import Menu from "../components/menu";
import profile from "/public/image/cristiano-ronaldo-nike.jpg";
function NikePage() {
    return (
        <body>
            <Menu/>
            <section className="mt-16 p-4 md:p-8 lg:p-12 container mx-auto">
                <img src={profile} alt="ronaldonike" />
            </section>
            <Footer/>
        </body>
    );
}export default NikePage;