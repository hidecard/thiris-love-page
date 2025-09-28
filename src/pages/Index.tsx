import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";

const Index = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number }[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

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
    // Multiple confetti bursts for dramatic effect
    const colors = ['#ff4081', '#e91e63', '#f48fb1', '#ff80ab', '#ffc1cc'];
    
    // Main burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      scalar: 1.2
    });
    
    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    }, 250);
  }, []);

  const handleSurpriseClick = () => {
    setCurrentStep(1);
    setTimeout(() => {
      setShowMessage(true);
      createHearts(80);
      launchConfetti();
      setCurrentStep(2);
    }, 500);
  };

  // Auto-create occasional hearts for ambiance
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        createHearts(3);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [createHearts]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-romantic-light/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-romantic-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-romantic-glow/5 rounded-full blur-3xl floating"></div>
      </div>

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

      {/* Main Container with Modern Glassmorphism */}
      <div className="glass-container card-stack rounded-3xl p-8 md:p-12 max-w-5xl w-full text-center relative z-10 animate-fade-in">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="display-text text-5xl md:text-7xl font-bold mb-6 floating">
            For Thiri 💖
          </h1>
          <p className="text-xl md:text-2xl text-romantic-secondary/80 font-medium tracking-wide">
            Some special moments crafted just for you...
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-romantic-primary to-romantic-light mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Photo Gallery with Modern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { src: photo1, alt: "I", delay: "0ms" },
            { src: photo2, alt: "Love", delay: "200ms" },
            { src: photo3, alt: "You", delay: "400ms" }
          ].map((image, index) => (
            <div 
              key={index}
              className={`modern-gallery-image group`}
              style={{ animationDelay: image.delay }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-romantic-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                  {image.alt}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Surprise Section */}
        <div className="relative">
          {!showMessage && currentStep === 0 && (
            <div className="animate-bounce-gentle">
              <Button
                onClick={handleSurpriseClick}
                className="modern-button px-12 py-6 text-xl font-bold rounded-2xl text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                ✨ Click for Your Surprise ✨
              </Button>
              <p className="text-romantic-secondary/60 mt-4 text-sm font-medium">
                Something magical awaits you...
              </p>
            </div>
          )}

          {currentStep === 1 && !showMessage && (
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-romantic-primary to-romantic-light rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-ping"></div>
              </div>
              <p className="text-romantic-primary font-semibold text-lg">
                Preparing something special...
              </p>
            </div>
          )}

          {/* Enhanced Love Message */}
          {showMessage && (
            <div className="space-y-8">
              <div className="glass-container rounded-2xl p-8 animate-fade-in-slow">
                <div className="text-3xl md:text-4xl display-text font-bold leading-relaxed mb-6">
                  I love you so much! 💕
                </div>
                <div className="text-xl md:text-2xl text-romantic-secondary font-medium leading-relaxed mb-4">
                  You are my everything, I love you more than words can say.
                </div>
                <div className="text-lg text-romantic-secondary/80 font-medium">
                  Forever and always, you mean the world to me! 🌟💖
                </div>
                
                {/* Interactive hearts that user can click */}
                <div className="flex justify-center space-x-4 mt-8">
                  {['💕', '✨', '🌹', '💖', '🦋'].map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        createHearts(10);
                        confetti({
                          particleCount: 20,
                          spread: 40,
                          origin: { y: 0.7 },
                          colors: ['#ff4081', '#e91e63']
                        });
                      }}
                      className="text-4xl hover:scale-125 transition-transform duration-200 cursor-pointer floating"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Additional interactive message */}
              <div className="text-romantic-secondary/70 text-sm font-medium animate-fade-in-slow">
                Click the hearts above for more surprises! 💫
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;