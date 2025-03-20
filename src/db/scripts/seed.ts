import { db, closeConnection } from '../lib/db';
import { gamesTable } from '../schema';
import questions from './questions.json';

async function seed() {
  // Insérer les jeux
  await db.insert(gamesTable).values([
    {
      name: 'Q&A 1',
      category: 'General',
      type: 'QCM',
      information: 'Testez vos connaissances en histoire',
      data_game: {
        "questions": [
          ...questions
        ]
      }
    }
    
  ]);

  console.log('Données insérées avec succès');
}

// Exécuter le script
seed()
  .catch(console.error)
  .finally(async () => {
    await closeConnection();
  });