import { useState, useEffect } from 'react';
import { plants } from '../data/plants';

type StockKey = `${string}-${string}`; // Type for composite key of name-mutation

export default function Home() {
    const [stocks, setStocks] = useState<Record<StockKey, number>>(() => {
        const savedStocks = localStorage.getItem('plantStocks');
        return savedStocks ? JSON.parse(savedStocks) : {};
    });

    useEffect(() => {
        localStorage.setItem('plantStocks', JSON.stringify(stocks));
    }, [stocks]);

    const getStockKey = (name: string, mutation: string): StockKey => `${name}-${mutation}`;

    const incrementStock = (name: string, mutation: string) => {
        const key = getStockKey(name, mutation);
        setStocks(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    };

    const decrementStock = (name: string, mutation: string) => {
        const key = getStockKey(name, mutation);
        setStocks(prev => ({ 
            ...prev, 
            [key]: Math.max(0, (prev[key] || 0) - 1) 
        }));
    };

    const resetAll = () => {
        setStocks({});
    };

    const getCycleInfo = () => {
        const missingPlants = plants.filter(plant => {
            const key = getStockKey(plant.name, plant.mutation);
            return !stocks[key] || stocks[key] === 0;
        });
        const hasCompleteCycle = missingPlants.length === 0;
        const totalHoney = plants.reduce((sum, plant) => {
            const key = getStockKey(plant.name, plant.mutation);
            return sum + (plant.honey * (stocks[key] || 0));
        }, 0);
        
        const cycleCount = hasCompleteCycle 
            ? Math.min(...plants.map(plant => {
                const key = getStockKey(plant.name, plant.mutation);
                return stocks[key] || 0;
            }))
            : 0;

        return {
            hasCompleteCycle,
            missingPlants,
            totalHoney,
            cycleCount
        };
    };

    const removeCycle = () => {
        const canRemove = plants.every(p => {
            const key = getStockKey(p.name, p.mutation);
            return (stocks[key] || 0) > 0;
        });
    
        if (!canRemove) return;
    
        const updatedStocks = plants.reduce((acc, plant) => {
            const key = getStockKey(plant.name, plant.mutation);
            acc[key] = (stocks[key] || 0) - 1;
            return acc;
        }, {} as Record<StockKey, number>);
    
        setStocks(updatedStocks);
    };
    
    return (
        <section id="Home" className="flex min-h-screen justify-center items-center p-4">
            <div className="flex gap-6 w-full max-w-7xl">
                <div className="flex-1 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <img 
                                src="/assets/logo.png" 
                                alt="Grow a Garden" 
                                className="h-12 w-auto"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Honey Crafting Tracker</h1>
                                <h3 className="text-md text-gray-500">Made with &lt;3 by cedrugs</h3>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/Cedrugs/growagarden-honey-crafting-tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                Star on GitHub
                            </a>
                            <button
                                onClick={resetAll}
                                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer"
                            >
                                Reset All
                            </button>
                            <button
                                onClick={removeCycle}
                                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
                            >
                                Finish 1 Cycle
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-3 max-h-[70vh] overflow-auto pr-2">
                            {plants.map((p) => {
                                const key = getStockKey(p.name, p.mutation);
                                return (
                                    <li
                                        key={key}
                                        className="flex items-center p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors duration-200"
                                    >
                                        <div className="flex items-center mr-4">
                                            <button
                                                onClick={() => decrementStock(p.name, p.mutation)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </button>
                                            <span className="mx-3 w-8 text-center font-medium text-gray-700">
                                                {stocks[key] || 0}
                                            </span>
                                            <button
                                                onClick={() => incrementStock(p.name, p.mutation)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-600 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                            </button>
                                        </div>
                                        <img src={p.icon} alt={p.name} className="h-10 w-10 mr-4" />
                                        <span className="flex-1 font-medium text-gray-800">{p.name}</span>
                                        <div className="flex items-center space-x-3">
                                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                                                🍯 {p.honey}
                                            </span>
                                            <span
                                                className={`px-3 py-1 text-sm font-medium rounded-full ${
                                                    p.mutation === 'Pollinated'
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-amber-50 text-amber-700'
                                                }`}
                                            >
                                                {p.mutation}
                                            </span>
                                            <span className="font-mono text-gray-600">{p.weight} kg</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="w-80 bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)] flex flex-col">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800">Cycle Summary</h2>
                    </div>
                    <div className="p-6 flex flex-col gap-4 h-full overflow-hidden">
                        {(() => {
                            const { hasCompleteCycle, missingPlants, totalHoney, cycleCount } = getCycleInfo();
                            return (
                                <>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Total Honey:</span>
                                            <span className="font-medium text-amber-600">🍯 {totalHoney}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Available Cycle(s):</span>
                                            <span
                                                className={`font-medium ${
                                                    hasCompleteCycle ? 'text-emerald-600' : 'text-red-600'
                                                }`}
                                            >
                                                {hasCompleteCycle ? cycleCount : '0'}
                                            </span>
                                        </div>
                                    </div>

                                    {!hasCompleteCycle && (
                                        <div className="flex-1 mt-2 overflow-y-auto pr-4">
                                            <h3 className="font-medium text-gray-600 mb-4">Missing Plants:</h3>
                                            {missingPlants.length === plants.length ? (
                                                <p className="text-sm text-gray-600">All plants are missing</p>
                                            ) : (
                                                <ul className="space-y-3 pb-2">
                                                    {missingPlants.map(plant => {
                                                        const key = getStockKey(plant.name, plant.mutation);
                                                        return (
                                                            <li
                                                                key={key}
                                                                className="flex flex-col gap-1 p-2 text-sm border rounded-lg border-gray-100 hover:border-gray-200 transition-colors duration-200 cursor-default"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <img src={plant.icon} alt={plant.name} className="h-6 w-6" />
                                                                    <span className="font-medium text-gray-800">{plant.name}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2 ml-8">
                                                                    <span
                                                                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                                                            plant.mutation === 'Pollinated'
                                                                                ? 'bg-emerald-50 text-emerald-700'
                                                                                : 'bg-amber-50 text-amber-700'
                                                                        }`}
                                                                    >
                                                                        {plant.mutation}
                                                                    </span>
                                                                    <span className="text-gray-600 font-mono">{plant.weight} kg</span>
                                                                </div>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </section>
    )
}