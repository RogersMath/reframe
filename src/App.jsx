import React, { useState, useEffect } from 'react';
import { RotateCcw, Menu, X, Volume2, VolumeX, Globe } from 'lucide-react';

export default function SelfTalkReframer() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Scenario data with negative self-talk and 4 reframing options
  const scenarios = [
    {
      situation: "You got a C on your first calculus quiz",
      negativeSelfTalk: "I'm so stupid. I'll never understand calculus. I should just drop this class.",
      options: [
        {
          text: "Well, at least I didn't fail completely. C's get degrees, right?",
          effectiveness: 1,
          feedback: "This is resignation, not growth. You're settling rather than identifying how to improve.",
          category: "Resignation"
        },
        {
          text: "The quiz was unfair. The professor didn't teach us this material properly.",
          effectiveness: 0,
          feedback: "Blaming external factors prevents you from identifying what you can control and change.",
          category: "External Blame"
        },
        {
          text: "I haven't mastered calculus yet, but this quiz shows me what I need to work on. I'll go to office hours.",
          effectiveness: 4,
          feedback: "Excellent! You're using 'yet,' identifying specific actions, and taking ownership of your learning.",
          category: "Growth Mindset"
        },
        {
          text: "I got a C, which means there's room to improve. I need to figure out where my understanding broke down.",
          effectiveness: 3,
          feedback: "Good! You're focusing on improvement and analysis, though adding concrete next steps would make this even stronger.",
          category: "Constructive"
        }
      ]
    },
    {
      situation: "You've been staring at a word problem for 15 minutes and still don't know how to start",
      negativeSelfTalk: "Everyone else probably finished this already. I'm the only one who doesn't get it.",
      options: [
        {
          text: "This problem is impossible. Even smart people would struggle with this.",
          effectiveness: 0,
          feedback: "Calling it impossible stops your problem-solving process and doesn't help you move forward.",
          category: "Helplessness"
        },
        {
          text: "I'm not good at word problems, but I can break this down step by step and identify what it's asking.",
          effectiveness: 3,
          feedback: "Good! You're acknowledging the challenge while committing to a strategy. Adding 'yet' would make this even stronger.",
          category: "Constructive"
        },
        {
          text: "I guess I'll just skip this one and hope it's not on the test.",
          effectiveness: 1,
          feedback: "Avoidance doesn't build skills. Struggling with hard problems is how you learn.",
          category: "Avoidance"
        },
        {
          text: "I haven't figured out the approach yet. Let me reread it, identify what I know, and what's confusing me. If I'm still stuck after 20 minutes, I'll ask for help.",
          effectiveness: 4,
          feedback: "Perfect! You're using 'yet,' applying a concrete strategy, and setting a boundary for when to seek help.",
          category: "Growth Mindset"
        }
      ]
    },
    {
      situation: "You're in class and the professor asks a question. You think you know the answer but you're not 100% sure",
      negativeSelfTalk: "What if I'm wrong and everyone thinks I'm dumb? I should just stay quiet.",
      options: [
        {
          text: "I'll wait for someone smarter to answer. They probably know better than me anyway.",
          effectiveness: 0,
          feedback: "Comparing yourself to others and assuming they're smarter undermines your confidence and learning.",
          category: "Social Comparison"
        },
        {
          text: "I think the answer might be X, but I'm not completely sure. Can someone check my reasoning?",
          effectiveness: 4,
          feedback: "Excellent! You're participating, showing intellectual humility, and inviting collaborative learning.",
          category: "Growth Mindset"
        },
        {
          text: "Being wrong in class isn't the end of the world. Everyone makes mistakes.",
          effectiveness: 2,
          feedback: "This is better than silence, but it's still focused on fear of mistakes rather than value of participation.",
          category: "Neutral"
        },
        {
          text: "If I'm wrong, at least I'll learn why. Contributing helps me understand better than staying silent.",
          effectiveness: 3,
          feedback: "Good! You're reframing mistakes as learning opportunities. Stating your thinking would be even better.",
          category: "Constructive"
        }
      ]
    },
    {
      situation: "You're studying for the midterm and realize you don't understand a fundamental concept from week 2",
      negativeSelfTalk: "I'm so far behind. There's no way I can catch up now. I'm going to fail.",
      options: [
        {
          text: "It's too late to learn this now. I'll just focus on memorizing formulas and hope for partial credit.",
          effectiveness: 1,
          feedback: "Surface-level strategies won't help you understand or succeed long-term. It's never too late to build understanding.",
          category: "Resignation"
        },
        {
          text: "I should have asked about this weeks ago. This is my fault for not staying on top of things.",
          effectiveness: 0,
          feedback: "Self-blame doesn't solve the problem. Focus on what you can do now, not what you should have done.",
          category: "Self-Blame"
        },
        {
          text: "I don't fully understand this concept yet, but I have time before the exam. I'll book a tutoring session and work through it.",
          effectiveness: 4,
          feedback: "Perfect! You're using 'yet,' acknowledging you have time, and identifying a concrete action to get help.",
          category: "Growth Mindset"
        },
        {
          text: "I'm confused about this concept, but reviewing the material and doing practice problems will help me figure it out.",
          effectiveness: 3,
          feedback: "Good! You're committing to action. Seeking expert help (tutoring) would make your plan even more effective.",
          category: "Constructive"
        }
      ]
    },
    {
      situation: "Your friend got an A on the exam and you got a B-",
      negativeSelfTalk: "They're just naturally better at math than me. I'll never be that good.",
      options: [
        {
          text: "Some people are just math people and I'm not. That's just how it is.",
          effectiveness: 0,
          feedback: "Fixed mindset language locks you into limitations. Math ability grows with practice and strategy.",
          category: "Fixed Mindset"
        },
        {
          text: "A B- isn't bad. I should be happy with what I got.",
          effectiveness: 1,
          feedback: "While gratitude is fine, this avoids reflection on what you could do differently to improve.",
          category: "Resignation"
        },
        {
          text: "I haven't developed the same strategies my friend uses yet. I should ask them how they studied.",
          effectiveness: 4,
          feedback: "Excellent! You're using 'yet,' recognizing that strategies (not innate ability) drive success, and seeking to learn.",
          category: "Growth Mindset"
        },
        {
          text: "I got a B-, which means I understood most of the material. I want to figure out what tripped me up so I can do better next time.",
          effectiveness: 3,
          feedback: "Good! You're focusing on improvement. Asking about your friend's strategies would add even more value.",
          category: "Constructive"
        }
      ]
    }
  ];

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setShowResults(false);
    setMenuOpen(false);
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    const effectiveness = scenarios[currentScenario].options[optionIndex].effectiveness;
    setScore(prevScore => prevScore + effectiveness);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setShowResults(true);
    }
  };

  const getFinalMessage = () => {
    const maxScore = scenarios.length * 4;
    const percentage = (score / maxScore) * 100;

    if (percentage === 100) {
      return {
        title: "Perfect Growth Mindset! 🎯",
        message: "You've mastered the art of reframing! You consistently chose responses that embrace learning, take ownership, and focus on growth. This mindset will serve you incredibly well in math and beyond.",
        encouragement: "Keep using these reframes when negative self-talk appears. You've got the tools!"
      };
    } else if (percentage >= 80) {
      return {
        title: "Strong Growth Mindset! 💪",
        message: "You're doing great! You chose mostly effective reframes that support learning and growth. A few more scenarios might benefit from even stronger growth-oriented language.",
        encouragement: "Try again to see if you can identify the most powerful reframes in every situation."
      };
    } else if (percentage >= 60) {
      return {
        title: "Developing Growth Mindset 🌱",
        message: "You're on the right track! You avoided the worst responses and showed constructive thinking. There's room to strengthen your reframes by adding more specific action steps and 'yet' language.",
        encouragement: "Play through again to practice recognizing the most effective growth mindset reframes."
      };
    } else {
      return {
        title: "Building Growth Mindset 🌟",
        message: "This is a learning process! You may still be relying on patterns like resignation, blame, or fixed mindset thinking. That's okay—awareness is the first step.",
        encouragement: "Try again and pay attention to reframes that include 'yet,' specific actions, and self-compassion."
      };
    }
  };

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --pbsc-blue: #002855;
      --pbsc-blue-light: #003d7a;
      --pbsc-green: #006b42;
      --pbsc-gold: #c08600;
      --page-bg: #f5f5f5;
      --dark-text: #000000;
      --light-text: #ffffff;
      --subtle-text: #4a4a4a;
      --border-color: #cccccc;
      --focus-color: #005a9c;
      --success: #006b42;
      --warning: #c08600;
      --error: #c41e3a;
    }

    html {
      scroll-behavior: smooth;
      font-size: 16px;
    }

    body {
      font-family: 'Georgia', serif;
      background-color: var(--page-bg);
      color: var(--dark-text);
      line-height: 1.6;
    }

    .skip-link {
      position: absolute;
      top: -100px;
      left: 0;
      background: var(--pbsc-blue);
      color: var(--light-text);
      padding: 1rem 2rem;
      text-decoration: none;
      font-weight: bold;
      z-index: 9999;
      border-radius: 0 0 4px 0;
    }

    .skip-link:focus {
      top: 0;
      outline: 4px solid var(--pbsc-gold);
      outline-offset: 2px;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(135deg, var(--pbsc-blue) 0%, #001a3a 100%);
      color: var(--light-text);
      padding: 1.5rem 2rem;
      box-shadow: 0 4px 20px rgba(0, 40, 85, 0.3);
      border-bottom: 6px solid var(--pbsc-gold);
      position: relative;
    }

    .header-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-header h1 {
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .menu-button {
      background: transparent;
      border: 2px solid var(--light-text);
      color: var(--light-text);
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      width: 44px;
      height: 44px;
    }

    .menu-button:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .menu-button:focus-visible {
      outline: 4px solid var(--pbsc-gold);
      outline-offset: 2px;
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      right: 2rem;
      background: white;
      border: 2px solid var(--pbsc-blue);
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      min-width: 200px;
      z-index: 1000;
      margin-top: 0.5rem;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      cursor: pointer;
      color: var(--dark-text);
      font-family: 'Georgia', serif;
      font-size: 1rem;
      transition: background 0.2s;
      min-height: 44px;
    }

    .menu-item:hover {
      background: var(--page-bg);
    }

    .menu-item:focus-visible {
      outline: 4px solid var(--focus-color);
      outline-offset: -4px;
    }

    .menu-item:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }

    .main-content {
      flex: 1;
      max-width: 900px;
      width: 100%;
      margin: 0 auto;
      padding: 2rem;
    }

    .progress-bar {
      background: var(--border-color);
      height: 8px;
      border-radius: 4px;
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .progress-fill {
      background: linear-gradient(90deg, var(--pbsc-green), var(--pbsc-blue));
      height: 100%;
      transition: width 0.3s ease;
      border-radius: 4px;
    }

    .scenario-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .scenario-label {
      color: var(--pbsc-blue);
      font-weight: 700;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 1rem;
    }

    .situation {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--dark-text);
      margin-bottom: 1.5rem;
      line-height: 1.5;
    }

    .negative-self-talk {
      background: #fff5f5;
      border-left: 4px solid var(--error);
      padding: 1rem 1.5rem;
      margin-bottom: 2rem;
      border-radius: 4px;
    }

    .negative-label {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--error);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .negative-text {
      font-style: italic;
      color: var(--subtle-text);
      line-height: 1.6;
    }

    .prompt {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--pbsc-blue);
      margin-bottom: 1.5rem;
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .option-button {
      background: white;
      border: 3px solid var(--border-color);
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Georgia', serif;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--dark-text);
      min-height: 56px;
      position: relative;
    }

    .option-button:hover:not(:disabled) {
      border-color: var(--pbsc-blue);
      background: rgba(0, 40, 85, 0.02);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 40, 85, 0.1);
    }

    .option-button:focus-visible {
      outline: 4px solid var(--focus-color);
      outline-offset: 4px;
    }

    .option-button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .option-button.selected-correct {
      border-color: var(--success);
      background: #f0fdf4;
    }

    .option-button.selected-good {
      border-color: var(--pbsc-blue);
      background: #eff6ff;
    }

    .option-button.selected-neutral {
      border-color: var(--warning);
      background: #fffbeb;
    }

    .option-button.selected-poor {
      border-color: var(--error);
      background: #fff5f5;
    }

    .feedback-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin-top: 2rem;
      animation: slideUp 0.3s ease-out;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .feedback-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .feedback-category {
      font-weight: 700;
      font-size: 1.1rem;
    }

    .feedback-category.growth {
      color: var(--success);
    }

    .feedback-category.constructive {
      color: var(--pbsc-blue);
    }

    .feedback-category.neutral {
      color: var(--warning);
    }

    .feedback-category.poor {
      color: var(--error);
    }

    .feedback-text {
      color: var(--subtle-text);
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }

    .effectiveness-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .star {
      width: 24px;
      height: 24px;
    }

    .star-filled {
      color: var(--pbsc-gold);
    }

    .star-empty {
      color: var(--border-color);
    }

    .action-button {
      background: var(--pbsc-blue);
      color: var(--light-text);
      border: none;
      border-radius: 8px;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      font-family: 'Georgia', serif;
      cursor: pointer;
      transition: all 0.3s ease;
      min-height: 56px;
      min-width: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .action-button:hover {
      background: var(--pbsc-blue-light);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 40, 85, 0.3);
    }

    .action-button:focus-visible {
      outline: 4px solid var(--focus-color);
      outline-offset: 4px;
    }

    .action-button.secondary {
      background: white;
      color: var(--pbsc-blue);
      border: 3px solid var(--pbsc-blue);
    }

    .action-button.secondary:hover {
      background: var(--pbsc-blue);
      color: var(--light-text);
    }

    .results-container {
      background: white;
      border-radius: 12px;
      padding: 3rem 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      text-align: center;
      animation: slideUp 0.5s ease-out;
    }

    .results-title {
      font-size: 2rem;
      color: var(--pbsc-blue);
      margin-bottom: 1rem;
    }

    .score-display {
      font-size: 3rem;
      font-weight: 700;
      color: var(--pbsc-green);
      margin: 1.5rem 0;
    }

    .results-message {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--subtle-text);
      margin-bottom: 1.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .results-encouragement {
      background: var(--page-bg);
      border-left: 4px solid var(--pbsc-green);
      padding: 1.5rem;
      border-radius: 4px;
      margin: 2rem 0;
      font-size: 1rem;
      color: var(--dark-text);
      line-height: 1.7;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      .app-header h1 {
        font-size: 1.4rem;
      }

      .main-content {
        padding: 1.5rem;
      }

      .scenario-card,
      .feedback-card,
      .results-container {
        padding: 1.5rem;
      }

      .results-title {
        font-size: 1.6rem;
      }

      .score-display {
        font-size: 2.5rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    @media (prefers-contrast: high) {
      .option-button,
      .action-button {
        border-width: 4px;
      }
      
      .option-button:focus-visible,
      .action-button:focus-visible {
        outline-width: 5px;
      }
    }
  `;

  const renderStars = (effectiveness) => {
    return (
      <div className="effectiveness-indicator" aria-label={`Effectiveness: ${effectiveness} out of 4 stars`}>
        {[...Array(4)].map((_, index) => (
          <svg
            key={index}
            className={`star ${index < effectiveness ? 'star-filled' : 'star-empty'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container" lang="en">
      <style>{styles}</style>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header" role="banner">
        <div className="header-content">
          <h1>Self-Talk Reframer</h1>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="menu-dropdown"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="menu-dropdown" id="menu-dropdown" role="menu">
            <button
              className="menu-item"
              onClick={resetGame}
              role="menuitem"
              aria-label="Restart the reframer"
            >
              <RotateCcw size={20} aria-hidden="true" />
              Restart
            </button>
            <button
              className="menu-item"
              onClick={() => setSoundEnabled(!soundEnabled)}
              role="menuitem"
              aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
              disabled
            >
              {soundEnabled ? <Volume2 size={20} aria-hidden="true" /> : <VolumeX size={20} aria-hidden="true" />}
              Sound (Coming Soon)
            </button>
            <button
              className="menu-item"
              role="menuitem"
              aria-label="Change language"
              disabled
            >
              <Globe size={20} aria-hidden="true" />
              Language (Coming Soon)
            </button>
          </div>
        )}
      </header>

      <main id="main-content" role="main">
        <div className="main-content">
          {!showResults ? (
            <>
              <div 
                className="progress-bar" 
                role="progressbar" 
                aria-valuenow={((currentScenario + 1) / scenarios.length) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Progress: scenario ${currentScenario + 1} of ${scenarios.length}`}
              >
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
                />
              </div>

              <div className="scenario-card">
                <div className="scenario-label" aria-label="Scenario number">
                  Scenario {currentScenario + 1} of {scenarios.length}
                </div>
                <div className="situation">
                  {scenarios[currentScenario].situation}
                </div>
                
                <div className="negative-self-talk">
                  <div className="negative-label">Your initial thought:</div>
                  <div className="negative-text">
                    "{scenarios[currentScenario].negativeSelfTalk}"
                  </div>
                </div>

                <div className="prompt">
                  Which reframe would be most effective?
                </div>

                <div className="options-container" role="radiogroup" aria-label="Reframing options">
                  {scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-button ${
                        selectedOption === index
                          ? option.effectiveness === 4
                            ? 'selected-correct'
                            : option.effectiveness === 3
                            ? 'selected-good'
                            : option.effectiveness === 2
                            ? 'selected-neutral'
                            : 'selected-poor'
                          : ''
                      }`}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showFeedback}
                      role="radio"
                      aria-checked={selectedOption === index}
                      aria-label={`Option ${index + 1}: ${option.text}`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>

              {showFeedback && selectedOption !== null && (
                <div className="feedback-card" role="region" aria-live="polite" aria-label="Feedback on your selection">
                  <div className="feedback-header">
                    <span
                      className={`feedback-category ${
                        scenarios[currentScenario].options[selectedOption].effectiveness === 4
                          ? 'growth'
                          : scenarios[currentScenario].options[selectedOption].effectiveness === 3
                          ? 'constructive'
                          : scenarios[currentScenario].options[selectedOption].effectiveness === 2
                          ? 'neutral'
                          : 'poor'
                      }`}
                    >
                      {scenarios[currentScenario].options[selectedOption].category}
                    </span>
                  </div>

                  {renderStars(scenarios[currentScenario].options[selectedOption].effectiveness)}

                  <p className="feedback-text">
                    {scenarios[currentScenario].options[selectedOption].feedback}
                  </p>

                  <button
                    className="action-button"
                    onClick={handleNext}
                    aria-label={currentScenario < scenarios.length - 1 ? "Continue to next scenario" : "View your results"}
                  >
                    {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="results-container" role="region" aria-label="Final results">
              <h2 className="results-title">
                {getFinalMessage().title}
              </h2>

              <div className="score-display" aria-label={`Your score: ${score} out of ${scenarios.length * 4} points, which is ${Math.round((score / (scenarios.length * 4)) * 100)} percent`}>
                {score} / {scenarios.length * 4}
                <div style={{ fontSize: '1.5rem', color: 'var(--subtle-text)', marginTop: '0.5rem' }}>
                  {Math.round((score / (scenarios.length * 4)) * 100)}% Growth Mindset Alignment
                </div>
              </div>

              <p className="results-message">
                {getFinalMessage().message}
              </p>

              <div className="results-encouragement">
                {getFinalMessage().encouragement}
              </div>

              <div className="button-group">
                <button
                  className="action-button"
                  onClick={resetGame}
                  aria-label="Try again to improve your score"
                >
                  <RotateCcw size={20} aria-hidden="true" />
                  Try Again
                </button>
                {score === scenarios.length * 4 && (
                  <button
                    className="action-button secondary"
                    onClick={() => {
                      window.location.href = 'https://pbsc.edu/slc';
                    }}
                    aria-label="Visit the Student Learning Center website"
                  >
                    Visit Student Learning Center
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}