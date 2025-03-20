import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../lib/db';
import { usersTable } from '../schema';
import { createUser, updateGlobalScore, getUserByMail, removeAllGlobalScore } from '../services/users'; // Assurez-vous que le chemin est correct
import { eq } from 'drizzle-orm';

// Nettoyage avant chaque test
beforeEach(async () => {
  await db.delete(usersTable); // Réinitialiser la table avant chaque test
});

// Jeu de données valide
const sampleUser = {
  mail: 'test@example.com',
  country: 'France',
  global_score: 10, // Valeur initiale pour tester l'update
};
const sampleUser2 = {
  mail: 'test2@example.com',
  country: 'France',
  global_score: 10, // Valeur initiale pour tester l'update
};
const sampleUser3 = {
  mail: 'test3@example.com',
  country: 'France',
  global_score: 10, // Valeur initiale pour tester l'update
};

// Test des fonctions utilisateurs
describe('User functions', () => {
  // Test de création d'un utilisateur
  it('should create a new user', async () => {
    const [newUser] = await createUser(sampleUser);

    expect(newUser.mail).toBe(sampleUser.mail);
    expect(newUser.country).toBe(sampleUser.country);
    expect(newUser.global_score).toBe(sampleUser.global_score);
  });

  // Test de récupération par email
  it('should retrieve a user by mail', async () => {
    await createUser(sampleUser);
    const user = await getUserByMail(sampleUser.mail);

    expect(user.length).toBe(1);
    expect(user[0].mail).toBe(sampleUser.mail);
    expect(user[0].country).toBe(sampleUser.country);
  });

  // Test de mise à jour du score global
  it('should update the global score of a user', async () => {
    await createUser(sampleUser);
    await updateGlobalScore(sampleUser.mail, 5); // Ajouter 5 points

    const user = await getUserByMail(sampleUser.mail);
    expect(user.length).toBe(1);
    expect(user[0].global_score).toBe(sampleUser.global_score + 5);
  });

  // Test de réinitialisation de tous les scores globaux
  it('should reset all global scores to 0', async () => {
    await createUser(sampleUser);
    await createUser(sampleUser2);
    await createUser(sampleUser3);
    await createUser({ mail: 'second@example.com', country: 'Canada', global_score: 20 });

    await removeAllGlobalScore(); // Remet tous les scores à 0

    const users = await db.select().from(usersTable);
    users.forEach(user => {
      expect(user.global_score).toBe(0);
    });
  });
});
