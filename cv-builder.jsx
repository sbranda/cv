import React, { useState, useRef, useEffect } from "react";
import * as mammoth from "mammoth";
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
  Copy,
  Users,
  FileText,
  Upload,
  FileDown,
  AlignLeft,
  AlertTriangle,
  Target,
  Languages,
  Undo2,
  Redo2,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Camera,
} from "lucide-react";

const ACCENTS = [
  { name: "Bosque", value: "#2F6F5E" },
  { name: "Tinta", value: "#2B3A67" },
  { name: "Ciruela", value: "#5B3758" },
  { name: "Óxido", value: "#8A3B2E" },
];

const TYPO_PRESETS = {
  clasica: { name: "Clásica", display: "'Fraunces', serif", body: "'Work Sans', sans-serif" },
  moderna: { name: "Moderna", display: "'Inter', sans-serif", body: "'Inter', sans-serif" },
  elegante: { name: "Elegante", display: "'Playfair Display', serif", body: "'Lato', sans-serif" },
};

const DENSITY_SCALE = { compacta: 0.9, normal: 1, amplia: 1.1 };
const DENSITY_OPTIONS = [
  { id: "compacta", name: "Compacta" },
  { id: "normal", name: "Normal" },
  { id: "amplia", name: "Amplia" },
];

const CATEGORIES = [
  { id: "formal", name: "Formal" },
  { id: "creativo", name: "Creativo" },
  { id: "tecnico", name: "Técnico" },
  { id: "fondos", name: "Fondos especiales" },
];

const TEMPLATES = [
  {
    id: "clasico",
    name: "Clásico",
    desc: "Encabezado editorial, una columna",
    category: "formal",
  },
  {
    id: "moderno",
    name: "Moderno",
    desc: "Barra lateral oscura con datos y skills",
    category: "fondos",
  },
  {
    id: "minimalista",
    name: "Minimalista",
    desc: "Tipografía limpia, mucho espacio en blanco",
    category: "formal",
  },
  {
    id: "ejecutivo",
    name: "Ejecutivo",
    desc: "Encabezado centrado, dos columnas",
    category: "formal",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    desc: "Formal y sobrio, ideal para sistemas ATS",
    category: "formal",
  },
  {
    id: "compacto",
    name: "Compacto",
    desc: "Estilo línea de tiempo, cabe más contenido",
    category: "tecnico",
  },
  {
    id: "creativo",
    name: "Creativo",
    desc: "Encabezado en bloque de color, más visual",
    category: "creativo",
  },
  {
    id: "desarrollador",
    name: "Desarrollador",
    desc: "Con proyectos y stack técnico",
    category: "tecnico",
  },
  {
    id: "academico",
    name: "Académico",
    desc: "Publicaciones, becas y formación",
    category: "formal",
  },
  {
    id: "comercial",
    name: "Ventas / Marketing",
    desc: "Métricas y logros destacados",
    category: "creativo",
  },
  {
    id: "impacto",
    name: "Impacto",
    desc: "Tipografía grande, un logro por línea",
    category: "creativo",
  },
  {
    id: "aurora",
    name: "Aurora",
    desc: "Fondo degradado suave, tarjetas flotantes",
    category: "fondos",
  },
  {
    id: "blueprint",
    name: "Blueprint",
    desc: "Cuadrícula técnica, ideal para perfiles técnicos",
    category: "tecnico",
  },
  {
    id: "bloques",
    name: "Bloques",
    desc: "Formas geométricas de color detrás del encabezado",
    category: "fondos",
  },
  {
    id: "nocturno",
    name: "Nocturno",
    desc: "Fondo oscuro elegante, acentos finos",
    category: "fondos",
  },
  {
    id: "revista",
    name: "Revista",
    desc: "Estilo editorial, con letra capital",
    category: "creativo",
  },
  {
    id: "contorno",
    name: "Contorno",
    desc: "Marco tipo diploma, elegante y centrado",
    category: "formal",
  },
  {
    id: "dinamico",
    name: "Dinámico",
    desc: "Banda de color con corte diagonal",
    category: "creativo",
  },
  {
    id: "tarjetas",
    name: "Tarjetas",
    desc: "Secciones como notas apiladas, estilo scrapbook",
    category: "creativo",
  },
  {
    id: "simetria",
    name: "Simetría",
    desc: "Dos columnas parejas al 50/50, con línea divisoria",
    category: "formal",
  },
  {
    id: "prensa",
    name: "Prensa",
    desc: "Texto en columnas tipo periódico",
    category: "creativo",
  },
  {
    id: "panel",
    name: "Panel",
    desc: "Barra lateral de color sólido, a la derecha",
    category: "fondos",
  },
  {
    id: "columna",
    name: "Columna",
    desc: "Columna angosta clara a la izquierda, con borde",
    category: "formal",
  },
  {
    id: "franja",
    name: "Franja",
    desc: "Columna angosta de color sólido, a la izquierda",
    category: "fondos",
  },
  {
    id: "retrato",
    name: "Retrato",
    desc: "Columna angosta enfocada en la foto, centrada",
    category: "creativo",
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
  foto: null,
  fotoEscala: 1,
  tipografia: "clasica",
  densidad: "normal",
  ordenSecciones: ["resumen", "experiencia", "educacion", "habilidades"],
  experiencia: [emptyExperience()],
  educacion: [emptyEducation()],
  habilidades: "",
  proyectos: [emptyProject()],
  publicaciones: [emptyPublication()],
  becas: [emptyBeca()],
  logros: [emptyLogro()],
  seccionesOpcionales: { proyectos: false, publicaciones: false, becas: false, logros: false },
  accent: ACCENTS[0].value,
  template: "clasico",
  carta: { empresa: "", puestoAplicado: "", tono: "formal", detalles: "", texto: "" },
  comparacion: { descripcion: "", resultado: null },
  contactoAlPie: false,
};

const TONOS = [
  { id: "formal", name: "Formal" },
  { id: "cercano", name: "Cercano" },
  { id: "entusiasta", name: "Entusiasta" },
];

const RESUMEN_LENGTHS = [
  { id: "muycorto", label: "1 frase", instruccion: "una sola frase concisa (máximo 20 palabras)" },
  { id: "corto", label: "2 frases", instruccion: "exactamente 2 frases (entre 30 y 45 palabras en total)" },
  { id: "medio", label: "3 frases", instruccion: "exactamente 3 frases (entre 50 y 70 palabras en total)" },
  { id: "largo", label: "5 frases", instruccion: "4 a 5 frases (entre 80 y 110 palabras en total)" },
];

const OPTIONAL_SECTIONS = [
  { id: "proyectos", name: "Proyectos", template: "Desarrollador" },
  { id: "publicaciones", name: "Publicaciones", template: "Académico" },
  { id: "becas", name: "Becas y reconocimientos", template: "Académico" },
  { id: "logros", name: "Logros destacados", template: "Ventas/Marketing" },
];

const DEFAULT_SECTION_ORDER = ["resumen", "experiencia", "educacion", "habilidades"];
const SECTION_LABELS = {
  resumen: "Perfil / Resumen",
  experiencia: "Experiencia",
  educacion: "Educación",
  habilidades: "Habilidades",
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
      <span className="block text-[11px] font-mono uppercase tracking-wider text-white mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function SectionOrderList({ order, accent, onReorder }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const itemRefs = useRef([]);

  const handlePointerDown = (index) => (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragIndex(index);
    setOverIndex(index);
  };

  const handlePointerMove = (e) => {
    if (dragIndex === null) return;
    const y = e.clientY;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) setOverIndex(i);
    });
  };

  const finishDrag = () => {
    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const newOrder = [...order];
      const [moved] = newOrder.splice(dragIndex, 1);
      newOrder.splice(overIndex, 0, moved);
      onReorder(newOrder);
    }
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div>
      {order.map((key, i) => (
        <div
          key={key}
          ref={(el) => (itemRefs.current[i] = el)}
          className="flex items-center gap-2 px-3 py-2 rounded-md border mb-1.5 bg-stone-800/40 transition"
          style={{
            borderColor: dragIndex === i ? accent : overIndex === i && dragIndex !== null ? `${accent}88` : "#3f3a35",
            opacity: dragIndex === i ? 0.5 : 1,
          }}
        >
          <button
            onPointerDown={handlePointerDown(i)}
            onPointerMove={handlePointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            className="cursor-grab active:cursor-grabbing text-stone-500 shrink-0"
            style={{ touchAction: "none" }}
          >
            <GripVertical size={15} />
          </button>
          <span className="text-[12.5px] text-stone-300">{SECTION_LABELS[key] || key}</span>
        </div>
      ))}
    </div>
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
// Gesto de "deslizar hacia abajo para cerrar", como en apps nativas. Se engancha
// a un handle chico arriba del modal (no a todo el modal, para no interferir con
// el scroll normal del contenido de adentro). Solo tiene efecto visual relevante
// en mobile, ya que en desktop el handle queda oculto (sm:hidden).
function useSwipeToDismiss(onClose) {
  const [dragY, setDragY] = useState(0);
  const draggingRef = useRef(false);
  const startYRef = useRef(0);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    const delta = e.clientY - startYRef.current;
    if (delta > 0) setDragY(delta);
  };
  const finish = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (dragY > 110) onClose();
    setDragY(0);
  };

  return {
    cardStyle: {
      transform: dragY ? `translateY(${dragY}px)` : undefined,
      transition: draggingRef.current ? "none" : "transform 0.25s ease",
    },
    handle: (
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
        className="sm:hidden flex justify-center pt-2 pb-3 -mt-6 -mx-6 mb-1 cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
      >
        <div className="w-10 h-1 rounded-full bg-stone-700" />
      </div>
    ),
  };
}

function TemplateGallery({ open, onClose, current, accent, data, onSelect }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-2xl p-6 max-h-[85vh] overflow-y-auto">
        {handle}
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
        {CATEGORIES.map((cat) => {
          const items = TEMPLATES.filter((t) => t.category === cat.id);
          if (items.length === 0) return null;
          return (
            <div key={cat.id} className="mb-6 last:mb-0">
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-stone-700" /> {cat.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((t) => {
                  const ThumbComponent = TEMPLATE_COMPONENTS[t.id];
                  return (
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
                      <div className="h-32 flex items-start justify-center bg-stone-950 overflow-hidden">
                        <div
                          className="shrink-0 overflow-hidden pointer-events-none"
                          style={{ width: 160, height: 128 }}
                        >
                          <div style={{ width: 600, transform: "scale(0.2667)", transformOrigin: "top left" }}>
                            {ThumbComponent && <ThumbComponent data={data} accent={accent} />}
                          </div>
                        </div>
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
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProfilesModal({ open, onClose, profiles, activeId, accent, onSelect, onAdd, onDuplicate, onRemove, onRename, onImportClick, onTranslate, translatingId }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-md p-6 max-h-[85vh] overflow-y-auto">
        {handle}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Mis perfiles</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12px] text-stone-500 mb-4 leading-relaxed">
          Guardá versiones distintas de tu CV para diferentes puestos o industrias. Cada perfil tiene su
          propio contenido, plantilla y color.
        </p>
        <div className="flex flex-col gap-2 mb-4">
          {profiles.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 border rounded-md px-3 py-2.5 transition"
              style={{
                borderColor: p.id === activeId ? accent : "#3f3a35",
                background: p.id === activeId ? `${accent}14` : "transparent",
              }}
            >
              <button onClick={() => { onSelect(p.id); onClose(); }} className="flex-1 text-left min-w-0">
                <input
                  value={p.nombre}
                  onChange={(e) => onRename(p.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent text-sm font-medium w-full focus:outline-none text-stone-100"
                />
                <p className="text-[11px] text-stone-500 truncate">
                  {p.data.nombre || "Sin nombre"} · {p.data.puesto || "Sin título"}
                </p>
              </button>
              {p.id === activeId && <Check size={14} style={{ color: accent }} className="shrink-0" />}
              <button
                onClick={() => onTranslate(p.id)}
                title="Traducir a inglés (crea un perfil nuevo)"
                disabled={translatingId === p.id}
                className="text-stone-500 hover:text-white transition shrink-0 disabled:opacity-40"
              >
                {translatingId === p.id ? <Loader2 size={14} className="animate-spin" /> : <Languages size={14} />}
              </button>
              <button
                onClick={() => onDuplicate(p.id)}
                title="Duplicar perfil"
                className="text-stone-500 hover:text-white transition shrink-0"
              >
                <Copy size={14} />
              </button>
              {profiles.length > 1 && (
                <button
                  onClick={() => onRemove(p.id)}
                  title="Eliminar perfil"
                  className="text-stone-500 hover:text-red-400 transition shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-2 text-sm px-3 py-2.5 rounded-md border border-dashed border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 transition"
          >
            <Plus size={15} /> Nuevo perfil en blanco
          </button>
          <button
            onClick={onImportClick}
            className="w-full flex items-center justify-center gap-2 text-sm px-3 py-2.5 rounded-md border border-dashed border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 transition"
          >
            <Upload size={15} /> Importar desde PDF/Word
          </button>
        </div>
      </div>
    </div>
  );
}

function CoverLetterModal({ open, onClose, data, accent, onUpdateField, onGenerate, generating }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  const carta = data.carta;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
        {handle}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Carta de presentación</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12px] text-stone-500 mb-4 leading-relaxed">
          Se genera con IA a partir de los datos de tu CV activo (perfil, experiencia, habilidades).
        </p>
        <div className="grid grid-cols-2 gap-x-3">
          <Field label="Empresa">
            <input
              className={inputClass}
              value={carta.empresa}
              onChange={(e) => onUpdateField({ empresa: e.target.value })}
              placeholder="Acme Inc."
            />
          </Field>
          <Field label="Puesto al que aplicás">
            <input
              className={inputClass}
              value={carta.puestoAplicado}
              onChange={(e) => onUpdateField({ puestoAplicado: e.target.value })}
              placeholder={data.puesto || "Diseñadora UX"}
            />
          </Field>
        </div>
        <Field label="Tono">
          <div className="flex gap-2">
            {TONOS.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateField({ tono: t.id })}
                className="flex-1 text-[11px] px-2 py-2 rounded-md border transition"
                style={{
                  borderColor: carta.tono === t.id ? accent : "#44403c",
                  background: carta.tono === t.id ? `${accent}22` : "transparent",
                  color: carta.tono === t.id ? accent : "#a8a29e",
                }}
              >
                {t.name}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Detalles adicionales (opcional)">
          <textarea
            className={inputClass + " min-h-[60px] resize-none"}
            value={carta.detalles}
            onChange={(e) => onUpdateField({ detalles: e.target.value })}
            placeholder="Ej: disponibilidad inmediata, por qué te interesa la empresa, algo puntual que quieras mencionar..."
          />
        </Field>
        <button
          onClick={onGenerate}
          disabled={generating}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md text-stone-950 transition hover:opacity-90 disabled:opacity-50"
          style={{ background: accent }}
        >
          {generating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {generating ? "Generando…" : carta.texto ? "Regenerar" : "Generar carta"}
        </button>
        {carta.texto && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                Resultado (editable)
              </span>
              <button
                onClick={() => navigator.clipboard?.writeText(carta.texto)}
                className="text-[11px] font-mono uppercase tracking-wide text-stone-400 hover:text-white transition inline-flex items-center gap-1"
              >
                <Copy size={11} /> Copiar
              </button>
            </div>
            <textarea
              className={inputClass + " min-h-[300px] text-[13px] leading-relaxed"}
              value={carta.texto}
              onChange={(e) => onUpdateField({ texto: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ImportModal({ open, onClose, onImport, importing, error }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-md p-6">
        {handle}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Importar CV</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12.5px] text-stone-400 leading-relaxed mb-3">
          Subí un PDF o Word de tu CV actual y la IA arma un perfil nuevo automáticamente con esos datos.
        </p>
        <p className="text-[11px] text-stone-500 leading-relaxed mb-4">
          ¿Querés importar desde LinkedIn? Entrá a tu perfil de LinkedIn → botón "Más" → "Guardar en PDF", y
          subí ese archivo acá (LinkedIn no ofrece una conexión directa de datos).
        </p>
        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-stone-700 rounded-lg py-8 cursor-pointer hover:border-stone-500 transition">
          <input type="file" accept=".pdf,.docx" className="hidden" onChange={onImport} disabled={importing} />
          {importing ? (
            <Loader2 size={22} className="text-stone-400 animate-spin" />
          ) : (
            <Upload size={22} className="text-stone-500" />
          )}
          <span className="text-[12px] text-stone-400">
            {importing ? "Analizando el archivo…" : "Tocá para elegir un archivo (.pdf o .docx)"}
          </span>
        </label>
        {error && <p className="text-[11px] text-red-400 mt-3 leading-relaxed">{error}</p>}
      </div>
    </div>
  );
}

function PlainTextModal({ open, onClose, text, accent }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CV.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto flex flex-col">
        {handle}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl">Texto plano para ATS</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12px] text-stone-500 mb-3 leading-relaxed">
          Sin negritas, viñetas ni formato — pensado para pegar directo en los formularios de texto de
          sistemas de postulación (ATS) que no aceptan archivos con diseño.
        </p>
        <textarea
          readOnly
          value={text}
          onClick={(e) => e.target.select()}
          className="w-full flex-1 min-h-[360px] bg-stone-800/60 border border-stone-700 rounded-md px-3 py-2.5 text-[12.5px] text-stone-100 font-mono leading-relaxed resize-none focus:outline-none"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => navigator.clipboard?.writeText(text)}
            className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md text-stone-950 transition hover:opacity-90"
            style={{ background: accent }}
          >
            <Copy size={15} /> Copiar todo
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md border border-stone-700 text-stone-200 hover:border-stone-500 transition"
          >
            <FileDown size={15} /> Descargar .txt
          </button>
        </div>
      </div>
    </div>
  );
}

function ShortenTipsModal({ open, onClose, tips, accent, pageCount }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-md p-6 max-h-[85vh] overflow-y-auto">
        {handle}
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-xl">Cómo acortar tu CV</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12px] text-stone-500 mb-4 leading-relaxed">
          Estimamos que tu CV ocupa {pageCount} páginas con la plantilla y el tamaño de texto actuales.
        </p>
        {tips.length ? (
          <ul className="flex flex-col gap-3">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] text-stone-300 leading-relaxed">
                <span className="shrink-0 mt-0.5 font-bold" style={{ color: accent }}>
                  —
                </span>
                {tip}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-stone-400 leading-relaxed">
            No encontramos algo puntual para recortar. Probá bajar el tamaño de texto a "Compacta" en
            Apariencia, o cambiar a la plantilla Compacto, pensada para condensar más contenido en una
            sola página.
          </p>
        )}
      </div>
    </div>
  );
}

function MoreMenu({ onCarta, onCompare, onTexto, onWord, exportingDocx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        title="Más herramientas"
        className="p-2.5 rounded-md border border-stone-700 text-stone-200 hover:border-stone-500 transition"
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-stone-900 border border-stone-800 rounded-md shadow-xl z-40 py-1 no-print">
            <button
              onClick={() => { onCarta(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-200 hover:bg-stone-800 transition"
            >
              <FileText size={14} /> Carta de presentación
            </button>
            <button
              onClick={() => { onCompare(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-200 hover:bg-stone-800 transition"
            >
              <Target size={14} /> Comparar con puesto
            </button>
            <button
              onClick={() => { onTexto(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-200 hover:bg-stone-800 transition"
            >
              <AlignLeft size={14} /> Texto plano (ATS)
            </button>
            <button
              onClick={() => { onWord(); setOpen(false); }}
              disabled={exportingDocx}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-200 hover:bg-stone-800 transition disabled:opacity-50"
            >
              {exportingDocx ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />} Exportar Word
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function MatchModal({ open, onClose, data, accent, onUpdateField, onAnalyze, analyzing }) {
  const { cardStyle, handle } = useSwipeToDismiss(onClose);
  if (!open) return null;
  const resultado = data.comparacion.resultado;
  return (
    <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 no-print">
      <div style={cardStyle} className="bg-stone-900 border border-stone-800 rounded-t-2xl sm:rounded-lg w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
        {handle}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Comparar con un puesto</h2>
          <button onClick={onClose} className="text-stone-500 hover:text-white transition">
            <X size={20} />
          </button>
        </div>
        <p className="text-[12px] text-stone-500 mb-3 leading-relaxed">
          Pegá la descripción del puesto y la IA revisa qué palabras clave y habilidades ya cubre tu CV
          activo, y cuáles te conviene agregar.
        </p>
        <Field label="Descripción del puesto">
          <textarea
            className={inputClass + " min-h-[140px] resize-none"}
            value={data.comparacion.descripcion}
            onChange={(e) => onUpdateField({ descripcion: e.target.value })}
            placeholder="Pegá acá el texto completo de la publicación del puesto..."
          />
        </Field>
        <button
          onClick={onAnalyze}
          disabled={analyzing || !data.comparacion.descripcion.trim()}
          className="w-full mt-1 inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2.5 rounded-md text-stone-950 transition hover:opacity-90 disabled:opacity-50"
          style={{ background: accent }}
        >
          {analyzing ? <Loader2 size={15} className="animate-spin" /> : <Target size={15} />}
          {analyzing ? "Analizando…" : resultado ? "Analizar de nuevo" : "Analizar"}
        </button>

        {resultado && (
          <div className="mt-5">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-display text-base"
                style={{ background: `${accent}22`, color: accent }}
              >
                {resultado.puntaje}%
              </div>
              <p className="text-[12.5px] text-stone-400 leading-relaxed">{resultado.comentario}</p>
            </div>

            {resultado.faltantes?.length > 0 && (
              <div className="mb-4">
                <p className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                  Palabras clave que faltan
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {resultado.faltantes.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11.5px] px-2.5 py-1 rounded-full border border-amber-500/40 text-amber-300 bg-amber-500/10"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resultado.encontradas?.length > 0 && (
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                  Ya cubiertas en tu CV
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {resultado.encontradas.map((kw, i) => (
                    <span
                      key={i}
                      className="text-[11.5px] px-2.5 py-1 rounded-full"
                      style={{ background: `${accent}18`, color: accent }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---- Full preview renderers per template ----
function Avatar({ data, accent, size = 64, shape = "circle", ring = false, className = "" }) {
  if (!data.foto) return null;
  const finalSize = Math.round(size * (data.fotoEscala || 1));
  return (
    <img
      src={data.foto}
      alt=""
      className={"shrink-0 object-cover " + className}
      style={{
        width: finalSize,
        height: finalSize,
        borderRadius: shape === "circle" ? "9999px" : "8px",
        border: ring ? `2px solid ${accent}` : "none",
      }}
    />
  );
}

function ContactLine({ data, className, iconSize = 11 }) {
  return (
    <div className={className}>
      {data.email && (
        <span className="flex items-center gap-1 min-w-0 break-all">
          <Mail size={iconSize} className="shrink-0" /> {data.email}
        </span>
      )}
      {data.telefono && (
        <span className="flex items-center gap-1 min-w-0 break-words">
          <Phone size={iconSize} className="shrink-0" /> {data.telefono}
        </span>
      )}
      {data.ubicacion && (
        <span className="flex items-center gap-1 min-w-0 break-words">
          <MapPin size={iconSize} className="shrink-0" /> {data.ubicacion}
        </span>
      )}
      {data.linkedin && (
        <span className="flex items-center gap-1 min-w-0 break-all">
          <Linkedin size={iconSize} className="shrink-0" /> {data.linkedin}
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
              className="text-[11px] px-2 py-1 rounded-sm break-words max-w-full"
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
                <p className={titleClass + " min-w-0 break-words"}>
                  {exp.puesto}
                  {exp.empresa && (
                    <span className="font-sans text-stone-500 text-[13px] font-normal"> · {exp.empresa}</span>
                  )}
                </p>
                <span className="font-mono text-[11px] text-stone-400 whitespace-nowrap shrink-0">{exp.periodo}</span>
              </div>
              {exp.descripcion && (
                <div className="text-[12.5px] text-stone-600 mt-1 leading-relaxed whitespace-pre-line break-words">
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
              <p className="text-[13px] text-stone-800 min-w-0 break-words">
                <span className="font-medium">{edu.titulo}</span>
                {edu.institucion && <span className="text-stone-500"> · {edu.institucion}</span>}
              </p>
              <span className="font-mono text-[11px] text-stone-400 whitespace-nowrap shrink-0">{edu.periodo}</span>
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
  const sections = {
    resumen: data.resumen && (
      <div className="mb-6">
        <SectionLabel accent={accent}>Perfil</SectionLabel>
        <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
      </div>
    ),
    experiencia: hasExp && (
      <div className="mb-6">
        <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
        <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
      </div>
    ),
    educacion: hasEdu && (
      <div className="mb-6">
        <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
        <EducacionBlock data={data} />
      </div>
    ),
    habilidades: data.habilidades && (
      <div>
        <SectionLabel accent={accent}>Habilidades</SectionLabel>
        <SkillChips data={data} accent={accent} />
      </div>
    ),
  };
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[849px] flex flex-col">
      <div className="mb-6 pb-6 flex items-start justify-between gap-4" style={{ borderBottom: `2px solid ${accent}` }}>
        <div>
          <h1 className="font-display text-[32px] leading-tight break-words" style={{ color: "#1a1a1a" }}>
            {data.nombre || "Tu nombre"}
          </h1>
          {data.puesto && (
            <p className="font-mono text-sm mt-1 tracking-wide" style={{ color: accent }}>
              {data.puesto}
            </p>
          )}
          {!data.contactoAlPie && (
            <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
          )}
        </div>
        <Avatar data={data} accent={accent} size={80} />
      </div>
      <div className="flex-1">
        {(data.ordenSecciones || DEFAULT_SECTION_ORDER).map((key) => (
          <React.Fragment key={key}>{sections[key]}</React.Fragment>
        ))}
      </div>
      {data.contactoAlPie && (
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 pt-4 border-t border-stone-200 text-[11px] text-stone-500"
          iconSize={10}
        />
      )}
    </div>
  );
}

function PreviewModerno({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex overflow-hidden">
      <div className="w-[34%] bg-[#1c1a18] text-stone-200 px-6 py-10 flex flex-col gap-6">
        <Avatar data={data} accent={accent} size={88} ring />
        <div>
          <h1 className="font-display text-[22px] leading-tight text-white break-words">{data.nombre || "Tu nombre"}</h1>
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
    <div className="print-page bg-white text-[#222] w-full max-w-[600px] shadow-2xl px-12 py-14 min-h-[849px]">
      <div className="text-center mb-8">
        <Avatar data={data} accent={accent} size={88} className="mx-auto mb-3" />
        <h1 className="font-display text-[30px] tracking-tight break-words" style={{ color: "#161616" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && <p className="text-[13px] mt-1 tracking-wide" style={{ color: accent }}>{data.puesto}</p>}
        {!data.contactoAlPie && (
          <ContactLine
            data={data}
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-stone-500"
            iconSize={10}
          />
        )}
      </div>
      {data.resumen && (
        <div className="mb-7 text-center max-w-[440px] mx-auto">
          <p className="text-[13px] leading-relaxed text-stone-600 italic">{data.resumen}</p>
        </div>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
              <div className="mb-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3 text-center">Experiencia</p>
                <ExperienciaBlock data={data} accent={accent} titleClass="text-[14px] font-medium text-stone-900" />
              </div>
            )}
            {key === "educacion" && hasEdu && (
              <div className="mb-7">
                <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-3 text-center">Educación</p>
                <EducacionBlock data={data} />
              </div>
            )}
          </React.Fragment>
        ))}
      {data.habilidades && (
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-2">Habilidades</p>
          <p className="text-[12.5px] text-stone-600">{data.habilidades}</p>
        </div>
      )}
      {data.contactoAlPie && (
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 pt-4 border-t border-stone-200 text-[11px] text-stone-500"
          iconSize={10}
        />
      )}
    </div>
  );
}

function PreviewEjecutivo({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[849px]">
      <div className="text-center mb-5">
        <Avatar data={data} accent={accent} size={84} ring className="mx-auto mb-3" />
        <h1 className="font-display text-[30px] break-words" style={{ color: "#1a1a1a" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && (
          <p className="font-mono text-[12px] mt-1 tracking-widest uppercase" style={{ color: accent }}>
            {data.puesto}
          </p>
        )}
        {!data.contactoAlPie && (
          <ContactLine
            data={data}
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600"
          />
        )}
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
      {data.contactoAlPie && (
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-8 pt-4 border-t border-stone-200 text-[11px] text-stone-500"
          iconSize={10}
        />
      )}
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
      className="print-page bg-white text-[#1a1a1a] w-full max-w-[600px] shadow-2xl px-11 py-12 min-h-[849px]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="text-center mb-6 pb-4 border-b border-stone-300">
        <Avatar data={data} accent={accent} size={80} shape="square" className="mx-auto mb-3" />
        <h1 className="text-[25px] font-bold tracking-tight break-words">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12.5px] mt-1 text-stone-600">{data.puesto}</p>}
        {!data.contactoAlPie && (
          <p className="text-[11px] mt-2 text-stone-500">
            {[data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean).join("   |   ")}
          </p>
        )}
      </div>
      {data.resumen && (
        <div className="mb-5">
          <h3 className={label} style={ruleStyle}>Perfil profesional</h3>
          <p className="text-[12.5px] leading-relaxed text-stone-800">{data.resumen}</p>
        </div>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
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
          </React.Fragment>
        ))}
      {data.habilidades && (
        <div>
          <h3 className={label} style={ruleStyle}>Habilidades</h3>
          <p className="text-[12.5px] text-stone-700 break-words">{data.habilidades}</p>
        </div>
      )}
      {data.contactoAlPie && (
        <p className="text-[11px] mt-8 pt-4 border-t border-stone-300 text-center text-stone-500">
          {[data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean).join("   |   ")}
        </p>
      )}
    </div>
  );
}

function PreviewCompacto({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-9 py-10 min-h-[849px]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-[26px] leading-tight break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && (
            <p className="font-mono text-[12px] mt-0.5" style={{ color: accent }}>{data.puesto}</p>
          )}
          <ContactLine data={data} className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-stone-600" iconSize={10} />
        </div>
        <Avatar data={data} accent={accent} size={70} />
      </div>
      {data.resumen && (
        <p className="text-[12px] leading-relaxed text-stone-700 mb-5 pb-4 border-b border-stone-200">
          {data.resumen}
        </p>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
              <div className="mb-5">
                <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
                <EducacionBlock data={data} />
              </div>
            )}
          </React.Fragment>
        ))}
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
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] overflow-hidden">
      <div className="px-10 py-9 flex items-start justify-between gap-4" style={{ background: accent }}>
        <div>
          <h1 className="font-display text-[30px] text-white leading-tight break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && (
            <p className="text-[13px] mt-1 text-white/80 font-mono tracking-wide">{data.puesto}</p>
          )}
          <ContactLine
            data={data}
            className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-white/85"
            iconSize={10}
          />
        </div>
        <Avatar data={data} accent="white" size={80} ring />
      </div>
      <div className="px-10 py-8">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
          .filter((k) => k !== "resumen" && k !== "habilidades")
          .map((key) => (
            <React.Fragment key={key}>
              {key === "experiencia" && hasExp && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
                  <ExperienciaBlock data={data} accent={accent} titleClass="font-display text-[15px] font-medium text-stone-900" />
                </div>
              )}
              {key === "educacion" && hasEdu && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
                  <EducacionBlock data={data} />
                </div>
              )}
            </React.Fragment>
          ))}
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
    <div className="print-page bg-[#0f0f0f] text-stone-200 w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[849px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] text-stone-500">$ whoami</p>
          <h1 className="text-[26px] font-bold text-white mt-1 break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
          <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-stone-500" iconSize={10} />
        </div>
        {data.foto && (
          <div className="p-1 border shrink-0" style={{ borderColor: `${accent}55` }}>
            <Avatar data={data} accent={accent} size={70} shape="square" />
          </div>
        )}
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
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
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
          </React.Fragment>
        ))}
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
    <div className="print-page bg-white text-[#1c1c1c] w-full max-w-[600px] shadow-2xl px-11 py-12 min-h-[849px]" style={{ fontFamily: "Georgia, serif" }}>
      <div className="mb-6 pb-4 border-b-2 flex items-start justify-between gap-4" style={{ borderColor: accent }}>
        <div>
          <h1 className="text-[24px] font-bold break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[12.5px] mt-1 italic text-stone-600">{data.puesto}</p>}
          <p className="text-[11px] mt-2 text-stone-500">{[data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean).join("   ·   ")}</p>
        </div>
        <Avatar data={data} accent={accent} size={76} shape="square" />
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
          <p className="text-[12.5px] text-stone-700 break-words">{data.habilidades}</p>
        </div>
      )}
    </div>
  );
}

function PreviewComercial({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasLogros = data.logros.some((l) => l.metrica || l.descripcion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl px-10 py-11 min-h-[849px]">
      <div className="mb-6 pb-5 flex items-start justify-between gap-4" style={{ borderBottom: `2px solid ${accent}` }}>
        <div>
          <h1 className="font-display text-[30px] leading-tight break-words" style={{ color: "#1a1a1a" }}>{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="font-mono text-sm mt-1 tracking-wide" style={{ color: accent }}>{data.puesto}</p>}
          <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
        </div>
        <Avatar data={data} accent={accent} size={80} />
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
    <div className="print-page bg-white text-[#161616] w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[849px]">
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="font-display text-[46px] leading-[0.95] tracking-tight break-words">{data.nombre || "Tu nombre"}</h1>
        <Avatar data={data} accent={accent} size={66} className="mt-1" />
      </div>
      {data.puesto && <p className="text-[14px] font-mono uppercase tracking-widest mb-4" style={{ color: accent }}>{data.puesto}</p>}
      <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mb-8 text-[11.5px] text-stone-500" iconSize={10} />
      {data.resumen && <p className="text-[15px] leading-relaxed text-stone-700 mb-8 max-w-[480px]">{data.resumen}</p>}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
              <div className="mb-8">
                <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
                <EducacionBlock data={data} />
              </div>
            )}
          </React.Fragment>
        ))}
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
    <div className="print-page w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[849px] text-[#232323]" style={bg}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[30px] leading-tight break-words" style={{ color: "#1a1a1a" }}>
            {data.nombre || "Tu nombre"}
          </h1>
          {data.puesto && (
            <p className="font-mono text-sm mt-1" style={{ color: accent }}>{data.puesto}</p>
          )}
          <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
        </div>
        <Avatar data={data} accent={accent} size={80} className="shadow-sm" />
      </div>
      {data.resumen && (
        <div className={card}>
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
              <div className={card}>
                <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
                <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
              </div>
            )}
            {key === "educacion" && hasEdu && (
              <div className={card}>
                <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
                <EducacionBlock data={data} />
              </div>
            )}
          </React.Fragment>
        ))}
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
      className="print-page w-full max-w-[600px] shadow-2xl px-9 py-11 min-h-[849px] text-[#232323] relative overflow-hidden"
      style={{ ...gridBg, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <div className={corner + " top-3 left-3 border-l-2 border-t-2"} style={{ borderColor: accent }} />
      <div className={corner + " top-3 right-3 border-r-2 border-t-2"} style={{ borderColor: accent }} />
      <div className={corner + " bottom-3 left-3 border-l-2 border-b-2"} style={{ borderColor: accent }} />
      <div className={corner + " bottom-3 right-3 border-r-2 border-b-2"} style={{ borderColor: accent }} />
      <div className="mb-6 pb-4 border-b flex items-start justify-between gap-4" style={{ borderColor: `${accent}55` }}>
        <div>
          <p className="text-[10px] mb-1 tracking-widest" style={{ color: accent }}>
            REF. CURRÍCULUM
          </p>
          <h1 className="text-[24px] font-bold break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
          <ContactLine
            data={data}
            className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10.5px] text-stone-600"
            iconSize={10}
          />
        </div>
        <Avatar data={data} accent={accent} size={70} shape="square" />
      </div>
      {data.resumen && (
        <div className="mb-5">
          <p className="text-[10.5px] uppercase tracking-widest mb-1.5" style={{ color: accent }}>// perfil</p>
          <p className="text-[12px] leading-relaxed text-stone-700">{data.resumen}</p>
        </div>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
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
          </React.Fragment>
        ))}
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
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] relative overflow-hidden">
      <div className="absolute -top-10 -right-16 w-52 h-52 rounded-full" style={{ background: accent, opacity: 0.15 }} />
      <div className="absolute top-28 -left-12 w-36 h-36 rotate-45" style={{ background: accent, opacity: 0.1 }} />
      <div className="relative px-10 py-11">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-[32px] leading-tight break-words" style={{ color: "#1a1a1a" }}>
              {data.nombre || "Tu nombre"}
            </h1>
            {data.puesto && (
              <p className="font-mono text-sm mt-1" style={{ color: accent }}>{data.puesto}</p>
            )}
            <ContactLine data={data} className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] text-stone-600" />
          </div>
          <Avatar data={data} accent={accent} size={80} ring />
        </div>
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
          .filter((k) => k !== "resumen" && k !== "habilidades")
          .map((key) => (
            <React.Fragment key={key}>
              {key === "experiencia" && hasExp && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
                  <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
                </div>
              )}
              {key === "educacion" && hasEdu && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
                  <EducacionBlock data={data} />
                </div>
              )}
            </React.Fragment>
          ))}
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
    <div className="print-page bg-[#121212] text-stone-300 w-full max-w-[600px] shadow-2xl px-10 py-12 min-h-[849px]">
      <div className="mb-6 pb-5 border-b flex items-start justify-between gap-4" style={{ borderColor: `${accent}44` }}>
        <div>
          <h1 className="font-display text-[30px] leading-tight text-white break-words">{data.nombre || "Tu nombre"}</h1>
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
        <Avatar data={data} accent={accent} size={80} ring />
      </div>
      {data.resumen && (
        <div className="mb-6">
          <SectionLabel accent={accent}>Perfil</SectionLabel>
          <p className="text-[13px] leading-relaxed text-stone-400">{data.resumen}</p>
        </div>
      )}
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
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
            {key === "educacion" && hasEdu && (
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
          </React.Fragment>
        ))}
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
    <div className="print-page bg-white text-[#1c1c1c] w-full max-w-[600px] shadow-2xl px-10 py-11 min-h-[849px]">
      <p className="text-center text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: accent }}>
        Currículum · Edición personal
      </p>
      <Avatar data={data} accent={accent} size={88} className="mx-auto mb-3" />
      <h1 className="font-display text-[40px] text-center leading-none mb-2 break-words">{data.nombre || "Tu nombre"}</h1>
      {data.puesto && <p className="text-center text-[13px] text-stone-500 italic mb-3">{data.puesto}</p>}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-stone-300" />
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
        <div className="flex-1 h-px bg-stone-300" />
      </div>
      {!data.contactoAlPie && (
        <ContactLine
          data={data}
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-7 text-[11px] text-stone-500"
          iconSize={10}
        />
      )}
      {data.resumen && (
        <p className="text-[13px] leading-relaxed text-stone-700 mb-7">
          <span className="font-display float-left text-[52px] leading-[0.8] pr-2 pt-1" style={{ color: accent }}>
            {firstLetter}
          </span>
          {restText}
        </p>
      )}
      {(() => {
        const orderedCore = (data.ordenSecciones || DEFAULT_SECTION_ORDER).filter((k) => k !== "resumen" && k !== "habilidades");
        const firstVisible = orderedCore.find((k) => (k === "experiencia" && hasExp) || (k === "educacion" && hasEdu));
        return orderedCore.map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
              <div className={key === firstVisible ? "mb-6 clear-both" : "mb-6"}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4" style={{ background: accent }} />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest">Experiencia</h3>
                </div>
                <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
              </div>
            )}
            {key === "educacion" && hasEdu && (
              <div className={key === firstVisible ? "mb-6 clear-both" : "mb-6"}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4" style={{ background: accent }} />
                  <h3 className="text-[11px] font-bold uppercase tracking-widest">Educación</h3>
                </div>
                <EducacionBlock data={data} />
              </div>
            )}
          </React.Fragment>
        ));
      })()}
      {data.habilidades && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4" style={{ background: accent }} />
            <h3 className="text-[11px] font-bold uppercase tracking-widest">Habilidades</h3>
          </div>
          <SkillChips data={data} accent={accent} />
        </div>
      )}
      {data.contactoAlPie ? (
        <div className="mt-8 pt-4 border-t border-stone-200">
          <ContactLine
            data={data}
            className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-stone-500"
            iconSize={10}
          />
          <p className="text-center text-[10px] text-stone-300 mt-3 tracking-widest">— 01 —</p>
        </div>
      ) : (
        <p className="text-center text-[10px] text-stone-300 mt-8 tracking-widest">— 01 —</p>
      )}
    </div>
  );
}

function PreviewContorno({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#1f1f1f] w-full max-w-[600px] shadow-2xl p-5 min-h-[849px]">
      <div className="border-2 px-8 py-10" style={{ borderColor: accent }}>
        <div className="border px-2 py-2" style={{ borderColor: "#d6d3cd" }}>
          <div className="text-center mb-6 px-4 py-4">
            <Avatar data={data} accent={accent} size={84} ring className="mx-auto mb-3" />
            <h1 className="font-display text-[27px] break-words">{data.nombre || "Tu nombre"}</h1>
            {data.puesto && (
              <p className="text-[12px] mt-1 tracking-widest uppercase" style={{ color: accent }}>{data.puesto}</p>
            )}
            {!data.contactoAlPie && (
              <ContactLine
                data={data}
                className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-stone-500"
                iconSize={10}
              />
            )}
          </div>
          <div className="px-4">
            {data.resumen && (
              <div className="mb-5 text-center">
                <p className="text-[12.5px] leading-relaxed text-stone-600 italic max-w-[420px] mx-auto">{data.resumen}</p>
              </div>
            )}
            {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
              .filter((k) => k !== "resumen" && k !== "habilidades")
              .map((key) => (
                <React.Fragment key={key}>
                  {key === "experiencia" && hasExp && (
                    <div className="mb-5">
                      <SectionLabel accent={accent} className="mb-3 text-center">Experiencia</SectionLabel>
                      <ExperienciaBlock data={data} titleClass="text-[13.5px] font-medium text-stone-900" />
                    </div>
                  )}
                  {key === "educacion" && hasEdu && (
                    <div className="mb-5">
                      <SectionLabel accent={accent} className="mb-2 text-center">Educación</SectionLabel>
                      <EducacionBlock data={data} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            {data.habilidades && (
              <div className="text-center">
                <SectionLabel accent={accent}>Habilidades</SectionLabel>
                <p className="text-[12px] text-stone-600 break-words">{data.habilidades}</p>
              </div>
            )}
            {data.contactoAlPie && (
              <ContactLine
                data={data}
                className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-6 pt-4 border-t border-stone-200 text-[11px] text-stone-500"
                iconSize={10}
              />
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
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] overflow-hidden">
      <div
        className="px-10 pt-10 pb-14 flex items-start justify-between gap-4"
        style={{ background: accent, clipPath: "polygon(0 0, 100% 0, 100% 78%, 0 100%)" }}
      >
        <div>
          <h1 className="font-display text-[30px] text-white leading-tight break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[13px] mt-1 text-white/80 font-mono tracking-wide">{data.puesto}</p>}
          <ContactLine
            data={data}
            className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11.5px] text-white/85"
            iconSize={10}
          />
        </div>
        <Avatar data={data} accent="white" size={80} ring />
      </div>
      <div className="px-10 -mt-6 pt-2 pb-8">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[13px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
          .filter((k) => k !== "resumen" && k !== "habilidades")
          .map((key) => (
            <React.Fragment key={key}>
              {key === "experiencia" && hasExp && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
                  <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
                </div>
              )}
              {key === "educacion" && hasEdu && (
                <div className="mb-6">
                  <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
                  <EducacionBlock data={data} />
                </div>
              )}
            </React.Fragment>
          ))}
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
      className="print-page w-full max-w-[600px] shadow-2xl px-8 py-10 min-h-[849px] text-[#232323]"
      style={{ backgroundColor: "#F0EDE6", backgroundImage: "radial-gradient(#00000012 1px, transparent 1px)", backgroundSize: "14px 14px" }}
    >
      <div className="mb-6 text-center">
        <Avatar data={data} accent={accent} size={80} className="mx-auto mb-3 shadow-sm" />
        <h1 className="font-display text-[27px] break-words">{data.nombre || "Tu nombre"}</h1>
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
      {(data.ordenSecciones || DEFAULT_SECTION_ORDER)
        .filter((k) => k !== "resumen" && k !== "habilidades")
        .map((key) => (
          <React.Fragment key={key}>
            {key === "experiencia" && hasExp && (
              <div className={cardBase} style={{ transform: "rotate(0.6deg)" }}>
                <span className={tab} style={{ background: accent }}>EXPERIENCIA</span>
                <div className="mt-1">
                  <ExperienciaBlock data={data} titleClass="text-[14px] font-medium text-stone-900" />
                </div>
              </div>
            )}
            {key === "educacion" && hasEdu && (
              <div className={cardBase} style={{ transform: "rotate(-0.5deg)" }}>
                <span className={tab} style={{ background: accent }}>EDUCACIÓN</span>
                <div className="mt-1">
                  <EducacionBlock data={data} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
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

function PreviewSimetria({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex">
      <div className="w-1/2 px-8 py-11 border-r" style={{ borderColor: `${accent}30` }}>
        <Avatar data={data} accent={accent} size={72} className="mb-4" />
        <h1 className="font-display text-[24px] leading-tight break-words" style={{ color: "#1a1a1a" }}>
          {data.nombre || "Tu nombre"}
        </h1>
        {data.puesto && (
          <p className="font-mono text-[12px] mt-1" style={{ color: accent }}>{data.puesto}</p>
        )}
        <ContactLine data={data} className="flex flex-col gap-1.5 mt-4 text-[11px] text-stone-600" iconSize={10} />
        {hasEdu && (
          <div className="mt-6">
            <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
        {data.habilidades && (
          <div className="mt-6">
            <SectionLabel accent={accent}>Habilidades</SectionLabel>
            <SkillChips data={data} accent={accent} />
          </div>
        )}
      </div>
      <div className="w-1/2 px-8 py-11">
        {data.resumen && (
          <div className="mb-6">
            <SectionLabel accent={accent}>Perfil</SectionLabel>
            <p className="text-[12.5px] leading-relaxed text-stone-700">{data.resumen}</p>
          </div>
        )}
        {hasExp && (
          <div>
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} titleClass="font-display text-[14px] font-medium text-stone-900" />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewPrensa({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#1c1c1c] w-full max-w-[600px] shadow-2xl px-10 py-11 min-h-[849px]">
      <div className="text-center mb-2">
        <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: accent }}>Currículum</p>
        <h1 className="font-display text-[34px] leading-none mt-1 break-words">{data.nombre || "Tu nombre"}</h1>
        {data.puesto && <p className="text-[12.5px] mt-1 text-stone-500 italic">{data.puesto}</p>}
      </div>
      <div className="h-[3px] my-4" style={{ background: accent }} />
      <ContactLine
        data={data}
        className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-6 text-[11px] text-stone-500"
        iconSize={10}
      />
      {data.resumen && (
        <p className="text-[12.5px] leading-relaxed text-stone-700 mb-6 text-center italic max-w-[440px] mx-auto">
          {data.resumen}
        </p>
      )}
      <div style={{ columnCount: 2, columnGap: "28px" }}>
        {hasExp && (
          <div className="mb-5" style={{ breakInside: "avoid" }}>
            <SectionLabel accent={accent} className="mb-2">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} titleClass="text-[13px] font-bold text-stone-900" />
          </div>
        )}
        {hasEdu && (
          <div className="mb-5" style={{ breakInside: "avoid" }}>
            <SectionLabel accent={accent} className="mb-2">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
        {data.habilidades && (
          <div style={{ breakInside: "avoid" }}>
            <SectionLabel accent={accent} className="mb-2">Habilidades</SectionLabel>
            <SkillChips data={data} accent={accent} />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewPanel({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex overflow-hidden">
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
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
      </div>
      <div className="w-[34%] px-6 py-10 flex flex-col gap-6" style={{ background: accent }}>
        <div>
          <Avatar data={data} accent="white" size={64} ring className="mb-3" />
          <h1 className="font-display text-[20px] leading-tight text-white break-words">
            {data.nombre || "Tu nombre"}
          </h1>
          {data.puesto && <p className="text-[11px] mt-1 text-white/80 font-mono">{data.puesto}</p>}
        </div>
        <ContactLine data={data} className="flex flex-col gap-1.5 text-[11px] text-white/85" iconSize={10} />
        {hasEdu && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2">Educación</p>
            <div className="flex flex-col gap-2">
              {data.educacion.map(
                (edu) =>
                  (edu.titulo || edu.institucion) && (
                    <div key={edu.id}>
                      <p className="text-[11.5px] text-white font-medium">{edu.titulo}</p>
                      <p className="text-[10.5px] text-white/70">{edu.institucion}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {data.habilidades && (
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-1">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded-sm bg-white/15 text-white">
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

function PreviewColumna({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex overflow-hidden">
      <div className="w-[32%] bg-[#F7F5F0] border-r px-6 py-10 flex flex-col gap-6" style={{ borderColor: `${accent}30` }}>
        <Avatar data={data} accent={accent} size={76} ring />
        <div>
          <h1 className="font-display text-[19px] leading-tight break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="font-mono text-[10.5px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
        </div>
        <ContactLine data={data} className="flex flex-col gap-1.5 text-[10.5px] text-stone-600" iconSize={9} />
        {hasEdu && (
          <div>
            <p className="text-[9.5px] uppercase tracking-widest text-stone-500 mb-2">Educación</p>
            <div className="flex flex-col gap-2">
              {data.educacion.map(
                (edu) =>
                  (edu.titulo || edu.institucion) && (
                    <div key={edu.id}>
                      <p className="text-[11px] text-stone-800 font-medium">{edu.titulo}</p>
                      <p className="text-[10px] text-stone-500">{edu.institucion}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {data.habilidades && (
          <div>
            <p className="text-[9.5px] uppercase tracking-widest text-stone-500 mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-1">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span key={i} className="text-[9.5px] px-1.5 py-0.5 rounded-sm" style={{ background: `${accent}18`, color: accent }}>
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
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewFranja({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-[#FBF9F5] text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex overflow-hidden">
      <div className="w-[32%] px-6 py-10 flex flex-col gap-6" style={{ background: accent }}>
        <Avatar data={data} accent="white" size={68} ring className="mb-1" />
        <div>
          <h1 className="font-display text-[19px] leading-tight text-white break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[10.5px] mt-1 text-white/80 font-mono">{data.puesto}</p>}
        </div>
        <ContactLine data={data} className="flex flex-col gap-1.5 text-[10.5px] text-white/85" iconSize={9} />
        {hasEdu && (
          <div>
            <p className="text-[9.5px] uppercase tracking-widest text-white/70 mb-2">Educación</p>
            <div className="flex flex-col gap-2">
              {data.educacion.map(
                (edu) =>
                  (edu.titulo || edu.institucion) && (
                    <div key={edu.id}>
                      <p className="text-[11px] text-white font-medium">{edu.titulo}</p>
                      <p className="text-[10px] text-white/70">{edu.institucion}</p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {data.habilidades && (
          <div>
            <p className="text-[9.5px] uppercase tracking-widest text-white/70 mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-1">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span key={i} className="text-[9.5px] px-1.5 py-0.5 rounded-sm bg-white/15 text-white">
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
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewRetrato({ data, accent }) {
  const hasExp = data.experiencia.some((e) => e.puesto || e.empresa);
  const hasEdu = data.educacion.some((e) => e.titulo || e.institucion);
  return (
    <div className="print-page bg-white text-[#232323] w-full max-w-[600px] shadow-2xl min-h-[849px] flex overflow-hidden">
      <div className="w-[30%] bg-stone-50 flex flex-col items-center pt-10 px-4 gap-5 border-r" style={{ borderColor: "#eee" }}>
        <Avatar data={data} accent={accent} size={96} ring />
        <div className="text-center">
          <h1 className="font-display text-[16px] leading-tight break-words">{data.nombre || "Tu nombre"}</h1>
          {data.puesto && <p className="text-[10px] mt-1" style={{ color: accent }}>{data.puesto}</p>}
        </div>
        <div className="w-8 h-[2px]" style={{ background: accent }} />
        <ContactLine
          data={data}
          className="flex flex-col items-center gap-1.5 text-[9.5px] text-stone-500 text-center"
          iconSize={9}
        />
        {data.habilidades && (
          <div className="w-full mt-2">
            <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-1.5 text-center">Habilidades</p>
            <div className="flex flex-wrap justify-center gap-1">
              {data.habilidades.split(",").map(
                (h, i) =>
                  h.trim() && (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full border" style={{ borderColor: `${accent}55`, color: accent }}>
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
          <div className="mb-6">
            <SectionLabel accent={accent} className="mb-3">Experiencia</SectionLabel>
            <ExperienciaBlock data={data} titleClass="font-display text-[15px] font-medium text-stone-900" />
          </div>
        )}
        {hasEdu && (
          <div>
            <SectionLabel accent={accent} className="mb-3">Educación</SectionLabel>
            <EducacionBlock data={data} />
          </div>
        )}
      </div>
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
  simetria: PreviewSimetria,
  prensa: PreviewPrensa,
  panel: PreviewPanel,
  columna: PreviewColumna,
  franja: PreviewFranja,
  retrato: PreviewRetrato,
};

export default function CVBuilder() {
  const [profiles, setProfiles] = useState(() => [
    { id: "profile-1", nombre: "Perfil 1", data: initialState },
  ]);
  const [activeProfileId, setActiveProfileId] = useState("profile-1");
  const [profilesOpen, setProfilesOpen] = useState(false);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
  const data = activeProfile.data;
  const setData = (updater) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id
          ? { ...p, data: typeof updater === "function" ? updater(p.data) : updater }
          : p
      )
    );
  };

  // ---- Undo / redo (historial por perfil; se reinicia al cambiar de perfil, excluye la foto) ----
  const historyRef = useRef({ stack: [], index: -1, skip: false });
  const [historyVersion, setHistoryVersion] = useState(0);

  const snapshotData = (d) => {
    const { foto, ...rest } = d;
    return JSON.parse(JSON.stringify(rest));
  };

  useEffect(() => {
    historyRef.current = { stack: [snapshotData(activeProfile.data)], index: 0, skip: false };
    setHistoryVersion((v) => v + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProfileId]);

  useEffect(() => {
    const h = historyRef.current;
    if (h.skip) {
      h.skip = false;
      return;
    }
    const timeout = setTimeout(() => {
      const snap = snapshotData(data);
      const newStack = h.stack.slice(0, h.index + 1);
      const last = newStack[newStack.length - 1];
      if (last && JSON.stringify(last) === JSON.stringify(snap)) return;
      newStack.push(snap);
      if (newStack.length > 40) newStack.shift();
      historyRef.current = { stack: newStack, index: newStack.length - 1, skip: false };
      setHistoryVersion((v) => v + 1);
    }, 700);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const canUndo = historyRef.current.index > 0;
  const canRedo = historyRef.current.index < historyRef.current.stack.length - 1;

  const undo = () => {
    const h = historyRef.current;
    if (h.index <= 0) return;
    h.index -= 1;
    h.skip = true;
    const snap = h.stack[h.index];
    setData((d) => ({ ...d, ...snap }));
    setHistoryVersion((v) => v + 1);
  };

  const redo = () => {
    const h = historyRef.current;
    if (h.index >= h.stack.length - 1) return;
    h.index += 1;
    h.skip = true;
    const snap = h.stack[h.index];
    setData((d) => ({ ...d, ...snap }));
    setHistoryVersion((v) => v + 1);
  };

  const addProfile = () => {
    const id = crypto.randomUUID();
    setProfiles((prev) => [...prev, { id, nombre: `Perfil ${prev.length + 1}`, data: { ...initialState } }]);
    setActiveProfileId(id);
  };

  const duplicateProfile = (id) => {
    const source = profiles.find((p) => p.id === id);
    if (!source) return;
    const newId = crypto.randomUUID();
    setProfiles((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const copy = { id: newId, nombre: `${source.nombre} (copia)`, data: JSON.parse(JSON.stringify(source.data)) };
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    setActiveProfileId(newId);
  };

  const [translatingId, setTranslatingId] = useState(null);

  const translateProfileToEnglish = async (id) => {
    const source = profiles.find((p) => p.id === id);
    if (!source) return;
    setTranslatingId(id);
    try {
      const d = source.data;
      const payload = {
        puesto: d.puesto,
        ubicacion: d.ubicacion,
        resumen: d.resumen,
        experiencia: d.experiencia.map((e) => ({ puesto: e.puesto, descripcion: e.descripcion })),
        educacion: d.educacion.map((e) => ({ titulo: e.titulo })),
        habilidades: d.habilidades,
        proyectos: d.proyectos.map((p) => ({ nombre: p.nombre, descripcion: p.descripcion })),
        becas: d.becas.map((b) => ({ nombre: b.nombre })),
        logros: d.logros.map((l) => ({ descripcion: l.descripcion })),
      };
      const prompt = `Traducí al inglés profesional (convenciones de currículum en inglés de EE.UU.) el siguiente contenido de un currículum, representado en JSON. Reglas:
- Traducí: puesto, resumen, descripciones de experiencia, títulos académicos, habilidades, nombres y descripciones de proyectos, nombres de becas/reconocimientos, descripciones de logros.
- La "ubicacion" traducila solo si la ciudad/país tiene un nombre común en inglés (ej. "Ciudad de México" -> "Mexico City"); si no, dejala igual.
- Mantené el mismo orden y la misma cantidad de elementos en cada array que el original.
- Devolvé SOLO un objeto JSON válido con exactamente la misma estructura de claves que el original, sin texto extra ni bloques de código.

JSON original:
"""${JSON.stringify(payload)}"""`;
      const result = await callClaude(prompt);
      const cleaned = result.replace(/^```json\s*|^```\s*|```\s*$/g, "").trim();
      const t = JSON.parse(cleaned);

      const newData = {
        ...JSON.parse(JSON.stringify(d)),
        puesto: t.puesto ?? d.puesto,
        ubicacion: t.ubicacion ?? d.ubicacion,
        resumen: t.resumen ?? d.resumen,
        habilidades: t.habilidades ?? d.habilidades,
        experiencia: d.experiencia.map((exp, i) => ({
          ...exp,
          puesto: t.experiencia?.[i]?.puesto ?? exp.puesto,
          descripcion: t.experiencia?.[i]?.descripcion ?? exp.descripcion,
        })),
        educacion: d.educacion.map((edu, i) => ({
          ...edu,
          titulo: t.educacion?.[i]?.titulo ?? edu.titulo,
        })),
        proyectos: d.proyectos.map((p, i) => ({
          ...p,
          nombre: t.proyectos?.[i]?.nombre ?? p.nombre,
          descripcion: t.proyectos?.[i]?.descripcion ?? p.descripcion,
        })),
        becas: d.becas.map((b, i) => ({
          ...b,
          nombre: t.becas?.[i]?.nombre ?? b.nombre,
        })),
        logros: d.logros.map((l, i) => ({
          ...l,
          descripcion: t.logros?.[i]?.descripcion ?? l.descripcion,
        })),
      };

      const newId = crypto.randomUUID();
      setProfiles((prev) => {
        const idx = prev.findIndex((p) => p.id === id);
        const copy = { id: newId, nombre: `${source.nombre} (English)`, data: newData };
        const next = [...prev];
        next.splice(idx + 1, 0, copy);
        return next;
      });
      setActiveProfileId(newId);
    } catch (e) {
      console.error(e);
      alert("No se pudo traducir el perfil. Probá de nuevo en unos segundos.");
    } finally {
      setTranslatingId(null);
    }
  };

  const removeProfile = (id) => {
    if (profiles.length <= 1) return;
    const idx = profiles.findIndex((p) => p.id === id);
    const next = profiles.filter((p) => p.id !== id);
    setProfiles(next);
    if (activeProfileId === id) {
      setActiveProfileId(next[Math.max(0, idx - 1)]?.id || next[0].id);
    }
  };

  const renameProfile = (id, nombre) => {
    setProfiles((prev) => prev.map((p) => (p.id === id ? { ...p, nombre } : p)));
  };

  const [loadingField, setLoadingField] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [cartaOpen, setCartaOpen] = useState(false);
  const [cartaGenerating, setCartaGenerating] = useState(false);
  const previewRef = useRef(null);
  const editorSectionRef = useRef(null);
  const lastEditorScrollRef = useRef(0);

  // En celular, cuando aparece el teclado, algunos campos cerca del borde
  // inferior quedan tapados por él. Cuando se enfoca un input/textarea,
  // esperamos a que el teclado termine de abrirse y lo centramos en pantalla.
  useEffect(() => {
    const handleFocusIn = (e) => {
      const tag = e.target.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") return;
      if (window.innerWidth >= 1024) return; // solo en mobile/tablet angosto
      setTimeout(() => {
        e.target.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    };
    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, []);

  const [previewHeight, setPreviewHeight] = useState(0);
  const [tipsOpen, setTipsOpen] = useState(false);

  useEffect(() => {
    const el = previewRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      // Usamos getBoundingClientRect (no contentRect) porque con "zoom" aplicado
      // contentRect puede reportar el tamaño sin escalar y disparar falsos positivos.
      setPreviewHeight(el.getBoundingClientRect().height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Calibrado para A4 (210×297mm ≈ 794×1123px a 96dpi) con margen 0 (@page margin:0),
  // usando la hoja completa sin descontar márgenes de impresión.
  const PAGE_HEIGHT_PX = 1123;
  // El preview en pantalla mide el CV a 600px de ancho, pero al imprimir la hoja usa
  // el ancho completo del papel (794px en A4 con margen 0) — con más ancho el
  // texto envuelve menos líneas y ocupa menos alto. Corregimos la medición para
  // aproximar el alto real impreso.
  const PRINT_WIDTH_CORRECTION = 0.755;
  const hasMeaningfulContent =
    data.nombre.trim() ||
    data.resumen.trim() ||
    data.experiencia.some((e) => e.puesto || e.empresa || e.descripcion);
  const correctedHeight = previewHeight * PRINT_WIDTH_CORRECTION;
  const pageCount =
    correctedHeight > 0 && hasMeaningfulContent
      ? Math.max(1, Math.ceil(correctedHeight / PAGE_HEIGHT_PX))
      : 1;

  const getShorteningTips = () => {
    const tips = [];
    if (data.resumen && data.resumen.length > 420) {
      tips.push(
        `Tu resumen tiene ${data.resumen.length} caracteres — probá acortarlo a 2 o 3 frases (unos 200 caracteres).`
      );
    }
    const expConCount = data.experiencia.filter((e) => e.puesto || e.empresa).length;
    if (expConCount > 4) {
      tips.push(
        `Tenés ${expConCount} experiencias cargadas — dejá solo las 3 o 4 más recientes o relevantes para este puesto.`
      );
    }
    data.experiencia.forEach((exp) => {
      if (!exp.descripcion) return;
      const lineCount = exp.descripcion.split("\n").filter((l) => l.trim()).length;
      if (lineCount > 4) {
        tips.push(
          `La descripción de "${exp.puesto || "un puesto"}" tiene ${lineCount} líneas — quedate con las 3 más relevantes.`
        );
      }
    });
    const habilidadesCount = data.habilidades ? data.habilidades.split(",").filter((h) => h.trim()).length : 0;
    if (habilidadesCount > 14) {
      tips.push(`Tenés ${habilidadesCount} habilidades listadas — priorizá 8 a 10, las más relacionadas con el puesto.`);
    }
    if (data.densidad === "amplia") {
      tips.push(`Cambiá el tamaño de texto a "Compacta" en Apariencia para ganar espacio sin borrar contenido.`);
    }
    if (data.fotoEscala > 1.15) {
      tips.push(`Achicá un poco el tamaño de la foto en el editor.`);
    }
    const activeOptional = Object.values(data.seccionesOpcionales || {}).filter(Boolean).length;
    if (activeOptional >= 2) {
      tips.push(`Tenés ${activeOptional} secciones opcionales activas — considerá dejar solo la más relevante para este puesto.`);
    }
    if (data.template !== "compacto") {
      tips.push(`La plantilla "Compacto" está pensada para condensar más contenido en una sola página.`);
    }
    return tips;
  };

  const update = (patch) => setData((d) => ({ ...d, ...patch }));

  const updateCarta = (patch) => update({ carta: { ...data.carta, ...patch } });

  const [matchOpen, setMatchOpen] = useState(false);
  const [matchAnalyzing, setMatchAnalyzing] = useState(false);

  const updateComparacion = (patch) => update({ comparacion: { ...data.comparacion, ...patch } });

  const analyzeMatch = async () => {
    if (!data.comparacion.descripcion.trim()) return;
    setMatchAnalyzing(true);
    try {
      const cvText = buildPlainText();
      const prompt = `Comparé el siguiente currículum contra la descripción de un puesto de trabajo, y devolvé SOLO un objeto JSON válido (sin texto extra, sin bloques de código), exactamente con esta forma:
{
  "puntaje": 72,
  "comentario": "Frase breve (1-2 líneas) resumiendo qué tan alineado está el CV con el puesto.",
  "encontradas": ["palabra clave 1", "palabra clave 2"],
  "faltantes": ["palabra clave 3", "palabra clave 4"]
}
"puntaje" es un número entero de 0 a 100 que representa qué tan bien el CV cubre los requisitos del puesto. "encontradas" son palabras clave, habilidades o requisitos del puesto que el CV ya cubre (aunque estén escritas distinto). "faltantes" son palabras clave, habilidades técnicas o requisitos importantes que aparecen en la descripción del puesto pero NO están reflejados en el CV — máximo 10, ordenadas por relevancia. No inventes requisitos que no estén en la descripción del puesto.

DESCRIPCIÓN DEL PUESTO:
"""${data.comparacion.descripcion.slice(0, 4000)}"""

CURRÍCULUM:
"""${cvText.slice(0, 4000)}"""`;
      const result = await callClaude(prompt);
      const cleaned = result.replace(/^```json\s*|^```\s*|```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);
      updateComparacion({ resultado: parsed });
    } catch (e) {
      console.error(e);
    } finally {
      setMatchAnalyzing(false);
    }
  };

  const generateCoverLetter = async () => {
    setCartaGenerating(true);
    try {
      const expText = data.experiencia
        .filter((e) => e.puesto || e.empresa)
        .map((e) => `- ${e.puesto || ""} en ${e.empresa || ""}: ${e.descripcion || ""}`)
        .join("\n");
      const prompt = `Escribí una carta de presentación en español para acompañar un currículum.

Tono: ${TONOS.find((t) => t.id === data.carta.tono)?.name || "Formal"}
Postulante: ${data.nombre || "el postulante"}, actualmente ${data.puesto || "profesional"}
Empresa a la que se postula: ${data.carta.empresa || "la empresa"}
Puesto al que aplica: ${data.carta.puestoAplicado || data.puesto || "el puesto"}

Resumen profesional del postulante: ${data.resumen || "(no especificado)"}

Experiencia relevante:
${expText || "(no especificada)"}

Habilidades: ${data.habilidades || "(no especificadas)"}

${data.carta.detalles ? `Detalles adicionales a incluir: ${data.carta.detalles}` : ""}

Requisitos: 3 a 4 párrafos, en primera persona, profesional pero natural (que no suene a plantilla genérica), destacando 2 o 3 fortalezas concretas conectadas con el puesto. No incluyas saludo inicial tipo "Estimados/as" ni cierre/firma final — eso se agrega aparte. Responde solo con el texto de la carta, sin comillas ni texto extra.`;
      const result = await callClaude(prompt);
      updateCarta({ texto: result });
    } catch (e) {
      console.error(e);
    } finally {
      setCartaGenerating(false);
    }
  };

  const [importOpen, setImportOpen] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState("");

  const ensurePdfJs = () => {
    if (window.pdfjsLib) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";
        resolve();
      };
      script.onerror = () => reject(new Error("No se pudo cargar el lector de PDF."));
      document.head.appendChild(script);
    });
  };

  const extractTextFromFile = async (file) => {
    const ext = file.name.split(".").pop().toLowerCase();
    const arrayBuffer = await file.arrayBuffer();
    if (ext === "docx") {
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    if (ext === "pdf") {
      await ensurePdfJs();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((it) => it.str).join(" ") + "\n";
      }
      return text;
    }
    throw new Error("Formato no soportado. Usá un archivo PDF o Word (.docx).");
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    setImportError("");
    try {
      const text = await extractTextFromFile(file);
      if (!text.trim()) throw new Error("No se encontró texto en el archivo.");
      const truncated = text.slice(0, 8000);
      const prompt = `A continuación está el texto extraído de un currículum. Extraé la información y devolvé SOLO un objeto JSON válido (sin texto extra, sin bloques de código), exactamente con esta forma:
{
  "nombre": "",
  "puesto": "",
  "email": "",
  "telefono": "",
  "ubicacion": "",
  "linkedin": "",
  "resumen": "",
  "experiencia": [{"puesto":"","empresa":"","periodo":"","descripcion":""}],
  "educacion": [{"titulo":"","institucion":"","periodo":""}],
  "habilidades": "habilidad1, habilidad2, habilidad3"
}
Si algún dato no aparece en el texto, dejalo como string vacío o array vacío — no inventes datos que no estén en el original. El campo "descripcion" de cada experiencia puede tener varias líneas separadas por saltos de línea si el original usa viñetas.

Texto del currículum:
"""${truncated}"""`;
      const result = await callClaude(prompt);
      const cleaned = result.replace(/^```json\s*|^```\s*|```\s*$/g, "").trim();
      const parsed = JSON.parse(cleaned);

      const newData = {
        ...initialState,
        nombre: parsed.nombre || "",
        puesto: parsed.puesto || "",
        email: parsed.email || "",
        telefono: parsed.telefono || "",
        ubicacion: parsed.ubicacion || "",
        linkedin: parsed.linkedin || "",
        resumen: parsed.resumen || "",
        habilidades: parsed.habilidades || "",
        experiencia:
          Array.isArray(parsed.experiencia) && parsed.experiencia.length
            ? parsed.experiencia.map((x) => ({
                ...emptyExperience(),
                puesto: x.puesto || "",
                empresa: x.empresa || "",
                periodo: x.periodo || "",
                descripcion: x.descripcion || "",
              }))
            : [emptyExperience()],
        educacion:
          Array.isArray(parsed.educacion) && parsed.educacion.length
            ? parsed.educacion.map((x) => ({
                ...emptyEducation(),
                titulo: x.titulo || "",
                institucion: x.institucion || "",
                periodo: x.periodo || "",
              }))
            : [emptyEducation()],
      };

      const id = crypto.randomUUID();
      setProfiles((prev) => [
        ...prev,
        { id, nombre: parsed.nombre ? `${parsed.nombre} (importado)` : "Importado", data: newData },
      ]);
      setActiveProfileId(id);
      setImportOpen(false);
    } catch (err) {
      console.error(err);
      setImportError("No se pudo importar el archivo. Probá con otro PDF/Word, o completá los datos a mano.");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert("La imagen es muy pesada. Elegí una de menos de 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update({ foto: reader.result });
    reader.readAsDataURL(file);
  };

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

  const [collapsedExp, setCollapsedExp] = useState(() => new Set());
  const toggleExpCollapse = (id) =>
    setCollapsedExp((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const [justAddedId, setJustAddedId] = useState(null);
  useEffect(() => {
    if (!justAddedId) return;
    const el = document.getElementById(`entry-${justAddedId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    setJustAddedId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [justAddedId, data.experiencia, data.educacion]);

  const addExperience = () => {
    const nueva = emptyExperience();
    setData((d) => ({ ...d, experiencia: [...d.experiencia, nueva] }));
    setJustAddedId(nueva.id);
  };
  const removeExperience = (id) =>
    setData((d) => ({ ...d, experiencia: d.experiencia.filter((e) => e.id !== id) }));

  const addEducation = () => {
    const nueva = emptyEducation();
    setData((d) => ({ ...d, educacion: [...d.educacion, nueva] }));
    setJustAddedId(nueva.id);
  };
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

  const adjustResumenLength = async (opt) => {
    if (!data.resumen.trim()) return;
    setLoadingField("resumen-len-" + opt.id);
    try {
      const result = await callClaude(
        `Reescribí este resumen profesional de un currículum en español para que tenga ${opt.instruccion}. Mantené el sentido y la información más importante, sin inventar datos nuevos que no estén en el original. Responde solo con el resumen reescrito, sin comillas ni texto extra:\n\n"${data.resumen}"`
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

  const [plainTextOpen, setPlainTextOpen] = useState(false);

  const buildPlainText = () => {
    const lines = [];
    lines.push(data.nombre || "Tu nombre");
    if (data.puesto) lines.push(data.puesto);
    const contact = [data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean);
    if (contact.length) lines.push(contact.join(" | "));
    lines.push("");

    const addResumen = () => {
      if (!data.resumen) return;
      lines.push("PERFIL");
      lines.push(data.resumen);
      lines.push("");
    };

    const addExperiencia = () => {
      const items = data.experiencia.filter((e) => e.puesto || e.empresa);
      if (!items.length) return;
      lines.push("EXPERIENCIA");
      items.forEach((exp) => {
        const header = [exp.puesto, exp.empresa].filter(Boolean).join(" - ") + (exp.periodo ? ` (${exp.periodo})` : "");
        lines.push(header);
        if (exp.descripcion) {
          exp.descripcion
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean)
            .forEach((line) => lines.push("- " + line.replace(/^[-•]\s*/, "")));
        }
        lines.push("");
      });
    };

    const addEducacion = () => {
      const items = data.educacion.filter((e) => e.titulo || e.institucion);
      if (!items.length) return;
      lines.push("EDUCACIÓN");
      items.forEach((edu) => {
        const header = [edu.titulo, edu.institucion].filter(Boolean).join(" - ") + (edu.periodo ? ` (${edu.periodo})` : "");
        lines.push(header);
      });
      lines.push("");
    };

    const addHabilidades = () => {
      if (!data.habilidades) return;
      lines.push("HABILIDADES");
      lines.push(data.habilidades);
      lines.push("");
    };

    const sectionFns = { resumen: addResumen, experiencia: addExperiencia, educacion: addEducacion, habilidades: addHabilidades };
    (data.ordenSecciones || DEFAULT_SECTION_ORDER).forEach((key) => sectionFns[key]?.());

    if (data.seccionesOpcionales?.proyectos) {
      const items = data.proyectos.filter((p) => p.nombre);
      if (items.length) {
        lines.push("PROYECTOS");
        items.forEach((p) => {
          lines.push([p.nombre, p.stack].filter(Boolean).join(" - "));
          if (p.descripcion) lines.push(p.descripcion);
        });
        lines.push("");
      }
    }
    if (data.seccionesOpcionales?.publicaciones) {
      const items = data.publicaciones.filter((p) => p.titulo);
      if (items.length) {
        lines.push("PUBLICACIONES");
        items.forEach((p) => lines.push([p.titulo, p.revista, p.anio && `(${p.anio})`].filter(Boolean).join(" - ")));
        lines.push("");
      }
    }
    if (data.seccionesOpcionales?.becas) {
      const items = data.becas.filter((b) => b.nombre);
      if (items.length) {
        lines.push("BECAS Y RECONOCIMIENTOS");
        items.forEach((b) => lines.push([b.nombre, b.entidad, b.anio && `(${b.anio})`].filter(Boolean).join(" - ")));
        lines.push("");
      }
    }
    if (data.seccionesOpcionales?.logros) {
      const items = data.logros.filter((l) => l.metrica || l.descripcion);
      if (items.length) {
        lines.push("LOGROS DESTACADOS");
        items.forEach((l) => lines.push([l.metrica, l.descripcion].filter(Boolean).join(" - ")));
        lines.push("");
      }
    }

    return lines.join("\n").trim();
  };

  const [exportingDocx, setExportingDocx] = useState(false);

  const ensureDocxLib = () => {
    if (window.docx) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("No se pudo cargar el generador de Word."));
      document.head.appendChild(script);
    });
  };

  const handleExportDocx = async () => {
    setExportingDocx(true);
    try {
      await ensureDocxLib();
      const { Document, Packer, Paragraph, TextRun } = window.docx;
      const accentHex = (data.accent || "#2F6F5E").replace("#", "");
      const children = [];

      children.push(
        new Paragraph({ children: [new TextRun({ text: data.nombre || "Tu nombre", bold: true, size: 40 })] })
      );
      if (data.puesto) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: data.puesto, size: 24, color: accentHex })],
            spacing: { after: 60 },
          })
        );
      }
      const contactParts = [data.email, data.telefono, data.ubicacion, data.linkedin].filter(Boolean);
      if (contactParts.length) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: contactParts.join("   ·   "), size: 19, color: "595959" })],
            spacing: { after: 200 },
          })
        );
      }

      const heading = (text) =>
        new Paragraph({
          children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 20, color: accentHex })],
          spacing: { before: 220, after: 100 },
        });

      const addResumen = () => {
        if (!data.resumen) return;
        children.push(heading("Perfil"));
        children.push(new Paragraph({ children: [new TextRun({ text: data.resumen, size: 22 })] }));
      };

      const addExperiencia = () => {
        const items = data.experiencia.filter((e) => e.puesto || e.empresa);
        if (!items.length) return;
        children.push(heading("Experiencia"));
        items.forEach((exp) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.puesto || "", bold: true, size: 22 }),
                new TextRun({ text: exp.empresa ? `   ·   ${exp.empresa}` : "", size: 22 }),
                new TextRun({ text: exp.periodo ? `   (${exp.periodo})` : "", size: 19, italics: true, color: "777777" }),
              ],
              spacing: { before: 120 },
            })
          );
          if (exp.descripcion) {
            exp.descripcion
              .split("\n")
              .map((l) => l.trim())
              .filter(Boolean)
              .forEach((line) => {
                children.push(
                  new Paragraph({
                    text: line.replace(/^[-•]\s*/, ""),
                    bullet: { level: 0 },
                    spacing: { after: 40 },
                  })
                );
              });
          }
        });
      };

      const addEducacion = () => {
        const items = data.educacion.filter((e) => e.titulo || e.institucion);
        if (!items.length) return;
        children.push(heading("Educación"));
        items.forEach((edu) => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.titulo || "", bold: true, size: 22 }),
                new TextRun({ text: edu.institucion ? `   ·   ${edu.institucion}` : "", size: 22 }),
                new TextRun({ text: edu.periodo ? `   (${edu.periodo})` : "", size: 19, italics: true, color: "777777" }),
              ],
              spacing: { before: 100 },
            })
          );
        });
      };

      const addHabilidades = () => {
        if (!data.habilidades) return;
        children.push(heading("Habilidades"));
        children.push(new Paragraph({ children: [new TextRun({ text: data.habilidades, size: 22 })] }));
      };

      const docxSectionFns = { resumen: addResumen, experiencia: addExperiencia, educacion: addEducacion, habilidades: addHabilidades };
      (data.ordenSecciones || DEFAULT_SECTION_ORDER).forEach((key) => docxSectionFns[key]?.());

      if (data.seccionesOpcionales?.proyectos) {
        const items = data.proyectos.filter((p) => p.nombre);
        if (items.length) {
          children.push(heading("Proyectos"));
          items.forEach((p) => {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: p.nombre, bold: true, size: 22 }),
                  new TextRun({ text: p.stack ? `   ·   ${p.stack}` : "", size: 19, color: "777777" }),
                ],
                spacing: { before: 100 },
              })
            );
            if (p.descripcion) children.push(new Paragraph({ children: [new TextRun({ text: p.descripcion, size: 22 })] }));
          });
        }
      }

      if (data.seccionesOpcionales?.publicaciones) {
        const items = data.publicaciones.filter((p) => p.titulo);
        if (items.length) {
          children.push(heading("Publicaciones"));
          items.forEach((p) => {
            const parts = [p.titulo, p.revista, p.anio && `(${p.anio})`].filter(Boolean).join("   ·   ");
            children.push(new Paragraph({ children: [new TextRun({ text: parts, size: 22 })], spacing: { before: 60 } }));
          });
        }
      }

      if (data.seccionesOpcionales?.becas) {
        const items = data.becas.filter((b) => b.nombre);
        if (items.length) {
          children.push(heading("Becas y reconocimientos"));
          items.forEach((b) => {
            const parts = [b.nombre, b.entidad, b.anio && `(${b.anio})`].filter(Boolean).join("   ·   ");
            children.push(new Paragraph({ children: [new TextRun({ text: parts, size: 22 })], spacing: { before: 60 } }));
          });
        }
      }

      if (data.seccionesOpcionales?.logros) {
        const items = data.logros.filter((l) => l.metrica || l.descripcion);
        if (items.length) {
          children.push(heading("Logros destacados"));
          items.forEach((l) => {
            const parts = [l.metrica, l.descripcion].filter(Boolean).join("  —  ");
            children.push(new Paragraph({ children: [new TextRun({ text: parts, size: 22 })], spacing: { before: 60 } }));
          });
        }
      }

      const doc = new Document({ sections: [{ properties: {}, children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(data.nombre || "CV").trim().replace(/\s+/g, "_") || "CV"}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("No se pudo generar el Word. Probá de nuevo en unos segundos.");
    } finally {
      setExportingDocx(false);
    }
  };

  const accent = data.accent;
  const PreviewComponent = TEMPLATE_COMPONENTS[data.template] || PreviewClasico;
  const currentTemplateName = TEMPLATES.find((t) => t.id === data.template)?.name;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-20 lg:pb-0 print:min-h-0 print:pb-0 print:bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@400;700&display=swap');
        .font-display { font-family: ${TYPO_PRESETS[data.tipografia].display} !important; }
        .font-sans { font-family: ${TYPO_PRESETS[data.tipografia].body} !important; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
        input:focus, textarea:focus { border-color: ${accent} !important; box-shadow: 0 0 0 2px ${accent}33; }
        /* En iOS Safari, cualquier input con letra menor a 16px dispara un zoom
           automático al tocarlo. Forzamos 16px solo en pantallas chicas para
           evitarlo, sin agrandar la letra en escritorio. */
        @media (max-width: 767px) {
          input,
          textarea,
          select {
            font-size: 16px !important;
          }
        }
        @page {
          size: A4;
          margin: 0;
        }
        @media print {
          .no-print { display: none !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; width: 100% !important; min-height: 0 !important; }
          html, body { background: white !important; min-height: 0 !important; height: auto !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        }
      `}</style>

      <TemplateGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        current={data.template}
        accent={accent}
        data={data}
        onSelect={(id) => update({ template: id })}
      />

      <ProfilesModal
        open={profilesOpen}
        onClose={() => setProfilesOpen(false)}
        profiles={profiles}
        activeId={activeProfileId}
        accent={accent}
        onSelect={setActiveProfileId}
        onAdd={addProfile}
        onDuplicate={duplicateProfile}
        onRemove={removeProfile}
        onRename={renameProfile}
        onTranslate={translateProfileToEnglish}
        translatingId={translatingId}
        onImportClick={() => {
          setProfilesOpen(false);
          setImportError("");
          setImportOpen(true);
        }}
      />

      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        onImport={handleImportFile}
        importing={importing}
        error={importError}
      />

      <PlainTextModal
        open={plainTextOpen}
        onClose={() => setPlainTextOpen(false)}
        text={buildPlainText()}
        accent={accent}
      />

      <ShortenTipsModal
        open={tipsOpen}
        onClose={() => setTipsOpen(false)}
        tips={getShorteningTips()}
        accent={accent}
        pageCount={pageCount}
      />

      <CoverLetterModal
        open={cartaOpen}
        onClose={() => setCartaOpen(false)}
        data={data}
        accent={accent}
        onUpdateField={updateCarta}
        onGenerate={generateCoverLetter}
        generating={cartaGenerating}
      />

      <MatchModal
        open={matchOpen}
        onClose={() => setMatchOpen(false)}
        data={data}
        accent={accent}
        onUpdateField={updateComparacion}
        onAnalyze={analyzeMatch}
        analyzing={matchAnalyzing}
      />

      {/* Header */}
      <div className="sticky top-0 z-20">
      <header className="no-print border-b border-stone-800 px-6 py-4 flex items-center justify-between bg-stone-950/95 backdrop-blur flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center font-display text-lg"
            style={{ background: accent }}
          >
            CV
          </div>
          <div>
            <h1 className="font-display text-lg leading-none">HazTuCV</h1>
            <p className="text-[11px] font-mono text-stone-500 mt-0.5">editor + vista previa en vivo</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1 border border-stone-700 rounded-md p-0.5">
            <button
              onClick={undo}
              disabled={!canUndo}
              title="Deshacer"
              className="p-1.5 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              title="Rehacer"
              className="p-1.5 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Redo2 size={15} />
            </button>
          </div>
          <button
            onClick={() => setProfilesOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium px-3.5 py-2 rounded-md border border-stone-700 text-stone-200 hover:border-stone-500 transition"
          >
            <Users size={15} /> {activeProfile.nombre}
          </button>
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
            <label
              title="Color personalizado"
              className="w-5 h-5 rounded-full border-2 relative cursor-pointer overflow-hidden shrink-0"
              style={{
                borderColor: !ACCENTS.some((a) => a.value === data.accent) ? "white" : "transparent",
                background: !ACCENTS.some((a) => a.value === data.accent)
                  ? data.accent
                  : "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
              }}
            >
              <input
                type="color"
                value={data.accent}
                onChange={(e) => update({ accent: e.target.value })}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          </div>
          <MoreMenu
            onCarta={() => setCartaOpen(true)}
            onCompare={() => setMatchOpen(true)}
            onTexto={() => setPlainTextOpen(true)}
            onWord={handleExportDocx}
            exportingDocx={exportingDocx}
          />
          <button
            onClick={handlePrint}
            className="hidden lg:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md text-stone-950 transition hover:opacity-90"
            style={{ background: accent }}
          >
            <Download size={15} /> Descargar PDF
          </button>
        </div>
      </header>

      <div className="lg:hidden no-print flex border-b border-stone-800 bg-stone-950">
        <button
          onClick={() => window.scrollTo({ top: lastEditorScrollRef.current, behavior: "smooth" })}
          className="flex-1 py-2.5 text-[13px] font-medium text-stone-300 hover:text-white transition"
        >
          Editar
        </button>
        <button
          onClick={() => {
            lastEditorScrollRef.current = window.scrollY;
            previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex-1 py-2.5 text-[13px] font-medium text-stone-300 hover:text-white transition border-l border-stone-800"
        >
          Vista previa
        </button>
      </div>
      </div>

      {pageCount > 1 && (
        <div className="no-print bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[12.5px] text-amber-300 flex items-center gap-2">
            <AlertTriangle size={14} className="shrink-0" />
            Tu CV ocupa aproximadamente {pageCount} páginas (estimado).
          </p>
          <button
            onClick={() => setTipsOpen(true)}
            className="text-[12px] font-medium text-amber-200 underline hover:text-amber-100 transition"
          >
            Ver sugerencias para acortarlo
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Editor */}
        <div ref={editorSectionRef} className="editor-panel no-print px-6 py-8 max-w-xl mx-auto lg:mx-0 lg:pl-10 w-full">
          <section className="mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-white mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-stone-700" /> Apariencia
            </h2>
            <Field label="Tipografía">
              <div className="flex gap-2">
                {Object.entries(TYPO_PRESETS).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => update({ tipografia: key })}
                    className="flex-1 text-[11px] px-2 py-2 rounded-md border transition"
                    style={{
                      borderColor: data.tipografia === key ? accent : "#44403c",
                      background: data.tipografia === key ? `${accent}22` : "transparent",
                      color: data.tipografia === key ? accent : "#a8a29e",
                    }}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Densidad de texto">
              <div className="flex gap-2">
                {DENSITY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => update({ densidad: d.id })}
                    className="flex-1 text-[11px] px-2 py-2 rounded-md border transition"
                    style={{
                      borderColor: data.densidad === d.id ? accent : "#44403c",
                      background: data.densidad === d.id ? `${accent}22` : "transparent",
                      color: data.densidad === d.id ? accent : "#a8a29e",
                    }}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Orden de las secciones">
              <SectionOrderList
                order={data.ordenSecciones}
                accent={accent}
                onReorder={(newOrder) => update({ ordenSecciones: newOrder })}
              />
              <button
                onClick={() => update({ ordenSecciones: [...DEFAULT_SECTION_ORDER] })}
                disabled={JSON.stringify(data.ordenSecciones) === JSON.stringify(DEFAULT_SECTION_ORDER)}
                className="text-[10.5px] font-mono uppercase tracking-wider text-white hover:text-stone-300 transition mt-2 disabled:opacity-30 disabled:cursor-default disabled:hover:text-white"
              >
                ↺ Restablecer orden
              </button>
              <p className="text-[10px] text-white mt-1.5 leading-relaxed">
                Arrastrá desde el ícono para reordenar. No aplica a Moderno, Ejecutivo, Académico,
                Ventas/Marketing, Simetría, Prensa y Panel — su diseño en columnas o su secuencia
                académica/de métricas depende de un orden fijo.
              </p>
            </Field>
          </section>

          <section className="mb-8">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-white mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-stone-700" /> Datos personales
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center overflow-hidden shrink-0"
              >
                {data.foto ? (
                  <img src={data.foto} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-[10px] font-mono">FOTO</span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-white hover:text-stone-300 transition cursor-pointer inline-flex items-center gap-1.5">
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    <Upload size={12} />
                    {data.foto ? "Cambiar foto" : "Subir foto"}
                  </label>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-white hover:text-stone-300 transition cursor-pointer inline-flex items-center gap-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                    <Camera size={12} />
                    Tomar foto
                  </label>
                </div>
                {data.foto && (
                  <button
                    onClick={() => update({ foto: null })}
                    className="text-[11px] font-mono uppercase tracking-wider text-white hover:text-red-400 transition text-left"
                  >
                    Quitar foto
                  </button>
                )}
              </div>
            </div>
            {data.foto && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white">
                    Tamaño de la foto
                  </span>
                  <span className="text-[11px] font-mono text-white">
                    {Math.round(data.fotoEscala * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="1.6"
                  step="0.05"
                  value={data.fotoEscala}
                  onChange={(e) => update({ fotoEscala: parseFloat(e.target.value) })}
                  className="w-full accent-current"
                  style={{ color: accent }}
                />
              </div>
            )}
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
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={data.contactoAlPie}
                onChange={(e) => update({ contactoAlPie: e.target.checked })}
                className="w-3.5 h-3.5 accent-current"
                style={{ color: accent }}
              />
              <span className="text-[11px] text-white">
                Mostrar el contacto al pie de la página en vez del encabezado
              </span>
            </label>
            <p className="text-[10px] text-white mt-1 leading-relaxed">
              Solo aplica a Clásico, Minimalista, Corporativo, Ejecutivo, Contorno y Revista.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
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
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              <span className="text-[10px] font-mono uppercase tracking-wider text-white mr-0.5">
                Ajustar largo:
              </span>
              {RESUMEN_LENGTHS.map((opt) => {
                const loading = loadingField === "resumen-len-" + opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => adjustResumenLength(opt)}
                    disabled={!data.resumen.trim() || loading}
                    className="text-[10.5px] px-2.5 py-1 rounded-full border border-stone-700 text-white hover:text-stone-300 hover:border-stone-500 transition disabled:opacity-40 inline-flex items-center gap-1"
                  >
                    {loading && <Loader2 size={10} className="animate-spin" />}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
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
            {data.experiencia.map((exp) => {
              const isCollapsed = collapsedExp.has(exp.id);
              const summary = [exp.puesto, exp.empresa].filter(Boolean).join(" · ") || "Nueva experiencia";
              return (
                <div key={exp.id} id={`entry-${exp.id}`} className="mb-5 pb-5 border-b border-stone-800 last:border-0">
                  <div className="flex items-center gap-2">
                    <GripVertical size={14} className="text-stone-700 shrink-0" />
                    <button
                      onClick={() => toggleExpCollapse(exp.id)}
                      className="flex-1 flex items-center justify-between gap-2 text-left py-1 min-w-0"
                    >
                      <span className="text-[12.5px] text-white truncate">{summary}</span>
                      {isCollapsed ? (
                        <ChevronRight size={14} className="text-stone-500 shrink-0" />
                      ) : (
                        <ChevronDown size={14} className="text-stone-500 shrink-0" />
                      )}
                    </button>
                    {data.experiencia.length > 1 && (
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-stone-600 hover:text-red-400 transition shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="pl-6 mt-2">
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
                        <span className="block text-[11px] font-mono uppercase tracking-wider text-white">
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
                  )}
                </div>
              );
            })}
          </section>

          <section className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
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
              <div key={edu.id} id={`entry-${edu.id}`} className="mb-4 flex items-start gap-2">
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
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
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

          <div className="mt-2 mb-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white mb-2">
              Secciones opcionales — según la plantilla
            </p>
            <div className="flex flex-wrap gap-2">
              {OPTIONAL_SECTIONS.map((s) => {
                const activa = !!data.seccionesOpcionales?.[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() =>
                      update({ seccionesOpcionales: { ...data.seccionesOpcionales, [s.id]: !activa } })
                    }
                    className="text-[11px] px-3 py-1.5 rounded-full border transition inline-flex items-center gap-1.5"
                    style={{
                      borderColor: activa ? accent : "#44403c",
                      background: activa ? `${accent}22` : "transparent",
                      color: activa ? accent : "#a8a29e",
                    }}
                  >
                    {activa ? <Check size={11} /> : <Plus size={11} />}
                    {s.name} <span className="text-stone-600">· {s.template}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {data.seccionesOpcionales?.proyectos && (
            <section className="mt-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-4 h-px bg-stone-700" /> Proyectos <span className="text-stone-600 normal-case">· Desarrollador</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={proyectosH.add} className="text-stone-400 hover:text-white transition" title="Agregar proyecto">
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => update({ seccionesOpcionales: { ...data.seccionesOpcionales, proyectos: false } })}
                    className="text-stone-500 hover:text-red-400 transition"
                    title="Ocultar sección"
                  >
                    <X size={15} />
                  </button>
                </div>
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
          )}

          {data.seccionesOpcionales?.publicaciones && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-4 h-px bg-stone-700" /> Publicaciones <span className="text-stone-600 normal-case">· Académico</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={publicacionesH.add} className="text-stone-400 hover:text-white transition" title="Agregar publicación">
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => update({ seccionesOpcionales: { ...data.seccionesOpcionales, publicaciones: false } })}
                    className="text-stone-500 hover:text-red-400 transition"
                    title="Ocultar sección"
                  >
                    <X size={15} />
                  </button>
                </div>
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
          )}

          {data.seccionesOpcionales?.becas && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-4 h-px bg-stone-700" /> Becas y reconocimientos <span className="text-stone-600 normal-case">· Académico</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={becasH.add} className="text-stone-400 hover:text-white transition" title="Agregar beca">
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => update({ seccionesOpcionales: { ...data.seccionesOpcionales, becas: false } })}
                    className="text-stone-500 hover:text-red-400 transition"
                    title="Ocultar sección"
                  >
                    <X size={15} />
                  </button>
                </div>
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
          )}

          {data.seccionesOpcionales?.logros && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-4 h-px bg-stone-700" /> Logros destacados <span className="text-stone-600 normal-case">· Ventas / Marketing</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={logrosH.add} className="text-stone-400 hover:text-white transition" title="Agregar logro">
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => update({ seccionesOpcionales: { ...data.seccionesOpcionales, logros: false } })}
                    className="text-stone-500 hover:text-red-400 transition"
                    title="Ocultar sección"
                  >
                    <X size={15} />
                  </button>
                </div>
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
          )}
        </div>

        {/* Preview */}
        <div className="bg-stone-900 px-6 py-8 flex justify-center print:bg-white print:p-0">
          <div
            ref={previewRef}
            className="w-full flex justify-center"
            style={{ zoom: DENSITY_SCALE[data.densidad] }}
          >
            <PreviewComponent data={data} accent={accent} />
          </div>
        </div>
      </div>

      <div className="lg:hidden no-print fixed bottom-0 left-0 right-0 z-30 bg-stone-950/95 backdrop-blur border-t border-stone-800 px-4 py-3">
        <button
          onClick={handlePrint}
          className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-md text-stone-950 transition hover:opacity-90"
          style={{ background: accent }}
        >
          <Download size={16} /> Descargar PDF
        </button>
      </div>
    </div>
  );
}
