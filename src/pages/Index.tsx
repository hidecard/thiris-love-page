import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import romantic1 from "@/assets/romantic-1.jpg";
import romantic2 from "@/assets/romantic-2.jpg";
import romantic3 from "@/assets/romantic-3.jpg";

const Index = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number }[]>([]);

  const createHearts = useCallback((count: number) => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 3,
    }));
    
    setHearts(prev => [...prev, ...newHearts]);
    
    // Remove hearts after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.find(newHeart => newHeart.id === heart.id)));
    }, 7000);
  }, []);

  const launchConfetti = useCallback(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4081', '#e91e63', '#f48fb1', '#ff80ab']
    });
  }, []);

  const handleSurpriseClick = () => {
    setShowMessage(true);
    createHearts(60);
    launchConfetti();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart animate-fall"
          style={{
            left: `${heart.left}vw`,
            animationDuration: `${heart.duration}s`,
          }}
        />
      ))}

      {/* Main Container */}
      <div className="romantic-container rounded-3xl p-12 max-w-4xl text-center relative z-10 animate-fade-in">
        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-bold text-romantic-primary mb-4 font-serif">
          For Thiri 💖
        </h1>
        <p className="text-xl text-romantic-secondary mb-8 font-medium">
          Some special moments for you...
        </p>

        {/* Photo Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="gallery-image rounded-2xl overflow-hidden">
            <img 
              src={romantic1} 
              alt="Romantic moment 1" 
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="gallery-image rounded-2xl overflow-hidden">
            <img 
              src={romantic2} 
              alt="Romantic moment 2" 
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div className="gallery-image rounded-2xl overflow-hidden">
            <img 
              src={romantic3} 
              alt="Romantic moment 3" 
              className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>

        {/* Surprise Button */}
        {!showMessage && (
          <Button
            onClick={handleSurpriseClick}
            className="bg-gradient-to-r from-romantic-primary to-romantic-light hover:from-romantic-secondary hover:to-romantic-primary text-white px-8 py-4 text-lg font-bold rounded-2xl animate-romantic-pulse transition-all duration-300 hover:scale-110 shadow-lg"
          >
            Click for Surprise ✨
          </Button>
        )}

        {/* Love Message */}
        {showMessage && (
          <div className="animate-fade-in-slow text-2xl text-romantic-primary font-semibold leading-relaxed mt-8">
            I love you so much! You are my everything, I love you more than I can say. 💕✨
            <div className="mt-4 text-lg text-romantic-secondary">
              Forever and always, you mean the world to me! 🌟💖
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;