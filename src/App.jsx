import { useState, useEffect } from "react";

const COLORS = {
  primary: "#311E17",
  accent: "#816955",
  bg: "#FFFCF5",
  bgSecondary: "#F7F1E8",
  bgTertiary: "rgba(49,30,23,0.06)",
  contentPrimary: "#1F1000",
  contentSecondary: "rgba(31,16,0,0.72)",
  contentTertiary: "rgba(31,16,0,0.56)",
  contentLight: "#FFFEFA",
  answerBg: "#FFFCF5",
  answerBorder: "#F1EADF",
  answerActiveBg: "#F7F1E8",
  answerActiveBorder: "#816955",
  positive: "#71A31D",
  negative: "#E15651",
  warning: "#E9A43F",
  white: "#FFFFFF",
};

const quizQuestions = [
  {
    id: 1,
    question: "¿Cómo te sientes generalmente en una relación cercana?",
    options: [
      { text: "Cómodo/a y seguro/a", type: "secure" },
      { text: "Preocupado/a de que me abandonen", type: "anxious" },
      { text: "Incómodo/a cuando la otra persona se acerca demasiado", type: "avoidant" },
      { text: "Confundido/a sobre mis propios sentimientos", type: "disorganized" },
    ],
  },
  {
    id: 2,
    question: "Cuando tu pareja o alguien cercano no te responde rápido, ¿qué piensas?",
    options: [
      { text: "Probablemente está ocupado/a, no me preocupa", type: "secure" },
      { text: "¿Hice algo mal? ¿Estará molesto/a conmigo?", type: "anxious" },
      { text: "Mejor así, necesito mi espacio", type: "avoidant" },
      { text: "Me enojo y luego me siento culpable", type: "disorganized" },
    ],
  },
  {
    id: 3,
    question: "¿Cómo reaccionas ante los conflictos en tus relaciones?",
    options: [
      { text: "Hablo abiertamente y busco soluciones", type: "secure" },
      { text: "Me angustio mucho y necesito resolver todo de inmediato", type: "anxious" },
      { text: "Me distancio y prefiero no hablar del tema", type: "avoidant" },
      { text: "A veces exploto y otras veces me cierro completamente", type: "disorganized" },
    ],
  },
  {
    id: 4,
    question: "¿Qué tan cómodo/a te sientes dependiendo emocionalmente de alguien?",
    options: [
      { text: "Bastante cómodo/a, puedo depender y dejar que dependan de mí", type: "secure" },
      { text: "Quiero depender más, pero temo pedir demasiado", type: "anxious" },
      { text: "Prefiero ser independiente, depender de otros me incomoda", type: "avoidant" },
      { text: "Quiero conexión pero también me asusta demasiada cercanía", type: "disorganized" },
    ],
  },
  {
    id: 5,
    question: "Cuando alguien te expresa amor o afecto, ¿cómo reaccionas?",
    options: [
      { text: "Lo recibo con gratitud y lo devuelvo con naturalidad", type: "secure" },
      { text: "Me alegra pero me pregunto si es genuino", type: "anxious" },
      { text: "Me siento incómodo/a y no sé cómo responder", type: "avoidant" },
      { text: "Me emociona y me asusta al mismo tiempo", type: "disorganized" },
    ],
  },
  {
    id: 6,
    question: "¿Cómo describes tu historia con relaciones pasadas?",
    options: [
      { text: "En general, relaciones estables y satisfactorias", type: "secure" },
      { text: "Intensas, con muchos altibajos emocionales", type: "anxious" },
      { text: "Cortas o con mucha distancia emocional de mi parte", type: "avoidant" },
      { text: "Caóticas, con ciclos de acercamiento y alejamiento", type: "disorganized" },
    ],
  },
  {
    id: 7,
    question: "Cuando estás en una relación, ¿en qué piensas más?",
    options: [
      { text: "En construir algo bonito juntos", type: "secure" },
      { text: "En si la otra persona realmente me quiere", type: "anxious" },
      { text: "En mantener mi independencia y libertad", type: "avoidant" },
      { text: "En si me van a lastimar o no", type: "disorganized" },
    ],
  },
  {
    id: 8,
    question: "¿Qué esperas obtener de este plan de sanación?",
    options: [
      { text: "Fortalecer mis relaciones actuales", type: "secure" },
      { text: "Dejar de sentirme tan ansioso/a en el amor", type: "anxious" },
      { text: "Aprender a conectarme más profundamente", type: "avoidant" },
      { text: "Entender mis patrones y sanar mis heridas", type: "disorganized" },
    ],
  },
];

const attachmentResults = {
  secure: {
    type: "Apego Seguro",
    emoji: "🌱",
    color: "#71A31D",
    bgColor: "rgba(113,163,29,0.10)",
    borderColor: "rgba(113,163,29,0.30)",
    description:
      "Tienes una base emocional sólida. Te sientes cómodo/a con la intimidad y la independencia al mismo tiempo. Puedes depender de otros y dejar que dependan de ti sin angustiarte.",
    strengths: ["Comunicación abierta", "Confianza en ti mismo/a", "Equilibrio emocional"],
    areas: ["Profundizar la empatía", "Apoyar a parejas con otros estilos", "Mantener límites saludables"],
    plan: "Tu plan se enfoca en consolidar tus fortalezas y aprender a relacionarte con personas que tienen estilos de apego diferentes al tuyo.",
  },
  anxious: {
    type: "Apego Ansioso",
    emoji: "💛",
    color: "#E9A43F",
    bgColor: "rgba(233,164,63,0.10)",
    borderColor: "rgba(233,164,63,0.40)",
    description:
      "Buscas mucha cercanía en tus relaciones y te preocupa perder a quienes amas. Puedes sentirte inseguro/a sobre si tus sentimientos son correspondidos.",
    strengths: ["Alta empatía", "Profundidad emocional", "Compromiso en relaciones"],
    areas: ["Regular la ansiedad emocional", "Construir autoestima", "Confiar más en los demás"],
    plan: "Tu plan se centra en desarrollar seguridad interior, técnicas de regulación emocional y comunicación asertiva sin ansiedad.",
  },
  avoidant: {
    type: "Apego Evitativo",
    emoji: "🔵",
    color: "#4A90D9",
    bgColor: "rgba(74,144,217,0.10)",
    borderColor: "rgba(74,144,217,0.30)",
    description:
      "Valoras mucho tu independencia y puedes sentirte incómodo/a con demasiada cercanía emocional. Tiendes a distanciarte cuando las relaciones se vuelven muy intensas.",
    strengths: ["Autonomía e independencia", "Pensamiento racional", "Estabilidad emocional externa"],
    areas: ["Abrirte a la vulnerabilidad", "Expresar emociones con confianza", "Permitir la intimidad"],
    plan: "Tu plan trabaja la reconexión emocional gradual, el reconocimiento de necesidades afectivas y la apertura a relaciones más profundas.",
  },
  disorganized: {
    type: "Apego Desorganizado",
    emoji: "🌊",
    color: "#816955",
    bgColor: "rgba(129,105,85,0.10)",
    borderColor: "rgba(129,105,85,0.40)",
    description:
      "Experimentas una combinación de deseos de cercanía y miedo a ella. Esto puede crear patrones relacionales confusos y emociones intensas difíciles de manejar.",
    strengths: ["Alta introspección", "Resiliencia emocional", "Búsqueda de crecimiento"],
    areas: ["Sanar heridas del pasado", "Crear patrones seguros", "Estabilidad emocional"],
    plan: "Tu plan ofrece herramientas de sanación profunda, regulación del sistema nervioso y construcción de apego seguro desde cero.",
  },
};

const SCREENS = {
  LANDING: "landing",
  QUIZ: "quiz",
  LOADING: "loading",
  RESULTS: "results",
};

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ width: "100%", marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 12,
          color: COLORS.contentTertiary,
          fontWeight: 500,
        }}
      >
        <span>Pregunta {current} de {total}</span>
        <span>{pct}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 6,
          background: COLORS.bgTertiary,
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: COLORS.primary,
            borderRadius: 99,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function Header({ showBack, onBack }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: COLORS.bg,
        borderBottom: `1px solid ${COLORS.answerBorder}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showBack && (
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 8px 4px 0",
              display: "flex",
              alignItems: "center",
              color: COLORS.primary,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke={COLORS.primary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <span
          style={{
            fontWeight: 800,
            fontSize: 20,
            color: COLORS.primary,
            letterSpacing: "-0.5px",
          }}
        >
          Apego<span style={{ color: COLORS.accent }}>App</span>
        </span>
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.contentTertiary,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        LAFD
      </span>
    </header>
  );
}

function LandingScreen({ onSelectGender }) {
  const [hovered, setHovered] = useState(null);

  const cards = [
    {
      id: "male",
      label: "Masculino",
      img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/f_auto/q_auto:eco/fl_lossy/c_fit/97fb0c2d-61bb-45d6-afdf-8ef3a70ce67f",
    },
    {
      id: "female",
      label: "Femenino",
      img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/f_auto/q_auto:eco/fl_lossy/c_fit/decc8957-04c1-4abc-bc91-4a597346f506",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 61px)" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 20px 40px",
          gap: 24,
        }}
      >
        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(26px, 6vw, 34px)",
              fontWeight: 800,
              color: COLORS.contentPrimary,
              lineHeight: 1.2,
              letterSpacing: "-0.5px",
              margin: 0,
            }}
          >
            Plan de Sanación Relacional
          </h1>
          <p
            style={{
              fontSize: 15,
              color: COLORS.contentTertiary,
              fontWeight: 500,
              margin: 0,
              maxWidth: 320,
              lineHeight: 1.5,
            }}
          >
            Descubre tu estilo de apego y cómo afecta tus relaciones
          </p>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: COLORS.contentSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              background: COLORS.bgTertiary,
              padding: "4px 12px",
              borderRadius: 99,
            }}
          >
            Quiz de 3 minutos
          </span>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["✅ Basado en psicología", "🔒 100% privado", "🧠 Respaldado por expertos"].map((badge) => (
            <span
              key={badge}
              style={{
                fontSize: 12,
                color: COLORS.contentSecondary,
                fontWeight: 500,
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Gender cards */}
        <div style={{ width: "100%", maxWidth: 480 }}>
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: COLORS.contentTertiary,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 16,
            }}
          >
            ¿Con qué género te identificas?
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => onSelectGender(card.id)}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: COLORS.bgSecondary,
                  boxShadow:
                    hovered === card.id
                      ? `0 8px 32px rgba(49,30,23,0.18)`
                      : `0 2px 12px rgba(49,30,23,0.08)`,
                  transform: hovered === card.id ? "translateY(-3px) scale(1.01)" : "none",
                  transition: "all 0.25s ease",
                  display: "flex",
                  flexDirection: "column",
                  aspectRatio: "0.75",
                  position: "relative",
                }}
              >
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <img
                    src={card.img}
                    alt={card.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.3s ease",
                      transform: hovered === card.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
                <div
                  style={{
                    background: "linear-gradient(to top, rgba(49,30,23,0.88) 0%, rgba(49,30,23,0.4) 60%, transparent 100%)",
                    padding: "20px 16px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <span
                    style={{
                      color: COLORS.contentLight,
                      fontWeight: 700,
                      fontSize: 16,
                    }}
                  >
                    {card.label}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(255,254,250,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill={COLORS.contentLight}>
                      <path
                        fillRule="evenodd"
                        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12ZM10.707 5.293a1 1 0 0 0-1.414 1.414L14.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414l-6-6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div
          style={{
            background: COLORS.bgSecondary,
            borderRadius: 16,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            width: "100%",
            maxWidth: 480,
            boxSizing: "border-box",
          }}
        >
          <div style={{ fontSize: 32, flexShrink: 0 }}>💬</div>
          <div>
            <p
              style={{
                fontSize: 13,
                color: COLORS.contentPrimary,
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              "Nunca había entendido por qué siempre elegía parejas que me hacían sentir insegura. Este quiz me cambió la vida."
            </p>
            <p style={{ fontSize: 12, color: COLORS.contentTertiary, margin: "6px 0 0", fontWeight: 600 }}>
              — María G., usuaria de Apego App ⭐⭐⭐⭐⭐
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 12,
            width: "100%",
            maxWidth: 480,
          }}
        >
          {[
            { num: "50K+", label: "Usuarios" },
            { num: "4.8★", label: "Valoración" },
            { num: "92%", label: "Mejoran" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: COLORS.bgSecondary,
                borderRadius: 12,
                padding: "14px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 11, color: COLORS.contentTertiary, fontWeight: 500, marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ questionIndex, gender, onAnswer, onBack }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const question = quizQuestions[questionIndex];

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [questionIndex]);

  const handleSelect = (option, idx) => {
    if (animating) return;
    setSelected(idx);
    setAnimating(true);
    setTimeout(() => {
      setSelected(null);
      setAnimating(false);
      onAnswer(option.type);
    }, 600);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 61px)",
        padding: "24px 20px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.35s ease",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", width: "100%" }}>
        <ProgressBar current={questionIndex + 1} total={quizQuestions.length} />

        <div style={{ marginTop: 28, marginBottom: 24 }}>
          <h2
            style={{
              fontSize: "clamp(18px, 4.5vw, 24px)",
              fontWeight: 700,
              color: COLORS.contentPrimary,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {question.question}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {question.options.map((option, idx) => {
            const isSelected = selected === idx;
            const isHovered = hoveredIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(option, idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: isSelected ? COLORS.answerActiveBg : isHovered ? COLORS.bgSecondary : COLORS.answerBg,
                  border: `2px solid ${isSelected ? COLORS.accent : isHovered ? "rgba(129,105,85,0.3)" : COLORS.answerBorder}`,
                  borderRadius: 16,
                  padding: "16px 20px",
                  cursor: animating ? "default" : "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "scale(0.98)" : isHovered ? "scale(1.01)" : "scale(1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  boxShadow: isSelected
                    ? `0 0 0 3px rgba(129,105,85,0.15)`
                    : isHovered
                    ? `0 4px 16px rgba(49,30,23,0.1)`
                    : `0 1px 4px rgba(49,30,23,0.06)`,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${isSelected ? COLORS.accent : COLORS.answerBorder}`,
                    background: isSelected ? COLORS.accent : "transparent",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: COLORS.contentPrimary,
                    lineHeight: 1.4,
                  }}
                >
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Analizando tus respuestas...");

  const messages = [
    "Analizando tus respuestas...",
    "Identificando tu estilo de apego...",
    "Comparando patrones relacionales...",
    "Preparando tu plan personalizado...",
    "¡Casi listo!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const idx = Math.floor((progress / 100) * messages.length);
    setMessage(messages[Math.min(idx, messages.length - 1)]);
  }, [progress]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 61px)",
        padding: "40px 24px",
        gap: 32,
      }}
    >
      <div style={{ fontSize: 64 }}>🧠</div>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: COLORS.contentPrimary, margin: "0 0 8px" }}>
          Procesando tu perfil
        </h2>
        <p style={{ fontSize: 15, color: COLORS.contentTertiary, margin: 0 }}>{message}</p>
      </div>
      <div style={{ width: "100%", maxWidth: 320 }}>
        <div
          style={{
            width: "100%",
            height: 8,
            background: COLORS.bgTertiary,
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.primary})`,
              borderRadius: 99,
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <div
          style={{
            textAlign: "right",
            marginTop: 8,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.contentSecondary,
          }}
        >
          {progress}%
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
        {["🔬 Análisis psicológico", "📊 Perfil de apego", "📋 Plan personalizado"].map((item, i) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: COLORS.bgSecondary,
              padding: "12px 16px",
              borderRadius: 12,
              opacity: progress > i * 33 ? 1 : 0.4,
              transition: "opacity 0.4s ease",
            }}
          >
            <span style={{ fontSize: 18 }}>{item.split(" ")[0]}</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.contentPrimary }}>
              {item.split(" ").slice(1).join(" ")}
            </span>
            {progress > (i + 1) * 33 && (
              <span style={{ marginLeft: "auto", fontSize: 16 }}>✅</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen({ result, gender, onRestart }) {
  const data = attachmentResults[result];
  const [showCTA, setShowCTA] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCTA(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "28px 20px 60px",
        gap: 20,
        maxWidth: 520,
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Result badge */}
      <div
        style={{
          background: data.bgColor,
          border: `2px solid ${data.borderColor}`,
          borderRadius: 20,
          padding: "24px 28px",
          textAlign: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 8 }}>{data.emoji}</div>
        <p style={{ fontSize: 12, fontWeight: 700, color: data.color, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>
          Tu estilo de apego
        </p>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: COLORS.contentPrimary, margin: "0 0 14px", letterSpacing: "-0.3px" }}>
          {data.type}
        </h2>
        <p style={{ fontSize: 14, color: COLORS.contentSecondary, lineHeight: 1.6, margin: 0 }}>
          {data.description}
        </p>
      </div>

      {/* Strengths */}
      <div
        style={{
          background: COLORS.bgSecondary,
          borderRadius: 16,
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.contentPrimary, margin: "0 0 14px" }}>
          💪 Tus fortalezas
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.strengths.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: data.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14, color: COLORS.contentPrimary, fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Areas to work on */}
      <div
        style={{
          background: COLORS.bgSecondary,
          borderRadius: 16,
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.contentPrimary, margin: "0 0 14px" }}>
          🎯 Áreas a trabajar
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.areas.map((a) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: COLORS.accent,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 14, color: COLORS.contentPrimary, fontWeight: 500 }}>{a}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Plan description */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
          borderRadius: 16,
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.contentLight, margin: "0 0 10px" }}>
          📋 Tu plan de sanación
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,254,250,0.88)", lineHeight: 1.6, margin: 0 }}>
          {data.plan}
        </p>
      </div>

      {/* What's included */}
      <div
        style={{
          background: COLORS.bg,
          border: `1px solid ${COLORS.answerBorder}`,
          borderRadius: 16,
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.contentPrimary, margin: "0 0 14px" }}>
          ✨ Tu plan incluye
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: "🧘", text: "Ejercicios diarios de regulación emocional" },
            { icon: "📖", text: "Guías de comunicación asertiva" },
            { icon: "💡", text: "Reflexiones guiadas de autoconocimiento" },
            { icon: "📊", text: "Seguimiento de tu progreso semanal" },
            { icon: "🤝", text: "Estrategias para relaciones más seguras" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: COLORS.contentSecondary, fontWeight: 500, lineHeight: 1.4 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          width: "100%",
          opacity: showCTA ? 1 : 0,
          transform: showCTA ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease",
        }}
      >
        {/* TODO: Conectar botón con flujo de pago/registro real */}
        <button
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            width: "100%",
            background: ctaHovered
              ? `linear-gradient(135deg, #4a2e24 0%, #9e7d66 100%)`
              : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
            color: COLORS.contentLight,
            border: "none",
            borderRadius: 24,
            padding: "18px 48px",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.25s ease",
            transform: ctaHovered ? "translateY(-2px)" : "none",
            boxShadow: ctaHovered
              ? `0 8px 28px rgba(49,30,23,0.35)`
              : `0 4px 16px rgba(49,30,23,0.25)`,
            letterSpacing: "0.01em",
          }}
        >
          Comenzar mi plan personalizado →
        </button>
        <p style={{ textAlign: "center", fontSize: 12, color: COLORS.contentTertiary, margin: "10px 0 0", fontWeight: 500 }}>
          🔒 Privado y seguro · Desarrollado por LAFD
        </p>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          color: COLORS.contentTertiary,
          fontWeight: 500,
          textDecoration: "underline",
          padding: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.contentSecondary)}
        onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.contentTertiary)}
      >
        Repetir el quiz
      </button>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [gender, setGender] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleGenderSelect = (g) => {
    setGender(g);
    setScreen(SCREENS.QUIZ);
  };

  const handleAnswer = (type) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (questionIndex < quizQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      // Calculate dominant attachment type
      const counts = newAnswers.reduce((acc, t) => {
        acc[t] = (acc[t] || 0) + 1;
        return acc;
      }, {});
      const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(dominant);
      setScreen(SCREENS.LOADING);
      setTimeout(() => setScreen(SCREENS.RESULTS), 3200);
    }
  };

  const handleBack = () => {
    if (screen === SCREENS.QUIZ) {
      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
        setAnswers(answers.slice(0, -1));
      } else {
        setScreen(SCREENS.LANDING);
        setGender(null);
      }
    }
  };

  const handleRestart = () => {
    setScreen(SCREENS.LANDING);
    setGender(null);
    setQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const showBack = screen === SCREENS.QUIZ;
  const showHeader = screen !== SCREENS.LOADING;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {showHeader && <Header showBack={showBack} onBack={handleBack} />}

      {screen === SCREENS.LANDING && (
        <LandingScreen onSelectGender={handleGenderSelect} />
      )}

      {screen === SCREENS.QUIZ && (
        <QuizScreen
          questionIndex={questionIndex}
          gender={gender}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {screen === SCREENS.LOADING && <LoadingScreen />}

      {screen === SCREENS.RESULTS && (
        <ResultsScreen result={result} gender={gender} onRestart={handleRestart} />
      )}
    </div>
  );
}