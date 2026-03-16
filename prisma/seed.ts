import { PrismaClient, TaskStatus, TaskPriority } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
 
dotenv.config();
 
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const USER_ID    = "d67e89dc-f767-498b-9c77-7f0aef5f2033";
const USER_EMAIL = "juan_perez@taskflow.com";
 
async function main() {
  console.log(" Iniciando seed...");

  await prisma.task.deleteMany({ where: { userId: USER_ID } });
  await prisma.project.deleteMany({ where: { userId: USER_ID } });
  console.log("🗑️  Datos previos eliminados");
 
  const p1 = await prisma.project.create({
    data: {
      name: "Rediseño Web", description: "Rediseño completo del sitio corporativo",
      color: "blue", userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL,
    },
  });
  await prisma.task.createMany({ data: [
    { title: "Configurar entorno",          description: "Setup inicial del proyecto",           status: TaskStatus.COMPLETED,   priority: TaskPriority.HIGH,   projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Diseñar wireframes",          description: "Prototipos en Figma",                  status: TaskStatus.COMPLETED,   priority: TaskPriority.MEDIUM, projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Implementar autenticación",   description: "Login con Supabase Auth",              status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH,   projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Crear componentes UI",        description: "Navbar, cards, formularios",           status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM, projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Integrar base de datos",      description: "Configurar Prisma con Supabase",       status: TaskStatus.PENDING,     priority: TaskPriority.MEDIUM, projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Deploy a producción",         description: "Subir a Vercel",                       status: TaskStatus.PENDING,     priority: TaskPriority.LOW,    projectId: p1.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
  ]});
  console.log(` ${p1.name} — 6 tareas`);
 
  const p2 = await prisma.project.create({
    data: {
      name: "App Móvil", description: "Aplicación de delivery para iOS y Android",
      color: "green", userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL,
    },
  });
  await prisma.task.createMany({ data: [
    { title: "Definir arquitectura",        description: "Elegir stack tecnológico",             status: TaskStatus.COMPLETED,   priority: TaskPriority.HIGH,   projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Diseñar pantallas",           description: "UI/UX en Figma",                       status: TaskStatus.COMPLETED,   priority: TaskPriority.HIGH,   projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Módulo de autenticación",     description: "Login con email y redes sociales",     status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH,   projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Integrar pasarela de pago",   description: "Stripe para pagos en la app",          status: TaskStatus.PENDING,     priority: TaskPriority.HIGH,   projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Sistema de notificaciones",   description: "Push notifications con Firebase",      status: TaskStatus.PENDING,     priority: TaskPriority.MEDIUM, projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Publicar en App Store",       description: "Proceso de review y publicación",      status: TaskStatus.PENDING,     priority: TaskPriority.LOW,    projectId: p2.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
  ]});
  console.log(` ${p2.name} — 6 tareas`);
 
  const p3 = await prisma.project.create({
    data: {
      name: "Marketing Digital", description: "Campaña Q2 para redes sociales y SEO",
      color: "purple", userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL,
    },
  });
  await prisma.task.createMany({ data: [
    { title: "Análisis de competencia",     description: "Benchmarking de competidores",         status: TaskStatus.COMPLETED,   priority: TaskPriority.MEDIUM, projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Estrategia de contenidos",    description: "Plan editorial para 3 meses",          status: TaskStatus.COMPLETED,   priority: TaskPriority.HIGH,   projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Optimización SEO",            description: "Keywords, meta tags y velocidad",      status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH,   projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Campaña en Google Ads",       description: "Setup y configuración de anuncios",    status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM, projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Crear contenido para RRSS",   description: "Posts y reels para Instagram",         status: TaskStatus.PENDING,     priority: TaskPriority.MEDIUM, projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
    { title: "Reporte de resultados",       description: "Métricas y KPIs del trimestre",        status: TaskStatus.PENDING,     priority: TaskPriority.LOW,    projectId: p3.id, userId: USER_ID, createdBy: USER_EMAIL, updatedBy: USER_EMAIL },
  ]});
  console.log(` ${p3.name} — 6 tareas`);
 
  console.log("\n Seed completado — 3 proyectos, 18 tareas");
}
 
main()
  .catch((e) => { console.error(" Error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });