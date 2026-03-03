// src/pages/Home.jsx
import DepartmentSlider from '../../Components/DepartmentSlider/DepartmentSlider';
import HeroBanner from '../../Components/HeroBanner/HeroBanner';
import Navbar from '../../Components/Navbar/Navbar';
import ThreeCard from '../../Components/ThreeCard/ThreeCard';
import Footer from '../../Components/Footer/Footer'
import FAQSection from '../../Components/FAQSection/FAQSection';
import DoctorsSection from '../../Components/DoctorsSection/DoctorsSection';
import GastroCtaSection from '../../Components/GastroCtaSection/GastroCtaSection';
import TestimonialsSection from '../../Components/TestimonialsSection/TestimonialsSection';
import HomeBlogSection from '../../Components/HomeBlogSection/HomeBlogSection';

function Home() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <ThreeCard/>
      <DepartmentSlider/>
      <DoctorsSection/>
      <GastroCtaSection/>
      <FAQSection/>
      <TestimonialsSection/>
      <HomeBlogSection/>
      <Footer/>

    </div>
  );
}

export default Home;