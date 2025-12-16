'use client';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF6E5' }}>
      <main className="min-h-screen w-full max-w-6xl mx-auto flex flex-col items-center justify-center py-32 px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold" style={{ color: '#5D4037' }}>
            Welcome to Learn-Up
          </h1>
          <p className="max-w-md text-lg leading-8" style={{ color: '#5D4037', opacity: 0.7 }}>
            Your journey to learning starts here. Explore our courses and enhance your skills with expert instructors.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors md:w-[158px]"
            style={{ 
              backgroundColor: '#FFB6C1',
              color: '#5D4037',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD6A5'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFB6C1'}
            href="/signup"
          >
            Get Started
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border px-5 transition-colors md:w-[158px]"
            style={{ 
              borderColor: '#CDB4DB',
              color: '#5D4037',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#A8E6CF';
              e.currentTarget.style.borderColor = '#A8E6CF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#CDB4DB';
            }}
            href="/login"
          >
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
