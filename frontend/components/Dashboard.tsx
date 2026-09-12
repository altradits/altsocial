import React, { useState, useEffect, useRef } from 'react';
import { PenTool, FileText, CalendarClock, LogOut, Sparkles, Image as ImageIcon, Smile, Calendar, Send, Trash2, AlertTriangle, Loader2, X } from 'lucide-react';
import { TwitterIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DevToIcon, BitcoinIcon } from './BrandIcons';
import { Post } from '../types';
import { GoogleGenAI } from '@google/genai';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'drafts' | 'scheduled'>('compose');
  const [posts, setPosts] = useState<Post[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'twitter']);
  
  // Image Upload & AI Generation State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('altradits_posts');
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse posts", e);
      }
    }
  }, []);

  // Save to localStorage when posts change
  useEffect(() => {
    localStorage.setItem('altradits_posts', JSON.stringify(posts));
  }, [posts]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      setUploadedImage(base64Data);
      
      const base64String = base64Data.split(',')[1];
      const mimeType = file.type;

      setIsGenerating(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64String
                }
              },
              {
                text: "Analyze this image and write a captivating social media caption. The caption should inspire, educate, or entertain the audience. Keep it authentic and engaging. Include a few relevant emojis and hashtags. Do not include quotation marks around the text."
              }
            ]
          }
        });
        
        if (response.text) {
          setInputText(response.text.trim());
        }
      } catch (error) {
        console.error("Error generating content:", error);
        alert("Failed to generate content from image. Please check your API key or try again.");
      } finally {
        setIsGenerating(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (status: 'draft' | 'scheduled') => {
    if (!inputText.trim() && !uploadedImage) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      text: inputText,
      platforms: selectedPlatforms,
      status,
      createdAt: Date.now(),
      imageUrl: uploadedImage || undefined
    };

    setPosts(prev => [newPost, ...prev]);
    setInputText('');
    setUploadedImage(null);
    setActiveTab(status === 'draft' ? 'drafts' : 'scheduled');
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const drafts = posts.filter(p => p.status === 'draft');
  const scheduled = posts.filter(p => p.status === 'scheduled');

  // Helper to extract a title for blog previews
  const getTitleFromText = (text: string) => {
    if (!text) return "Your Article Title";
    const firstLine = text.split('\n')[0];
    return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
  };

  const getBodyFromText = (text: string) => {
    if (!text) return "Your article content will appear here...";
    const lines = text.split('\n');
    if (lines.length > 1) {
      return lines.slice(1).join('\n').trim();
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold text-xl shadow-sm">
              A
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Altradits</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('compose')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'compose' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <PenTool className="h-5 w-5" /> Compose
          </button>
          <button 
            onClick={() => setActiveTab('drafts')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'drafts' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" /> Drafts
            </div>
            {drafts.length > 0 && (
              <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full text-xs">{drafts.length}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('scheduled')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'scheduled' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5" /> Scheduled
            </div>
            {scheduled.length > 0 && (
              <span className="bg-brand-100 text-brand-700 py-0.5 px-2 rounded-full text-xs">{scheduled.length}</span>
            )}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <LogOut className="h-5 w-5" /> Exit App
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Warning Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-start sm:items-center gap-3 text-amber-800 text-sm">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <p>
            <strong>Local Demo Mode:</strong> Backend connection failed. Your posts and drafts are saved locally to this browser using <code className="bg-amber-100 px-1 rounded">localStorage</code> and will not be actually published to social networks.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          
          {activeTab === 'compose' && (
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold text-slate-900 mb-6">Create Post</h1>
              
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Composer */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-slate-600">Select Platforms</div>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => togglePlatform('linkedin')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('linkedin') ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="LinkedIn"
                      >
                        <LinkedinIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => togglePlatform('twitter')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('twitter') ? 'bg-sky-100 text-sky-500 ring-2 ring-sky-400 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Twitter / X"
                      >
                        <TwitterIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => togglePlatform('facebook')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('facebook') ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Facebook"
                      >
                        <FacebookIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => togglePlatform('instagram')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('instagram') ? 'bg-pink-100 text-pink-600 ring-2 ring-pink-500 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Instagram"
                      >
                        <InstagramIcon className="h-4 w-4" />
                      </button>
                      <div className="w-px h-8 bg-slate-200 mx-1"></div>
                      <button 
                        onClick={() => togglePlatform('devto')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('devto') ? 'bg-slate-800 text-white ring-2 ring-slate-800 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Dev.to"
                      >
                        <DevToIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => togglePlatform('bitcoin')}
                        className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${selectedPlatforms.includes('bitcoin') ? 'bg-orange-100 text-orange-500 ring-2 ring-orange-400 ring-offset-1' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}
                        title="Bitcoin Blogs"
                      >
                        <BitcoinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-h-[400px] rounded-xl bg-white shadow-sm border border-slate-200 flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all relative">
                    
                    {/* Image Preview Area */}
                    {uploadedImage && (
                      <div className="p-4 pb-0">
                        <div className="relative inline-block rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                          <img src={uploadedImage} alt="Uploaded content" className="h-32 w-auto object-cover" />
                          <button 
                            onClick={removeImage}
                            className="absolute top-1 right-1 bg-slate-900/60 text-white rounded-full p-1 hover:bg-slate-900 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Loading Overlay */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-brand-600">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p className="text-sm font-medium">AI is analyzing your image...</p>
                      </div>
                    )}

                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      className="w-full flex-1 p-5 text-slate-700 text-base resize-none focus:outline-none leading-relaxed"
                      placeholder="What do you want to share with the world today? Inspire, educate, or entertain..."
                    />
                    
                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex gap-3 text-slate-400">
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={fileInputRef} 
                          onChange={handleImageUpload} 
                          className="hidden" 
                        />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="hover:text-brand-600 transition-colors flex items-center gap-1" 
                          title="Upload Image & Generate Caption"
                        >
                          <ImageIcon className="h-5 w-5" />
                          <Sparkles className="h-3 w-3 text-brand-500" />
                        </button>
                        <button className="hover:text-brand-600 transition-colors" title="Add Emoji"><Smile className="h-5 w-5" /></button>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleSave('draft')}
                          disabled={!inputText.trim() && !uploadedImage}
                          className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Save Draft
                        </button>
                        <button 
                          onClick={() => handleSave('scheduled')}
                          disabled={(!inputText.trim() && !uploadedImage) || selectedPlatforms.length === 0}
                          className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-sm"
                        >
                          Schedule <Send className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previews */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                  <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-brand-500" />
                    Live Previews
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {selectedPlatforms.length === 0 && (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                        <ImageIcon className="h-12 w-12 mb-4 text-slate-300" />
                        <p>Select at least one platform to see previews.</p>
                      </div>
                    )}

                    {selectedPlatforms.includes('linkedin') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                              Your Name <LinkedinIcon className="h-3 w-3 text-blue-700 ml-1" />
                            </div>
                            <div className="text-xs text-slate-500">Founder | Creator • Just now</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-800 whitespace-pre-line">
                          {inputText || (!uploadedImage && <span className="text-slate-400 italic">Your post will appear here...</span>)}
                        </p>
                        {uploadedImage && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-slate-200">
                            <img src={uploadedImage} alt="Post media" className="w-full h-auto" />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPlatforms.includes('twitter') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                              Your Name <TwitterIcon className="h-3 w-3 text-sky-500 ml-1" />
                            </div>
                            <div className="text-xs text-slate-500">@yourhandle</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-800 whitespace-pre-line">
                          {inputText || (!uploadedImage && <span className="text-slate-400 italic">Your post will appear here...</span>)}
                        </p>
                        {uploadedImage && (
                          <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200">
                            <img src={uploadedImage} alt="Post media" className="w-full h-auto" />
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPlatforms.includes('facebook') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                              Your Page Name <FacebookIcon className="h-3 w-3 text-blue-600 ml-1" />
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              Just now • 🌎
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-800 whitespace-pre-line">
                          {inputText || (!uploadedImage && <span className="text-slate-400 italic">Your post will appear here...</span>)}
                        </p>
                        {uploadedImage && (
                          <div className="mt-3 -mx-5 border-y border-slate-200">
                            <img src={uploadedImage} alt="Post media" className="w-full h-auto" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {selectedPlatforms.includes('instagram') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                          <div className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                            yourhandle <InstagramIcon className="h-3 w-3 text-pink-600 ml-1" />
                          </div>
                        </div>
                        {uploadedImage ? (
                          <div className="w-full aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden border border-slate-200">
                            <img src={uploadedImage} alt="Post media" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full aspect-square bg-slate-100 rounded-lg mb-3 flex items-center justify-center text-slate-400 border border-slate-200">
                            <ImageIcon className="h-8 w-8" />
                          </div>
                        )}
                        <p className="text-sm text-slate-800 whitespace-pre-line">
                          <span className="font-semibold mr-2">yourhandle</span>
                          {inputText || <span className="text-slate-400 italic">Your caption will appear here...</span>}
                        </p>
                      </div>
                    )}

                    {selectedPlatforms.includes('devto') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                        {uploadedImage && (
                          <div className="w-full h-40 bg-slate-100 border-b border-slate-200">
                            <img src={uploadedImage} alt="Cover" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <DevToIcon className="h-5 w-5 text-slate-900" />
                            <span className="text-xs font-medium text-slate-500">DEV Community</span>
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                            {getTitleFromText(inputText)}
                          </h2>
                          <div className="flex gap-2 mb-4">
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#programming</span>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">#productivity</span>
                          </div>
                          <p className="text-sm text-slate-600 whitespace-pre-line line-clamp-3">
                            {getBodyFromText(inputText)}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedPlatforms.includes('bitcoin') && (
                      <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-orange-50 border-b border-orange-100 p-3 flex items-center gap-2">
                          <BitcoinIcon className="h-5 w-5 text-orange-500" />
                          <span className="text-sm font-bold text-orange-900 tracking-tight">Bitcoin Blog Network</span>
                        </div>
                        <div className="p-5">
                          <h2 className="text-2xl font-extrabold text-slate-900 mb-3 font-serif leading-tight">
                            {getTitleFromText(inputText)}
                          </h2>
                          <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                            <span className="font-medium text-slate-700">Satoshi Nakamoto</span>
                            <span>•</span>
                            <span>Just now</span>
                          </div>
                          {uploadedImage && (
                            <div className="w-full h-48 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                              <img src={uploadedImage} alt="Article Cover" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <p className="text-base text-slate-700 whitespace-pre-line leading-relaxed font-serif">
                            {getBodyFromText(inputText)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drafts & Scheduled Views */}
          {(activeTab === 'drafts' || activeTab === 'scheduled') && (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold text-slate-900 mb-6 capitalize">{activeTab}</h1>
              
              <div className="space-y-4">
                {(activeTab === 'drafts' ? drafts : scheduled).length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                    <FileText className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">No {activeTab} yet</h3>
                    <p className="text-slate-500 mt-1">Go to Compose to create your first post.</p>
                    <button 
                      onClick={() => setActiveTab('compose')}
                      className="mt-4 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors"
                    >
                      Compose Post
                    </button>
                  </div>
                ) : (
                  (activeTab === 'drafts' ? drafts : scheduled).map(post => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row gap-4">
                      {post.imageUrl && (
                        <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                          <img src={post.imageUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {post.platforms.includes('linkedin') && <LinkedinIcon className="h-4 w-4 text-blue-700" title="LinkedIn" />}
                          {post.platforms.includes('twitter') && <TwitterIcon className="h-4 w-4 text-sky-500" title="Twitter" />}
                          {post.platforms.includes('facebook') && <FacebookIcon className="h-4 w-4 text-blue-600" title="Facebook" />}
                          {post.platforms.includes('instagram') && <InstagramIcon className="h-4 w-4 text-pink-600" title="Instagram" />}
                          {post.platforms.includes('devto') && <DevToIcon className="h-4 w-4 text-slate-800" title="Dev.to" />}
                          {post.platforms.includes('bitcoin') && <BitcoinIcon className="h-4 w-4 text-orange-500" title="Bitcoin Blog" />}
                          <span className="text-xs text-slate-400 ml-2">
                            {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-slate-700 text-sm whitespace-pre-line line-clamp-3">
                          {post.text || <span className="italic text-slate-400">No text content</span>}
                        </p>
                      </div>
                      <div className="flex sm:flex-col gap-2 justify-end sm:justify-start border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-4">
                        {activeTab === 'drafts' && (
                          <button 
                            onClick={() => {
                              setInputText(post.text);
                              setSelectedPlatforms(post.platforms);
                              setUploadedImage(post.imageUrl || null);
                              setActiveTab('compose');
                              handleDelete(post.id);
                            }}
                            className="px-3 py-1.5 text-sm font-medium text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors"
                          >
                            Edit
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};