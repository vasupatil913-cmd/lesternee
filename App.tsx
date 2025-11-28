import React, { useState, useEffect } from 'react';
import { COURSE_MODULES } from './constants';
import { ModuleData, Subtopic, LearningMode, GeneratedContent, QuizQuestion, Flashcard } from './types';
import { generateContent, askQuestion } from './services/geminiService';
import { ModuleCard } from './components/ModuleCard';
import { LoadingTerminal } from './components/LoadingTerminal';
import { QuizView } from './components/QuizView';
import { FlashcardsView } from './components/FlashcardsView';
import { 
  Terminal, 
  BookOpen, 
  BrainCircuit, 
  Layers, 
  ChevronLeft, 
  Menu,
  FileText,
  Clock,
  Search,
  X,
  MessageSquare
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
  const [mode, setMode] = useState<LearningMode>(LearningMode.LESSON);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Reset content when topic changes
  useEffect(() => {
    if (selectedModule && selectedSubtopic) {
      handleGenerateContent(mode);
    } else {
      setContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubtopic]); 

  // Handle mode switch (Generate new content if mode changes)
  useEffect(() => {
    if (selectedModule && selectedSubtopic) {
      handleGenerateContent(mode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const handleGenerateContent = async (currentMode: LearningMode) => {
    if (!selectedModule || !selectedSubtopic) return;

    setLoading(true);
    setContent(null);
    
    const result = await generateContent(currentMode, selectedModule.title, selectedSubtopic.title);
    setContent(result);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResult(null);
    
    const answer = await askQuestion(searchQuery);
    setSearchResult(answer);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
  };

  const renderMarkdown = (text: string) => {
    const htmlContent = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-300 font-bold">$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc text-slate-300">$1</li>')
      .replace(/^\d\. (.*)/gm, '<li class="ml-4 list-decimal text-slate-300 font-bold mt-2">$1</li>');
    
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  };

  const renderContent = () => {
    if (loading) return <LoadingTerminal message={`Analyzing ${mode.toLowerCase()} parameters...`} />;
    if (!content) return <div className="text-slate-500 mt-10 text-center">Select a topic to begin.</div>;

    switch (content.type) {
      case 'quiz':
        return <QuizView questions={content.content as QuizQuestion[]} onRetry={() => handleGenerateContent(LearningMode.QUIZ)} />;
      case 'flashcards':
        return <FlashcardsView cards={content.content as Flashcard[]} onRetry={() => handleGenerateContent(LearningMode.FLASHCARDS)} />;
      case 'text':
      default:
        return (
          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed bg-slate-900/50 p-8 rounded-lg border border-slate-800">
            {renderMarkdown(content.content as string)}
          </div>
        );
    }
  };

  // Dashboard View
  if (!selectedModule) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-lg text-slate-900">
                <Terminal size={20} strokeWidth={3} />
              </div>
              <span className="font-bold text-xl tracking-tight">CEH<span className="text-emerald-500">Trainer</span>Pro</span>
            </div>
            <div className="text-xs font-mono text-slate-500 hidden sm:block">
              v1.0.0 // SYSTEM_READY
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-4">Certified Ethical Hacker Training</h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              Select a module from the official syllabus below to begin your AI-assisted training session.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative group z-0">
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a question... (e.g., What are the 5 phases of hacking?)"
                  className="w-full bg-slate-900/80 border border-slate-700 text-slate-200 pl-12 pr-12 py-4 rounded-xl shadow-lg focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500 font-mono text-sm"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500" size={20} />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Search Results Area */}
          {(isSearching || searchResult) && (
            <div className="max-w-3xl mx-auto mb-16 animate-[fadeIn_0.3s_ease-out]">
               {isSearching ? (
                 <LoadingTerminal message="Searching syllabus knowledge base..." />
               ) : (
                 <div className="bg-slate-900 border border-emerald-900/30 rounded-xl overflow-hidden shadow-2xl relative">
                   <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                     <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                       <MessageSquare size={16} />
                       <span>AI COACH RESPONSE</span>
                     </div>
                     <button onClick={clearSearch} className="text-slate-500 hover:text-white transition-colors">
                       <X size={16} />
                     </button>
                   </div>
                   <div className="p-8 text-slate-300 leading-relaxed">
                     {renderMarkdown(searchResult || '')}
                   </div>
                 </div>
               )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSE_MODULES.map(module => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                onClick={() => {
                  setSelectedModule(module);
                  setSelectedSubtopic(module.subtopics[0]);
                  setMode(LearningMode.LESSON);
                }} 
              />
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Content View
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* Sidebar for Subtopics */}
      <div className={`fixed inset-y-0 left-0 w-80 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        <div className="p-4 h-16 flex items-center justify-between border-b border-slate-800">
          <button 
            onClick={() => setSelectedModule(null)}
            className="flex items-center text-slate-400 hover:text-emerald-400 transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} className="mr-1" /> All Modules
          </button>
          <button 
            className="md:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="p-4 border-b border-slate-800 bg-slate-800/50">
          <div className="text-xs font-mono text-emerald-500 mb-1">MODULE {selectedModule.id}</div>
          <h2 className="font-bold text-sm leading-tight">{selectedModule.title}</h2>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-8rem)] p-2 space-y-1">
          {selectedModule.subtopics.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSubtopic(sub);
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-3 rounded-lg text-sm transition-all ${
                selectedSubtopic?.title === sub.title 
                  ? 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <div className="font-medium mb-1">{sub.title}</div>
              <div className="text-xs opacity-60 flex items-center">
                <Clock size={10} className="mr-1" /> {sub.time}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:hidden">
          <div className="font-bold truncate mr-4">
             {selectedSubtopic?.title}
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-400">
            <Menu size={24} />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="bg-slate-900/80 border-b border-slate-800 p-4 backdrop-blur flex justify-center md:justify-start gap-2 overflow-x-auto">
           {[
             { id: LearningMode.LESSON, icon: BookOpen, label: 'Lesson' },
             { id: LearningMode.SUMMARY, icon: FileText, label: 'Summary' },
             { id: LearningMode.QUIZ, icon: BrainCircuit, label: 'Quiz' },
             { id: LearningMode.FLASHCARDS, icon: Layers, label: 'Flashcards' },
           ].map((m) => (
             <button
               key={m.id}
               onClick={() => setMode(m.id)}
               className={`flex items-center px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                 mode === m.id 
                   ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                   : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
               }`}
             >
               <m.icon size={16} className="mr-2" />
               {m.label}
             </button>
           ))}
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedSubtopic?.title}</h1>
              {selectedSubtopic?.details && (
                <div className="flex flex-wrap gap-2">
                  {selectedSubtopic.details.map((d, i) => (
                    <span key={i} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {renderContent()}
            
            <div className="h-20" /> {/* Spacer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;