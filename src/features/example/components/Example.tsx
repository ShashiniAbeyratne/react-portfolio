import { useExample } from '../hooks/useExample'

export function ExampleComponent() {
  const { count, increment } = useExample()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
