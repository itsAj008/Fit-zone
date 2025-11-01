import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Facilities from './components/Facilities';
import Trainers from './components/Trainers';
import MembershipPlans from './components/MembershipPlans';
// import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Payment from './components/Payment';
import { useMembershipStore } from './store/membershipStore';

function App() {
  const selectedPlan = useMembershipStore((state) => state.selectedPlan);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Facilities />
      <Trainers />
      <MembershipPlans />
      {/* <Testimonials /> */}
      <Contact />
      {/* <Footer /> */}
      {selectedPlan && <Payment />}
    </div>
  );
}

export default App;
