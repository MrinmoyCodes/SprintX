import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiClock, FiActivity, FiMapPin } from 'react-icons/fi';

const contacts = [
  {
    id: 'marcus',
    name: 'Marcus K.',
    avatar: 'MK',
    role: 'Marathon Runner',
    model: 'SprintX Alpha',
    location: 'Boston, MA',
    messages: [
      { sender: 'them', text: "Just crossed the finish line. 2:54:12! That's a 6-minute PR! 🚀", time: '10:42 AM' },
      { sender: 'them', text: "The carbon propulsion plate in the Alpha is actual sorcery. Felt like I was being catapulted forward every stride.", time: '10:43 AM' },
      { sender: 'us', text: "Incredible work Marcus! Congratulations on the new PR! How did the nitrogen cushioning feel on the late miles?", time: '10:45 AM' },
      { sender: 'them', text: "Legs felt fresh even at mile 22. Usually my arches are on fire by then. Zero muscle fatigue today. Unbelievable.", time: '10:48 AM' }
    ]
  },
  {
    id: 'elena',
    name: 'Elena R.',
    avatar: 'ER',
    role: 'Trail & Ultramarathoner',
    model: 'SprintX Hydro-Stealth',
    location: 'Chamonix, FR',
    messages: [
      { sender: 'them', text: "Hit the mountain pass in heavy rain today. Rocks were slick as ice.", time: '2:15 PM' },
      { sender: 'them', text: "The deep lug channels on the Hydro-Stealth gripped everything. Didn't slip once, and my feet are bone dry! 🌧️⛰️", time: '2:17 PM' },
      { sender: 'us', text: "That is awesome Elena! Did the water-resistant mesh breathe well during the steep climbs?", time: '2:20 PM' },
      { sender: 'them', text: "Yes! Usually shields feel like plastic bags, but this knit breathes like standard mesh while keeping water out.", time: '2:22 PM' }
    ]
  },
  {
    id: 'devon',
    name: 'Devon T.',
    avatar: 'DT',
    role: 'Sprinter & Coach',
    model: 'SprintX Pro-Strike',
    location: 'Austin, TX',
    messages: [
      { sender: 'them', text: "First track test with the Pro-Strike wraps today. Block starts are feeling lethal.", time: '6:30 PM' },
      { sender: 'them', text: "The launching stiffness is perfect. Immediate power transfer out of the blocks.", time: '6:31 PM' },
      { sender: 'us', text: "Great to hear! Did you feel any heel slippage during high acceleration?", time: '6:33 PM' },
      { sender: 'them', text: "None. The structured TPU heel cup locks you down completely. Best sprinters I've ever coached in.", time: '6:35 PM' }
    ]
  }
];

export default function RunnerTexts() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [customTexts, setCustomTexts] = useState({}); // { contactId: [messages] }
  const [inputVal, setInputVal] = useState('');

  // Combine static and custom messages
  const activeMessages = [
    ...selectedContact.messages,
    ...(customTexts[selectedContact.id] || [])
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg = {
      sender: 'us',
      text: inputVal,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCustomTexts(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));
    setInputVal('');
  };

  return (
    <section className="relative z-10 w-full bg-[#050505] py-24 border-b border-white/5 overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-white/[0.02] blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-widest text-accent uppercase block font-mono mb-3">
            // TELEMETRY CHATS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none text-secondary mb-3">
            ATHLETES <span className="text-accent not-italic">CONNECTED</span>
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-3" />
          <p className="text-sm font-light text-grayMuted max-w-md mx-auto">
            Real feedback from our global telemetry testers syncing directly from the track and trails.
          </p>
        </div>

        {/* Messaging Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/5 rounded-3xl bg-[#090909]/45 backdrop-blur-xl overflow-hidden min-h-[600px] max-w-5xl mx-auto shadow-2xl">
          
          {/* Contacts Sidebar (Col Span 4) */}
          <div className="lg:col-span-4 border-r border-white/5 flex flex-col">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary font-mono">
                RUNNERS ONLINE
              </span>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[9px] font-bold text-accent font-mono">LIVE FEED</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {contacts.map((contact) => {
                const isActive = contact.id === selectedContact.id;
                const contactMsgs = [
                  ...contact.messages,
                  ...(customTexts[contact.id] || [])
                ];
                const lastMsg = contactMsgs[contactMsgs.length - 1];

                return (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 text-left select-none ${
                      isActive 
                        ? 'bg-accent/5 border-accent/25 shadow-glow-sm' 
                        : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    {/* Avatar Initials */}
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition-colors duration-300 ${
                      isActive ? 'bg-accent text-primary' : 'bg-white/5 text-grayMuted'
                    }`}>
                      {contact.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xs font-black uppercase text-secondary truncate">
                          {contact.name}
                        </h4>
                        <span className="text-[8px] text-white/30 font-mono">
                          {lastMsg ? lastMsg.time : ''}
                        </span>
                      </div>
                      <p className="text-[10px] text-grayMuted font-mono truncate mb-1">
                        {contact.role}
                      </p>
                      <p className="text-[10px] text-white/40 truncate leading-snug">
                        {lastMsg ? lastMsg.text : ''}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Window (Col Span 8) */}
          <div className="lg:col-span-8 flex flex-col h-[500px] lg:h-auto">
            
            {/* Header info */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between bg-[#070707]/60">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-mono font-black text-[10px] text-accent">
                  {selectedContact.avatar}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase text-secondary">
                    {selectedContact.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-bold text-accent font-mono bg-accent/10 border border-accent/20 px-2 py-0.5 rounded uppercase">
                      {selectedContact.model}
                    </span>
                    <span className="text-[9px] text-grayMuted font-mono flex items-center gap-1">
                      <FiMapPin className="h-3 w-3" /> {selectedContact.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-grayMuted text-[9px] font-mono">
                <span className="flex items-center gap-1">
                  <FiActivity className="text-accent h-3.5 w-3.5" /> 
                  HEART RATE: 142 BPM
                </span>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#050505]/20">
              <div className="text-center py-2">
                <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 bg-white/5 border border-white/10 px-3 py-1 rounded-full font-mono">
                  Today's Telemetry Log
                </span>
              </div>

              {activeMessages.map((msg, idx) => {
                const isUs = msg.sender === 'us';

                return (
                  <div
                    key={idx}
                    className={`flex flex-col max-w-[75%] ${isUs ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <div className={`p-4 rounded-2xl text-[11px] leading-relaxed select-text ${
                      isUs
                        ? 'bg-accent text-primary rounded-tr-none font-bold'
                        : 'bg-[#0f0f0f]/90 border border-white/5 text-secondary rounded-tl-none font-light'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="mt-1 text-[8px] text-white/30 font-mono px-1">
                      {msg.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#070707]/60 flex gap-3">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={`Send message to ${selectedContact.name}...`}
                className="flex-1 rounded-full bg-[#050505] border border-white/10 px-5 py-3 text-xs text-secondary placeholder:text-white/20 outline-none transition-all duration-300 focus:border-accent/40 focus:ring-1 focus:ring-accent/20 font-mono"
              />
              <button
                type="submit"
                className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary shadow-glow transition-all duration-300 hover:scale-105 hover:bg-secondary"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
