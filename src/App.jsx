import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Home, 
  Search, 
  PlusSquare, 
  User, 
  Heart, 
  MessageCircle, 
  CheckCircle2, 
  LogOut, 
  Edit3 
} from 'lucide-react';

// ================= ARCHITECTURAL ARCHIVE LUXURY STYLES =================
const styles = {
  appContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#070708', color: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', letterSpacing: '-0.01em' },
  sidebar: { width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0, borderRight: '1px solid #141416', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', backgroundColor: '#070708', zIndex: 10 },
  logo: { fontSize: '16px', fontWeight: '900', letterSpacing: '4px', marginBottom: '50px', paddingLeft: '10px', cursor: 'pointer', color: '#FFF' },
  navLinks: { display: 'flex', flexDirection: 'column', gap: '8px' },
  navText: { fontSize: '13px', fontWeight: '500', letterSpacing: '0.5px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '18px', padding: '14px 12px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease' },
  profileLink: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', border: '1px solid #141416', borderRadius: '16px', marginTop: 'auto', cursor: 'pointer', backgroundColor: '#0D0D0F' },
  miniAvatar: { width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold', color: '#A0A0A0' },
  miniAvatarImg: { width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' },
  mainContent: { marginLeft: '250px', flex: 1, display: 'flex', justifyContent: 'center', paddingTop: '50px', minWidth: '0', paddingBottom: '80px' },
  mainContentPanels: { marginLeft: '250px', flex: 1, display: 'flex', justifyContent: 'center', paddingTop: '60px', minWidth: '0', paddingBottom: '80px' },
  feedContainer: { width: '100%', maxWidth: '580px', padding: '0 20px' },
  loaderSpinnerBox: { fontSize: '10px', letterSpacing: '3px', color: '#808080', textAlign: 'center', marginTop: '140px', fontWeight: '700' },
  postCard: { border: '1px solid #141416', backgroundColor: '#0D0D0F', borderRadius: '24px', marginBottom: '35px', paddingBottom: '16px', overflow: 'hidden' },
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  brandAvatar: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#FFF', border: '1px solid #242428' },
  usernameRow: { display: 'flex', alignItems: 'center', gap: '6px' },
  username: { fontSize: '13px', fontWeight: '600', color: '#FFF', letterSpacing: '-0.1px' },
  badgeVerify: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  location: { fontSize: '11px', color: '#6A6A70', display: 'block', marginTop: '2px' },
  mediaContainer: { display: 'flex', backgroundColor: '#000', margin: '0 12px', borderRadius: '16px', overflow: 'hidden' },
  postImage: { width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover', display: 'block' },
  actionRow: { display: 'flex', padding: '16px 20px 8px 20px', gap: '20px' },
  iconActionBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer', opacity: 0.85 },
  likesSection: { padding: '0 20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#FFF', letterSpacing: '0.2px', textTransform: 'uppercase' },
  captionSection: { padding: '0 20px', fontSize: '13.5px', lineHeight: '1.5', marginBottom: '12px', color: '#A0A0A0' },
  boldUser: { fontWeight: '700', marginRight: '8.5px', cursor: 'pointer', color: '#FFF' },
  captionText: { color: '#D4D4D8' },
  commentsBoxHarness: { margin: '12px 20px 4px 20px', borderTop: '1px solid #141416', paddingTop: '14px' },
  commentsListingArea: { display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', marginBottom: '14px' },
  singleCommentRow: { fontSize: '12.5px', lineHeight: '1.4' },
  commentInputRow: { display: 'flex', gap: '12px', border: '1px solid #141416', borderRadius: '14px', padding: '8px 14px', backgroundColor: '#070708', alignItems: 'center' },
  inlineCommentInput: { flex: 1, background: 'none', border: 'none', color: '#FFF', fontSize: '13px', outline: 'none' },
  postCommentBtn: { background: 'none', border: 'none', color: '#FFF', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' },
  searchBarInput: { width: '100%', backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '16px', padding: '16px 20px', color: '#FFF', fontSize: '14px', outline: 'none', marginBottom: '30px' },
  searchResultsContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  searchResultRowItem: { display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#0D0D0F', padding: '14px 20px', borderRadius: '16px', border: '1px solid #141416', cursor: 'pointer' },
  searchMiniAvatar: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#707070' },
  searchResultUsername: { fontSize: '13px', fontWeight: '600', color: '#FFF' },
  searchResultCaptionSnippet: { fontSize: '12px', color: '#707070', marginTop: '3px' },
  panelCenterContainer: { width: '100%', maxWidth: '480px', padding: '0 20px', display: 'flex', flexDirection: 'column' },
  panelTitleHeader: { fontSize: '14px', fontWeight: '900', letterSpacing: '3px', marginBottom: '35px', color: '#FFF', textAlign: 'center' },
  nativeHiddenFileInput: { display: 'none' },
  customFileLabelTriggerBtn: { display: 'block', textAlign: 'center', backgroundColor: '#0D0D0F', border: '1px dashed #242428', padding: '20px', borderRadius: '16px', color: '#FFF', fontSize: '11px', fontWeight: '800', cursor: 'pointer', letterSpacing: '1px' },
  portalForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  formTextInput: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '14px', padding: '14px 16px', color: '#FFF', fontSize: '13.5px', outline: 'none' },
  formTextareaInput: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '14px', padding: '14px 16px', color: '#FFF', fontSize: '13.5px', outline: 'none', fontFamily: 'inherit', resize: 'none' },
  launchBtn: { backgroundColor: '#FFFFFF', border: 'none', color: '#000', fontSize: '11px', fontWeight: '900', padding: '16px', borderRadius: '14px', cursor: 'pointer', letterSpacing: '1.5px', marginTop: '10px' },
  profileDashboardContainer: { width: '100%', maxWidth: '850px', padding: '0 20px', display: 'flex', flexDirection: 'column' },
  profileHeaderBox: { display: 'flex', gap: '50px', paddingBottom: '50px', borderBottom: '1px solid #141416', marginBottom: '35px', alignItems: 'center' },
  profileAvatarBig: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#0D0D0F', border: '1px solid #141416', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800' },
  profileAvatarBigImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #141416' },
  profileMetaInfoColumn: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 },
  profileUsernameRow: { display: 'flex', alignItems: 'center', gap: '25px' },
  profileUsernameHeader: { fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' },
  editProfileButton: { backgroundColor: '#0D0D0F', border: '1px solid #141416', color: '#FFF', fontSize: '11px', fontWeight: '700', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', letterSpacing: '0.5px' },
  profileStatsRow: { display: 'flex', gap: '40px', fontSize: '14px', color: '#A0A0A0' },
  bioEditorTextarea: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '12px', padding: '12px', color: '#FFF', fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit' },
  saveBioBtn: { backgroundColor: '#FFF', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '10px', fontSize: '10px', fontWeight: '900', cursor: 'pointer', alignSelf: 'flex-start', letterSpacing: '0.5px' },
  threeColumnLookbookGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingBottom: '80px' },
  gridImageCardWrapper: { position: 'relative', aspectRatio: '1/1', backgroundColor: '#0D0D0F', overflow: 'hidden', borderRadius: '14px', cursor: 'pointer', border: '1px solid #141416' },
  gridImageItem: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }
};

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');

  // Authenticated User State
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // Form Field States
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brandName, setBrandName] = useState(''); // MANDATORY
  const [username, setUsername] = useState('');   // OPTIONAL

  // App Content States
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Create Post States
  const [imgUrl, setImgUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');

  // Profile Edit States
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [avatarInputUrl, setAvatarInputUrl] = useState('');

  // Context View Profile Target
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [selectedProfileData, setSelectedProfileData] = useState(null);
  const [selectedProfilePosts, setSelectedProfilePosts] = useState([]);

  // Active User Dynamic Comment Strings
  const [commentInputs, setCommentInputs] = useState({});

  // Auth Monitoring Lifecycle
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Global Core Data Pipeline Fetching
  useEffect(() => {
    fetchGlobalFeed();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (data) {
        setProfile(data);
        setBioInput(data.bio || '');
        setAvatarInputUrl(data.avatar_url || '');
      }
    } catch (err) {
      console.error("Error retrieving user metadata:", err);
    }
  };

  const fetchGlobalFeed = async () => {
    setLoadingPosts(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (brand_name, username, avatar_url),
          likes (user_id),
          comments (id, text, created_at, profiles:user_id (brand_name, username))
        `)
        .order('created_at', { ascending: false });

      if (data) setPosts(data);
    } catch (err) {
      console.error("Feed engine synchronization breakdown:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Authentication Router & Request Controllers
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      alert("Brand Name is strictly mandatory to build your archive network portfolio.");
      return;
    }

    // Fallback computed lower-case string if optional username is omitted
    const processedUsername = username.trim() 
      ? username.trim().toLowerCase().replace(/\s+/g, '') 
      : brandName.trim().toLowerCase().replace(/\s+/g, '');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          brand_name: brandName.trim(),
          username: processedUsername
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Account generated successfully! Welcome aboard.");
      setActiveTab('home');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      setActiveTab('home');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setActiveTab('home');
  };

  // Interaction Commands Protected with Session Guards
  const handleLike = async (postId) => {
    if (!user) {
      setActiveTab('portal');
      return;
    }

    const targetPost = posts.find(p => p.id === postId);
    const hasLiked = targetPost?.likes?.some(l => l.user_id === user.id);

    try {
      if (hasLiked) {
        await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', user.id);
      } else {
        await supabase.from('likes').insert({ post_id: postId, user_id: user.id });
      }
      fetchGlobalFeed();
      if (selectedProfileId) fetchTargetProfileData(selectedProfileId);
    } catch (err) {
      console.error("Like interaction transaction error:", err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!user) {
      setActiveTab('portal');
      return;
    }

    const textStr = commentInputs[postId];
    if (!textStr || !textStr.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({ post_id: postId, user_id: user.id, text: textStr.trim() });

      if (!error) {
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
        fetchGlobalFeed();
        if (selectedProfileId) fetchTargetProfileData(selectedProfileId);
      }
    } catch (err) {
      console.error("Comment submission transactional breakdown:", err);
    }
  };

  // Global Engine Search Controller
  const executeSearchQuery = async (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, brand_name, username, avatar_url, bio')
        .or(`brand_name.ilike.%${val}%,username.ilike.%${val}%`);
      if (data) setSearchResults(data);
    } catch (err) {
      console.error("Search module indexing mismatch:", err);
    }
  };

  // Global Architecture Post Creation Processing 
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      setActiveTab('portal');
      return;
    }
    if (!imgUrl.trim()) {
      alert("Please paste a working high-res visual image URL.");
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          img_url: imgUrl.trim(),
          caption: caption.trim(),
          location: location.trim()
        });

      if (!error) {
        setImgUrl('');
        setCaption('');
        setLocation('');
        fetchGlobalFeed();
        setActiveTab('home');
      }
    } catch (err) {
      console.error("Publishing layout upload failure:", err);
    }
  };

  // Target Portfolio View Engine 
  const fetchTargetProfileData = async (targetUserId) => {
    try {
      const { data: pData } = await supabase.from('profiles').select('*').eq('id', targetUserId).single();
      const { data: postsData } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (brand_name, username, avatar_url),
          likes (user_id),
          comments (id, text, created_at, profiles:user_id (brand_name, username))
        `)
        .eq('user_id', targetUserId)
        .order('created_at', { ascending: false });

      setSelectedProfileData(pData);
      setSelectedProfilePosts(postsData || []);
    } catch (err) {
      console.error("Target context profile fetch failure:", err);
    }
  };

  const handleRouteToProfile = (targetUserId) => {
    setSelectedProfileId(targetUserId);
    fetchTargetProfileData(targetUserId);
    setActiveTab('profileView');
  };

  // Dynamic Profile Modification Engine 
  const handleUpdateBioAndMeta = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ bio: bioInput.trim(), avatar_url: avatarInputUrl.trim() })
        .eq('id', user.id);

      if (!error) {
        setIsEditingBio(false);
        fetchUserProfile(user.id);
        fetchGlobalFeed();
      }
    } catch (err) {
      console.error("Profile modification layout exception:", err);
    }
  };

  return (
    <div style={styles.appContainer}>
      
      {/* GLOBAL BRAND SIDEBAR PANEL */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logo} onClick={() => { setSelectedProfileId(null); setActiveTab('home'); }}>
            KYRO
          </div>
          <nav style={styles.navLinks}>
            <div style={styles.navItem} onClick={() => { setSelectedProfileId(null); setActiveTab('home'); }}>
              <Home size={20} color={activeTab === 'home' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'home' ? '#FFF' : '#8A8A8E' }}>Collection</span>
            </div>
            <div style={styles.navItem} onClick={() => setActiveTab('search')}>
              <Search size={20} color={activeTab === 'search' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'search' ? '#FFF' : '#8A8A8E' }}>Discover</span>
            </div>
            <div style={styles.navItem} onClick={() => { if (!user) { setActiveTab('portal'); } else { setActiveTab('create'); } }}>
              <PlusSquare size={20} color={activeTab === 'create' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'create' ? '#FFF' : '#8A8A8E' }}>Publish</span>
            </div>
            <div style={styles.navItem} onClick={() => { if (!user) { setActiveTab('portal'); } else { handleRouteToProfile(user.id); } }}>
              <User size={20} color={activeTab === 'profileView' && selectedProfileId === user?.id ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'profileView' && selectedProfileId === user?.id ? '#FFF' : '#8A8A8E' }}>Archive</span>
            </div>
          </nav>
        </div>

        {/* AUTH FOOTER ACCORDION CONTACT */}
        {user && profile ? (
          <div style={styles.profileLink} onClick={handleSignOut}>
            <div style={styles.miniAvatar}>
              {profile.avatar_url ? (
                <img src={profile.avatar_url} style={styles.miniAvatarImg} alt="Avatar Mini" />
              ) : (
                profile.brand_name?.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: '700', display: 'block', color: '#FFF', textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {profile.brand_name}
              </span>
              <span style={{ fontSize: '10px', color: '#6A6A70', display: 'block' }}>Disconnect</span>
            </div>
            <LogOut size={14} color="#6A6A70" />
          </div>
        ) : (
          <div style={styles.profileLink} onClick={() => setActiveTab('portal')}>
            <div style={styles.miniAvatar}>+</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: '700', display: 'block', color: '#FFF' }}>Portal Login</span>
              <span style={{ fontSize: '10px', color: '#6A6A70', display: 'block' }}>Join Network</span>
            </div>
          </div>
        )}
      </aside>

      {/* CORE VIEWPORT DISTRIBUTOR LAYOUT MAPPING */}
      <main style={activeTab === 'home' ? styles.mainContent : styles.mainContentPanels}>
        
        {/* VIEWPORTS 1: LOOKBOOK FEED PANELS */}
        {activeTab === 'home' && (
          <div style={styles.feedContainer}>
            {loadingPosts ? (
              <div style={styles.loaderSpinnerBox}>SYNCHRONIZING ARCHIVE SYSTEM...</div>
            ) : posts.length === 0 ? (
              <div style={styles.loaderSpinnerBox}>ARCHIVE VACANT. NO RECENT VISUAL LAYOUTS.</div>
            ) : (
              posts.map((post) => {
                const isLiked = post.likes?.some(l => l.user_id === user?.id);
                return (
                  <article key={post.id} style={styles.postCard}>
                    <div style={styles.postHeader}>
                      <div style={styles.headerLeft} onClick={() => handleRouteToProfile(post.user_id)}>
                        <div style={styles.brandAvatar}>
                          {post.profiles?.avatar_url ? (
                            <img src={post.profiles.avatar_url} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar" />
                          ) : (
                            post.profiles?.brand_name?.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div style={styles.usernameRow}>
                            <span style={styles.username}>{post.profiles?.brand_name}</span>
                            <div style={styles.badgeVerify}><CheckCircle2 size={9} color="#000" fill="#FFF" /></div>
                          </div>
                          {post.location && <span style={styles.location}>{post.location}</span>}
                        </div>
                      </div>
                    </div>

                    <div style={styles.mediaContainer}>
                      <img src={post.img_url} style={styles.postImage} alt="Network Visual Archive" />
                    </div>

                    <div style={styles.actionRow}>
                      <button style={styles.iconActionBtn} onClick={() => handleLike(post.id)}>
                        <Heart size={20} color={isLiked ? '#FF3B30' : '#FFF'} fill={isLiked ? '#FF3B30' : 'none'} />
                      </button>
                      <button style={styles.iconActionBtn}>
                        <MessageCircle size={20} color="#FFF" />
                      </button>
                    </div>

                    <div style={styles.likesSection}>
                      {post.likes?.length || 0} ARCHIVE INDEXED LIKES
                    </div>

                    {post.caption && (
                      <div style={styles.captionSection}>
                        <span style={styles.boldUser} onClick={() => handleRouteToProfile(post.user_id)}>
                          @{post.profiles?.username}
                        </span>
                        <span style={styles.captionText}>{post.caption}</span>
                      </div>
                    )}

                    {/* COMMENTS BLOCK HARNESS */}
                    <div style={styles.commentsBoxHarness}>
                      {post.comments && post.comments.length > 0 && (
                        <div style={styles.commentsListingArea}>
                          {post.comments.map((comm) => (
                            <div key={comm.id} style={styles.singleCommentRow}>
                              <strong style={{ color: '#FFF', marginRight: '6px' }}>{comm.profiles?.brand_name}:</strong>
                              <span style={{ color: '#B0B0B5' }}>{comm.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <form style={styles.commentInputRow} onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                        <input
                          type="text"
                          placeholder={user ? "Add to this lookbook archive commentary..." : "Log in to add commentary..."}
                          disabled={!user}
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          style={styles.inlineCommentInput}
                        />
                        {user && <button type="submit" style={styles.postCommentBtn}>SUBMIT</button>}
                      </form>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {/* VIEWPORTS 2: DISCOVER EXPLORE SECTIONS */}
        {activeTab === 'search' && (
          <div style={styles.panelCenterContainer}>
            <input
              type="text"
              placeholder="Search Luxury Brands, Designers, Creators..."
              value={searchQuery}
              onChange={(e) => executeSearchQuery(e.target.value)}
              style={styles.searchBarInput}
            />
            <div style={styles.searchResultsContainer}>
              {searchResults.map((res) => (
                <div key={res.id} style={styles.searchResultRowItem} onClick={() => handleRouteToProfile(res.id)}>
                  <div style={styles.searchMiniAvatar}>
                    {res.avatar_url ? (
                      <img src={res.avatar_url} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Brand Image" />
                    ) : (
                      res.brand_name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div style={styles.searchResultUsername}>{res.brand_name}</div>
                    <div style={styles.searchResultCaptionSnippet}>@{res.username} — {res.bio || 'No structural archive biography compiled.'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEWPORTS 3: ARCHIVE PUBLISHING PORTAL */}
        {activeTab === 'create' && (
          <div style={styles.panelCenterContainer}>
            <div style={styles.panelTitleHeader}>PUBLISH PORTFOLIO PLACEMENT</div>
            <form style={styles.portalForm} onSubmit={handleCreatePost}>
              <input
                type="text"
                placeholder="Visual Layout Image URL (Paste high-res image link)"
                required
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                style={styles.formTextInput}
              />
              <input
                type="text"
                placeholder="Exhibition Collection Location (e.g., Paris, Milan, Lagos)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.formTextInput}
              />
              <textarea
                placeholder="Compile portfolio layout technical caption specifications..."
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                style={styles.formTextareaInput}
              />
              <button type="submit" style={styles.launchBtn}>LAUNCH TO COLLECTION</button>
            </form>
          </div>
        )}

        {/* VIEWPORTS 4: REGISTRATION & AUTH PORTAL PANEL */}
        {activeTab === 'portal' && (
          <div style={styles.panelCenterContainer}>
            <div style={styles.panelTitleHeader}>KYRO SYSTEM AUTHENTICATION</div>
            <form style={styles.portalForm} onSubmit={authMode === 'login' ? handleLogin : handleSignUp}>
              
              {authMode === 'signup' && (
                <>
                  <input
                    type="text"
                    placeholder="Brand Identity Name (Required)"
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    style={styles.formTextInput}
                  />
                  <input
                    type="text"
                    placeholder="System Username (Optional)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.formTextInput}
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Network Corporate Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.formTextInput}
              />
              <input
                type="password"
                placeholder="Account Access Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.formTextInput}
              />

              <button type="submit" style={styles.launchBtn}>
                {authMode === 'login' ? 'INITIALIZE SYSTEM LOG IN' : 'REGISTER CREATOR CREDENTIALS'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', letterSpacing: '0.5px' }}>
                {authMode === 'login' ? (
                  <span style={{ color: '#8A8A8E' }}>
                    New entity?{' '}
                    <strong style={{ color: '#FFF', cursor: 'pointer' }} onClick={() => setAuthMode('signup')}>
                      Register Brand Token
                    </strong>
                  </span>
                ) : (
                  <span style={{ color: '#8A8A8E' }}>
                    Registered profile?{' '}
                    <strong style={{ color: '#FFF', cursor: 'pointer' }} onClick={() => setAuthMode('login')}>
                      Execute System Authentication
                    </strong>
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* VIEWPORTS 5: ARCHIVE DOSSIER USER PORTFOLIOS */}
        {activeTab === 'profileView' && selectedProfileData && (
          <div style={styles.profileDashboardContainer}>
            <div style={styles.profileHeaderBox}>
              <div style={styles.profileAvatarBig}>
                {selectedProfileData.avatar_url ? (
                  <img src={selectedProfileData.avatar_url} style={styles.profileAvatarBigImg} alt="Dossier Big Portrait" />
                ) : (
                  selectedProfileData.brand_name?.charAt(0).toUpperCase()
                )}
              </div>

              <div style={styles.profileMetaInfoColumn}>
                <div style={styles.profileUsernameRow}>
                  <h2 style={styles.profileUsernameHeader}>{selectedProfileData.brand_name}</h2>
                  {user?.id === selectedProfileData.id && !isEditingBio && (
                    <button style={styles.editProfileButton} onClick={() => setIsEditingBio(true)}>
                      <Edit3 size={12} style={{ marginRight: '6px', inlineSize: 'auto' }} /> Customize Profile
                    </button>
                  )}
                </div>

                <div style={styles.profileStatsRow}>
                  <span><strong>{selectedProfilePosts.length}</strong> Placements</span>
                  <span><strong>Verified</strong> Entity Portfolio</span>
                </div>

                {isEditingBio ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder="Avatar Image URL Placement Link"
                      value={avatarInputUrl}
                      onChange={(e) => setAvatarInputUrl(e.target.value)}
                      style={styles.formTextInput}
                    />
                    <textarea
                      rows={3}
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      placeholder="Compile architecture lookbook specifications bio..."
                      style={styles.bioEditorTextarea}
                    />
                    <button style={styles.saveBioBtn} onClick={handleUpdateBioAndMeta}>
                      COMMIT PORFTOLIO SYNCHRONIZATION
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: '13.5px', color: '#D4D4D8', lineHeight: '1.6', maxWidth: '480px' }}>
                    <span style={{ color: '#6A6A70', display: 'block', marginBottom: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                      @{selectedProfileData.username}
                    </span>
                    {selectedProfileData.bio || 'This luxury enterprise entity has not yet compiled a structural network biography portfolio dossier.'}
                  </div>
                )}
              </div>
            </div>

            {/* THREE COLUMN GRID LOOKBOOK ARCHIVE */}
            <div style={styles.threeColumnLookbookGrid}>
              {selectedProfilePosts.map((p) => (
                <div key={p.id} style={styles.gridImageCardWrapper} onClick={() => { setPosts([p, ...posts.filter(item => item.id !== p.id)]); setActiveTab('home'); }}>
                  <img src={p.img_url} style={styles.gridImageItem} alt="Grid Archive Frame" />
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
