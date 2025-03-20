import { beforeEach, describe, expect, it } from 'vitest';
import { db } from '../lib/db';
import { gamesTable } from '../schema';
import { getAllGames, getGameById, getDataGameById, createGame, updateGame, deleteGame } from '../services/games';
import { eq } from 'drizzle-orm';

// Nettoyage avant chaque test
beforeEach(async () => {
  await db.delete(gamesTable); // Réinitialiser la table avant chaque test
});

// Jeu de données valide pour correspondre au schéma
const sampleGame = {
  name: 'Test Game',
  category: 'Category 1',
  type: 'RPG',
  category: 'General',
  information: 'A test game',
  data_game: { level: 1, score: 100 },
};

// Test pour getAllGames
describe('Game functions', () => {
  it('should retrieve all games', async () => {
    await createGame(sampleGame);

    const games = await getAllGames();
    expect(games.length).toBe(1);
    expect(games[0].name).toBe(sampleGame.name);
    expect(games[0].type).toBe(sampleGame.type);
    expect(games[0].information).toBe(sampleGame.information);
    expect(games[0].data_game).toEqual(sampleGame.data_game);
  });

  // Test pour getGameById
  it('should retrieve a game by id', async () => {
    const [newGame] = await createGame(sampleGame);
    const game = await getGameById(newGame.id);
    
    expect(game.length).toBe(1);
    expect(game[0].id).toBe(newGame.id);
    expect(game[0].name).toBe(sampleGame.name);
  });

  // Test pour getDataGameById
  it('should retrieve only data_game by id', async () => {
    const [newGame] = await createGame(sampleGame);
    const data = await getDataGameById(newGame.id);
    
    expect(data.length).toBe(1);
    expect(data[0].data_game).toEqual(sampleGame.data_game);
  });

  // Test pour createGame
  it('should create a new game', async () => {
    const [newGame] = await createGame(sampleGame);

    expect(newGame.name).toBe(sampleGame.name);
    expect(newGame.type).toBe(sampleGame.type);
    expect(newGame.information).toBe(sampleGame.information);
    expect(newGame.data_game).toEqual(sampleGame.data_game);
  });

  // Test pour updateGame
  it('should update a game', async () => {
    const [newGame] = await createGame(sampleGame);
    const updatedData = { name: 'Updated Game', type: 'Strategy' };
    
    const [updatedGame] = await updateGame(newGame.id, updatedData);
    
    expect(updatedGame.name).toBe(updatedData.name);
    expect(updatedGame.type).toBe(updatedData.type);
    expect(updatedGame.information).toBe(sampleGame.information); // Non modifié
    expect(updatedGame.data_game).toEqual(sampleGame.data_game); // Non modifié
  });

  // Test pour deleteGame
  it('should delete a game', async () => {
    const [newGame] = await createGame(sampleGame);
    await deleteGame(newGame.id);
    
    const game = await getGameById(newGame.id);
    expect(game.length).toBe(0);
  });
});
