import { useState, useEffect } from 'preact/hooks';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // this runs in the browser only
    fetch('/api/visitor-count')
      .then((res) => res.json())
      .then((json) => setCount(json.count))
      .catch(() => setCount(0));
  }, []);

  return (
    <div class="counter-display">
      {count === null ? <span aria-label="loading">…</span> : <span>{count}</span>}
    </div>
  );
}
