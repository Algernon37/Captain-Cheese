import Header from './components/Header/Header';
import WelcomeBlock from './components/WelcomeBlock/WelcomBlock';
import PortfolioBlock from './components/PortfolioBlock/PortfolioBlock';
import ReviewBlock from './components/ReviewBlock/ReviewBlock';
import Guarantees from './components/Guarantees/Guarantees';
import FAQSection from './components/FAQSection/FAQSection';
import BackToTopButton from './components/BackTopButton/BackTopbutton'
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <Header/>
      <WelcomeBlock />
      <PortfolioBlock />
      <ReviewBlock />
      <Guarantees />
      <BackToTopButton />
      <FAQSection />
      <Contact />
      <Footer />
    </>
  )
}

export default App
