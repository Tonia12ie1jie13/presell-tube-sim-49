import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import youtubeHeader from "@/assets/youtube-header-hd.png";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: string;
  isUser?: boolean;
}

const YouTubeSimulation = () => {
  const [searchParams] = useSearchParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [viewers, setViewers] = useState(2400);
  const [userComment, setUserComment] = useState("");
  const [isTyping, setIsTyping] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const commentDatabase = {
    positive: [
      "Wow this actually works! 😮",
      "My husband tried this and amazing!",
      "Thank you for sharing this!",
      "Life changing method! 🙏",
      "Why didn't I find this earlier?",
      "This is incredible! 🎉",
      "Just tried it and wow!",
      "My doctor never told me this...",
      "Finally something that works!",
      "Better than any medication!"
    ],
    questions: [
      "Is this really free?",
      "How long until I see results?",
      "Any side effects?",
      "Works for all ages?",
      "Where can I learn more?",
      "Is there scientific proof?",
      "Can women use this too?",
      "Is this available worldwide?",
      "How do I get started?",
      "What if it doesn't work for me?"
    ],
    testimonials: [
      "62yo and it worked first try!",
      "After 10 years of problems, fixed in 7 seconds!",
      "Better than any pill I've tried!",
      "My wife is amazed! 😂",
      "Saved my marriage honestly",
      "Doctors hate this simple trick",
      "Wish I found this years ago",
      "From skeptic to believer in minutes!"
    ]
  };

  const userAvatars = ["👤", "👨", "👴", "🧔", "👨‍💼", "👨‍🔬", "👨‍🎓", "👨‍🏫"];
  const userNames = [
    "Mike T.", "John D.", "Robert62", "David_Health", "SteveW", "Paul_J", 
    "MarkScience", "TomReviews", "HealthGuru", "WellnessExpert", "DrMike", 
    "FitnessFirst", "LifeChanger", "TruthSeeker", "HealthyLiving", "MedStudent"
  ];

  const getRandomTimestamp = () => {
    const times = ["just now", "2s ago", "5s ago", "10s ago", "15s ago", "20s ago", "30s ago"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const postAutoMessage = () => {
    const messageTypes = Object.keys(commentDatabase) as Array<keyof typeof commentDatabase>;
    const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    const messages = commentDatabase[randomType];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const randomUser = Math.floor(Math.random() * userNames.length);

    const newComment: Comment = {
      id: Date.now().toString() + Math.random(),
      user: userNames[randomUser],
      avatar: userAvatars[randomUser],
      message: randomMessage,
      timestamp: getRandomTimestamp(),
    };

    setComments(prev => [...prev, newComment]);
  };

  const simulateTyping = () => {
    const randomUser = userNames[Math.floor(Math.random() * userNames.length)];
    setIsTyping(`${randomUser} is typing...`);
    
    setTimeout(() => {
      setIsTyping("");
      postAutoMessage();
    }, 2000 + Math.random() * 2000);
  };

  const handleSendComment = () => {
    if (userComment.trim()) {
      const userCommentObj: Comment = {
        id: Date.now().toString(),
        user: "You",
        avatar: "👤",
        message: userComment,
        timestamp: "now",
        isUser: true,
      };

      setComments(prev => [...prev, userCommentObj]);
      setUserComment("");

      // Redirect after user comments (conversion tracking)
      setTimeout(() => {
        window.location.href = '/offer?comment=posted';
      }, 2000);
    }
  };

  useEffect(() => {
    // Start auto messages after 1 second
    const messageInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        postAutoMessage();
      } else {
        simulateTyping();
      }
    }, 3000 + Math.random() * 2000);

    // Update viewer count
    const viewerInterval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(viewerInterval);
    };
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [comments]);

  // Load ConvertAI script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/5a3c6210-9f3a-4d42-8427-df39e7d4df04/players/68d343b63776360127853ce4/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-youtube-bg text-youtube-text max-w-sm mx-auto overflow-hidden">
      {/* YouTube Header */}
      <div className="w-full">
        <img 
          src={youtubeHeader} 
          alt="YouTube Header" 
          className="w-full h-auto"
        />
      </div>

      {/* Video Player */}
      <div className="relative bg-black">
        {/* ConvertAI Smart Player */}
        <div 
          dangerouslySetInnerHTML={{
            __html: `<vturb-smartplayer id="vid-68d343b63776360127853ce4" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`
          }}
        />
        
        {/* Live Badge */}
        <div className="absolute top-3 left-3 bg-youtube-red px-2 py-1 rounded text-xs font-bold z-10">
          🔴 LIVE
        </div>
        
        {/* Viewer Count */}
        <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded text-xs z-10">
          👁️ {viewers.toLocaleString()} watching
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h1 className="text-lg font-semibold leading-tight mb-3">
          🔴 LIVE: The 7-Second Method That's Changing Lives
        </h1>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-sm">
              🏥
            </div>
            <div>
              <div className="font-semibold">Health Science Institute</div>
              <div className="text-xs text-gray-400">254K subscribers</div>
            </div>
          </div>
          <div className="bg-youtube-red text-white px-4 py-2 rounded text-sm font-semibold">
            SUBSCRIBE
          </div>
        </div>
      </div>

      {/* Live Chat */}
      <div className="h-72 border-t border-gray-700">
        <div className="p-3 border-b border-gray-700 text-sm font-semibold">
          Live chat
        </div>
        
        <div ref={chatRef} className="h-52 overflow-y-auto p-2 space-y-2">
          {comments.map((comment) => (
            <div key={comment.id} className={`flex gap-2 text-sm ${comment.isUser ? 'bg-youtube-blue/10 p-2 rounded' : ''}`}>
              <span className="text-base">{comment.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-youtube-blue">
                    {comment.user}
                  </span>
                  {comment.isUser && (
                    <span className="bg-youtube-blue text-black px-1 text-xs rounded">LIVE</span>
                  )}
                  <span className="text-gray-400 text-xs">{comment.timestamp}</span>
                </div>
                <div className="break-words">{comment.message}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 text-sm text-gray-400 italic">
              <span>✏️</span>
              <div>{isTyping}</div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-youtube-secondary p-3 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-lg">+</span>
          <input
            type="text"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
            placeholder="Add a comment..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full border-none outline-none"
          />
          <button
            onClick={handleSendComment}
            className="text-youtube-blue font-semibold px-3"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  );
};

export default YouTubeSimulation;