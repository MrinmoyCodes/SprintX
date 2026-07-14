import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import OfferMarquee from './components/OfferMarquee';
import FeatureStory from './components/FeatureStory';
import OfferBanner from './components/OfferBanner';
import ProductShowcase from './components/ProductShowcase';
import BestSellers from './components/BestSellers';
import FooterAndFaq from './components/FooterAndFaq';
import ProductDetails from './components/ProductDetails';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import ThankYouPage from './components/ThankYouPage';
import ProductListing from './components/ProductListing';
import BrandInfo from './components/BrandInfo';
import ServicesGrid from './components/ServicesGrid';
import CategoriesShowcase from './components/CategoriesShowcase';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── URL ↔ Page Mapping ──────────────────────────────────────────────────────
const pageToPath = {
  home: '/',
  listing: '/shop',
  details: '/product',
  cart: '/cart',
  checkout: '/checkout',
  thankyou: '/thankyou',
};

const pathToPage = (pathname) => {
  if (pathname === '/shop') return 'listing';
  if (pathname.startsWith('/product')) return 'details';
  if (pathname === '/cart') return 'cart';
  if (pathname === '/checkout') return 'checkout';
  if (pathname === '/thankyou') return 'thankyou';
  return 'home';
};

// Extract product id from /product/alpha style URLs
const extractProductId = (pathname) => {
  const match = pathname.match(/^\/product\/(.+)$/);
  return match ? match[1] : null;
};

export default function App() {
  const glowRef = useRef(null);
  const lenisRef = useRef(null);

  // Resolve initial page from URL
  const [currentPage, setCurrentPage] = useState(() => pathToPage(window.location.pathname));
  const [selectedProductId, setSelectedProductId] = useState(() => extractProductId(window.location.pathname));
  const [lastOrder, setLastOrder] = useState(null);
  
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('sprintx_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sprintx_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  // ── Central Navigation Helper ──────────────────────────────────────────────
  const scrollToTop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const navigateTo = useCallback((page, { productId, replace = false, skipScroll = false } = {}) => {
    setCurrentPage(page);

    if (productId !== undefined) {
      setSelectedProductId(productId);
    }

    // Build URL path
    let path = pageToPath[page] || '/';
    if (page === 'details' && (productId || selectedProductId)) {
      path = `/product/${productId || selectedProductId}`;
    }

    // Push or replace history
    if (replace) {
      window.history.replaceState({ page, productId: productId || null }, '', path);
    } else {
      window.history.pushState({ page, productId: productId || null }, '', path);
    }

    if (!skipScroll) {
      scrollToTop();
    }

    if (page === 'home') {
      setTimeout(() => { ScrollTrigger.refresh(); }, 50);
    }
  }, [scrollToTop, selectedProductId]);

  // ── Browser Back / Forward ─────────────────────────────────────────────────
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.page) {
        setCurrentPage(e.state.page);
        if (e.state.productId) setSelectedProductId(e.state.productId);
      } else {
        // Resolve from current URL
        const page = pathToPage(window.location.pathname);
        setCurrentPage(page);
        const pid = extractProductId(window.location.pathname);
        if (pid) setSelectedProductId(pid);
      }
      scrollToTop();
      if (pathToPage(window.location.pathname) === 'home') {
        setTimeout(() => { ScrollTrigger.refresh(); }, 50);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Replace current history entry with state on initial load
    const initialPage = pathToPage(window.location.pathname);
    const initialProductId = extractProductId(window.location.pathname);
    window.history.replaceState({ page: initialPage, productId: initialProductId }, '', window.location.pathname);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToTop]);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size
      );
      if (existingIdx > -1) {
        const newCart = [...prevCart];
        newCart[existingIdx].qty += item.qty;
        return newCart;
      }
      return [...prevCart, item];
    });
  };

  const handleProductSelect = (productId) => {
    console.log("handleProductSelect called inside App.jsx with productId:", productId);
    navigateTo('details', { productId });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Momentum Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Mouse-Following Glow Cursor Light (60 FPS hardware accelerated)
    const handleMouseMove = (e) => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 3. Accessibility Check: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = (e) => {
      if (e.matches) {
        // Disable ScrollTrigger animations for accessibility
        ScrollTrigger.getAll().forEach((trigger) => trigger.disable());
      } else {
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
      }
    };

    // Run initially
    handleMotionPreference(prefersReducedMotion);
    prefersReducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', handleMouseMove);
      prefersReducedMotion.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-primary overflow-x-hidden selection:bg-accent selection:text-primary">
      {/* 1. Global Subtle Noise Grain Overlay */}
      <div className="grain-overlay" />

      {/* 2. Global Mouse-Following Glow Spot */}
      <div 
        ref={glowRef}
        className="pointer-events-none fixed -left-32 -top-32 z-50 h-64 w-64 rounded-full bg-accent/[0.04] blur-[80px]"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* 3. Global Futuristic Background Grid Overlay */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 4. Page Layout Sections */}
      <Navbar 
        cartCount={cartCount} 
        onNavigateHome={() => navigateTo('home')}
        onOpenCart={() => navigateTo('cart')}
        onOpenListing={() => navigateTo('listing')}
      />
      
      {/* Product Details View Wrapper */}
      <div className={currentPage === 'details' ? 'block' : 'hidden'}>
        <ProductDetails 
          productId={selectedProductId} 
          onBack={() => navigateTo('home')}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Shopping Cart View Wrapper */}
      <div className={currentPage === 'cart' ? 'block' : 'hidden'}>
        <CartPage 
          cart={cart} 
          setCart={setCart} 
          onCheckout={() => navigateTo('checkout')}
          onOpenListing={() => navigateTo('listing')}
          onBack={() => navigateTo('home')} 
        />
      </div>

      {/* Checkout View Wrapper */}
      <div className={currentPage === 'checkout' ? 'block' : 'hidden'}>
        <CheckoutPage 
          cart={cart} 
          setCart={setCart} 
          onSuccess={(orderDetails) => {
            setLastOrder(orderDetails);
            setCart([]);
            localStorage.removeItem('sprintx_cart');
            navigateTo('thankyou', { replace: true });
          }}
          onBack={() => navigateTo('cart')} 
          onHome={() => navigateTo('home')}
        />
      </div>

      {/* Thank You View Wrapper */}
      <div className={currentPage === 'thankyou' ? 'block' : 'hidden'}>
        {lastOrder && (
          <ThankYouPage 
            order={lastOrder} 
            onHome={() => navigateTo('home')} 
          />
        )}
      </div>

      {/* Product Listing View Wrapper */}
      <div className={currentPage === 'listing' ? 'block' : 'hidden'}>
        <ProductListing 
          onProductSelect={handleProductSelect}
          onBack={() => navigateTo('home')}
        />
      </div>

      {/* Homepage Views Wrapper */}
      <div className={currentPage === 'home' ? 'block' : 'hidden'}>
        <Hero onProductSelect={handleProductSelect} />
        <TrustBar />
        <OfferMarquee />
        <FeatureStory />
        <OfferBanner />
        <CategoriesShowcase onOpenListing={() => navigateTo('listing')} />
        <ProductShowcase onProductSelect={handleProductSelect} />
        <BestSellers onProductSelect={handleProductSelect} />
        <BrandInfo />
        <ServicesGrid />
        <FooterAndFaq />
      </div>

      {/* Global Footer */}
      <Footer onNavigateHome={() => navigateTo('home')} />
    </div>
  );
}
