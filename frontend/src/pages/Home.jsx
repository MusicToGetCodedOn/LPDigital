import react from 'react';
import HeroSection from '../components/HeroSection';
import TechFocus from '../components/TechFocus';
import FeaturedProjects from '../components/FeaturedProjects';
import CareerGoal from '../components/CareerGoal';
import CallToAction from '../components/CallToAction';

function Home() {
  return (
  <div className="home-page-container">
    <HeroSection />

    <TechFocus />

    <FeaturedProjects />

    <CareerGoal />

    <CallToAction />


    {/* ToDo next
          CallToAction
      */}

    </div>
  );
}

export default Home;