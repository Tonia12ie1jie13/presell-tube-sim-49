import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="mb-6 text-5xl font-bold text-primary">Health Funnel Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Experience a complete medical funnel with presell page and YouTube simulation
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/video-exclusivo')}
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg font-semibold w-full"
          >
            🎬 Start Presell Experience
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/assistir-agora')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-base w-full"
          >
            📱 View YouTube Simulation
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-muted-foreground">
          <p>Demo showcasing conversion-optimized health funnel pages</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
