import react from 'react';
import HeroSection from '../components/HeroSection';
import TechFocus from '../components/TechFocus';
import FeaturedProjects from '../components/FeaturedProjects';
function Home() {
  return (
  <div className="home-page-container">
    <HeroSection />

    <TechFocus />

    <FeaturedProjects />


    {/* ToDo next
          CareerGoal
          CallToAction
      */}

    </div>
  );
}

export default Home;