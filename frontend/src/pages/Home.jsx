import react from 'react';
import HeroSection from '../components/HeroSection';
import TechFocus from '../components/TechFocus';
import FeaturedProjects from '../components/FeaturedProjects';
import CareerGoal from '../components/CareerGoal';

function Home() {
  return (
  <div className="home-page-container">
    <HeroSection />

    <TechFocus />

    <FeaturedProjects />

    <CareerGoal />


    {/* ToDo next
          CallToAction
      */}

    </div>
  );
}

export default Home;