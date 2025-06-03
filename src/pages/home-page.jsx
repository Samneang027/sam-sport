import HeaderSlide from "../components/header_slide";
import Menu from "../components/menu";
import playertennis from "/public/image/player-tennis.jpg";
import ronaldonike from "/public/image/Ronaldo-Nike.jpg";
import playerrunning from "/public/image/player-runing.jpg";
import adidasoffice from "/public/image/adidas office.jpg";
import pumaoffice from "/public/image/puma office.jpg";
import nikeoffice from "/public/image/nike office.jpg";
import nikelandscape from "/public/image/nike-landscape.jpg";
import pumalandscape from "/public/image/puma-landscape.jpg";
import adidaslandscape from "/public/image/adidas-landscape.jpg";
import Card from "../components/card";
import CardShop from "../components/card_shop";
import shirtadidas from "/public/image/Real Madrid C.F.T-shirt Jersey Kit.png";
import balladidas from "/public/image/Ball Adidas Finale.png";
import hatadidas from "/public/image/Cap Hat Adidas.png";
import shoeadidas from "/public/image/Sneakers Adidas Originals Shoe ASICS.png";
import shirtnike from "/public/image/Tracksuit Nike Jacket Hood Windbreaker.png";
import ballnike from "/public/image/Nike Ordem.png";
import hatnike from "/public/image/black Nike fitted cap.png";
import shoenike from "/public/image/Air Force Air Jordan Nike.png";
import shirtpuma from "/public/image/Borussia Dortmund Jersey Shirt Kit.png";
import ballpuma from "/public/image/Asia Arsenal F.C. Ball.png";
import bagpuma from "/public/image/pink and black Puma backpack.png";
import shoepuma from "/public/image/Shoe Cleat Sneakers Puma.png";
import Footer from "../components/footer";
import { Helmet } from "react-helmet";

function HomePage() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          property="og:title"
          content="SAM SPORT - Shop Your Favorite Gear"
        />
        <meta
          property="og:description"
          content="SAM Sport is an e-commerce brand that specializes in selling sportswear, shoes, and various types of sports equipment online. 
                            The company provides a wide range of products for athletes, fitness enthusiasts, and casual sports lovers.
                            As an online retailer, SAM Sport likely operates through a website or mobile app, allowing customers to browse, purchase, 
                            and have products delivered conveniently. It may cater to different sports categories, including running, gym workouts, football, 
                            basketball, and more."
        />
        <meta property="og:image" content="/image/logo-nike.jpg" />
        <meta
          property="og:url"
          content="https://Samneang027.github.io/sam-sport/"
        />
        <meta property="og:type" content="website" />

        <title>SAM SPORT - Shop Your Favorite Gear</title>
      </Helmet>
      <div>
        <Menu />
        <HeaderSlide />
        <section className="p-4 md:p-8 lg:p-12 container mx-auto">
          <h1 className="text-title font-bold text-md md:text-2xl lg:text-4xl text-center pt-4 md:pt-8 lg:pt-12">
            DESIGNED FOR THE GRIND
          </h1>
          <div className="flex justify-center pt-8 md:pt-16 lg:pt-24">
            <img
              className="w-30 h-30 md:w-60 md:h-60 lg:w-90 lg:h-90"
              src={playertennis}
              alt="playertennis"
            />
            <img
              className="w-30 h-30 md:w-60 md:h-60 lg:w-90 lg:h-90 pr-2 pl-2"
              src={ronaldonike}
              alt="ronaldonike"
            />
            <img
              className="w-30 h-30 md:w-60 md:h-60 lg:w-90 lg:h-90"
              src={playerrunning}
              alt="playerrunning"
            />
          </div>
        </section>
        <section className="p-4 md:p-8 lg:p-12 container mx-auto">
          <h1 className="text-title font-bold text-md md:text-2xl lg:text-4xl text-center">
            PRODUCT QUALITY SOURCE
          </h1>
          <div className="flex justify-center pt-8 md:pt-16 lg:pt-24">
            <img
              className="w-40 h-25 md:w-80 md:h-50 lg:w-120 lg:h-75 pr-4 md:pr-8 lg:pr-12"
              src={adidasoffice}
              alt="adidasoffice"
            />
            <p className="text-xs md:text-lg lg:text-3xl text-left">
              Adidas now has global corporate headquarters in Herzogenaurach,
              Germany and many other business locations around the world such as
              London, Portland, Toronto, Tokyo, Australia, Taiwan and Spain.
            </p>
          </div>
          <div className="flex justify-center pt-16 md:pt-24 lg:pt-32">
            <p className="text-xs md:text-lg lg:text-3xl text-right">
              The PUMA corporate Headquarters are located in Herzogenaurach or
              Herzo, as we like to call our hometown, located in southern
              Germany close to Nuremberg. Every day, more than 1000 colleagues
              walk through our doors, ready to push sport and culture forward.
            </p>
            <img
              className="w-40 h-25 md:w-80 md:h-50 lg:w-120 lg:h-75 pl-4 md:pl-8 lg:pl-12"
              src={pumaoffice}
              alt="pumaoffice"
            />
          </div>
          <div className="flex justify-center pt-16 md:pt-24 lg:pt-32">
            <img
              className="w-40 h-25 md:w-80 md:h-50 lg:w-120 lg:h-75 pr-4 md:pr-8 lg:pr-12"
              src={nikeoffice}
              alt="nikeoffice"
            />
            <p className="text-xs md:text-lg lg:text-3xl text-left">
              The Nike Worldwide Headquarters is the global headquarters for
              Nike, Inc., located in an unincorporated area of Washington County
              near Beaverton, Oregon, in the United States. The campus has more
              than 75 buildings on 286 acres, as of 2018.
            </p>
          </div>
        </section>
        <section className="p-4 md:p-8 lg:p-12 container mx-auto">
          <h1 className="text-title font-bold text-md md:text-2xl lg:text-4xl text-center">
            EXPLORE THE COLLECTION
          </h1>
          <div className="pt-8 md:pt-16 lg:pt-24">
            <CardShop
              imageSrc={nikelandscape}
              title="nikelandscape"
              linkTo="/user-dashboard/nike"
            />
            <CardShop
              imageSrc={pumalandscape}
              title="pumalandscape"
              linkTo="/user-dashboard/puma"
            />
            <CardShop
              imageSrc={adidaslandscape}
              title="adidaslandscape"
              linkTo="/user-dashboard/adidas"
            />
          </div>
        </section>
        <section className="p-1 md:p-2 lg:p-3 container mx-auto">
          <h1 className="text-title font-bold text-md md:text-2xl lg:text-4xl text-center pt-3 md:pt-6 lg:pt-9">
            CURRENT MUST-HAVES
          </h1>
          <div>
            <div className="flex justify-center pt-8 md:pt-16 lg:pt-24">
              <Card
                imageSrc={shirtadidas}
                title="Real Madrid C.F T-shirt Jersey Kit"
              />
              <Card imageSrc={balladidas} title="Ball Adidas Finale" />
              <Card imageSrc={hatadidas} title="Cap Hat Adidas" />
            </div>
            <div className="flex justify-center pt-4 md:pt-8 lg:pt-12">
              <Card
                imageSrc={shoeadidas}
                title="Sneakers Adidas Originals Shoe ASICS"
              />
              <Card
                imageSrc={shirtnike}
                title="Tracksuit Nike Jacket Hood Windbreaker"
              />
              <Card imageSrc={ballnike} title="Nike Ordem" />
            </div>
            <div className="flex justify-center pt-4 md:pt-8 lg:pt-12">
              <Card imageSrc={hatnike} title="black Nike fitted cap" />
              <Card imageSrc={shoenike} title="Air Force Air Jordan Nike" />
              <Card
                imageSrc={shirtpuma}
                title="Borussia Dortmund Jersey Shirt Kit"
              />
            </div>
            <div className="flex justify-center pt-4 md:pt-8 lg:pt-12">
              <Card imageSrc={ballpuma} title="Futsal Football Puma Sport" />
              <Card imageSrc={bagpuma} title="Pink and Black Puma Backpack" />
              <Card imageSrc={shoepuma} title="Shoe Cleat Sneakers Puma" />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
export default HomePage;
