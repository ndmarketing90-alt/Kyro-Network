import React from 'react';
import { 
  Instagram, 
  Send, 
  MessageSquare, 
  Globe, 
  CheckCircle2, 
  ArrowUpRight,
  ShoppingBag,
  Sparkles
} from 'lucide-react';

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#050505',
    color: '#FFFFFF',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    boxSizing: 'border-box'
  },
  container: {
    width: '100%',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: '32px'
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: '16px'
  },
  avatar: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    border: '2px solid #1A1A1E',
    objectFit: 'cover',
    backgroundColor: '#111'
  },
  badge: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    backgroundColor: '#000',
    borderRadius: '50%',
    padding: '2px'
  },
  brandNameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '4px'
  },
  brandName: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  handle: {
    fontSize: '13px',
    color: '#66666E',
    marginBottom: '12px',
    fontWeight: '500'
  },
  bio: {
    fontSize: '14px',
    color: '#9999A3',
    lineHeight: '1.5',
    maxWidth: '320px',
    margin: '0 auto'
  },
  linksSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px'
  },
  buttonLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0D0D11',
    border: '1px solid #141418',
    borderRadius: '16px',
    padding: '16px 20px',
    color: '#FFFFFF',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer'
  },
  buttonLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  buttonText: {
    fontSize: '14px',
    fontWeight: '600'
  },
  lookbookHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
    borderTop: '1px solid #141418',
    paddingTop: '32px'
  },
  lookbookTitle: {
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#FFF',
    textTransform: 'uppercase'
  },
  grid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px'
  },
  gridItem: {
    aspectRatio: '1/1',
    borderRadius: '8px',
    backgroundColor: '#0D0D11',
    border: '1px solid #141418',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  footer: {
    marginTop: '48px',
    fontSize: '11px',
    color: '#333339',
    letterSpacing: '1.5px'
  }
};

export default function Template() {
  // Mock data for the template layout - buyers can change these easily
  const templateData = {
    brandName: "KYRO STUDIO",
    handle: "@kyro.network",
    bio: "Minimalist streetwear and curated aesthetics. Crafted for the quiet workers.",
    avatarUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=200&auto=format&fit=crop",
    links: [
      { id: 1, label: "Order via WhatsApp", url: "#", icon: <MessageSquare size={18} color="#A3A3AA" /> },
      { id: 2, label: "Browse Instagram Catalog", url: "#", icon: <Instagram size={18} color="#A3A3AA" /> },
      { id: 3, label: "Join the Telegram Channel", url: "#", icon: <Send size={18} color="#A3A3AA" /> },
      { id: 4, label: "Official Website", url: "#", icon: <Globe size={18} color="#A3A3AA" /> }
    ],
    products: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop"
    ]
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        {/* PROFILE HEADER */}
        <header style={styles.profileHeader}>
          <div style={styles.avatarContainer}>
            <img src={templateData.avatarUrl} alt="Brand Avatar" style={styles.avatar} />
            <div style={styles.badge}>
              <CheckCircle2 size={14} color="#000" fill="#FFF" />
            </div>
          </div>
          <div style={styles.brandNameRow}>
            <h1 style={styles.brandName}>{templateData.brandName}</h1>
          </div>
          <div style={styles.handle}>{templateData.handle}</div>
          <p style={styles.bio}>{templateData.bio}</p>
        </header>

        {/* LINKS BUTTONS */}
        <section style={styles.linksSection}>
          {templateData.links.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              style={styles.buttonLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#121217';
                e.currentTarget.style.borderColor = '#24242A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0D0D11';
                e.currentTarget.style.borderColor = '#141418';
              }}
            >
              <div style={styles.buttonLeft}>
                {link.icon}
                <span style={styles.buttonText}>{link.label}</span>
              </div>
              <ArrowUpRight size={14} color="#44444F" />
            </a>
          ))}
        </section>

        {/* FEATURED LOOKBOOK / PRODUCTS GRID */}
        <div style={styles.lookbookHeader}>
          <ShoppingBag size={14} color="#FFF" />
          <h2 style={styles.lookbookTitle}>Featured Lookbook</h2>
        </div>

        <section style={styles.grid}>
          {templateData.products.map((img, idx) => (
            <div key={idx} style={styles.gridItem}>
              <img src={img} alt={`Product ${idx + 1}`} style={styles.gridImage} />
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          © {new Date().getFullYear()} KYRO DESIGNED
        </footer>

      </div>
    </div>
  );
}
