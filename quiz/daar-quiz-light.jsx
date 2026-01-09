import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "Hoeveel vrijwilligers heeft jouw organisatie?",
    subtitle: "Dit helpt ons de juiste schaal te bepalen",
    options: [
      { text: "1-25 vrijwilligers", score: 1, icon: "👤" },
      { text: "26-100 vrijwilligers", score: 2, icon: "👥" },
      { text: "101-500 vrijwilligers", score: 3, icon: "👨‍👩‍👧‍👦" },
      { text: "500+ vrijwilligers", score: 4, icon: "🏟️" }
    ]
  },
  {
    id: 2,
    question: "Hoe houd je vrijwilligersgegevens bij?",
    subtitle: "Wees eerlijk — we oordelen niet 😉",
    options: [
      { text: "Excel of Google Sheets", score: 1, icon: "📊" },
      { text: "Papieren administratie", score: 0, icon: "📋" },
      { text: "Een mix van verschillende systemen", score: 2, icon: "🔀" },
      { text: "Dedicated software", score: 4, icon: "💻" }
    ]
  },
  {
    id: 3,
    question: "Hoe lang duurt het om een nieuwe vrijwilliger te onboarden?",
    subtitle: "Van eerste contact tot volledig ingewerkt",
    options: [
      { text: "Meer dan een maand", score: 0, icon: "🐌" },
      { text: "2-4 weken", score: 2, icon: "📅" },
      { text: "1-2 weken", score: 3, icon: "⚡" },
      { text: "Binnen een week", score: 4, icon: "🚀" }
    ]
  },
  {
    id: 4,
    question: "Hoe vaak communiceer je met je vrijwilligers?",
    subtitle: "Denk aan nieuwsbrieven, updates, check-ins",
    options: [
      { text: "Alleen als het nodig is", score: 1, icon: "📭" },
      { text: "Maandelijks", score: 2, icon: "📬" },
      { text: "Wekelijks", score: 3, icon: "📮" },
      { text: "Meerdere keren per week", score: 4, icon: "💬" }
    ]
  },
  {
    id: 5,
    question: "Meet je de tevredenheid van je vrijwilligers?",
    subtitle: "Weet je hoe gelukkig ze zijn?",
    options: [
      { text: "Nee, eigenlijk niet", score: 0, icon: "🤷" },
      { text: "Informeel, via gesprekken", score: 2, icon: "💭" },
      { text: "Jaarlijkse enquête", score: 3, icon: "📝" },
      { text: "Structureel en regelmatig", score: 4, icon: "📈" }
    ]
  },
  {
    id: 6,
    question: "Hoeveel vrijwilligers stoppen binnen het eerste jaar?",
    subtitle: "Een eerlijke inschatting",
    options: [
      { text: "Meer dan 50%", score: 0, icon: "📉" },
      { text: "30-50%", score: 1, icon: "😟" },
      { text: "10-30%", score: 3, icon: "😊" },
      { text: "Minder dan 10%", score: 4, icon: "🌟" }
    ]
  },
  {
    id: 7,
    question: "Kun je aantonen wat de impact is van je vrijwilligers?",
    subtitle: "Aan subsidiegevers, bestuur of sponsors",
    options: [
      { text: "Nee, dat is lastig", score: 0, icon: "❓" },
      { text: "Alleen in uren/aantallen", score: 2, icon: "⏱️" },
      { text: "We hebben basis-rapportages", score: 3, icon: "📊" },
      { text: "Ja, met concrete impactcijfers", score: 4, icon: "🎯" }
    ]
  }
];

const getResult = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  
  if (percentage >= 80) {
    return {
      title: "Vrijwilligerskampioen!",
      emoji: "🏆",
      color: "#10B981",
      bgColor: "#ECFDF5",
      description: "Wow! Jullie vrijwilligersbeleid is uitstekend. Je hebt duidelijk oog voor je mensen.",
      tip: "Met DAAR's Geluksmomenten kun je je impact nog beter zichtbaar maken voor stakeholders.",
      modules: ["Impact Dashboard", "Geluksmomenten"]
    };
  } else if (percentage >= 60) {
    return {
      title: "Goed op weg!",
      emoji: "💪",
      color: "#3B82F6",
      bgColor: "#EFF6FF",
      description: "Je hebt een solide basis, maar er is ruimte voor groei. Vooral op het gebied van meten en communicatie.",
      tip: "Structurele tevredenheidsmeting kan jullie retentie met 40% verbeteren.",
      modules: ["VrijwilligersCheck", "Communicatie", "Smart Matching"]
    };
  } else if (percentage >= 40) {
    return {
      title: "Werk aan de winkel",
      emoji: "🔧",
      color: "#F59E0B",
      bgColor: "#FFFBEB",
      description: "Je vrijwilligers verdienen meer aandacht. De basis is er, maar professionalisering is nodig.",
      tip: "Start met een centraal dossier — dit bespaart gemiddeld 8 uur per week.",
      modules: ["Centraal Dossier", "VrijwilligersCheck", "Communicatie"]
    };
  } else {
    return {
      title: "Tijd voor verandering!",
      emoji: "🚀",
      color: "#EF4444",
      bgColor: "#FEF2F2",
      description: "Eerlijk? Hier liggen grote kansen. Met de juiste tools kun je een enorme sprong maken.",
      tip: "Organisaties in jouw situatie zien na 3 maanden DAAR gemiddeld 50% minder uitval.",
      modules: ["Centraal Dossier", "Smart Matching", "VrijwilligersCheck", "Communicatie"]
    };
  }
};

export default function DaarQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const maxScore = questions.length * 4;
  const result = getResult(totalScore, maxScore);
  const geluksScore = Math.round((totalScore / maxScore) * 100);

  const handleAnswer = (score) => {
    setSelectedOption(score);
    setIsAnimating(true);
    
    setTimeout(() => {
      setAnswers([...answers, score]);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);
    }, 400);
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setSelectedOption(null);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  // DAAR brand colors
  const colors = {
    primary: '#10B981',      // DAAR groen
    primaryDark: '#059669',
    primaryLight: '#D1FAE5',
    dark: '#0F172A',         // Donkere tekst
    gray: '#64748B',
    lightGray: '#F1F5F9',
    white: '#FFFFFF',
    background: '#F8FAFC'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          paddingTop: '24px'
        }}>
          {/* DAAR Logo placeholder */}
          <div style={{
            marginBottom: '24px'
          }}>
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
              <text x="0" y="24" style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '24px',
                fontWeight: '700',
                fill: colors.dark
              }}>Daar</text>
            </svg>
          </div>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: colors.primaryLight,
            padding: '8px 16px',
            borderRadius: '100px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '14px' }}>✨</span>
            <span style={{ 
              color: colors.primaryDark, 
              fontSize: '13px', 
              fontWeight: '600',
              letterSpacing: '0.5px'
            }}>
              VRIJWILLIGERSCHECK
            </span>
          </div>
          
          <h1 style={{
            color: colors.dark,
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: '700',
            margin: '0 0 8px 0',
            lineHeight: '1.2'
          }}>
            Hoe gezond is jouw
            <br />
            <span style={{ color: colors.primary }}>vrijwilligersbeleid?</span>
          </h1>
          <p style={{
            color: colors.gray,
            fontSize: '16px',
            margin: 0
          }}>
            Ontdek in 2 minuten waar je kansen liggen
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: colors.lightGray,
          borderRadius: '100px',
          height: '8px',
          marginBottom: '32px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryDark})`,
            height: '100%',
            width: `${progress}%`,
            borderRadius: '100px',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>

        {!showResult ? (
          /* Question Card */
          <div style={{
            background: colors.white,
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E2E8F0',
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
            opacity: isAnimating ? 0.7 : 1,
            transition: 'all 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                color: colors.gray,
                fontSize: '13px',
                fontWeight: '600'
              }}>
                VRAAG {currentQuestion + 1} VAN {questions.length}
              </span>
              <span style={{
                color: colors.primary,
                fontSize: '13px',
                fontWeight: '600'
              }}>
                {Math.round(progress)}%
              </span>
            </div>

            <h2 style={{
              color: colors.dark,
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: '600',
              margin: '0 0 6px 0',
              lineHeight: '1.3'
            }}>
              {questions[currentQuestion].question}
            </h2>
            <p style={{
              color: colors.gray,
              fontSize: '15px',
              margin: '0 0 28px 0'
            }}>
              {questions[currentQuestion].subtitle}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score)}
                  disabled={selectedOption !== null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    background: selectedOption === option.score 
                      ? colors.primaryLight
                      : colors.white,
                    border: selectedOption === option.score 
                      ? `2px solid ${colors.primary}`
                      : '2px solid #E2E8F0',
                    borderRadius: '14px',
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'left',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedOption === null) {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.background = colors.primaryLight;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedOption === null) {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.background = colors.white;
                    }
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{option.icon}</span>
                  <span style={{
                    color: colors.dark,
                    fontSize: '15px',
                    fontWeight: '500'
                  }}>
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Results Card */
          <div style={{
            background: colors.white,
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            {/* Geluksscore Circle */}
            <div style={{
              width: '140px',
              height: '140px',
              margin: '0 auto 20px',
              position: 'relative'
            }}>
              <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke={colors.lightGray}
                  strokeWidth="10"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke={result.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${geluksScore * 3.77} 377`}
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  color: colors.dark,
                  lineHeight: '1'
                }}>
                  {geluksScore}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: colors.gray,
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  marginTop: '2px'
                }}>
                  GELUKSSCORE
                </div>
              </div>
            </div>

            <div style={{ fontSize: '40px', marginBottom: '8px' }}>
              {result.emoji}
            </div>
            <h2 style={{
              color: colors.dark,
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: '700',
              margin: '0 0 12px 0'
            }}>
              {result.title}
            </h2>
            <p style={{
              color: colors.gray,
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 24px 0',
              maxWidth: '440px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {result.description}
            </p>

            {/* Tip box */}
            <div style={{
              background: result.bgColor,
              border: `1px solid ${result.color}30`,
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '28px',
              textAlign: 'left'
            }}>
              <p style={{
                color: colors.dark,
                fontSize: '14px',
                margin: 0,
                lineHeight: '1.6'
              }}>
                <strong style={{ color: result.color }}>💡 Tip:</strong> {result.tip}
              </p>
            </div>

            {/* Recommended modules */}
            <div style={{ marginBottom: '28px' }}>
              <p style={{
                color: colors.gray,
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                marginBottom: '12px'
              }}>
                AANBEVOLEN MODULES
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: 'center'
              }}>
                {result.modules.map((module, i) => (
                  <span key={i} style={{
                    background: colors.primaryLight,
                    color: colors.primaryDark,
                    padding: '8px 14px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: '600'
                  }}>
                    {module}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <a
                href="https://daar.nl"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: colors.primary,
                  color: colors.white,
                  padding: '16px 28px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.primary;
                }}
              >
                Bekijk hoe DAAR helpt
                <span>→</span>
              </a>
              <button
                onClick={restart}
                style={{
                  background: 'transparent',
                  border: `2px solid #E2E8F0`,
                  color: colors.gray,
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary;
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.color = colors.gray;
                }}
              >
                Quiz opnieuw doen
              </button>
            </div>

            {/* Share section */}
            <div style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <p style={{
                color: colors.gray,
                fontSize: '14px',
                marginBottom: '12px'
              }}>
                Deel je score met collega's
              </p>
              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
              }}>
                <button 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    background: colors.white,
                    cursor: 'pointer',
                    fontSize: '18px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.lightGray;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.white;
                  }}
                  onClick={() => {
                    navigator.clipboard?.writeText(
                      `Ik scoorde ${geluksScore}/100 op de DAAR Vrijwilligerscheck! 🎯 Doe de quiz: daar.nl/quiz`
                    );
                  }}
                >
                  📋
                </button>
                <button 
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    background: colors.white,
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#0A66C2',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0A66C2';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = colors.white;
                    e.currentTarget.style.color = '#0A66C2';
                  }}
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=https://daar.nl/quiz`,
                      '_blank'
                    );
                  }}
                >
                  in
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          paddingBottom: '20px'
        }}>
          <p style={{
            color: colors.gray,
            fontSize: '13px'
          }}>
            Gemaakt met 💚 door{' '}
            <a href="https://daar.nl" style={{ color: colors.primary, textDecoration: 'none', fontWeight: '600' }}>
              DAAR
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
