// src/database/seed.ts
import { NestFactory } from "@nestjs/core";
import { SeedModule } from "./seed.module";
import { DataSource } from "typeorm";
import { FullSeed } from "./seed/full.seed";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const dataSource = app.get(DataSource);

  console.log("🌱 Iniciando seeds...");

  await new FullSeed().run(dataSource);

  await app.close();
  console.log("🌱 Finalizado.");
}

bootstrap();
