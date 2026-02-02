import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Award, 
  Construction, 
  Home, 
  Settings, 
  MessageSquare, 
  FileText, 
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Service, Testimonial, ProcessStep, AuthorityPoint } from './types';

export const WHATSAPP_NUMBER = "50684744690";
export const WHATSAPP_MESSAGE = "Hola Construmax, quiero consultar por una casa prefabricada o materiales.";

export const COLORS = {
  blue: '#0055B8',
  navy: '#003D82',
  white: '#FFFFFF',
  offwhite: '#F1F5F9',
};

export const SERVICES: Service[] = [
  {
    name: "Prefabricados",
    description: "Casas prefabricadas completas. Rápidas, seguras y económicas."
  },
  {
    name: "Materiales",
    description: "Todo en materiales de construcción, eléctricos y herramientas."
  },
  {
    name: "Asesoría",
    description: "Te ayudamos a planear tu obra de principio a fin."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    text: "Mi casa prefabricada quedó excelente y en poco tiempo.",
    rating: 5
  },
  {
    text: "Buenos precios en materiales y atención muy amable.",
    rating: 5
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Cotización",
    description: "Nos decís qué necesitás y te pasamos el precio."
  },
  {
    step: "02",
    title: "Pedido",
    description: "Preparamos los materiales o el kit de tu casa."
  },
  {
    step: "03",
    title: "Entrega",
    description: "Llevamos todo a tu obra sin complicaciones."
  }
];

export const AUTHORITY_POINTS: AuthorityPoint[] = [
  {
    title: "Casas Listas",
    text: "Expertos en sistemas prefabricados para que te mudes rápido."
  },
  {
    title: "Todo a Mano",
    text: "Materiales y herramientas en un solo lugar en Río Frío."
  },
  {
    title: "Confianza",
    text: "Atención directa para que tu inversión esté segura."
  }
];

export const OBJECTION_POINTS = [
  "No usamos materiales de mala calidad",
  "No tardamos meses en entregar",
  "No te dejamos solo en la obra"
];

export const TRUST_STRIP = [
  "Casas Prefabricadas",
  "Materiales y Eléctricos",
  "Herramientas de Calidad"
];