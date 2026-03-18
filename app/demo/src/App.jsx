import { useMemo, useState } from 'react'
import './App.css'

const rangeOptions = [
  ['30d', '30d'],
  ['60d', '60d'],
  ['90d', '90d'],
  ['6m', '6m'],
  ['9m', '9m'],
  ['12m', '12m'],
]

const rangeData = {
  '30d': {
    label: 'past 30 days',
    top: { clients: 148, requests: 126, followUps: 72, clicks: 39 },
    reputation: { rating: '4.8★', totalReviews: 214, reviewsAdded: 18 },
    impact: {
      ratingShift: '4.6 → 4.8',
      ratingShiftDetail: 'Over the past 30 days',
      overallClickRate: '31%',
      overallClickRateDetail: 'Overall click rate over past 30 days',
      bestCampaign: 'Botox Follow-Up Request',
      bestCampaignDetail: 'Best click rate in this timeframe: 36%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3', '4'], values: [3, 4, 5, 6] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '23 contacts are already scheduled for automatic follow-up.',
      '7 contacts clicked the review link and were excluded from future follow-ups.',
      '2 contacts were manually opted out and will not receive future outreach.',
    ],
  },
  '60d': {
    label: 'past 60 days',
    top: { clients: 276, requests: 231, followUps: 129, clicks: 67 },
    reputation: { rating: '4.7★', totalReviews: 205, reviewsAdded: 31 },
    impact: {
      ratingShift: '4.5 → 4.7',
      ratingShiftDetail: 'Over the past 60 days',
      overallClickRate: '29%',
      overallClickRateDetail: 'Overall click rate over past 60 days',
      bestCampaign: 'Post-Visit Review Request',
      bestCampaignDetail: 'Best click rate in this timeframe: 31%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3', '4'], values: [6, 7, 8, 10] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '41 contacts are already scheduled for automatic follow-up.',
      '15 contacts clicked the review link and were excluded from future follow-ups.',
      '4 contacts were manually opted out and will not receive future outreach.',
    ],
  },
  '90d': {
    label: 'past 90 days',
    top: { clients: 398, requests: 336, followUps: 186, clicks: 94 },
    reputation: { rating: '4.7★', totalReviews: 198, reviewsAdded: 46 },
    impact: {
      ratingShift: '4.4 → 4.7',
      ratingShiftDetail: 'Over the past 90 days',
      overallClickRate: '28%',
      overallClickRateDetail: 'Overall click rate over past 90 days',
      bestCampaign: 'Laser Treatment Follow-Up',
      bestCampaignDetail: 'Best click rate in this timeframe: 33%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3'], values: [12, 15, 19] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '58 contacts are already scheduled for automatic follow-up.',
      '22 contacts clicked the review link and were excluded from future follow-ups.',
      '6 contacts were manually opted out and will not receive future outreach.',
    ],
  },
  '6m': {
    label: 'past 6 months',
    top: { clients: 742, requests: 611, followUps: 322, clicks: 161 },
    reputation: { rating: '4.6★', totalReviews: 176, reviewsAdded: 73 },
    impact: {
      ratingShift: '4.3 → 4.6',
      ratingShiftDetail: 'Over the past 6 months',
      overallClickRate: '26%',
      overallClickRateDetail: 'Overall click rate over past 6 months',
      bestCampaign: 'Post-Visit Review Request',
      bestCampaignDetail: 'Best click rate in this timeframe: 29%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3', '4', '5', '6'], values: [8, 10, 11, 13, 14, 17] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '96 contacts are already scheduled for automatic follow-up.',
      '41 contacts clicked the review link and were excluded from future follow-ups.',
      '11 contacts were manually opted out and will not receive future outreach.',
    ],
  },
  '9m': {
    label: 'past 9 months',
    top: { clients: 1041, requests: 848, followUps: 456, clicks: 224 },
    reputation: { rating: '4.6★', totalReviews: 161, reviewsAdded: 88 },
    impact: {
      ratingShift: '4.2 → 4.6',
      ratingShiftDetail: 'Over the past 9 months',
      overallClickRate: '26%',
      overallClickRateDetail: 'Overall click rate over past 9 months',
      bestCampaign: 'Laser Treatment Follow-Up',
      bestCampaignDetail: 'Best click rate in this timeframe: 30%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3'], values: [24, 29, 35] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '124 contacts are already scheduled for automatic follow-up.',
      '57 contacts clicked the review link and were excluded from future follow-ups.',
      '14 contacts were manually opted out and will not receive future outreach.',
    ],
  },
  '12m': {
    label: 'past 12 months',
    top: { clients: 1388, requests: 1112, followUps: 603, clicks: 287 },
    reputation: { rating: '4.5★', totalReviews: 143, reviewsAdded: 104 },
    impact: {
      ratingShift: '4.1 → 4.5',
      ratingShiftDetail: 'Over the past 12 months',
      overallClickRate: '26%',
      overallClickRateDetail: 'Overall click rate over past 12 months',
      bestCampaign: 'Post-Visit Review Request',
      bestCampaignDetail: 'Best click rate in this timeframe: 28%',
    },
    trend: { title: 'Reviews added by period', labels: ['1', '2', '3', '4'], values: [19, 24, 27, 34] },
    insights: [
      'Automatic follow-ups are running on all active campaigns.',
      '161 contacts are already scheduled for automatic follow-up.',
      '71 contacts clicked the review link and were excluded from future follow-ups.',
      '19 contacts were manually opted out and will not receive future outreach.',
    ],
  },
}

const contacts = [
  { name: 'Ava Thompson', service: 'HydraFacial', email: 'ava@example.com', phone: '(813) 555-0112', status: 'Review link clicked', excluded: true },
  { name: 'Mia Rodriguez', service: 'Botox consult', email: 'mia@example.com', phone: '(813) 555-0113', status: 'Auto follow-up scheduled', excluded: false },
  { name: 'Olivia Carter', service: 'Laser treatment', email: 'olivia@example.com', phone: '(813) 555-0114', status: 'Opted out manually', excluded: true },
  { name: 'Sophia Bennett', service: 'Skin tightening', email: 'sophia@example.com', phone: '(813) 555-0115', status: 'Imported', excluded: false },
  { name: 'Emma Hall', service: 'Lip filler follow-up', email: 'emma@example.com', phone: '(813) 555-0116', status: 'Review request sent', excluded: false },
]

const campaigns = [
  { name: 'Post-Visit Review Request', status: 'Active', channel: 'SMS', sent: 126, clickRate: '31%', created: 'Feb 15', description: 'General post-visit review follow-up for all services.', message: "Hi [First Name]! Thanks for visiting Luna Aesthetics. We'd love your feedback - takes just 30 seconds: [Review Link]" },
  { name: 'Botox Follow-Up Request', status: 'Draft', channel: 'Email/SMS', sent: 42, clickRate: '36%', created: 'Mar 02', description: 'Targeted review request for Botox consult follow-ups.', message: "Hi [First Name], just checking in after your Botox consult at Luna Aesthetics. Happy with the results? Leave us a quick review here: [Review Link]" },
  { name: 'Laser Treatment Follow-Up', status: 'Paused', channel: 'Email', sent: 36, clickRate: '33%', created: 'Jan 28', description: 'Higher-intent review follow-up for laser treatment clients.', message: "Hi [First Name], hope you're loving your results from the laser treatment at Luna Aesthetics! We'd appreciate a quick review: [Review Link]" },
  { name: 'Facial Loyalty Check-In', status: 'Archived', channel: 'Email', sent: 61, clickRate: '24%', created: 'Nov 09', description: 'Legacy campaign retained for history and comparison.', message: "Hi [First Name]! It's been a while since your facial at Luna Aesthetics. We'd love to hear your thoughts - a quick review helps us improve: [Review Link]" },
]

const steps = [
  { title: 'Welcome', text: 'This preview shows how a med spa can upload recent clients, send review requests, follow up automatically, and keep the workflow simple.', tab: 'dashboard' },
  { title: 'Review link', text: 'Start by saving your Google review link so every request points clients to the right destination.', tab: 'settings' },
  { title: 'Contacts', text: 'Upload recent clients manually or by CSV. The product is built to keep review follow-up lightweight.', tab: 'contacts' },
  { title: 'Campaigns', text: 'View all campaigns, compare performance, and manage the selected campaign details below.', tab: 'campaigns' },
  { title: 'Results', text: 'Track imported clients, sends, follow-ups, clicks, and reputation growth over time.', tab: 'dashboard' },
]

function Metric({ label, value, accent }) {
  return (
    <div className="metric-card">
      <div className="metric-value" style={accent ? { color: accent } : undefined}>{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('dashboard')
  const [tourOpen, setTourOpen] = useState(true)
  const [tourStep, setTourStep] = useState(0)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0].name)
  const [darkMode, setDarkMode] = useState(false)

  const activeTour = useMemo(() => steps[tourStep], [tourStep])
  const data = rangeData[timeRange]
  const campaign = campaigns.find((c) => c.name === selectedCampaign) || campaigns[0]

  function nextTour() {
    if (tourStep < steps.length - 1) {
      const next = tourStep + 1
      setTourStep(next)
      setTab(steps[next].tab)
    } else {
      setTourOpen(false)
    }
  }

  function startTour() {
    setTourOpen(true)
    setTourStep(0)
    setTab(steps[0].tab)
  }

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <aside className="sidebar">
        <div className="brand-card">
          <div className="brand-badge">Demo account</div>
          <h1>Luna Aesthetics</h1>
          <p>Med spa review follow-up for Google reviews.</p>
        </div>

        <nav className="nav-stack">
          {[
            ['dashboard', 'Dashboard'],
            ['settings', 'Review Settings'],
            ['contacts', 'Contacts'],
            ['campaigns', 'Campaigns'],
            ['activity', 'Activity'],
          ].map(([key, label]) => (
            <button key={key} className={`nav-btn ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </nav>

        <button className="tour-btn" onClick={startTour}>Restart product tour</button>

        <label className="theme-switch">
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode((v) => !v)} />
          <span className="theme-slider"></span>
          <span className="theme-label">Dark mode</span>
        </label>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">Interactive preview</div>
            <h2>MedSpa Review Follow-Up</h2>
          </div>
          <div className="account-chip">Luna Aesthetics Med Spa</div>
        </header>

        {tab === 'dashboard' && (
          <section className="view-grid">
            <div className="hero-panel">
              <div>
                <div className="eyebrow">Snapshot</div>
                <h3>Keep review requests simple</h3>
                <p>Upload recent clients, send requests, follow up automatically, and avoid paying for a bloated review platform.</p>
              </div>
              <div className="hero-actions">
                <button className="primary">Create Campaign</button>
                <button className="secondary">Import Clients</button>
              </div>
            </div>

            <div className="metrics-grid">
              <Metric label={`${data.label} clients imported`} value={data.top.clients} accent="#8b5cf6" />
              <Metric label={`${data.label} requests sent`} value={data.top.requests} accent={darkMode ? '#ffffff' : '#0f172a'} />
              <Metric label={`${data.label} follow-ups sent`} value={data.top.followUps} accent="#db2777" />
              <Metric label={`${data.label} review clicks`} value={data.top.clicks} accent="#059669" />
            </div>

            <div className="reputation-grid">
              <div className="panel reputation-panel">
                <div className="panel-head panel-head-stack">
                  <div>
                    <h3>Google Reputation Snapshot</h3>
                    <p>Track reputation movement over a selected time window.</p>
                  </div>
                  <div className="range-tabs">
                    {rangeOptions.map(([value, label]) => (
                      <button key={value} className={`range-tab ${timeRange === value ? 'active' : ''}`} onClick={() => setTimeRange(value)}>{label}</button>
                    ))}
                  </div>
                </div>

                <div className="reputation-stats">
                  <div><strong>{data.reputation.rating}</strong><span>Current rating</span></div>
                  <div><strong>{data.reputation.totalReviews}</strong><span>Total reviews</span></div>
                  <div><strong>+{data.reputation.reviewsAdded}</strong><span>Reviews added</span></div>
                </div>

                <div className="growth-chart-wrap">
                  <div className="growth-chart-title">{data.trend.title}</div>
                  <div className="trend-grid">
                    {data.trend.values.map((value, i) => (
                      <div key={i} className="trend-card">
                        <strong>+{value}</strong>
                        <span>{data.trend.labels[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel reputation-panel">
                <div className="panel-head"><h3>Business Impact</h3></div>
                <div className="impact-list">
                  <div><strong>{data.impact.ratingShift}</strong><span>{data.impact.ratingShiftDetail}</span></div>
                  <div><strong>{data.impact.overallClickRate}</strong><span>{data.impact.overallClickRateDetail}</span></div>
                  <div><strong>{data.impact.bestCampaign}</strong><span>{data.impact.bestCampaignDetail}</span></div>
                </div>
              </div>
            </div>

            <div className="panel wide">
              <div className="panel-head"><h3>Current campaign</h3><span className="pill active-pill">Active</span></div>
              <div className="campaign-and-actions">
                <div className="campaign-card">
                  <strong>{campaign.name}</strong>
                  <p>{campaign.description}</p>
                  <div className="mini-stats">
                    <span>{campaign.sent} sent</span>
                    <span>{campaign.clickRate} click rate</span>
                    <span>Auto follow-up on</span>
                  </div>
                </div>
                <div className="actions-card">
                  <h4>Campaign Insights</h4>
                  <ul>{data.insights.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'settings' && (
          <section className="panel-stack"><div className="panel"><div className="panel-head"><h3>Review Settings</h3></div><div className="form-grid"><label><span>Business name</span><input value="Luna Aesthetics Med Spa" readOnly /></label><label><span>Google review link</span><input value="https://g.page/r/example/review" readOnly /></label><label><span>Default sender name</span><input value="Luna Aesthetics" readOnly /></label><label><span>Default follow-up delay</span><input value="3 days" readOnly /></label></div></div></section>
        )}

        {tab === 'contacts' && (
          <section className="panel-stack"><div className="panel"><div className="panel-head"><h3>Recent Clients</h3><div className="hero-actions"><button className="secondary">CSV Import</button><button className="primary">Add Manually</button></div></div><div className="table-wrap"><table><thead><tr><th>Name</th><th>Service</th><th>Email</th><th>Phone</th><th>Status</th><th>Excluded?</th></tr></thead><tbody>{contacts.map((c) => <tr key={c.email} className={c.excluded ? 'row-excluded' : ''}><td>{c.name}</td><td>{c.service}</td><td>{c.email}</td><td>{c.phone}</td><td><span className="pill">{c.status}</span></td><td>{c.excluded ? 'Yes' : 'No'}</td></tr>)}</tbody></table></div></div></section>
        )}

        {tab === 'campaigns' && (
          <section className="panel-stack">
            <div className="panel">
              <div className="panel-head"><h3>Campaigns</h3><button className="primary">Create New Campaign</button></div>
              <div className="campaign-scroll-row">
                {campaigns.map((c) => (
                  <button key={c.name} className={`campaign-scroll-card ${selectedCampaign === c.name ? 'selected' : ''}`} onClick={() => setSelectedCampaign(c.name)}>
                    <span className="campaign-title">{c.name}</span>
                    <span>{c.status}</span>
                    <span>{c.channel}</span>
                    <span>{c.sent} sent</span>
                    <span>{c.clickRate}</span>
                  <div className="scroll-actions">
                      <span title={c.status === 'Active' ? 'Pause campaign' : 'Activate campaign'} className="action-icon">{c.status === 'Active' ? '⏸' : '▶'}</span>
                      <span title="Archive campaign" className="action-icon">📁</span>
                      <span title="Delete campaign" className="action-icon">✕</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="panel selected-campaign-panel">
                <div className="panel-head"><h3>{campaign.name}</h3><span className="pill">{campaign.status}</span></div>
                <div className="form-grid">
                  <label><span>Template library</span><input value="Med spa post-visit request" readOnly /></label>
                  <label><span>Brand tone</span><input value="Professional + warm" readOnly /></label>
                  <label><span>Campaign name</span><input value={campaign.name} readOnly /></label>
                  <label><span>Channel</span><input value={campaign.channel} readOnly /></label>
                  <label><span>Created</span><input value={campaign.created} readOnly /></label>
                  <label><span>Click rate</span><input value={campaign.clickRate} readOnly /></label>
                  <label className="full"><span>Message</span><textarea readOnly value={campaign.message} /></label>
                  <label><span>Follow-up delay</span><input value="3 days" readOnly /></label>
                  <label><span>Automation</span><input value="Automatic follow-up enabled" readOnly /></label>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 'activity' && (
          <section className="panel-stack"><div className="panel"><div className="panel-head"><h3>Recent Activity</h3></div><div className="activity-list"><div className="activity-item"><strong>Review request sent</strong><span>Ava Thompson · 2 hours ago</span></div><div className="activity-item"><strong>Follow-up scheduled automatically</strong><span>Mia Rodriguez · 1 day ago</span></div><div className="activity-item"><strong>Review link clicked</strong><span>Olivia Carter · 1 day ago</span></div><div className="activity-item"><strong>Clients imported</strong><span>42 new contacts · 2 days ago</span></div></div></div></section>
        )}
      </main>

      {tourOpen && <div className="tour-overlay"><div className="tour-card"><div className="eyebrow">Product tour</div><h3>{activeTour.title}</h3><p>{activeTour.text}</p><div className="tour-actions"><button className="secondary" onClick={() => setTourOpen(false)}>Close</button><button className="primary" onClick={nextTour}>{tourStep === steps.length - 1 ? 'Finish' : 'Next'}</button></div></div></div>}
    </div>
  )
}
