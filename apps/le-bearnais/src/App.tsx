import React, { useState, useEffect } from 'react';
import { RestaurantProfile } from './types';
import { getStoredRestaurantData } from './data/restaurant';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MenuSection } from './components/MenuSection';
import { HoursLocation } from './components/HoursLocation';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { Admin } from './pages/Admin';

export const App: React.FC = () => {
  const [restaurant, setRestaurant] = useState<RestaurantProfile>(getStoredRestaurantData());
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash.includes('/admin')) {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const navigateToSite = () => {
    setIsAdminRoute(false);
    window.history.pushState({}, '', window.location.pathname.replace('/admin', '') || '/');
    window.location.hash = '';
  };

  if (isAdminRoute) {
    return (
      <Admin
        restaurant={restaurant}
        onUpdateRestaurant={(updated) => setRestaurant(updated)}
        onBackToSite={navigateToSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#100307] text-stone-100 flex flex-col justify-between selection:bg-brand-secondary selection:text-black">
      <Navbar
        restaurant={restaurant}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="flex-grow">
        <Hero
          restaurant={restaurant}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
        <About restaurant={restaurant} />
        <MenuSection categories={restaurant.menu} />
        <HoursLocation
          restaurant={restaurant}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
      </main>

      <Footer restaurant={restaurant} />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        restaurant={restaurant}
      />
    </div>
  );
};

export default App;
