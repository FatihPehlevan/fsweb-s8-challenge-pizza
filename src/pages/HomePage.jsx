import Hero from '../Components/Hero/Hero.jsx';
import Navigation from '../Components/Navigation/Navigation.jsx';
import MainSection from '../Components/MainSection/MainSection.jsx';
import Promos from '../Components/Promos/Promos.jsx';
import FeaturedMenu from '../Components/FeaturedMenu/FeaturedMenu.jsx';
import Footer from '../Components/Footer/Footer.jsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Navigation />
      <MainSection>
        <Promos />
        <FeaturedMenu />
      </MainSection>
      <Footer />
    </>
  );
}
