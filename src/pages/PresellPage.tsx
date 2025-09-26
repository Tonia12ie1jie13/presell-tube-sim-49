import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import presellImage from "@/assets/presell-image.avif";

const PresellPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 59,
    seconds: 43
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWatchVideo = () => {
    setIsLoading(true);
    
    // Track click and redirect after loading
    setTimeout(() => {
      navigate(`/assistir-agora?ref=presell1&t=${Date.now()}`);
    }, 1500);
  };

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-end items-center p-4 max-w-6xl mx-auto">
        <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
          Política de Privacidade
        </a>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-5 py-10 text-center">

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="text-primary">7-Second Method Helps Men Get</span>
          <br />
          <span className="text-foreground">It Up on Demand</span>
        </h1>

        {/* Clickable Image */}
        <div className="mb-8 cursor-pointer" onClick={handleWatchVideo}>
          <img 
            src={presellImage} 
            alt="7-Second Method Video Preview" 
            className="w-full max-w-md mx-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        {/* Primary CTA */}
        <Button 
          onClick={handleWatchVideo}
          disabled={isLoading}
          className="bg-primary hover:bg-primary-hover text-primary-foreground px-12 py-6 text-xl font-bold rounded-lg mb-8 disabled:opacity-70"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Loading...
            </div>
          ) : (
            "▶️ WATCH THE VIDEO NOW"
          )}
        </Button>

        {/* Presell Copy */}
        <div className="text-left max-w-lg mx-auto space-y-5 text-lg leading-relaxed">
          <p className="text-foreground">
            <strong>Harvard Scientists</strong> have recently discovered the real root cause of limp issues.
          </p>
          
          <p className="text-muted-foreground">
            It's not a normal part of aging, stress or psychological reasons.
          </p>
          
          <p className="text-foreground">
            They also revealed a simple <strong className="text-primary">7-second nighttime method</strong> to immediately increase blood flow, and improve your performance in the bedroom. Without the need for expensive meds and their side effects, pumps, or exercises.
          </p>
          
          <p className="text-muted-foreground">
            More than 15,000 men are already using this technique to finally "get up", regardless of age or current conditions.
          </p>
          
          <p className="text-foreground">
            The greedy 30 billion dollar male healthcare industry would hate for you to learn this method as it will disrupt their massive profits, so you must act fast!
          </p>
          
          <p className="text-muted-foreground font-semibold">
            Watch the video now before it's too late...
          </p>
        </div>

        {/* Secondary CTA */}
        <Button 
          variant="outline"
          onClick={handleWatchVideo}
          disabled={isLoading}
          className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 text-lg font-semibold rounded-lg mt-8"
        >
          ▶️ WATCH VIDEO BEFORE IT'S GONE
        </Button>

        {/* Countdown Reminder */}
        <div className="bg-muted p-4 rounded-lg mt-8 text-sm">
          <p className="font-semibold">
            ⏰ <strong>LIVE VIDEO ENDS IN:</strong>{" "}
            <span className="text-primary font-bold">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-20 py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">© 2024 SaúdePro. All Rights Reserved.</div>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="/privacy" className="hover:text-foreground">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground">Terms of Service</a>
            <a href="/contact" className="hover:text-foreground">Contact</a>
            <a href="/disclaimer" className="hover:text-foreground">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PresellPage;