import React, { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Sparkles,
  Download,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  GripVertical,
  LayoutTemplate,
  X,
  Check,
} from "lucide-react";

const ACCENTS = [
  { name: "Bosque", value: "#2F6F5E" },
  { name: "Tinta", value: "#2B3A67" },
  { name: "Ciruela", value: "#5B3758" },
  { name: "Óxido", value: "#8A3B2E" },
];

const TEMPLATES = [
  {
    id: "clasico",
    name: "Clásico",
    desc: "Encabezado editorial, una columna",
  },
  {
    id: "moderno",
    name: "Moderno",
    desc: "Barra lateral oscura con datos y skills",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    desc: "Tipografía limpia, mucho espacio en blanco",
  },
  {
    id: "ejecutivo",
    name: "Ejecutivo",
    desc: "Encabezado centrado, dos columnas",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    desc: "Formal y sobrio, ideal para sistemas ATS",
  },
  {
    id: "compacto",
    name: "Compacto",
    desc: "Estilo línea de tiempo, cabe más contenido",
  },
  {
    id: "creativo",
    name: "Creativo",
    desc: "Encabezado en bloque de color, más visual",
  },
  {
    id: "desarrollador",
    name: "Desarrollador",
    desc: "Con proyectos y stack técnico",
  },
  {
    id: "academico",
    name: "Académico",
    desc: "Publicaciones, becas y formación",
  },
  {
    id: "comercial",
    name: "Ventas / Marketing",
    desc: "Métricas y logros destacados",
  },
  {
    id: "impacto",
    name: "Impacto",
    desc: "Tipografía grande, un logro por línea",
  },
  {
    id: "aurora",
    name: "Aurora",
    desc: "Fondo degradado suave, tarjetas flotantes",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    desc: "Cuadrícula técnica, ideal para perfiles técnicos",
  },
  {
    id: "bloques",
    name: "Bloques",
    desc: "Formas geométricas de color detrás del encabezado",
  },
  {
    id: "nocturno",
    name: "Nocturno",
    desc: "Fondo oscuro elegante, acentos finos",
  },
  {
    id: "revista",
    name: "Revista",
    desc: "Estilo editorial, con letra capital",
  },
  {
    id: "contorno",
    name: "Contorno",
    desc: "Marco tipo diploma, elegante y centrado",
  },
  {
    id: "dinamico",
    name: "Dinámico",
    desc: "Banda de color con corte diagonal",
  },
  {
    id: "tarjetas",
    name: "Tarjetas",
    desc: "Secciones como notas apiladas, estilo scrapbook",
  },
];

const emptyExperience = () => ({
  id: crypto.randomUUID(),
  puesto: "",
  empresa: "",
  periodo: "",
  descripcion: "",
});

const emptyEducation = () => ({
  id: crypto.randomUUID(),
  titulo: "",
  institucion: "",
  periodo: "",
});

const emptyProject = () => ({
  id: crypto.randomUUID(),
  nombre: "",
  stack: "",
  descripcion: "",
  link: "",
});

const emptyPublication = () => ({
  id: crypto.randomUUID(),
  titulo: "",
  revista: "",
  anio: "",
});

const emptyBeca = () => ({
  id: crypto.randomUUID(),
  nombre: "",
  entidad: "",
  anio: "",
});

const emptyLogro = () => ({
  id: crypto.randomUUID(),
  metrica: "",
  descripcion: "",
});

const initialState = {
  nombre: "",
  puesto: "",
  email: "",
  telefono: "",
  ubicacion: "",
  linkedin: "",
  resumen: "",
  experiencia: [emptyExperience()],
  educacion: [emptyEducation()],
  habilidades: "",
  proyectos: [emptyProject()],
  publicaciones: [emptyPublication()],
  becas: [emptyBeca()],
  logros: [emptyLogro()],
  accent: ACCENTS[0].value,
  template: "clasico",
};

async function callClaude(prompt) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  const text = data.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .join("\n")
    .trim();
  return text;
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-stone-800/60 border border-stone-700 rounded-md px-3 py-2 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-transparent transition";

function AIButton({ onClick, loading, label = "Mejorar con IA" }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wide text-stone-300 hover:text-white disabled:opacity-50 transition mb-1"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Puliendo…" : label}
    </button>
  );
}

// ---- Mini thumbnail mockups for the gallery ----
function TemplateThumb({ id, accent }) {
  const base = "w-full h-full rounded-[2px]";
  if (id === "clasico") {
    return (
      <div className={base + " bg-white p-2 flex flex-col gap-1"}>
        <div className="h-2 w-2/3 rounded-sm" style={{ background: "#333" }} />
        <div className="h-[3px] w-full mb-1" style={{ background: accent }} />
        <div className="h-1 w-full bg-stone-200 rounded-full" />
        <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
        <div className="h-1.5 w-1/2 mt-1 rounded-full" style={{ background: accent, opacity: 0.6 }} />
        <div className="h-1 w-full bg-stone-200 rounded-full" />
        <div className="h-1 w-4/6 bg-stone-200 rounded-full" />
      </div>
    );
  }
  if (id === "moderno") {
    return (
      <div className={base + " bg-white flex overflow-hidden"}>
        <div className="w-[35%] h-full p-1.5 flex flex-col gap-1" style={{ background: "#232323" }}>
          <div className="h-1.5 w-4/5 rounded-full bg-stone-500" />
          <div className="h-1 w-full rounded-full mt-1" style={{ background: accent }} />
          <div className="h-1 w-3/4 rounded-full bg-stone-600" />
          <div className="h-1 w-2/3 rounded-full bg-stone-600" />
        </div>
        <div className="flex-1 p-1.5 flex flex-col gap-1">
          <div className="h-1.5 w-1/2 rounded-full" style={{ background: accent, opacity: 0.7 }} />
          <div className="h-1 w-full bg-stone-200 rounded-full" />
          <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
        </div>
      </div>
    );
  }
  if (id === "minimalista") {
    return (
      <div className={base + " bg-white p-2 flex flex-col items-center gap-1"}>
        <div className="h-2 w-1/2 rounded-sm bg-stone-800" />
        <div className="h-1 w-1/3 rounded-full mb-1" style={{ background: accent }} />
        <div className="h-[1px] w-4/5 bg-stone-200 my-1" />
        <div className="h-1 w-full bg-stone-100 rounded-full" />
        <div className="h-1 w-5/6 bg-stone-100 rounded-full" />
      </div>
    );
  }
  if (id === "ejecutivo") {
    return (
      <div className={base + " bg-white p-2 flex flex-col items-center gap-1"}>
        <div className="h-2 w-1/2 rounded-sm bg-stone-800" />
        <div className="h-1 w-1/3 rounded-full" style={{ background: accent }} />
        <div className="h-[2px] w-full my-1" style={{ background: accent, opacity: 0.4 }} />
        <div className="flex w-full gap-1">
          <div className="w-1/3 flex flex-col gap-1">
            <div className="h-1 w-full bg-stone-200 rounded-full" />
            <div className="h-1 w-full bg-stone-200 rounded-full" />
          </div>
          <div className="w-2/3 flex flex-col gap-1">
            <div className="h-1 w-full bg-stone-200 rounded-full" />
            <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
          </div>
        </div>
      </div>
    );
  }
  if (id === "corporativo") {
    return (
      <div className={base + " bg-white p-2 flex flex-col items-center gap-1"}>
        <div className="h-2 w-1/2 rounded-sm bg-stone-800" />
        <div className="h-1 w-1/3 rounded-full bg-stone-400" />
        <div className="h-[1px] w-full bg-stone-300 my-1" />
        <div className="h-1 w-full bg-stone-200 rounded-full" />
        <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
      </div>
    );
  }
  if (id === "compacto") {
    return (
      <div className={base + " bg-white p-2 flex gap-1.5"}>
        <div className="w-[3px] h-full rounded-full shrink-0" style={{ background: accent, opacity: 0.5 }} />
        <div className="flex-1 flex flex-col gap-1.5 pt-1">
          <div className="h-1 w-4/5 bg-stone-200 rounded-full" />
          <div className="h-1 w-3/5 bg-stone-200 rounded-full" />
          <div className="h-1 w-4/5 bg-stone-200 rounded-full" />
          <div className="h-1 w-1/2 bg-stone-200 rounded-full" />
        </div>
      </div>
    );
  }
  if (id === "creativo") {
    return (
      <div className={base + " bg-white flex flex-col overflow-hidden"}>
        <div className="h-[35%] w-full shrink-0" style={{ background: accent }} />
        <div className="flex-1 p-1.5 flex flex-col gap-1">
          <div className="h-1 w-full bg-stone-200 rounded-full" />
          <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
          <div className="h-1 w-2/3 bg-stone-200 rounded-full" />
        </div>
      </div>
    );
  }
  if (id === "desarrollador") {
    return (
      <div className={base + " bg-white p-2 flex flex-col gap-1"} style={{ fontFamily: "monospace" }}>
        <div className="h-2 w-1/2 rounded-sm bg-stone-800" />
        <div className="flex gap-1 mt-0.5">
          <div className="h-1.5 w-6 rounded-sm" style={{ background: accent, opacity: 0.5 }} />
          <div className="h-1.5 w-6 rounded-sm" style={{ background: accent, opacity: 0.3 }} />
          <div className="h-1.5 w-6 rounded-sm" style={{ background: accent, opacity: 0.7 }} />
        </div>
        <div className="h-[2px] w-full my-1 bg-stone-200" />
        <div className="h-1 w-full bg-stone-200 rounded-full" />
        <div className="h-1 w-4/6 bg-stone-200 rounded-full" />
      </div>
    );
  }
  if (id === "academico") {
    return (
      <div className={base + " bg-white p-2 flex flex-col gap-1"}>
        <div className="h-2 w-2/3 rounded-sm bg-stone-800" />
        <div className="h-[1px] w-full bg-stone-300 my-1" />
        <div className="h-1 w-full bg-stone-200 rounded-full" />
        <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
        <div className="h-1 w-4/6 bg-stone-200 rounded-full" />
        <div className="h-1 w-full bg-stone-200 rounded-full mt-1" />
      </div>
    );
  }
  if (id === "comercial") {
    return (
      <div className={base + " bg-white p-2 flex flex-col gap-1"}>
        <div className="h-2 w-2/3 rounded-sm bg-stone-800" />
        <div className="flex gap-1 mt-1">
          <div className="flex-1 rounded-sm h-6 flex items-center justify-center" style={{ background: `${accent}18` }}>
            <div className="h-1.5 w-4 rounded-full" style={{ background: accent }} />
          </div>
          <div className="flex-1 rounded-sm h-6 flex items-center justify-center" style={{ background: `${accent}18` }}>
            <div className="h-1.5 w-4 rounded-full" style={{ background: accent }} />
          </div>
        </div>
        <div className="h-1 w-full bg-stone-200 rounded-full mt-1" />
      </div>
    );
  }
  if (id === "impacto") {
    return (
      <div className={base + " bg-white p-2 flex flex-col gap-1 justify-center"}>
        <div className="h-3.5 w-full rounded-sm bg-stone-900" />
        <div className="h-1 w-1/2 rounded-full mt-1" style={{ background: accent }} />
        <div className="h-[2px] w-full my-1" style={{ background: accent, opacity: 0.3 }} />
        <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
      </div>
    );
  }
  if (id === "aurora") {
    return (
      <div
        className={base + " p-2 flex flex-col gap-1"}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${accent}77, transparent 55%), radial-gradient(circle at 85% 80%, ${accent}44, transparent 60%), linear-gradient(160deg, #FBF9F5, #F0EEE8)`,
        }}
      >
        <div className="h-1.5 w-1/2 rounded-sm bg-stone-800" />
        <div className="h-4 w-full bg-white/70 rounded-sm mt-1" />
        <div className="h-3 w-full bg-white/70 rounded-sm" />
      </div>
    );
  }
  if (id === "blueprint") {
    return (
      <div
        className={base + " p-2 flex flex-col gap-1"}
        style={{
          backgroundColor: "#fbf9f5",
          backgroundImage: `linear-gradient(${accent}33 1px, transparent 1px), linear-gradient(90deg, ${accent}33 1px, transparent 1px)`,
          backgroundSize: "6px 6px",
        }}
      >
        <div className="h-1.5 w-2/3 rounded-sm bg-stone-800" />
        <div className="h-1 w-full bg-stone-300 rounded-full mt-1" />
        <div className="h-1 w-4/6 bg-stone-300 rounded-full" />
      </div>
    );
  }
  if (id === "bloques") {
    return (
      <div className={base + " bg-white relative overflow-hidden p-2 flex flex-col gap-1"}>
        <div
          className="absolute -top-3 -right-4 w-10 h-10 rounded-full"
          style={{ background: accent, opacity: 0.25 }}
        />
        <div
          className="absolute bottom-1 -left-2 w-6 h-6 rotate-45"
          style={{ background: accent, opacity: 0.18 }}
        />
        <div className="relative h-1.5 w-1/2 rounded-sm bg-stone-800" />
        <div className="relative h-1 w-full bg-stone-200 rounded-full mt-1" />
        <div className="relative h-1 w-5/6 bg-stone-200 rounded-full" />
      </div>
    );
  }
  if (id === "nocturno") {
    return (
      <div className={base + " bg-[#121212] p-2 flex flex-col gap-1"}>
        <div className="h-1.5 w-1/2 rounded-sm bg-white" />
        <div className="h-[2px] w-full my-1" style={{ background: accent, opacity: 0.6 }} />
        <div className="h-1 w-full bg-stone-700 rounded-full" />
        <div className="h-1 w-4/6 bg-stone-700 rounded-full" />
      </div>
    );
  }
  if (id === "revista") {
    return (
      <div className={base + " bg-white p-2 flex flex-col items-center gap-1"}>
        <div className="h-1 w-1/3 rounded-full" style={{ background: accent, opacity: 0.6 }} />
        <div className="h-2.5 w-3/4 rounded-sm bg-stone-800 mt-0.5" />
        <div className="flex items-center gap-1 w-full my-1">
          <div className="flex-1 h-px bg-stone-300" />
          <div className="w-1 h-1 rounded-full" style={{ background: accent }} />
          <div className="flex-1 h-px bg-stone-300" />
        </div>
        <div className="h-3 w-full bg-stone-100 rounded-sm" />
      </div>
    );
  }
  if (id === "contorno") {
    return (
      <div className={base + " bg-white p-1.5"}>
        <div className="w-full h-full border flex flex-col items-center justify-center gap-1 p-2" style={{ borderColor: accent }}>
          <div className="h-1.5 w-1/2 rounded-sm bg-stone-800" />
          <div className="h-1 w-1/3 rounded-full" style={{ background: accent }} />
          <div className="h-1 w-4/5 bg-stone-200 rounded-full mt-1" />
        </div>
      </div>
    );
  }
  if (id === "dinamico") {
    return (
      <div className={base + " bg-white flex flex-col overflow-hidden"}>
        <div
          className="h-[40%] w-full shrink-0"
          style={{ background: accent, clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }}
        />
        <div className="flex-1 p-1.5 flex flex-col gap-1 -mt-2">
          <div className="h-1 w-full bg-stone-200 rounded-full" />
          <div className="h-1 w-5/6 bg-stone-200 rounded-full" />
        </div>
      </div>
    );
  }
  // tarjetas
  return (
    <div className={base + " p-1.5 flex flex-col gap-1.5"} style={{ backgroundColor: "#F0EDE6" }}>
      <div className="h-3 w-full bg-white rounded-sm shadow-sm -rotate-1" />
      <div className="h-3 w-full bg-white rounded-sm shadow-sm rotate-1" style={{ borderLeft: `2px solid ${accent}` }} />
      <div className="h-3 w-4/5 bg-white rounded-sm shadow-sm -rotate-1" />
    </div>
  );
}

function TemplateGallery({ open, onClose, current, accent, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 no-print">
      <div className="bg-stone-900 border border-stone-800 rounded-lg w-full max-w-2xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-xl">Galería de plantillas</h2>
            <p className="text-[12px] text-stone-500 mt-0.5">
              Elige un diseño. Tu contenido y color de acento se mantienen.
            </p>
          </div>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                onSelect(t.id);
                onClose();
              }}
              className="text-left border rounded-md overflow-hidden transition hover:-translate-y-0.5"
              style={{
                borderColor: current === t.id ? accent : "#3f3a35",
                background: "#1c1a18",
              }}
            >
              <div className="h-32 p-3 bg-stone-950">
                <TemplateThumb id={t.id} accent={accent} />
              </div>
              <div className="px-3 py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-[11px] text-stone-500">{t.desc}</p>
                </div>
                {current === t.id && (
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: accent }}
                  >
                    <Check size={12} className="text-stone-950" />
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Full preview renderers per template ----
function ContactLine({ data, className, iconSize = 11 }) {
  return (
    <div className={className}>
      {data.email && (
        <span className="flex items-center gap-1">
          <Mail size={iconSize} /> {data.email}
        </span>
      )}
      {data.telefono && (
        <span className="flex items-center gap-1">
          <Phone size={iconSize} /> {data.telefono}
        </span>
      )}
      {data.ubicacion && (
        <span className="flex items-center gap-1">
          <MapPin size={iconSize} /> {data.ubicacion}
        </span>
      )}
      {data.linkedin && (
        <span className="flex items-center gap-1">
          <Linkedin size={iconSize} /> {data.linkedin}
        </span>
      )}
    </div>
  );
}

function SkillChips({ data, accent }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {data.habilidades.split(",").map(
        (h, i) =>
          h.trim() && (
            <span
              key={i}
              className="text-[11px] px-2 py-1 rounded-sm"
              style={{ background: `${accent}18`, color: accent }}
            >
              {h.trim()}
            </span>
          )
      )}
    </div>
  );
}

function ExperienciaBlock({ data, accent, titleClass }) {
  return (
    <>
      {data.experiencia.map(
        (exp) =>
          (exp.puesto || exp.empresa) && (
            <div key={exp.id} className="mb-4 last:mb-0">
              <div className="flex items-baseline justify-between gap-2">
                <p className={titleClass}>
                  {exp.puesto}
                  {exp.empresa && (
                    <span className="font-sans text-stone-500 text-[13px] font-normal"> · {exp.empresa}</span>
                  )}
                </p>
                <span className="font-mono text-[11px] text-stone-400 whitespace-nowrap">{exp.periodo}</span>
              </div>
              {exp.descripcion && (
                <div className="text-[12.5px] text-stone-600 mt-1 leading-relaxed whitespace-pre-line">
                  {exp.descripcion}
                </div>
              )}
            </div>
          )
      )}
    </>
  );
}

function EducacionBlock({ data }) {
  return (
    <>
      {data.educacion.map(
        (edu) =>
          (edu.titulo || edu.institucion) && (
            <div key={edu.id} className="mb-2 last:mb-0 flex items-baseline justify-between gap-2">
              <p className="text-[13px] text-stone-800">
                <span className="font-medium">{edu.titulo}</span>
                {edu.institucion && <span className="text-stone-500"> · {edu.institucion}</span>}
              </p>
              <span className="font-mono text-[11px] text-stone-400 whitespace-nowrap">{edu.periodo}</span>
            </div>
          )
      )}
    </>
  );
}

function SectionLabel({ children, accent, className = "" }) {
  return (
    <h3 className={"font-mono text-[11px] uppercase tracking-widest mb-2 " + className} style={{ color: accent }}>
      {children}
    </h3>
  );
}

function PreviewClasico({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[780px]">
      <div className="mb-6 pb-6" style={{ borderBottom: `2px solid ${accent}` }}>
        <h1 className="font-display text-[32px] leading-tight" style={{ color: "#1a1a1a" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && (
          <p className="font-mono text-sm mt-1 tracking-wide" style={{ color: accent }}>
            {data.puesto}
          </p>
        )}
        <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
      </div>
      {data.resumen && (
        <div className="mb-6">
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-6">
          <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
          <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
        </div>
      )}
      {hasEdu && (
        <div className="mb-6">
          <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div>
          <SectionLabel accent={accent}>Habilidades</SectionLabel>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
    </div>
  );
}

function PreviewModerno({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[780px] flex overflow-hidden">
      <div className="w-[34%] bg-[#1c1a18] text-stone-200 px-6 py-10 flex flex-col gap-6">
        <div>
          <h1 className="font-display text-[22px] leading-tight text-white">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && (
            <p className="font-mono text-[11px] mt-1 tracking-wide" style={{ color: accent }}>
              {data.puesto}
            </p>
          )}
        </div>
        <ContactLine data={data} className="flex flex-col gap-1.5 text-[11px] text-stone-400" iconSize={10} />
        {hasEdu && (
          <div>
            <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
            <div className="flex flex-col gap-2">
              {data.educacion.map(
                (edu) =>
                  (edu.titulo || edu.institucion) && (
                    <div key={edu.id}>
                      <p className="text-[12px] text-stone-200 font-medium">{edu.titulo}</p>
                      <p className="text-[11px] text-stone-500">{edu.institucion}</p>
                      <p className="text-[10px] font-mono text-stone-600">{edu.periodo}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {data.habilidades && (
          <div>
            <SectionLabel accent={accent} className="mb-2">Habilidades</SectionLabel>
            <div className="flex flex-wrap gap-1">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-stone-800 text-stone-300">
                      {h.trim()}
                    </span>
                  )
              )}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 px-8 py-10">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {hasExp && (
          <div>
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewMinimalista({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#222] w-full max-w-[600px] shadow-2xl px-12 py-14 min-h-[780px]">
      <div className="text-center mb-8">
        <h1 className="font-display text-[30px] tracking-tight" style={{ color: "#161616" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && <p className="text-[13px] mt-1 tracking-wide" style={{ color: accent }}>{data.puesto}</p>}
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-stone-500"
          iconSize={10}
        />
      </div>
      {data.resumen && (
        <div className="mb-7 text-center max-w-[440px] mx-auto">
          <p className="text-[13px] leading-relaxed text-stone-600 italic">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3 text-center">Experiencia</p>
          <ExperienciaBlock data={data} accent={accent} titleClass="text-[14px] font-medium text-stone-900" />
        </div>
      )}
      {hasEdu && (
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3 text-center">Educación</p>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-2">Habilidades</p>
          <p className="text-[12.5px] text-stone-600">{data.habilidades}</p>
        </div>
      )}
    </div>
  );
}

function PreviewEjecutivo({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[780px]">
      <div className="text-center mb-5">
        <h1 className="font-display text-[30px]" style={{ color: "#1a1a1a" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && (
          <p className="font-mono text-[12px] mt-1 tracking-widest uppercase" style={{ color: accent }}>
            {data.puesto}
          </p>
        )}
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600"
        />
      </div>
      <div className="h-[2px] mb-6" style={{ background: accent, opacity: 0.5 }} />
      <div className="grid grid-cols-[38%_62%] gap-6">
        <div>
          {hasEdu && (
            <div className="mb-6">
              <SectionLabel accent={accent}>Educación</SectionLabel>
              <div className="flex flex-col gap-3">
                {data.educacion.map(
                  (edu) =>
                    (edu.titulo || edu.institucion) && (
                      <div key={edu.id}>
                        <p className="text-[12.5px] font-medium text-stone-800">{edu.titulo}</p>
                        <p className="text-[11.5px] text-stone-500">{edu.institucion}</p>
                        <p className="text-[10.5px] font-mono text-stone-400">{edu.periodo}</p>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
          {data.habilidades && (
            <div>
              <SectionLabel accent={accent}>Habilidades</SectionLabel>
              <div className="flex flex-col gap-1">
                {data.habilidades.split(",").map(
                  (h, i) =>
                    h.trim() && (
                      <span key={i} className="text-[12px] text-stone-600">
                        {h.trim()}
                      </span>
                    )
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          {data.resumen && (
            <div className="mb-6">
              <SectionLabel accent={accent}>Perfil</SectionLabel>
              <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
            </div>
          )}
          {hasExp && (
            <div>
              <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
              <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[14.5px] font-medium text-stone-900" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewCorporativo({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const ruleStyle = { borderColor: `${accent}66` };
  const label = "text-[11px] font-bold uppercase tracking-widest pb-1 mb-2 border-b";
  return (
    <div
      className="print-page bg-white text-[#1a1a1a] w-full max-w-[600px] shadow-2xl px-11 py-12 min-h-[780px]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="text-center mb-6 pb-4 border-b border-stone-300">
        <h1 className="text-[25px] font-bold tracking-tight">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12.5px] mt-1 text-stone-600">{data.puesto}</p>}
        <p className="text-[11px] mt-2 text-stone-500">
          {[data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean).join("   |   ")}
        </p>
      </div>
      {data.resumen && (
        <div className="mb-5">
          <h3 className={label} style={ruleStyle}>Perfil profesional</h3>
          <p className="text-[12.5px] leading-relaxed text-stone-800">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-5">
          <h3 className={label} style={ruleStyle}>Experiencia profesional</h3>
          {data.experiencia.map(
            (exp) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[13px] font-bold">
                      {exp.puesto}
                      {exp.empresa && <span className="font-normal"> — {exp.empresa}</span>}
                    </p>
                    <span className="text-[11px] text-stone-500 whitespace-nowrap">{exp.periodo}</span>
                  </div>
                  {exp.descripcion && (
                    <div className="text-[12px] text-stone-700 mt-1 leading-relaxed whitespace-pre-line">
                      {exp.descripcion}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      )}
      {hasEdu && (
        <div className="mb-5">
          <h3 className={label} style={ruleStyle}>Educación</h3>
          {data.educacion.map(
            (edu) =>
              (edu.titulo || edu.institucion) && (
                <div key={edu.id} className="flex justify-between items-baseline gap-2 mb-1 last:mb-0">
                  <p className="text-[12.5px]">
                    <span className="font-bold">{edu.titulo}</span>
                    {edu.institucion && ` — ${edu.institucion}`}
                  </p>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">{edu.periodo}</span>
                </div>
              )
          )}
        </div>
      )}
      {data.habilidades && (
        <div>
          <h3 className={label} style={ruleStyle}>Habilidades</h3>
          <p className="text-[12.5px] text-stone-700">{data.habilidades}</p>
        </div>
      )}
    </div>
  );
}

function PreviewCompacto({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-9 py-10 min-h-[780px]">
      <div className="mb-5">
        <h1 className="font-display text-[26px] leading-tight">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && (
          <p className="font-mono text-[12px] mt-0.5" style={{ color: accent }}>{data.puesto}</p>
        )}
        <ContactLine data={data} className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-stone-600" iconSize={10} />
      </div>
      {data.resumen && (
        <p className="text-[12px] leading-relaxed text-stone-700 mb-5 pb-4 border-b border-stone-200">
          {data.resumen}
        </p>
      )}
      {hasExp && (
        <div className="mb-5">
          <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
          <div className="relative pl-4 border-l-2" style={{ borderColor: `${accent}40` }}>
            {data.experiencia.map(
              (exp) =>
                (exp.puesto || exp.empresa) && (
                  <div key={exp.id} className="mb-3 last:mb-0 relative">
                    <span
                      className="absolute -left-[21px] top-1 w-2 h-2 rounded-full"
                      style={{ background: accent }}
                    />
                    <div className="flex justify-between items-baseline gap-2">
                      <p className="text-[13px] font-semibold text-stone-900">
                        {exp.puesto}
                        <span className="font-normal text-stone-500 text-[11.5px]"> · {exp.empresa}</span>
                      </p>
                      <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap">{exp.periodo}</span>
                    </div>
                    {exp.descripcion && (
                      <div className="text-[11.5px] text-stone-600 mt-0.5 leading-snug whitespace-pre-line">
                        {exp.descripcion}
                      </div>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      )}
      {hasEdu && (
        <div className="mb-5">
          <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div>
          <SectionLabel accent={accent} className="mb-2">Habilidades</SectionLabel>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
    </div>
  );
}

function PreviewCreativo({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[780px] overflow-hidden">
      <div className="px-10 py-9" style={{ background: accent }}>
        <h1 className="font-display text-[30px] text-white leading-tight">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && (
          <p className="text-[13px] mt-1 text-white/80 font-mono tracking-wide">{data.puesto}</p>
        )}
        <ContactLine
          data={data}
          className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-white/85"
          iconSize={10}
        />
      </div>
      <div className="px-10 py-8">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {hasExp && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
        {hasEdu && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
        {data.habilidades && (
          <div>
            <SectionLabel accent={accent}>Habilidades</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-full text-white"
                      style={{ background: accent }}
                    >
                      {h.trim()}
                    </span>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewDesarrollador({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const hasProj = data.proyectos.some((p) => p.nombre);
  return (
    <div className="print-page bg-[#0f0f0f] text-stone-200 w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[780px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="mb-6">
        <p className="text-[11px] text-stone-500">$ whoami</p>
        <h1 className="text-[26px] font-bold text-white mt-1">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
        <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-stone-500" iconSize={10} />
      </div>
      {data.resumen && (
        <div className="mb-6">
          <p className="text-[11px] mb-1.5" style={{ color: accent }}>// perfil</p>
          <p className="text-[12px] leading-relaxed text-stone-400">{data.resumen}</p>
        </div>
      )}
      {data.habilidades && (
        <div className="mb-6">
          <p className="text-[11px] mb-2" style={{ color: accent }}>// stack</p>
          <div className="flex flex-wrap gap-1.5">
            {data.habilidades.split(",").map(
              (h, i) =>
                h.trim() && (
                  <span key={i} className="text-[10.5px] px-2 py-1 rounded-sm border" style={{ borderColor: `${accent}55`, color: accent }}>
                    {h.trim()}
                  </span>
                )
            )}
          </div>
        </div>
      )}
      {hasProj && (
        <div className="mb-6">
          <p className="text-[11px] mb-2" style={{ color: accent }}>// proyectos</p>
          {data.proyectos.map(
            (p) =>
              p.nombre && (
                <div key={p.id} className="mb-3 last:mb-0 pl-3 border-l" style={{ borderColor: `${accent}40` }}>
                  <p className="text-[13px] font-bold text-white">
                    {p.nombre}
                    {p.link && <span className="font-normal text-stone-500 text-[10.5px]"> · {p.link}</span>}
                  </p>
                  {p.stack && <p className="text-[10.5px] text-stone-500 mt-0.5">{p.stack}</p>}
                  {p.descripcion && <p className="text-[11.5px] text-stone-400 mt-1 leading-relaxed">{p.descripcion}</p>}
                </div>
              )
          )}
        </div>
      )}
      {hasExp && (
        <div className="mb-6">
          <p className="text-[11px] mb-2" style={{ color: accent }}>// experiencia</p>
          {data.experiencia.map(
            (exp) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[13px] font-bold text-white">
                      {exp.puesto}
                      {exp.empresa && <span className="font-normal text-stone-500"> · {exp.empresa}</span>}
                    </p>
                    <span className="text-[10px] text-stone-600 whitespace-nowrap">{exp.periodo}</span>
                  </div>
                  {exp.descripcion && <div className="text-[11.5px] text-stone-400 mt-1 leading-relaxed whitespace-pre-line">{exp.descripcion}</div>}
                </div>
              )
          )}
        </div>
      )}
      {hasEdu && (
        <div>
          <p className="text-[11px] mb-2" style={{ color: accent }}>// educación</p>
          {data.educacion.map(
            (edu) =>
              (edu.titulo || edu.institucion) && (
                <div key={edu.id} className="flex justify-between items-baseline gap-2 mb-1 last:mb-0">
                  <p className="text-[12px] text-stone-300">
                    {edu.titulo}
                    {edu.institucion && <span className="text-stone-500"> · {edu.institucion}</span>}
                  </p>
                  <span className="text-[10px] text-stone-600 whitespace-nowrap">{edu.periodo}</span>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

function PreviewAcademico({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const hasPub = data.publicaciones.some((p) => p.titulo);
  const hasBecas = data.becas.some((b) => b.nombre);
  const label = "text-[11px] font-bold uppercase tracking-widest pb-1 mb-2 border-b border-stone-300";
  return (
    <div className="print-page bg-white text-[#1c1c1c] w-full max-w-[600px] shadow-2xl px-11 py-12 min-h-[780px]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="mb-6 pb-4 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-[24px] font-bold">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12.5px] mt-1 italic text-stone-600">{data.puesto}</p>}
        <p className="text-[11px] mt-2 text-stone-500">{[data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean).join("   ·   ")}</p>
      </div>
      {data.resumen && (
        <div className="mb-5">
          <h3 className={label}>Perfil académico</h3>
          <p className="text-[12.5px] leading-relaxed text-stone-800">{data.resumen}</p>
        </div>
      )}
      {hasEdu && (
        <div className="mb-5">
          <h3 className={label}>Formación</h3>
          {data.educacion.map(
            (edu) =>
              (edu.titulo || edu.institucion) && (
                <div key={edu.id} className="flex justify-between items-baseline gap-2 mb-1.5 last:mb-0">
                  <p className="text-[12.5px]">
                    <span className="font-bold">{edu.titulo}</span>
                    {edu.institucion && ` — ${edu.institucion}`}
                  </p>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">{edu.periodo}</span>
                </div>
              )
          )}
        </div>
      )}
      {hasPub && (
        <div className="mb-5">
          <h3 className={label}>Publicaciones</h3>
          {data.publicaciones.map(
            (p) =>
              p.titulo && (
                <p key={p.id} className="text-[12px] text-stone-700 mb-1.5 last:mb-0 leading-relaxed">
                  {p.titulo}
                  {p.revista && <span className="italic"> — {p.revista}</span>}
                  {p.anio && <span className="text-stone-500"> ({p.anio})</span>}
                </p>
              )
          )}
        </div>
      )}
      {hasBecas && (
        <div className="mb-5">
          <h3 className={label}>Becas y reconocimientos</h3>
          {data.becas.map(
            (b) =>
              b.nombre && (
                <div key={b.id} className="flex justify-between items-baseline gap-2 mb-1 last:mb-0">
                  <p className="text-[12px] text-stone-700">
                    {b.nombre}
                    {b.entidad && <span className="text-stone-500"> — {b.entidad}</span>}
                  </p>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">{b.anio}</span>
                </div>
              )
          )}
        </div>
      )}
      {hasExp && (
        <div className="mb-5">
          <h3 className={label}>Experiencia</h3>
          {data.experiencia.map(
            (exp) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="mb-2 last:mb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[12.5px] font-bold">
                      {exp.puesto}
                      {exp.empresa && <span className="font-normal"> — {exp.empresa}</span>}
                    </p>
                    <span className="text-[11px] text-stone-500 whitespace-nowrap">{exp.periodo}</span>
                  </div>
                  {exp.descripcion && <div className="text-[12px] text-stone-700 mt-0.5 leading-relaxed whitespace-pre-line">{exp.descripcion}</div>}
                </div>
              )
          )}
        </div>
      )}
      {data.habilidades && (
        <div>
          <h3 className={label}>Habilidades</h3>
          <p className="text-[12.5px] text-stone-700">{data.habilidades}</p>
        </div>
      )}
    </div>
  );
}

function PreviewComercial({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasLogros = data.logros.some((l) => l.metrica || l.descripcion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-11 min-h-[780px]">
      <div className="mb-6 pb-5" style={{ borderBottom: `2px solid ${accent}` }}>
        <h1 className="font-display text-[30px] leading-tight" style={{ color: "#1a1a1a" }}>{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="font-mono text-sm mt-1 tracking-wide" style={{ color: accent }}>{data.puesto}</p>}
        <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
      </div>
      {hasLogros && (
        <div className="mb-6 grid grid-cols-3 gap-2">
          {data.logros.map(
            (l) =>
              (l.metrica || l.descripcion) && (
                <div key={l.id} className="rounded-md px-2 py-3 text-center" style={{ background: `${accent}14` }}>
                  <p className="text-[19px] font-bold leading-none" style={{ color: accent }}>{l.metrica}</p>
                  <p className="text-[10px] text-stone-600 mt-1.5 leading-snug">{l.descripcion}</p>
                </div>
              )
          )}
        </div>
      )}
      {data.resumen && (
        <div className="mb-6">
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-6">
          <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
          <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
        </div>
      )}
      {data.habilidades && (
        <div>
          <SectionLabel accent={accent}>Habilidades</SectionLabel>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
    </div>
  );
}

function PreviewImpacto({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#161616] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[780px]">
      <h1 className="font-display text-[46px] leading-[0.95] tracking-tight mb-2">{data.nombre || "Tu nombre"}</h1>
      {data.puesto && <p className="text-[14px] font-mono uppercase tracking-widest mb-4" style={{ color: accent }}>{data.puesto}</p>}
      <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mb-8 text-[11.5px] text-stone-500" iconSize={10} />
      {data.resumen && <p className="text-[15px] leading-relaxed text-stone-700 mb-8 max-w-[480px]">{data.resumen}</p>}
      {hasExp && (
        <div className="mb-8">
          {data.experiencia.map(
            (exp, i) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="flex gap-4 mb-5 last:mb-0">
                  <span className="font-display text-[22px] leading-none shrink-0 w-16" style={{ color: accent }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 pb-5 border-b border-stone-100 last:border-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <p className="text-[15px] font-bold">
                        {exp.puesto}
                        {exp.empresa && <span className="font-normal text-stone-500"> · {exp.empresa}</span>}
                      </p>
                      <span className="font-mono text-[10px] text-stone-400 whitespace-nowrap">{exp.periodo}</span>
                    </div>
                    {exp.descripcion && <div className="text-[12.5px] text-stone-600 mt-1 leading-relaxed whitespace-pre-line">{exp.descripcion}</div>}
                  </div>
                </div>
              )
          )}
        </div>
      )}
      {hasEdu && (
        <div className="mb-8">
          <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div>
          <SectionLabel accent={accent}>Habilidades</SectionLabel>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
    </div>
  );
}

function PreviewAurora({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const bg = {
    backgroundImage: `radial-gradient(circle at 15% 8%, ${accent}55, transparent 45%), radial-gradient(circle at 90% 88%, ${accent}33, transparent 50%), linear-gradient(160deg, #FBF9F5 0%, #F2F0EA 100%)`,
  };
  const card = "mb-4 last:mb-0 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm";
  return (
    <div className="print-page w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[780px] text-[#232323]" style={bg}>
      <div className="mb-5">
        <h1 className="font-display text-[30px] leading-tight" style={{ color: "#1a1a1a" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && (
          <p className="font-mono text-sm mt-1" style={{ color: accent }}>{data.puesto}</p>
        )}
        <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
      </div>
      {data.resumen && (
        <div className={card}>
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className={card}>
          <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
          <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
        </div>
      )}
      {hasEdu && (
        <div className={card}>
          <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div className={card}>
          <SectionLabel accent={accent}>Habilidades</SectionLabel>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
    </div>
  );
}

function PreviewBlueprint({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const gridBg = {
    backgroundColor: "#fbf9f5",
    backgroundImage: `linear-gradient(${accent}22 1px, transparent 1px), linear-gradient(90deg, ${accent}22 1px, transparent 1px)`,
    backgroundSize: "18px 18px",
  };
  const corner = "absolute w-4 h-4";
  return (
    <div
      className="print-page w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[780px] text-[#232323] relative overflow-hidden"
      style={{ ...gridBg, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <div className={corner + " top-3 left-3 border-l-2 border-t-2"} style={{ borderColor: accent }} />
      <div className={corner + " top-3 right-3 border-r-2 border-t-2"} style={{ borderColor: accent }} />
      <div className={corner + " bottom-3 left-3 border-l-2 border-b-2"} style={{ borderColor: accent }} />
      <div className={corner + " bottom-3 right-3 border-r-2 border-b-2"} style={{ borderColor: accent }} />
      <div className="mb-6 pb-4 border-b" style={{ borderColor: `${accent}55` }}>
        <p className="text-[10px] mb-1 tracking-widest" style={{ color: accent }}>
          REF. CURRÍCULUM
        </p>
        <h1 className="text-[24px] font-bold">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
        <ContactLine
          data={data}
          className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-stone-600"
          iconSize={10}
        />
      </div>
      {data.resumen && (
        <div className="mb-5">
          <p className="text-[10.5px] uppercase tracking-widest mb-1.5" style={{ color: accent }}>// perfil</p>
          <p className="text-[12px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-5">
          <p className="text-[10.5px] uppercase tracking-widest mb-2" style={{ color: accent }}>// experiencia</p>
          {data.experiencia.map(
            (exp) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="text-[12.5px] font-bold">
                      {exp.puesto}
                      {exp.empresa && <span className="font-normal text-stone-500"> · {exp.empresa}</span>}
                    </p>
                    <span className="text-[10px] text-stone-500 whitespace-nowrap">{exp.periodo}</span>
                  </div>
                  {exp.descripcion && (
                    <div className="text-[11px] text-stone-600 mt-1 leading-relaxed whitespace-pre-line">
                      {exp.descripcion}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      )}
      {hasEdu && (
        <div className="mb-5">
          <p className="text-[10.5px] uppercase tracking-widest mb-2" style={{ color: accent }}>// educación</p>
          {data.educacion.map(
            (edu) =>
              (edu.titulo || edu.institucion) && (
                <div key={edu.id} className="flex justify-between items-baseline gap-2 mb-1 last:mb-0">
                  <p className="text-[12px] text-stone-700">
                    {edu.titulo}
                    {edu.institucion && <span className="text-stone-500"> · {edu.institucion}</span>}
                  </p>
                  <span className="text-[10px] text-stone-500 whitespace-nowrap">{edu.periodo}</span>
                </div>
              )
          )}
        </div>
      )}
      {data.habilidades && (
        <div>
          <p className="text-[10.5px] uppercase tracking-widest mb-2" style={{ color: accent }}>// habilidades</p>
          <div className="flex flex-wrap gap-1.5">
            {data.habilidades.split(",").map(
              (h, i) =>
                h.trim() && (
                  <span key={i} className="text-[10.5px] px-2 py-1 rounded-sm border" style={{ borderColor: `${accent}55`, color: accent }}>
                    {h.trim()}
                  </span>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewBloques({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[780px] relative overflow-hidden">
      <div className="absolute -top-10 -right-16 w-52 h-52 rounded-full" style={{ background: accent, opacity: 0.15 }} />
      <div className="absolute top-28 -left-12 w-36 h-36 rotate-45" style={{ background: accent, opacity: 0.1 }} />
      <div className="relative px-10 py-11">
        <div className="mb-6">
          <h1 className="font-display text-[32px] leading-tight" style={{ color: "#1a1a1a" }}>
            {data.nombre || "Tu nombre"}
          </h1>
          {data.puesto && (
            <p className="font-mono text-sm mt-1" style={{ color: accent }}>{data.puesto}</p>
          )}
          <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
        </div>
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {hasExp && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
        {hasEdu && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
        {data.habilidades && (
          <div>
            <SectionLabel accent={accent}>Habilidades</SectionLabel>
            <SkillChips data={data} accent={accent} />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewNocturno({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#121212] text-stone-300 w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[780px]">
      <div className="mb-6 pb-5 border-b" style={{ borderColor: `${accent}44` }}>
        <h1 className="font-display text-[30px] leading-tight text-white">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && (
          <p className="font-mono text-sm mt-1 tracking-widest uppercase" style={{ color: accent }}>
            {data.puesto}
          </p>
        )}
        <ContactLine
          data={data}
          className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-stone-500"
          iconSize={10}
        />
      </div>
      {data.resumen && (
        <div className="mb-6">
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-400">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className="mb-6">
          <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
          {data.experiencia.map(
            (exp) =>
              (exp.puesto || exp.empresa) && (
                <div key={exp.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <p className="font-display text-[15px] font-medium text-white">
                      {exp.puesto}
                      {exp.empresa && <span className="font-sans text-stone-500 text-[13px] font-normal"> · {exp.empresa}</span>}
                    </p>
                    <span className="font-mono text-[11px] text-stone-600 whitespace-nowrap">{exp.periodo}</span>
                  </div>
                  {exp.descripcion && (
                    <div className="text-[12.5px] text-stone-400 mt-1 leading-relaxed whitespace-pre-line">
                      {exp.descripcion}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      )}
      {hasEdu && (
        <div className="mb-6">
          <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
          {data.educacion.map(
            (edu) =>
              (edu.titulo || edu.institucion) && (
                <div key={edu.id} className="mb-2 last:mb-0 flex items-baseline justify-between gap-2">
                  <p className="text-[13px] text-stone-300">
                    <span className="font-medium text-white">{edu.titulo}</span>
                    {edu.institucion && <span className="text-stone-500"> · {edu.institucion}</span>}
                  </p>
                  <span className="font-mono text-[11px] text-stone-600 whitespace-nowrap">{edu.periodo}</span>
                </div>
              )
          )}
        </div>
      )}
      {data.habilidades && (
        <div>
          <SectionLabel accent={accent}>Habilidades</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {data.habilidades.split(",").map(
              (h, i) =>
                h.trim() && (
                  <span key={i} className="text-[11px] px-2 py-1 rounded-sm border" style={{ borderColor: `${accent}55`, color: accent }}>
                    {h.trim()}
                  </span>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewRevista({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const resumenText = data.resumen || "";
  const firstLetter = resumenText.charAt(0);
  const restText = resumenText.slice(1);
  return (
    <div className="print-page bg-white text-[#1c1c1c] w-full max-w-[600px] shadow-2xl px-10 py-11 min-h-[780px]">
      <p className="text-center text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: accent }}>
        Currículum · Edición personal
      </p>
      <h1 className="font-display text-[40px] text-center leading-none mb-2">{data.nombre || "Tu nombre"}</h1>
      {data.puesto && <p className="text-center text-[13px] text-stone-500 italic mb-3">{data.puesto}</p>}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-stone-300" />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        <div className="flex-1 h-px bg-stone-300" />
      </div>
      <ContactLine data={data} className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-7 text-[11px] text-stone-500" iconSize={10} />
      {data.resumen && (
        <p className="text-[13px] leading-relaxed text-stone-700 mb-7">
          <span className="font-display float-left text-[52px] leading-[0.8] pr-2 pt-1" style={{ color: accent }}>
            {firstLetter}
          </span>
          {restText}
        </p>
      )}
      {hasExp && (
        <div className="mb-6 clear-both">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4" style={{ background: accent }} />
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Experiencia</h3>
          </div>
          <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
        </div>
      )}
      {hasEdu && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4" style={{ background: accent }} />
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Educación</h3>
          </div>
          <EducacionBlock data={data} />
        </div>
      )}
      {data.habilidades && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4" style={{ background: accent }} />
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Habilidades</h3>
          </div>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
      <p className="text-center text-[10px] text-stone-300 mt-8 tracking-widest">— 01 —</p>
    </div>
  );
}

function PreviewContorno({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#1f1f1f] w-full max-w-[600px] shadow-2xl p-5 min-h-[780px]">
      <div className="h-full border-2 px-8 py-10" style={{ borderColor: accent }}>
        <div className="h-full border px-2 py-2" style={{ borderColor: "#d6d3cd" }}>
          <div className="text-center mb-6 px-4 py-4">
            <h1 className="font-display text-[27px]">{data.nombre || "Tu nombre"}</h1>
            {data.puesto && (
              <p className="text-[12px] mt-1 tracking-widest uppercase" style={{ color: accent }}>{data.puesto}</p>
            )}
            <ContactLine
              data={data}
              className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-stone-500"
              iconSize={10}
            />
          </div>
          <div className="px-4">
            {data.resumen && (
              <div className="mb-5 text-center">
                <p className="text-[12.5px] leading-relaxed text-stone-600 italic max-w-[420px] mx-auto">{data.resumen}</p>
              </div>
            )}
            {hasExp && (
              <div className="mb-5">
                <SectionLabel accent={accent} className="mb-3 text-center">Experiencia</SectionLabel>
                <ExperienciaBlock data={data} titleClass="text-[13.5px] font-medium text-stone-900" />
              </div>
            )}
            {hasEdu && (
              <div className="mb-5">
                <SectionLabel accent={accent} className="mb-2 text-center">Educación</SectionLabel>
                <EducacionBlock data={data} />
              </div>
            )}
            {data.habilidades && (
              <div className="text-center">
                <SectionLabel accent={accent}>Habilidades</SectionLabel>
                <p className="text-[12px] text-stone-600">{data.habilidades}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewDinamico({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[780px] overflow-hidden">
      <div
        className="px-10 pt-10 pb-14"
        style={{ background: accent, clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}
      >
        <h1 className="font-display text-[30px] text-white leading-tight">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[13px] mt-1 text-white/80 font-mono tracking-wide">{data.puesto}</p>}
        <ContactLine
          data={data}
          className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-white/85"
          iconSize={10}
        />
      </div>
      <div className="px-10 -mt-6 pt-2 pb-8">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {hasExp && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
        {hasEdu && (
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
        {data.habilidades && (
          <div>
            <SectionLabel accent={accent}>Habilidades</SectionLabel>
            <SkillChips data={data} accent={accent} />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewTarjetas({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  const cardBase = "bg-white rounded-md shadow-md px-4 py-3 mb-5 last:mb-0 relative";
  const tab = "absolute -top-2.5 left-4 text-[9px] px-2 py-0.5 rounded-sm text-white tracking-wide";
  return (
    <div
      className="print-page w-full max-w-[600px] shadow-2xl px-8 py-10 min-h-[780px] text-[#232323]"
      style={{ backgroundColor: "#F0EDE6", backgroundImage: "radial-gradient(#00000012 1px, transparent 1px)", backgroundSize: "14px 14px" }}
    >
      <div className="mb-6 text-center">
        <h1 className="font-display text-[27px]">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-[11px] text-stone-600"
          iconSize={10}
        />
      </div>
      {data.resumen && (
        <div className={cardBase} style={{ transform: "rotate(-1deg)" }}>
          <span className={tab} style={{ background: accent }}>PERFIL</span>
          <p className="text-[12.5px] leading-relaxed text-stone-700 mt-1">{data.resumen}</p>
        </div>
      )}
      {hasExp && (
        <div className={cardBase} style={{ transform: "rotate(0.6deg)" }}>
          <span className={tab} style={{ background: accent }}>EXPERIENCIA</span>
          <div className="mt-1">
            <ExperienciaBlock data={data} titleClass="text-[14px] font-medium text-stone-900" />
          </div>
        </div>
      )}
      {hasEdu && (
        <div className={cardBase} style={{ transform: "rotate(-0.5deg)" }}>
          <span className={tab} style={{ background: accent }}>EDUCACIÓN</span>
          <div className="mt-1">
            <EducacionBlock data={data} />
          </div>
        </div>
      )}
      {data.habilidades && (
        <div className={cardBase} style={{ transform: "rotate(0.8deg)" }}>
          <span className={tab} style={{ background: accent }}>HABILIDADES</span>
          <div className="mt-1">
            <SkillChips data={data} accent={accent} />
          </div>
        </div>
      )}
    </div>
  );
}

const TEMPLATE_COMPONENTS = {
  clasico: PreviewClasico,
  moderno: PreviewModerno,
  minimalista: PreviewMinimalista,
  ejecutivo: PreviewEjecutivo,
  corporativo: PreviewCorporativo,
  compacto: PreviewCompacto,
  creativo: PreviewCreativo,
  desarrollador: PreviewDesarrollador,
  academico: PreviewAcademico,
  comercial: PreviewComercial,
  impacto: PreviewImpacto,
  aurora: PreviewAurora,
  blueprint: PreviewBlueprint,
  bloques: PreviewBloques,
  nocturno: PreviewNocturno,
  revista: PreviewRevista,
  contorno: PreviewContorno,
  dinamico: PreviewDinamico,
  tarjetas: PreviewTarjetas,
};

export default function CVBuilder() {
  const [data, setData] = useState(initialState);
  const [loadingField, setLoadingField] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const previewRef = useRef(null);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const updateExperience = (id, patch) =>
    setData((d) => ({
      ...d,
      experiencia: d.experiencia.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));

  const updateEducation = (id, patch) =>
    setData((d) => ({
      ...d,
      educacion: d.educacion.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));

  const addExperience = () =>
    setData((d) => ({ ...d, experiencia: [...d.experiencia, emptyExperience()] }));
  const removeExperience = (id) =>
    setData((d) => ({ ...d, experiencia: d.experiencia.filter((e) => e.id !== id) }));

  const addEducation = () =>
    setData((d) => ({ ...d, educacion: [...d.educacion, emptyEducation()] }));
  const removeEducation = (id) =>
    setData((d) => ({ ...d, educacion: d.educacion.filter((e) => e.id !== id) }));

  // Generic helpers for the optional list sections (proyectos, publicaciones, becas, logros)
  const makeListHandlers = (field, emptyItem) => ({
    update: (id, patch) =>
      setData((d) => ({ ...d, [field]: d[field].map((it) => (it.id === id ? { ...it, ...patch } : it)) })),
    add: () => setData((d) => ({ ...d, [field]: [...d[field], emptyItem()] })),
    remove: (id) => setData((d) => ({ ...d, [field]: d[field].filter((it) => it.id !== id) })),
  });

  const proyectosH = makeListHandlers("proyectos", emptyProject);
  const publicacionesH = makeListHandlers("publicaciones", emptyPublication);
  const becasH = makeListHandlers("becas", emptyBeca);
  const logrosH = makeListHandlers("logros", emptyLogro);

  const improveSummary = async () => {
    if (!data.resumen.trim()) return;
    setLoadingField("resumen");
    try {
      const result = await callClaude(
        `Reescribe este resumen profesional de un currículum en español, de forma más clara, concisa y profesional. Máximo 3 frases, sin viñetas, sin comillas ni texto extra, responde solo con el resumen mejorado:\n\n"${data.resumen}"`
      );
      update({ resumen: result.replace(/^"|"$/g, "") });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingField(null);
    }
  };

  const improveExperience = async (exp) => {
    if (!exp.descripcion.trim()) return;
    setLoadingField(exp.id);
    try {
      const result = await callClaude(
        `Reescribe esta descripción de un puesto de trabajo para un currículum en español. Usa viñetas cortas que empiecen con verbos de acción en pasado, orientadas a logros y resultados cuando sea posible. Máximo 3 viñetas, cada una en una línea, sin encabezados ni texto extra. Puesto: "${exp.puesto}" en "${exp.empresa}". Descripción actual:\n\n"${exp.descripcion}"`
      );
      updateExperience(exp.id, { descripcion: result });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingField(null);
    }
  };

  const improveSkills = async () => {
    if (!data.habilidades.trim()) return;
    setLoadingField("habilidades");
    try {
      const result = await callClaude(
        `Organiza y pule esta lista de habilidades para un currículum en español. Devuelve solo una lista separada por comas, sin encabezados ni texto extra:\n\n"${data.habilidades}"`
      );
      update({ habilidades: result });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingField(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const accent = data.accent;
  const PreviewComponent = TEMPLATE_COMPONENTS[data.template] || PreviewClasico;
  const currentTemplateName = TEMPLATES.find((t) => t.id === data.template)?.name;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Work Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        input:focus, textarea:focus { border-color: ${accent} !important; box-shadow: 0 0 0 2px ${accent}33; }
        @media print {
          .no-print { display: none !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; width: 100% !important; min-height: 0 !important; }
          body { background: white !important; }
        }
      `}</style>

      <TemplateGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        current={data.template}
        accent={accent}
        onSelect={(id) => update({ template: id })}
      />

      {/* Header */}
      <header className="no-print border-b border-stone-800 px-6 py-4 flex items-center justify-between sticky top-0 bg-stone-950/95 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center font-display text-lg"
            style={{ background: accent }}
          >
            CV
          </div>
          <div>
            <h1 className="font-display text-lg leading-none">Constructor de currículum</h1>
            <p className="text-[11px] font-mono text-stone-500 mt-0.5">editor + vista previa en vivo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGalleryOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-md border border-stone-700 text-stone-200 hover:border-stone-500 transition"
          >
            <LayoutTemplate size={15} /> {currentTemplateName}
          </button>
          <div className="flex items-center gap-1.5">
            {ACCENTS.map((a) => (
              <button
                key={a.value}
                onClick={() => update({ accent: a.value })}
                title={a.name}
                className="w-5 h-5 rounded-full border-2 transition"
                style={{
                  background: a.value,
                  borderColor: data.accent === a.value ? "white" : "transparent",
                }}
              />
            ))}
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md text-stone-950 transition hover:opacity-90"
            style={{ background: accent }}
          >
            <Download size={15} /> Descargar PDF
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Editor */}
        <div className="no-print px-6 py-8 max-w-xl mx-auto lg:mx-0 lg:pl-10 w-full">
          <section className="mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-stone-700" /> Datos personales
            </h2>
            <div className="grid grid-cols-2 gap-x-3">
              <Field label="Nombre completo">
                <input
                  className={inputClass}
                  value={data.nombre}
                  onChange={(e) => update({ nombre: e.target.value })}
                  placeholder="Ana Torres"
                />
              </Field>
              <Field label="Título profesional">
                <input
                  className={inputClass}
                  value={data.puesto}
                  onChange={(e) => update({ puesto: e.target.value })}
                  placeholder="Diseñadora UX"
                />
              </Field>
              <Field label="Email">
                <input
                  className={inputClass}
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                  placeholder="ana@correo.com"
                />
              </Field>
              <Field label="Teléfono">
                <input
                  className={inputClass}
                  value={data.telefono}
                  onChange={(e) => update({ telefono: e.target.value })}
                  placeholder="+52 55 1234 5678"
                />
              </Field>
              <Field label="Ubicación">
                <input
                  className={inputClass}
                  value={data.ubicacion}
                  onChange={(e) => update({ ubicacion: e.target.value })}
                  placeholder="Ciudad de México"
                />
              </Field>
              <Field label="LinkedIn / portafolio">
                <input
                  className={inputClass}
                  value={data.linkedin}
                  onChange={(e) => update({ linkedin: e.target.value })}
                  placeholder="linkedin.com/in/ana"
                />
              </Field>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Resumen profesional
              </h2>
              <AIButton onClick={improveSummary} loading={loadingField === "resumen"} />
            </div>
            <textarea
              className={inputClass + " min-h-[90px] resize-none"}
              value={data.resumen}
              onChange={(e) => update({ resumen: e.target.value })}
              placeholder="Escribe 2-3 frases sobre tu experiencia y fortalezas..."
            />
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Experiencia
              </h2>
              <button
                onClick={addExperience}
                className="text-stone-400 hover:text-white transition"
                title="Agregar experiencia"
              >
                <Plus size={16} />
              </button>
            </div>
            {data.experiencia.map((exp) => (
              <div key={exp.id} className="mb-5 pb-5 border-b border-stone-800 last:border-0">
                <div className="flex items-start gap-2">
                  <GripVertical size={14} className="text-stone-700 mt-2.5 shrink-0" />
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-x-3">
                      <Field label="Puesto">
                        <input
                          className={inputClass}
                          value={exp.puesto}
                          onChange={(e) => updateExperience(exp.id, { puesto: e.target.value })}
                          placeholder="Desarrolladora backend"
                        />
                      </Field>
                      <Field label="Empresa">
                        <input
                          className={inputClass}
                          value={exp.empresa}
                          onChange={(e) => updateExperience(exp.id, { empresa: e.target.value })}
                          placeholder="Acme Inc."
                        />
                      </Field>
                    </div>
                    <Field label="Periodo">
                      <input
                        className={inputClass}
                        value={exp.periodo}
                        onChange={(e) => updateExperience(exp.id, { periodo: e.target.value })}
                        placeholder="Ene 2022 — Presente"
                      />
                    </Field>
                    <div className="flex items-center justify-between mb-1">
                      <span className="block text-[11px] font-mono uppercase tracking-wider text-stone-400">
                        Descripción
                      </span>
                      <AIButton
                        onClick={() => improveExperience(exp)}
                        loading={loadingField === exp.id}
                      />
                    </div>
                    <textarea
                      className={inputClass + " min-h-[80px] resize-none"}
                      value={exp.descripcion}
                      onChange={(e) => updateExperience(exp.id, { descripcion: e.target.value })}
                      placeholder="Responsabilidades y logros principales..."
                    />
                  </div>
                  {data.experiencia.length > 1 && (
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-stone-600 hover:text-red-400 transition mt-2.5"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Educación
              </h2>
              <button
                onClick={addEducation}
                className="text-stone-400 hover:text-white transition"
                title="Agregar educación"
              >
                <Plus size={16} />
              </button>
            </div>
            {data.educacion.map((edu) => (
              <div key={edu.id} className="mb-4 flex items-start gap-2">
                <div className="flex-1">
                  <Field label="Título / carrera">
                    <input
                      className={inputClass}
                      value={edu.titulo}
                      onChange={(e) => updateEducation(edu.id, { titulo: e.target.value })}
                      placeholder="Lic. en Sistemas Computacionales"
                    />
                  </Field>
                  <div className="grid grid-cols-2 gap-x-3">
                    <Field label="Institución">
                      <input
                        className={inputClass}
                        value={edu.institucion}
                        onChange={(e) => updateEducation(edu.id, { institucion: e.target.value })}
                        placeholder="UNAM"
                      />
                    </Field>
                    <Field label="Periodo">
                      <input
                        className={inputClass}
                        value={edu.periodo}
                        onChange={(e) => updateEducation(edu.id, { periodo: e.target.value })}
                        placeholder="2018 — 2022"
                      />
                    </Field>
                  </div>
                </div>
                {data.educacion.length > 1 && (
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-stone-600 hover:text-red-400 transition mt-6"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </section>

          <section>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Habilidades
              </h2>
              <AIButton onClick={improveSkills} loading={loadingField === "habilidades"} />
            </div>
            <textarea
              className={inputClass + " min-h-[60px] resize-none"}
              value={data.habilidades}
              onChange={(e) => update({ habilidades: e.target.value })}
              placeholder="Python, gestión de equipos, SQL, comunicación..."
            />
          </section>

          <div className="mt-2 mb-1">
            <p className="text-[10px] font-mono uppercase tracking-widest text-stone-600">
              Secciones opcionales — según la plantilla
            </p>
          </div>

          <section className="mt-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Proyectos <span className="text-stone-600 normal-case">· Desarrollador</span>
              </h2>
              <button onClick={proyectosH.add} className="text-stone-400 hover:text-white transition" title="Agregar proyecto">
                <Plus size={16} />
              </button>
            </div>
            {data.proyectos.map((p) => (
              <div key={p.id} className="mb-4 pb-4 border-b border-stone-800 last:border-0 flex items-start gap-2">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-3">
                    <Field label="Nombre del proyecto">
                      <input className={inputClass} value={p.nombre} onChange={(e) => proyectosH.update(p.id, { nombre: e.target.value })} placeholder="App de finanzas personales" />
                    </Field>
                    <Field label="Link (opcional)">
                      <input className={inputClass} value={p.link} onChange={(e) => proyectosH.update(p.id, { link: e.target.value })} placeholder="github.com/ana/finanzas" />
                    </Field>
                  </div>
                  <Field label="Stack / tecnologías">
                    <input className={inputClass} value={p.stack} onChange={(e) => proyectosH.update(p.id, { stack: e.target.value })} placeholder="React, Node.js, PostgreSQL" />
                  </Field>
                  <Field label="Descripción">
                    <textarea className={inputClass + " min-h-[60px] resize-none"} value={p.descripcion} onChange={(e) => proyectosH.update(p.id, { descripcion: e.target.value })} placeholder="Qué hace el proyecto y qué lograste con él..." />
                  </Field>
                </div>
                {data.proyectos.length > 1 && (
                  <button onClick={() => proyectosH.remove(p.id)} className="text-stone-600 hover:text-red-400 transition mt-2.5">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Publicaciones <span className="text-stone-600 normal-case">· Académico</span>
              </h2>
              <button onClick={publicacionesH.add} className="text-stone-400 hover:text-white transition" title="Agregar publicación">
                <Plus size={16} />
              </button>
            </div>
            {data.publicaciones.map((p) => (
              <div key={p.id} className="mb-3 flex items-start gap-2">
                <div className="flex-1">
                  <Field label="Título">
                    <input className={inputClass} value={p.titulo} onChange={(e) => publicacionesH.update(p.id, { titulo: e.target.value })} placeholder="Título del artículo o paper" />
                  </Field>
                  <div className="grid grid-cols-2 gap-x-3">
                    <Field label="Revista / conferencia">
                      <input className={inputClass} value={p.revista} onChange={(e) => publicacionesH.update(p.id, { revista: e.target.value })} placeholder="Revista Latinoamericana de..." />
                    </Field>
                    <Field label="Año">
                      <input className={inputClass} value={p.anio} onChange={(e) => publicacionesH.update(p.id, { anio: e.target.value })} placeholder="2023" />
                    </Field>
                  </div>
                </div>
                {data.publicaciones.length > 1 && (
                  <button onClick={() => publicacionesH.remove(p.id)} className="text-stone-600 hover:text-red-400 transition mt-6">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Becas y reconocimientos <span className="text-stone-600 normal-case">· Académico</span>
              </h2>
              <button onClick={becasH.add} className="text-stone-400 hover:text-white transition" title="Agregar beca">
                <Plus size={16} />
              </button>
            </div>
            {data.becas.map((b) => (
              <div key={b.id} className="mb-3 flex items-start gap-2">
                <div className="flex-1">
                  <Field label="Nombre">
                    <input className={inputClass} value={b.nombre} onChange={(e) => becasH.update(b.id, { nombre: e.target.value })} placeholder="Beca de excelencia académica" />
                  </Field>
                  <div className="grid grid-cols-2 gap-x-3">
                    <Field label="Entidad">
                      <input className={inputClass} value={b.entidad} onChange={(e) => becasH.update(b.id, { entidad: e.target.value })} placeholder="CONACYT" />
                    </Field>
                    <Field label="Año">
                      <input className={inputClass} value={b.anio} onChange={(e) => becasH.update(b.id, { anio: e.target.value })} placeholder="2021" />
                    </Field>
                  </div>
                </div>
                {data.becas.length > 1 && (
                  <button onClick={() => becasH.remove(b.id)} className="text-stone-600 hover:text-red-400 transition mt-6">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-stone-500 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> Logros destacados <span className="text-stone-600 normal-case">· Ventas / Marketing</span>
              </h2>
              <button onClick={logrosH.add} className="text-stone-400 hover:text-white transition" title="Agregar logro">
                <Plus size={16} />
              </button>
            </div>
            {data.logros.map((l) => (
              <div key={l.id} className="mb-3 flex items-start gap-2">
                <div className="flex-1 grid grid-cols-[100px_1fr] gap-x-3">
                  <Field label="Métrica">
                    <input className={inputClass} value={l.metrica} onChange={(e) => logrosH.update(l.id, { metrica: e.target.value })} placeholder="+45%" />
                  </Field>
                  <Field label="Descripción">
                    <input className={inputClass} value={l.descripcion} onChange={(e) => logrosH.update(l.id, { descripcion: e.target.value })} placeholder="Crecimiento en ventas Q3" />
                  </Field>
                </div>
                {data.logros.length > 1 && (
                  <button onClick={() => logrosH.remove(l.id)} className="text-stone-600 hover:text-red-400 transition mt-6">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </section>
        </div>

        {/* Preview */}
        <div className="bg-stone-900 px-6 py-8 flex justify-center print:bg-white print:p-0">
          <div ref={previewRef} className="w-full flex justify-center">
            <PreviewComponent data={data} accent={accent} />
          </div>
        </div>
      </div>
    </div>
  );
}
