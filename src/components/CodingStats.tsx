import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface Language {
  name: string;
  percent: number;
  color: string;
}

interface WakatimeStats {
  data: Language[];
}

const CodingStats = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWakatimeStats = async () => {
      try {
        const response = await fetch('https://wakatime.com/share/@decentparadox/4b7fa5d3-fda3-4287-8405-7525505fb30c.json');
        const data: WakatimeStats = await response.json();

        // Get top 5 languages (excluding "Other" category)
        const topLanguages = data.data
          .filter(lang => lang.name !== 'Other')
          .slice(0, 5);

        setLanguages(topLanguages);
      } catch (err) {
        setError('Failed to fetch coding stats');
      } finally {
        setLoading(false);
      }
    };

    fetchWakatimeStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-75">Top languages from the last 7 days</p>
          <p className="text-sm opacity-75">by WakaTime</p>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-50">{index + 1}.</span>
                <Skeleton className="w-16 h-4" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-foreground opacity-60" />
                <Skeleton className="w-12 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-sm opacity-75">{error}</p>
      </div>
    );
  }

  if (languages.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-sm opacity-75">No coding stats available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm opacity-75">Top languages from the last 7 days</p>
          <p className="text-sm opacity-75">by WakaTime</p>
        </div>
      <div className="space-y-1">
        {languages.map((lang, index) => (
          <div key={lang.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs opacity-50">{index + 1}.</span>
              <span className="font-medium">{lang.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-foreground opacity-60" > </div>
              <span className="text-sm opacity-75">{lang.percent.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingStats;
