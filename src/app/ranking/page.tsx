"use client";
import { useEffect, useState } from 'react';
import "tailwindcss";

type User = {
    id: number;
    name: string;
    points: number;
};

export default function InternationalRanking() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('');
                const data = await response.json();
                // Tri des utilisateurs par points (ordre décroissant)
                const sortedUsers = data.sort((a: User, b: User) => b.points - a.points);
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

    // Fonction pour formater le rang (1er, 2ème, 3ème, etc.)
    const formatRank = (index: number) => {
        const rank = index + 1;
        if (rank === 1) return "1er";
        return `${rank}ème`;
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Classement International</h2>
            
            {/* Affichage des états */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin h-6 w-6 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center mb-4">
                    {error}
                </div>
            )}

            {/* Liste des joueurs */}
            {!loading && !error && (
                <div className="space-y-3">
                    {users.length === 0 ? (
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                            Aucun joueur dans le classement
                        </div>
                    ) : (
                        users.map((user, index) => (
                            <div 
                                key={user.id} 
                                className="flex justify-between items-center bg-indigo-100 rounded-2xl p-4"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-indigo-700 font-medium">{formatRank(index)}</span>
                                    <span className="font-semibold text-lg">{user.name}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-xl">{user.points}</div>
                                    <div className="text-xs text-indigo-500">pts</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}