import { useState, useEffect } from 'preact/hooks';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  return (
    <div class="counter-display">
      {count === null ? <span aria-label="loading">…</span> : <span>{count}</span>}
    </div>
  );
}
