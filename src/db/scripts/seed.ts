import { db, closeConnection } from '../lib/db';
import { gamesTable } from '../schema';
import questions from './questions.json';


async function seed() {
  // Insérer les jeux
  await db.insert(gamesTable).values([
    {
      name: 'general Q&A',
      type: 'QCM',
      category: 'General',
      information: 'Testez vos connaissances en histoire',
      data_game: {
        "questions": [
          ...questions
        ]
      }
    }
  ]);

  await db.insert(gamesTable).values([
    {
      name: 'History Q&A',
      type: 'QCM',
      category: 'General',
      information: 'Testez vos connaissances en histoire',
      data_game: {
        "questions": [
          ...questions
        ]
      }
    }
  ]);

  await db.insert(gamesTable).values([
    {
      name: 'Science Q&A',
      type: 'QCM',
      category: 'General',
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