'use client';

export default function Streak({streak} : {streak: number}) {

    return (
        <div className="p-3 flex flex-1 justify-around items-center">
            <p className={`text-4xl text-text-color`}>streak:{streak}</p>
        </div>
    );
}