import HeroSection from '@/components/HeroSection';
import PlanetSection from '@/components/PlanetSection';
import Footer from '@/components/Footer';

const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    description: 'The smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets.',
    color: '#a3a3a3', // Zinc 400
    size: 0.38,
    distance: '57.9 million km',
    type: 'Terrestrial',
    facts: [
      'Has no moons or rings.',
      'Experiences extreme temperature fluctuations, from 430°C during the day to -180°C at night.',
      'Its surface is heavily cratered, resembling Earth\'s Moon.',
    ],
  },
  {
    id: 'venus',
    name: 'Venus',
    description: 'The second planet from the Sun. It is sometimes called Earth\'s "sister" or "twin" planet as it is almost as large and has a similar composition.',
    color: '#fbbf24', // Amber 400
    size: 0.95,
    distance: '108.2 million km',
    type: 'Terrestrial',
    facts: [
      'The hottest planet in our solar system, with a surface temperature of 465°C.',
      'Spins in the opposite direction to most other planets.',
      'Has a thick, toxic atmosphere filled with carbon dioxide and clouds of sulfuric acid.',
    ],
  },
  {
    id: 'earth',
    name: 'Earth',
    description: 'The third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth\'s surface is land consisting of continents and islands.',
    color: '#3b82f6', // Blue 500
    size: 1,
    distance: '149.6 million km',
    type: 'Terrestrial',
    facts: [
      'The only planet known to support life.',
      'Has one natural satellite, the Moon.',
      'Its atmosphere is composed mostly of nitrogen (78%) and oxygen (21%).',
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    description: 'The fourth planet from the Sun. It is a dusty, cold, desert world with a very thin atmosphere. It is also a dynamic planet with seasons, polar ice caps, canyons, and extinct volcanoes.',
    color: '#ef4444', // Red 500
    size: 0.53,
    distance: '227.9 million km',
    type: 'Terrestrial',
    facts: [
      'Known as the Red Planet due to iron oxide (rust) on its surface.',
      'Home to Olympus Mons, the largest volcano in the solar system.',
      'Has two small moons, Phobos and Deimos.',
    ],
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    description: 'The fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined.',
    color: '#f59e0b', // Amber 500
    size: 2.5, // Scaled down for visual balance, actual is ~11x Earth
    distance: '778.5 million km',
    type: 'Gas Giant',
    facts: [
      'The largest planet in our solar system.',
      'Its Great Red Spot is a giant storm that has been raging for hundreds of years.',
      'Has 95 recognized moons, including Ganymede, the largest moon in the solar system.',
    ],
  },
  {
    id: 'saturn',
    name: 'Saturn',
    description: 'The sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth.',
    color: '#eab308', // Yellow 500
    size: 2.2, // Scaled down
    distance: '1.4 billion km',
    type: 'Gas Giant',
    facts: [
      'Famous for its spectacular ring system, made of ice and rock.',
      'The least dense planet in the solar system; it could float in water.',
      'Has 146 recognized moons, more than any other planet.',
    ],
  },
  {
    id: 'uranus',
    name: 'Uranus',
    description: 'The seventh planet from the Sun. Its name is a reference to the Greek god of the sky, Uranus. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.',
    color: '#06b6d4', // Cyan 500
    size: 1.8, // Scaled down
    distance: '2.9 billion km',
    type: 'Ice Giant',
    facts: [
      'Rotates on its side, likely due to a massive collision in its past.',
      'The coldest planet in the solar system, with temperatures dropping to -224°C.',
      'Has 28 known moons and a faint ring system.',
    ],
  },
  {
    id: 'neptune',
    name: 'Neptune',
    description: 'The eighth and farthest-known Solar planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.',
    color: '#2563eb', // Blue 600
    size: 1.7, // Scaled down
    distance: '4.5 billion km',
    type: 'Ice Giant',
    facts: [
      'The most distant planet from the Sun.',
      'Has the strongest winds in the solar system, reaching speeds of over 2,000 km/h.',
      'Its blue color is due to the absorption of red light by methane in its atmosphere.',
    ],
  },
];

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <HeroSection />
      
      <div className="relative z-10">
        {planets.map((planet, index) => (
          <PlanetSection
            key={planet.id}
            index={index}
            {...planet}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}
