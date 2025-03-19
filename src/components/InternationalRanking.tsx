"use client";
import { useEffect, useState } from 'react';

type User = {
    id: number;
    name: string;
    points: number;
};

export default function RankingCards() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Vous pouvez remplacer ceci par votre propre API ou données statiques
                // Exemple avec des données statiques pour test:
                const mockData = [
                    { id: 1, name: 'Tessa', points: 2950 },
                    { id: 2, name: 'Aidan', points: 2640 },
                    { id: 3, name: 'Aisling', points: 2120 }
                ];
                
                // Décommentez et adaptez cette ligne pour utiliser votre API
                // const response = await fetch('/api/users');
                // const mockData = await response.json();
                
                const sortedUsers = mockData.sort((a, b) => b.points - a.points);
                setUsers(sortedUsers);
                setError(null);
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
                setError('Impossible de charger le classement');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="bg-hackatonWhite-400 px-4 py-2">
            {/* Indicateur de chargement */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin h-6 w-6 border-4 border-indigo-200 rounded-full border-t-transparent"></div>
                </div>
            )}

            {/* Message d'erreur */}
            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center mb-4">
                    {error}
                </div>
            )}

            {/* Cartes de classement */}
            {!loading && !error && (
                <div className="space-y-4">
                    {users.map((user) => (
                        <div 
                            key={user.id} 
                            className="flex justify-between items-center bg-indigo-100/20 rounded-3xl p-5"
                        >
                            <div className="text-hackatonPervencheDark-400 text-2xl font-semi-bold">
                                {user.name}
                            </div>
                            <div className="text-right">
                                <div className="text-hackatonPervencheDark-400 text-2xl font-semi-bold">{user.points}</div>
                                <div className="text-black-200 text-xs">pts</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}