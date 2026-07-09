import { useState } from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import {
  Mic,
  Upload,
  TrendingUp,
  BookOpen,
  Award,
  CheckCircle,
  Download,
  Share2
} from 'lucide-react';

const nav = [
  ['/discovery', 'My Skills'],
  ['/badho', 'Badho'],
  ['/seekho', 'Seekho'],
  ['/credentials', 'Meri Sanad']
];

const Card = ({ children }: { children: any }) => (
  <article className="card">{children}</article>
);

function Discovery() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const startVoiceDiscovery = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        'Speech recognition is not supported in this browser. Please use Google Chrome.'
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setSpokenText('Listening... Please speak now.');
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);

      if (event.error === 'not-allowed') {
        setSpokenText(
          'Microphone permission denied. Please allow microphone access.'
        );
      } else {
        setSpokenText(`Voice recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <Page
      title="My Skills · AI Discovery"
      sub="Tell us what you can do — by voice, photo or video"
    >
      <Card>
        <Mic size={42} />

        <h2>Tell us what you can do</h2>

        <button onClick={startVoiceDiscovery} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start voice discovery'}
        </button>

        <button className="ghost">
          <Upload size={16} /> Upload work proof
        </button>

        {spokenText && (
          <div style={{ marginTop: '20px' }}>
            <h3>Your voice input:</h3>
            <p>{spokenText}</p>
          </div>
        )}
      </Card>

      <h2>Skills discovered</h2>

      <div className="grid">
        {[
          'Carpentry 96%',
          'Wood finishing 91%',
          'Measurement 88%',
          'Tool handling 94%'
        ].map((x) => (
          <Card key={x}>
            <CheckCircle /> <b>{x}</b>
            <p>AI recognised from your experience and work evidence.</p>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Badho() {
  return (
    <Page title="Badho · Growth Paths" sub="See where your skills can take you">
      <Card>
        <h2>Suresh's pathway</h2>

        <div className="path">
          {[
            'Carpenter',
            'PM Vishwakarma Certified',
            'Workshop Owner',
            'Export Artisan'
          ].map((x, i) => (
            <span key={x}>
              {x}
              {i < 3 && ' →'}
            </span>
          ))}
        </div>
      </Card>

      <div className="grid">
        {[
          'PM Vishwakarma Certification',
          'PMKVY 4.0 Upskill',
          'Craft India · GI Tag'
        ].map((x) => (
          <Card key={x}>
            <TrendingUp />
            <h3>{x}</h3>
            <p>Official recognition, training and growth benefits.</p>
            <button>View eligibility</button>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Seekho() {
  return (
    <Page
      title="Seekho · Learn"
      sub="Audio-first lessons · 22+ languages · works offline"
    >
      <div className="grid">
        {[
          'Power Tool Safety',
          'Advanced Carpentry',
          'Digital Payments',
          'Customer Communication',
          'Export Basics',
          'AI for Everyday Work'
        ].map((x, i) => (
          <Card key={x}>
            <BookOpen />
            <h3>{x}</h3>

            <p>{10 + i * 5} min · Audio + Video · Certificate</p>

            <progress value={i * 12 + 18} max="100" />

            <button>{i ? 'Start course' : 'Continue'}</button>

            <button className="ghost">
              <Download size={16} /> Offline
            </button>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Credentials() {
  return (
    <Page
      title="Meri Sanad · Credentials"
      sub="Your trusted digital certificate wallet"
    >
      <div className="grid">
        {[
          'PM Vishwakarma Certificate',
          'PMKVY Skill Certificate',
          'Carpentry Level 2',
          'Master Carpenter Badge'
        ].map((x) => (
          <Card key={x}>
            <Award />
            <h3>{x}</h3>

            <p>Verified credential · Government / Community issuer</p>

            <b>✓ Verified</b>

            <button>
              <Share2 size={16} /> Share credential
            </button>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Page({
  title,
  sub,
  children
}: {
  title: string;
  sub: string;
  children: any;
}) {
  return (
    <main>
      <header>
        <small>IB SKILL · MOBILE</small>
        <h1>{title}</h1>
        <p>{sub}</p>
      </header>

      {children}
    </main>
  );
}

export default function App() {
  return (
    <div className="shell">
      <aside>
        <h2>
          IB <i>Skill</i>
        </h2>

        <p>Discover. Prove. Grow.</p>

        {nav.map((n) => (
          <NavLink key={n[0]} to={n[0]}>
            {n[1]}
          </NavLink>
        ))}
      </aside>

      <Routes>
        <Route path="/" element={<Navigate to="/discovery" />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/badho" element={<Badho />} />
        <Route path="/seekho" element={<Seekho />} />
        <Route path="/credentials" element={<Credentials />} />
      </Routes>

      <nav className="bottom">
        {nav.map((n) => (
          <NavLink key={n[0]} to={n[0]}>
            {n[1]}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}