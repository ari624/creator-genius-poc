import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '96px', paddingTop: '64px', paddingBottom: '64px' }}>
        <h1 style={{ fontSize: '3.75rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '24px', lineHeight: '1.2' }}>
          Welcome to Creator Genius Platform
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#6b7280', maxWidth: '896px', margin: '0 auto', lineHeight: '1.75' }}>
          Three powerful systems integrated into one platform: Build your social media knowledge base,
          analyze client content patterns, and generate production-ready content blueprints.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
        <Link href="/manual" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="hover-lift" style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', height: '100%', border: '2px solid transparent', cursor: 'pointer' }}>
            <div className="gradient-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '16px', marginBottom: '32px' }}>
              <Icon name="BookOpen" size={40} className="text-white" />
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '20px' }}>
              Social Media Manual
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '32px', lineHeight: '1.75' }}>
              Your internal knowledge base about social media marketing. Transcribe videos, extract insights
              across 15 domains, and build your AI training data.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--purple-medium)', fontWeight: '600', fontSize: '1.125rem' }}>
              Get Started <Icon name="ArrowRight" size={24} style={{ marginLeft: '8px' }} />
            </div>
          </div>
        </Link>

        <Link href="/clients" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="hover-lift" style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', height: '100%', border: '2px solid transparent', cursor: 'pointer' }}>
            <div className="gradient-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '16px', marginBottom: '32px' }}>
              <Icon name="Users" size={40} className="text-white" />
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '20px' }}>
              Client Analyzer
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '32px', lineHeight: '1.75' }}>
              Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
              specific to their industry and audience.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--purple-medium)', fontWeight: '600', fontSize: '1.125rem' }}>
              Get Started <Icon name="ArrowRight" size={24} style={{ marginLeft: '8px' }} />
            </div>
          </div>
        </Link>

        <Link href="/blueprints" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="hover-lift" style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', height: '100%', border: '2px solid transparent', cursor: 'pointer' }}>
            <div className="gradient-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '16px', marginBottom: '32px' }}>
              <Icon name="FileText" size={40} className="text-white" />
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '20px' }}>
              Blueprint Generator
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '32px', lineHeight: '1.75' }}>
              Production tool for creating content. Generate idea calendars, review with swipe interface,
              and create full blueprints with scripts, captions, and B-roll prompts.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--purple-medium)', fontWeight: '600', fontSize: '1.125rem' }}>
              Get Started <Icon name="ArrowRight" size={24} style={{ marginLeft: '8px' }} />
            </div>
          </div>
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '48px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--foreground)', marginBottom: '40px' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: '#f3f0ff', color: 'var(--purple-dark)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>Build Knowledge</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.75' }}>
              Use the Social Media Manual to transcribe videos and extract insights about hooks, formats,
              algorithms, and more. Build your internal knowledge base.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: '#f3f0ff', color: 'var(--purple-dark)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>Analyze Patterns</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.75' }}>
              Use the Client Analyzer to study successful content in any niche. Extract patterns, hooks,
              and visual strategies that work for specific industries.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '50%', background: '#f3f0ff', color: 'var(--purple-dark)', fontWeight: 'bold', fontSize: '1.25rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--foreground)' }}>Generate Content</h3>
            </div>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', lineHeight: '1.75' }}>
              Use the Blueprint Generator to create production-ready content. Generate ideas, review with
              swipe interface, and output full blueprints with everything needed for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
