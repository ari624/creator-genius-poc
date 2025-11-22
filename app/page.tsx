import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function HomePage() {
  return (
    <div className="container section">
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-lg)' }}>
          Creator Genius Platform
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--foreground-light)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.75'
        }}>
          Three powerful systems integrated into one platform: Build your social media knowledge base,
          analyze client content patterns, and generate production-ready content blueprints.
        </p>
      </div>

      {/* Three Systems */}
      <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-3xl)' }}>
        <Link href="/manual">
          <div className="card hover-lift" style={{ height: '100%', cursor: 'pointer' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Icon name="BookOpen" size={32} className="text-white" />
            </div>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
              Social Media Manual
            </h3>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              Your internal knowledge base about social media marketing. Transcribe videos, extract insights
              across 15 domains, and build your AI training data.
            </p>
            <div className="btn btn-secondary" style={{ display: 'inline-flex' }}>
              Get Started
              <Icon name="ArrowRight" size={20} />
            </div>
          </div>
        </Link>

        <Link href="/clients">
          <div className="card hover-lift" style={{ height: '100%', cursor: 'pointer' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Icon name="Users" size={32} className="text-white" />
            </div>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
              Client Analyzer
            </h3>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              Analyze any client's content in their niche. Extract patterns, hooks, and visual strategies
              specific to their industry and audience.
            </p>
            <div className="btn btn-secondary" style={{ display: 'inline-flex' }}>
              Get Started
              <Icon name="ArrowRight" size={20} />
            </div>
          </div>
        </Link>

        <Link href="/blueprints">
          <div className="card hover-lift" style={{ height: '100%', cursor: 'pointer' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <Icon name="FileText" size={32} className="text-white" />
            </div>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
              Blueprint Generator
            </h3>
            <p style={{ marginBottom: 'var(--spacing-lg)' }}>
              Production tool for creating content. Generate idea calendars, review with swipe interface,
              and create full blueprints with scripts, captions, and B-roll prompts.
            </p>
            <div className="btn btn-secondary" style={{ display: 'inline-flex' }}>
              Get Started
              <Icon name="ArrowRight" size={20} />
            </div>
          </div>
        </Link>
      </div>

      {/* Workflow Overview */}
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          How It Works
        </h2>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginBottom: 'var(--spacing-lg)'
            }}>
              1
            </div>
            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>
              Build Knowledge
            </h4>
            <p>
              Use the Social Media Manual to transcribe videos and extract insights about hooks, formats,
              algorithms, and more. Build your internal knowledge base.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginBottom: 'var(--spacing-lg)'
            }}>
              2
            </div>
            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>
              Analyze Patterns
            </h4>
            <p>
              Use the Client Analyzer to study successful content in any niche. Extract patterns, hooks,
              and visual strategies that work for specific industries.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginBottom: 'var(--spacing-lg)'
            }}>
              3
            </div>
            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>
              Generate Content
            </h4>
            <p>
              Use the Blueprint Generator to create production-ready content. Generate ideas, review with
              swipe interface, and output full blueprints with everything needed for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
