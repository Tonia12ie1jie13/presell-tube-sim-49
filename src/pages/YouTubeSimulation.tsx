import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import  from "";

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

  const commentDatabase = [
    { user: "James Wilson", message: "I came from Facebook. I hope you can help me. 🤞" },
    { user: "Michael Brown", message: "Your TikTok videos helped me a lot! 👍👍" },
    { user: "Christopher Miller", message: "How long until I see results after using it?" },
    { user: "David Garcia", message: "I'm going to try this recipe today and I'll come back in a few days to tell you the results." },
    { user: "Matthew Jones", message: "I made it and my wife loved it! ❤️" },
    { user: "Joshua Taylor", message: "I'm 73 years old, will it work for me too??" },
    { user: "Andrew Thomas", message: "My energy improved a lot after doing the trick!" },
    { user: "Daniel White", message: "I wanted to last 3 times in a row, does it really work? 😏" },
    { user: "Kevin Martin", message: "My friend recommended I watch this video." },
    { user: "Brian Moore", message: "Finally something that actually works! I'm tired of so many empty promises. 🙌" },
    { user: "Jonathan Lewis", message: "Anyone else from Australia watching? 🇦🇺" },
    { user: "Robert Hall", message: "I'm from the UK, are the ingredients available in supermarkets here? Are they easy to find? 🇬🇧" },
    { user: "Thomas Young", message: "If you have a Walmart near you, you can find it. It's super easy, and where I live the ingredients cost less than 8 dollars. 🛒" },
    { user: "Scott Wright", message: "I hope it works for me, thank you!!" },
    { user: "Patrick Green", message: "I used it for 1 week and it helped me so much, thank you! 🎉😏" },
    { user: "William Harris", message: "So glad I made it in time before the presentation ended." }
  ];

  const userAvatars = ["👤", "👨", "👴", "🧔", "👨‍💼", "👨‍🔬", "👨‍🎓", "👨‍🏫"];
  let commentIndex = 0;

  const getRandomTimestamp = () => {
    const times = ["just now", "2s ago", "5s ago", "10s ago", "15s ago", "20s ago", "30s ago"];
    return times[Math.floor(Math.random() * times.length)];
  };

  const postAutoMessage = () => {
    if (commentIndex >= commentDatabase.length) return;
    
    const comment = commentDatabase[commentIndex];
    const randomAvatar = userAvatars[Math.floor(Math.random() * userAvatars.length)];

    const newComment: Comment = {
      id: Date.now().toString() + Math.random(),
      user: comment.user,
      avatar: randomAvatar,
      message: comment.message,
      timestamp: getRandomTimestamp(),
    };

    setComments(prev => [...prev, newComment]);
    commentIndex++;
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
    }
  };

  useEffect(() => {
    // Start auto messages after 1 second
    const messageInterval = setInterval(() => {
      postAutoMessage();
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
