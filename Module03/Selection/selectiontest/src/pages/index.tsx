import { useState } from 'react';

const Domcard: [number, number][] = [
  [6, 1], [4, 3], [5, 1], [3, 4], [1, 1], [3, 4], [1, 2]
];

const Home = () => {
  const [dominoCards, setDominoCards] = useState<[number, number][]>(Domcard);
  const [inputTotal, setInputTotal] = useState<string>('');

  const countDoubleNumbers = () => dominoCards.filter(card => card[0] === card[1]).length;

  const sortDominoCards = (order: 'asc' | 'desc') => {
    setDominoCards(cards => [...cards].sort((a, b) => {
      const sumA = a[0] + a[1], sumB = b[0] + b[1];
      return order === 'asc' ? sumA - sumB : sumB - sumA;
    }));
  };

  const removeDuplicateCards = () => {
    const countMap = new Map<string, number>();
    dominoCards.forEach(card => {
      const key = `${Math.min(card[0], card[1])},${Math.max(card[0], card[1])}`;
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });
    setDominoCards(cards => cards.filter(card => countMap.get(`${Math.min(card[0], card[1])},${Math.max(card[0], card[1])}`) === 1));
  };

  const flipCards = () => setDominoCards(cards => cards.map(card => [card[1], card[0]]));

  const removeCardsByTotal = () => {
    const total = parseInt(inputTotal);
    if (!isNaN(total)) {
      setDominoCards(cards => cards.filter(card => card[0] + card[1] !== total));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start bg-white text-gray-900 p-2">
      <h1 className="text-4xl font-bold mb-8">Domino Cards</h1>

      <div className="bg-gray-100 mt-8 w-full max-w-4xl p-4 border-2 border-gray-300 rounded-md">
        <p className="font-semibold text-lg">Source</p>
        <div className="text-left">
          {Domcard.map((card, index) => (
            <span key={index} className="mr-2 text-lg">[{card[0]},{card[1]}]</span>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 mt-8 w-full max-w-4xl p-4 border-2 border-gray-300 rounded-md">
        <p className="font-semibold text-lg">Double Numbers</p>
        <span className="text-xl">{countDoubleNumbers()}</span>
      </div>

      <div className="mt-5 flex gap-4 flex-wrap">
        {dominoCards.map((card, index) => (
          <div key={index} className="w-8 h-18 bg-white border-2 border-black rounded-sm flex flex-col p-2">
            <span className="text-2xl">{card[0]}</span>
            <span className="text-xl p-1">-</span>
            <span className="text-2xl">{card[1]}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-x-4 mb-8">
        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" onClick={() => sortDominoCards('asc')}>SORT (ASC)</button>
        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" onClick={() => sortDominoCards('desc')}>SORT (DESC)</button>
        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" onClick={removeDuplicateCards}>REMOVE DUP</button>
        <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" onClick={flipCards}>FLIP</button>
      </div>

      <div className="flex items-center mb-8">
        <input
          type="number"
          value={inputTotal}
          onChange={e => setInputTotal(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={removeCardsByTotal}>Remove</button>
      </div>

      <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDominoCards(Domcard)}>Reset Data</button>
    </div>
  );
};

export default Home;
