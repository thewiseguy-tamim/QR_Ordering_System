import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Page not found</h2>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/menu" className="inline-block mt-3 border border-gray-200 px-3 py-2 rounded-lg">Go to Menu</Link>
    </div>
  );
}