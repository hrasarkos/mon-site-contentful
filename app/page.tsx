import { Suspense } from 'react';
import { contentfulClient } from '@/lib/contentful';

async function ContentfulEntriesList() {
  try {
    const response = await contentfulClient.getEntries();
    const entries = response.items;

    if (entries.length === 0) {
      return <p className="text-gray-500">Aucun contenu trouvé dans Contentful.</p>;
    }

    return (
      <ul className="space-y-4">
        {entries.map((entry) => (
          <li key={entry.sys.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">
              {(entry.fields.title as string) || (entry.fields.name as string) || 'Sans titre'}
            </h2>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error('Erreur Contentful:', error);
    return <p className="text-red-500">Erreur lors du chargement des données Contentful.</p>;
  }
}

export default function HomePage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mon site avec Contentful</h1>
      
      <Suspense fallback={<p className="text-gray-400">Chargement des contenus...</p>}>
        <ContentfulEntriesList />
      </Suspense>
    </main>
  );
}