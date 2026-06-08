import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { Word } from './modules/words/entities/word.entity';
import { SEED_SETS } from './modules/words/seed-data';

dotenv.config({ path: resolve(__dirname, '../.env') });

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Word],
  synchronize: false,
  logging: false,
});

async function seed() {
  await ds.initialize();
  console.log('Connected to database.\n');

  const repo = ds.getRepository(Word);

  for (const { set_name, words } of SEED_SETS) {
    const existing = await repo.count({ where: { set_name } });
    if (existing > 0) {
      console.log(`SKIP  ${set_name} — already has ${existing} words`);
      continue;
    }
    const entities = words.map((w) => repo.create({ ...w, set_name }));
    await repo.save(entities);
    console.log(`OK    ${set_name} — seeded ${entities.length} words`);
  }

  await ds.destroy();
  console.log('\nDone.');
}

seed().catch((e) => {
  console.error('Seed failed:', e.message);
  process.exit(1);
});
