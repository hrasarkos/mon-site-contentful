// src/app/page.tsx
import { contentfulClient } from '@/lib/contentful';

// Fonction pour récupérer les entrées depuis Contentful
async function getContentfulEntries() {
  try {
    const response = await contentfulClient.getEntries({
      // Optionnel : filtrez par type de contenu si vous avez défini un ID (ex: 'post' ou 'article')
      // content_type: 'post',
    });
    return response.items;
  } catch (error) {
    console.error('Erreur lors de la récupération des données Contentful:', error);
    return [];
  }
}

export default async function HomePage() {
  const entries = await getContentfulEntries();

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contenus issus de Contentful</h1>

      {entries.length === 0 ? (
        <p className="text-gray-500">Aucun contenu trouvé dans Contentful.</p>
      ) : (
        <ul className="space-y-4">
          {entries.map((entry) => (
            <li key={entry.sys.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">
                {(entry.fields.title as string) || (entry.fields.name as string) || 'Sans titre'}
              </h2>
              {entry.fields.description && (
                <p className="mt-2 text-gray-600">
                  {entry.fields.description as string}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}