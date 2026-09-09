import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedProducts from "../components/home/FeaturedProducts";
import WhyChooseUs from "../components/home/WhyChooseUs";
import GalleryPreview from "../components/home/GalleryPreview";
import Testimonials from "../components/home/Testimonials";
import ContactPreview from "../components/home/ContactPreview";
import Stats from "../components/home/Stats";
function Home() {
  return (
    <>
      <Hero />
<Categories />
<FeaturedProducts />
<WhyChooseUs />

<Stats />

<GalleryPreview />
<Testimonials />
<ContactPreview />
    </>
  );
}

export default Home;
