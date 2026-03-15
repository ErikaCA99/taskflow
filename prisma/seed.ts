import { PrismaClient, TaskStatus, TaskPriority } from '@prisma/client';

const prisma = new PrismaClient();

// UUID del usuario de prueba creado en Supabase > Auth > Users
const TEST_USER_ID = 'REEMPLAZA-CON-UUID-DE-SUPABASE';
const TEST_USER_EMAIL = 'test@taskflow.com';

async function main() {
  // 1. Crear usuario en tabla users
  const user = await prisma.user.upsert({
    where: { id: TEST_USER_ID },
    update: {},
    create: {
      id: TEST_USER_ID,
      email: TEST_USER_EMAIL,
      fullName: 'Usuario de Prueba',
    },
  });

  console.log('Usuario creado:', user.email);

  // 2. Crear 3 proyectos con 5 tareas cada uno
  const projects = [
    { name: 'Rediseño Web', description: 'Rediseño completo del sitio', color: '#6366f1' },
    { name: 'App Mobile', description: 'Aplicación móvil React Native', color: '#10b981' },
    { name: 'API Backend', description: 'API REST con Node.js', color: '#f59e0b' },
  ];

  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: {
        ...projectData,
        userId: user.id,
        createdBy: user.email,
      },
    });

    console.log(`Proyecto creado: ${project.name}`);

    const tasks = [
      { title: 'Configurar entorno', status: TaskStatus.COMPLETED, priority: TaskPriority.HIGH },
      { title: 'Diseñar wireframes', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
      { title: 'Implementar funcionalidad core', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
      { title: 'Escribir tests', status: TaskStatus.PENDING, priority: TaskPriority.MEDIUM },
      { title: 'Deploy a producción', status: TaskStatus.PENDING, priority: TaskPriority.LOW },
    ];

    for (const taskData of tasks) {
      await prisma.task.create({
        data: {
          ...taskData,
          description: `Descripción de: ${taskData.title}`,
          userId: user.id,
          createdBy: user.email,
          projectId: project.projectId,
        },
      });
    }

    console.log(`5 tareas creadas para: ${project.name}`);
  }
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });