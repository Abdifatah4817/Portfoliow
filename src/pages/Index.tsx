import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AchievementsStrip from '@/components/AchievementsStrip';
import ProjectShowcase from '@/components/ProjectShowcase';
import SkillsSection from '@/components/SkillsSection';
import JourneyTimeline from '@/components/JourneyTimeline';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import CertificationsGrid from '@/components/CertificationsGrid';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AchievementsStrip />
      <ProjectShowcase />
      <SkillsSection />
      <JourneyTimeline />
      <TestimonialsCarousel />
      <CertificationsGrid />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
