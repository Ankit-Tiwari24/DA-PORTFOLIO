import HeroSection from '../components/HeroSection';
import SampleDashboard from '../components/SampleDashboard';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <div className="bg-slate-100/50 dark:bg-dark-card/30 border-y border-slate-200 dark:border-dark-border">
          <SampleDashboard />
      </div>
      <ProjectsSection />
      <div className="bg-slate-100/50 dark:bg-dark-card/30 border-y border-slate-200 dark:border-dark-border">
          <AchievementsSection />
      </div>
      <ContactSection />
    </div>
  );
}
