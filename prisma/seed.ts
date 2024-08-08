const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    ];
    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ];

    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
    ];

    const barbershops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          email: `contacto@${name.replace(/\s+/g, "").toLowerCase()}.com`, // Email único para cada barbearia
          address, // Certifique-se de que este campo esteja no modelo e no código de seeding
          imageUrl: imageUrl,
          phones: ["(11) 99999-9999", "(11) 99999-9999"],
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus. Donec pretium convallis iaculis. Etiam eu felis sollicitudin, cursus mi vitae, iaculis magna. Nam non erat neque. In hac habitasse platea dictumst. Pellentesque molestie accumsan tellus id laoreet.",
        },
      });

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      barbershops.push(barbershop);
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
