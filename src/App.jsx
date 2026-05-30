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
  Edit3,
  Upload,
  Image as ImageIcon
} from 'lucide-react';

const styles = {
  appContainer: { display: 'flex', minHeight: '100vh', backgroundColor: '#070708', color: '#FFFFFF', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  sidebar: { width: '250px', height: '100vh', position: 'fixed', top: 0, left: 0, borderRight: '1px solid #141416', padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box', backgroundColor: '#070708', zIndex: 10 },
  logo: { fontSize: '18px', fontWeight: '900', letterSpacing: '3px', marginBottom: '50px', paddingLeft: '10px', cursor: 'pointer' },
  navLinks: { display: 'flex', flexDirection: 'column', gap: '8px' },
  navText: { fontSize: '14px', fontWeight: '500' },
  navItem: { display: 'flex', alignItems: 'center', gap: '18px', padding: '14px 12px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s ease' },
  profileLink: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px', border: '1px solid #141416', borderRadius: '16px', marginTop: 'auto', cursor: 'pointer', backgroundColor: '#0D0D0F' },
  miniAvatar: { width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' },
  miniAvatarImg: { width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' },
  mainContent: { marginLeft: '250px', flex: 1, display: 'flex', justifyContent: 'center', paddingTop: '50px', paddingBottom: '80px' },
  mainContentPanels: { marginLeft: '250px', flex: 1, display: 'flex', justifyContent: 'center', paddingTop: '60px', paddingBottom: '80px' },
  feedContainer: { width: '100%', maxWidth: '580px', padding: '0 20px' },
  loaderSpinnerBox: { fontSize: '13px', color: '#808080', textAlign: 'center', marginTop: '140px' },
  postCard: { border: '1px solid #141416', backgroundColor: '#0D0D0F', borderRadius: '24px', marginBottom: '35px', paddingBottom: '16px', overflow: 'hidden' },
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
  brandAvatar: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', border: '1px solid #242428' },
  usernameRow: { display: 'flex', alignItems: 'center', gap: '6px' },
  username: { fontSize: '14px', fontWeight: '600' },
  badgeVerify: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  location: { fontSize: '12px', color: '#6A6A70', display: 'block', marginTop: '2px' },
  mediaContainer: { display: 'flex', backgroundColor: '#000', margin: '0 12px', borderRadius: '16px', overflow: 'hidden' },
  postImage: { width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover' },
  actionRow: { display: 'flex', padding: '16px 20px 8px 20px', gap: '20px' },
  iconActionBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer' },
  likesSection: { padding: '0 20px', fontSize: '13px', fontWeight: '700', marginBottom: '8px' },
  captionSection: { padding: '0 20px', fontSize: '14px', lineHeight: '1.5', marginBottom: '12px' },
  boldUser: { fontWeight: '700', marginRight: '8px', cursor: 'pointer' },
  captionText: { color: '#D4D4D8' },
  commentsBoxHarness: { margin: '12px 20px 4px 20px', borderTop: '1px solid #141416', paddingTop: '14px' },
  commentsListingArea: { display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '140px', overflowY: 'auto', marginBottom: '14px' },
  singleCommentRow: { fontSize: '13px' },
  commentInputRow: { display: 'flex', gap: '12px', border: '1px solid #141416', borderRadius: '14px', padding: '8px 14px', backgroundColor: '#070708', alignItems: 'center' },
  inlineCommentInput: { flex: 1, background: 'none', border: 'none', color: '#FFF', fontSize: '13px', outline: 'none' },
  postCommentBtn: { background: 'none', border: 'none', color: '#FFF', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  searchBarInput: { width: '100%', backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '16px', padding: '16px 20px', color: '#FFF', fontSize: '14px', outline: 'none', marginBottom: '30px' },
  searchResultsContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  searchResultRowItem: { display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#0D0D0F', padding: '14px 20px', borderRadius: '16px', border: '1px solid #141416', cursor: 'pointer' },
  searchMiniAvatar: { width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1A1A1E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' },
  searchResultUsername: { fontSize: '14px', fontWeight: '600' },
  searchResultCaptionSnippet: { fontSize: '12px', color: '#707070', marginTop: '3px' },
  panelCenterContainer: { width: '100%', maxWidth: '480px', padding: '0 20px', display: 'flex', flexDirection: 'column' },
  panelTitleHeader: { fontSize: '18px', fontWeight: '700', marginBottom: '30px', textAlign: 'center' },
  portalForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  formTextInput: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '14px', padding: '14px 16px', color: '#FFF', fontSize: '14px', outline: 'none' },
  formTextareaInput: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '14px', padding: '14px 16px', color: '#FFF', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'none' },
  launchBtn: { backgroundColor: '#FFFFFF', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', padding: '16px', borderRadius: '14px', cursor: 'pointer', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' },
  profileDashboardContainer: { width: '100%', maxWidth: '850px', padding: '0 20px', display: 'flex', flexDirection: 'column' },
  profileHeaderBox: { display: 'flex', gap: '50px', paddingBottom: '40px', borderBottom: '1px solid #141416', marginBottom: '35px', alignItems: 'center' },
  profileAvatarBig: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#0D0D0F', border: '1px solid #141416', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '800' },
  profileAvatarBigImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' },
  profileMetaInfoColumn: { display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 },
  profileUsernameRow: { display: 'flex', alignItems: 'center', gap: '25px' },
  profileUsernameHeader: { fontSize: '22px', fontWeight: '700', margin: 0 },
  editProfileButton: { backgroundColor: '#0D0D0F', border: '1px solid #141416', color: '#FFF', fontSize: '12px', fontWeight: '600', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer' },
  profileStatsRow: { display: 'flex', gap: '40px', fontSize: '14px', color: '#A0A0A0' },
  bioEditorTextarea: { backgroundColor: '#0D0D0F', border: '1px solid #141416', borderRadius: '12px', padding: '12px', color: '#FFF', fontSize: '14px', outline: 'none', resize: 'none', fontFamily: 'inherit' },
  saveBioBtn: { backgroundColor: '#FFF', color: '#000', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '5px' },
  threeColumnLookbookGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', paddingBottom: '80px' },
  gridImageCardWrapper: { position: 'relative', aspectRatio: '1/1', backgroundColor: '#0D0D0F', overflow: 'hidden', borderRadius: '14px', cursor: 'pointer', border: '1px solid #141416' },
  gridImageItem: { width: '100%', height: '100%', objectFit: 'cover' },
  uploadCard: { border: '2px dashed #141416', borderRadius: '14px', padding: '30px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#0D0D0F', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [authMode, setAuthMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brandName, setBrandName] = useState(''); 
  const [username, setUsername] = useState('');   

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [uploading, setUploading] = useState(false);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [selectedProfileData, setSelectedProfileData] = useState(null);
  const [selectedProfilePosts, setSelectedProfilePosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

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

  useEffect(() => {
    fetchGlobalFeed();
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (data) {
        setProfile(data);
        setBioInput(data.bio || '');
      }
    } catch (err) {
      console.error(err);
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

      if (error) {
        const { data: simpleData } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
        setPosts(simpleData || []);
      } else {
        setPosts(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    const processedUsername = username.trim() 
      ? username.trim().toLowerCase().replace(/\s+/g, '') 
      : brandName.trim().toLowerCase().replace(/\s+/g, '');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { brand_name: brandName.trim(), username: processedUsername } }
    });

    if (error) alert(error.message);
    else {
      alert("Account created successfully!");
      setActiveTab('home');
      fetchGlobalFeed();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
      setActiveTab('home');
      fetchGlobalFeed();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setActiveTab('home');
  };

  const handleLike = async (postId) => {
    if (!user) { setActiveTab('portal'); return; }
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
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    if (!user) { setActiveTab('portal'); return; }
    const textStr = commentInputs[postId];
    if (!textStr || !textStr.trim()) return;

    try {
      const { error } = await supabase.from('comments').insert({ post_id: postId, user_id: user.id, text: textStr.trim() });
      if (!error) {
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
        fetchGlobalFeed();
        if (selectedProfileId) fetchTargetProfileData(selectedProfileId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const executeSearchQuery = async (val) => {
    setSearchQuery(val);
    if (!val.trim()) { setSearchResults([]); return; }
    try {
      const { data } = await supabase.from('profiles').select('id, brand_name, username, avatar_url, bio').or(`brand_name.ilike.%${val}%,username.ilike.%${val}%`);
      if (data) setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) { setActiveTab('portal'); return; }
    if (!selectedFile) { alert("Please select an image file first."); return; }

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('kyro-media')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('kyro-media')
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from('posts').insert({ 
        user_id: user.id, 
        img_url: publicUrl, 
        caption: caption.trim(), 
        location: location.trim() 
      });

      if (dbError) throw dbError;

      setSelectedFile(null);
      setPreviewUrl('');
      setCaption('');
      setLocation('');
      fetchGlobalFeed();
      setActiveTab('home');
    } catch (err) {
      alert("Upload failed: " + err.message);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const fetchTargetProfileData = async (targetUserId) => {
    try {
      const { data: pData } = await supabase.from('profiles').select('*').eq('id', targetUserId).single();
      const { data: postsData } = await supabase.from('posts').select(`*, likes (user_id), comments (id, text, created_at)`).eq('user_id', targetUserId).order('created_at', { ascending: false });
      setSelectedProfileData(pData);
      setSelectedProfilePosts(postsData || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRouteToProfile = (targetUserId) => {
    setSelectedProfileId(targetUserId);
    fetchTargetProfileData(targetUserId);
    setActiveTab('profileView');
  };

  const handleAvatarFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedAvatarFile(file);
      setAvatarPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateBioAndMeta = async () => {
    if (!user) return;
    setUploading(true);
    try {
      let finalAvatarUrl = profile?.avatar_url || '';

      if (selectedAvatarFile) {
        const fileExt = selectedAvatarFile.name.split('.').pop();
        const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

        const { error: avatarUploadErr } = await supabase.storage
          .from('kyro-media')
          .upload(fileName, selectedAvatarFile);

        if (avatarUploadErr) throw avatarUploadErr;

        const { data: { publicUrl } } = supabase.storage
          .from('kyro-media')
          .getPublicUrl(fileName);

        finalAvatarUrl = publicUrl;
      }

      const { error } = await supabase.from('profiles').update({ 
        bio: bioInput.trim(), 
        avatar_url: finalAvatarUrl 
      }).eq('id', user.id);

      if (error) throw error;

      setIsEditingBio(false);
      setSelectedAvatarFile(null);
      setAvatarPreviewUrl('');
      fetchUserProfile(user.id);
      fetchGlobalFeed();
    } catch (err) {
      alert("Failed updating profile: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.appContainer}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logo} onClick={() => { setSelectedProfileId(null); setActiveTab('home'); }}>KYRO</div>
          <nav style={styles.navLinks}>
            <div style={styles.navItem} onClick={() => { setSelectedProfileId(null); setActiveTab('home'); }}>
              <Home size={20} color={activeTab === 'home' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'home' ? '#FFF' : '#8A8A8E' }}>Home</span>
            </div>
            <div style={styles.navItem} onClick={() => setActiveTab('search')}>
              <Search size={20} color={activeTab === 'search' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'search' ? '#FFF' : '#8A8A8E' }}>Search</span>
            </div>
            <div style={styles.navItem} onClick={() => { if (!user) { setActiveTab('portal'); } else { setActiveTab('create'); } }}>
              <PlusSquare size={20} color={activeTab === 'create' ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'create' ? '#FFF' : '#8A8A8E' }}>Create Post</span>
            </div>
            <div style={styles.navItem} onClick={() => { if (!user) { setActiveTab('portal'); } else { handleRouteToProfile(user.id); } }}>
              <User size={20} color={activeTab === 'profileView' && selectedProfileId === user?.id ? '#FFF' : '#8A8A8E'} />
              <span style={{ ...styles.navText, color: activeTab === 'profileView' && selectedProfileId === user?.id ? '#FFF' : '#8A8A8E' }}>Profile</span>
            </div>
          </nav>
        </div>

        {user && profile ? (
          <div style={styles.profileLink} onClick={handleSignOut}>
            <div style={styles.miniAvatar}>
              {profile.avatar_url ? <img src={profile.avatar_url} style={styles.miniAvatarImg} alt="Avatar" /> : profile.brand_name?.charAt(0).toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: '13px', fontWeight: '700', display: 'block', color: '#FFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.brand_name}</span>
              <span style={{ fontSize: '11px', color: '#6A6A70', display: 'block' }}>Logout</span>
            </div>
            <LogOut size={14} color="#6A6A70" />
          </div>
        ) : (
          <div style={styles.profileLink} onClick={() => setActiveTab('portal')}>
            <div style={styles.miniAvatar}>+</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '13px', fontWeight: '700', display: 'block', color: '#FFF' }}>Login</span>
            </div>
          </div>
        )}
      </aside>

      <main style={activeTab === 'home' ? styles.mainContent : styles.mainContentPanels}>
        {activeTab === 'home' && (
          <div style={styles.feedContainer}>
            {loadingPosts ? (
              <div style={styles.loaderSpinnerBox}>Loading feed...</div>
            ) : posts.length === 0 ? (
              <div style={styles.loaderSpinnerBox}>No posts yet.</div>
            ) : (
              posts.map((post) => {
                const isLiked = post.likes?.some(l => l.user_id === user?.id);
                return (
                  <article key={post.id} style={styles.postCard}>
                    <div style={styles.postHeader}>
                      <div style={styles.headerLeft} onClick={() => handleRouteToProfile(post.user_id)}>
                        <div style={styles.brandAvatar}>
                          {post.profiles?.avatar_url ? <img src={post.profiles.avatar_url} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar" /> : post.brand_name?.charAt(0).toUpperCase() || 'K'}
                        </div>
                        <div>
                          <div style={styles.usernameRow}>
                            <span style={styles.username}>{post.profiles?.brand_name || 'Kyro Member'}</span>
                            <div style={styles.badgeVerify}><CheckCircle2 size={9} color="#000" fill="#FFF" /></div>
                          </div>
                          {post.location && <span style={styles.location}>{post.location}</span>}
                        </div>
                      </div>
                    </div>

                    <div style={styles.mediaContainer}>
                      <img src={post.img_url} style={styles.postImage} alt="Post" />
                    </div>

                    <div style={styles.actionRow}>
                      <button style={styles.iconActionBtn} onClick={() => handleLike(post.id)}>
                        <Heart size={20} color={isLiked ? '#FF3B30' : '#FFF'} fill={isLiked ? '#FF3B30' : 'none'} />
                      </button>
                      <button style={styles.iconActionBtn}>
                        <MessageCircle size={20} color="#FFF" />
                      </button>
                    </div>

                    <div style={styles.likesSection}>{post.likes?.length || 0} likes</div>

                    {post.caption && (
                      <div style={styles.captionSection}>
                        <span style={styles.boldUser} onClick={() => handleRouteToProfile(post.user_id)}>@{post.profiles?.username || 'user'}</span>
                        <span style={styles.captionText}>{post.caption}</span>
                      </div>
                    )}

                    <div style={styles.commentsBoxHarness}>
                      {post.comments && post.comments.length > 0 && (
                        <div style={styles.commentsListingArea}>
                          {post.comments.map((comm) => (
                            <div key={comm.id} style={styles.singleCommentRow}>
                              <strong style={{ color: '#FFF', marginRight: '6px' }}>{comm.profiles?.brand_name || 'User'}:</strong>
                              <span style={{ color: '#B0B0B5' }}>{comm.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <form style={styles.commentInputRow} onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                        <input
                          type="text"
                          placeholder={user ? "Add a comment..." : "Log in to comment..."}
                          disabled={!user}
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          style={styles.inlineCommentInput}
                        />
                        {user && <button type="submit" style={styles.postCommentBtn}>Post</button>}
                      </form>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div style={styles.panelCenterContainer}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => executeSearchQuery(e.target.value)}
              style={styles.searchBarInput}
            />
            <div style={styles.searchResultsContainer}>
              {searchResults.map((res) => (
                <div key={res.id} style={styles.searchResultRowItem} onClick={() => handleRouteToProfile(res.id)}>
                  <div style={styles.searchMiniAvatar}>
                    {res.avatar_url ? <img src={res.avatar_url} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} alt="Avatar" /> : res.brand_name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={styles.searchResultUsername}>{res.brand_name}</div>
                    <div style={styles.searchResultCaptionSnippet}>@{res.username} — {res.bio || 'No bio yet.'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div style={styles.panelCenterContainer}>
            <div style={styles.panelTitleHeader}>Create New Post</div>
            <form style={styles.portalForm} onSubmit={handleCreatePost}>
              
              {/* Instagram Style Image Selector Button */}
              <label htmlFor="file-upload" style={styles.uploadCard}>
                {previewUrl ? (
                  <img src={previewUrl} style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' }} alt="Preview" />
                ) : (
                  <>
                    <Upload size={32} color="#8A8A8E" />
                    <span style={{ fontSize: '14px', color: '#8A8A8E' }}>Select photo from device</span>
                  </>
                )}
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />

              <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={styles.formTextInput} />
              <textarea placeholder="Write a caption..." rows={4} value={caption} onChange={(e) => setCaption(e.target.value)} style={styles.formTextareaInput} />
              
              <button type="submit" style={styles.launchBtn} disabled={!selectedFile || uploading}>
                {uploading ? 'Uploading Asset...' : 'Share Post'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'portal' && (
          <div style={styles.panelCenterContainer}>
            <div style={styles.panelTitleHeader}>Sign In</div>
            <form style={styles.portalForm} onSubmit={authMode === 'login' ? handleLogin : handleSignUp}>
              {authMode === 'signup' && (
                <>
                  <input type="text" placeholder="Brand Name (Required)" required value={brandName} onChange={(e) => setBrandName(e.target.value)} style={styles.formTextInput} />
                  <input type="text" placeholder="Username (Optional)" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.formTextInput} />
                </>
              )}
              <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} style={styles.formTextInput} />
              <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} style={styles.formTextInput} />

              <button type="submit" style={styles.launchBtn}>
                {authMode === 'login' ? 'Log In' : 'Sign Up'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
                {authMode === 'login' ? (
                  <span style={{ color: '#8A8A8E' }}>New user? <strong style={{ color: '#FFF', cursor: 'pointer' }} onClick={() => setAuthMode('signup')}>Sign up here</strong></span>
                ) : (
                  <span style={{ color: '#8A8A8E' }}>Have an account? <strong style={{ color: '#FFF', cursor: 'pointer' }} onClick={() => setAuthMode('login')}>Log in here</strong></span>
                )}
              </div>
            </form>
          </div>
        )}

        {activeTab === 'profileView' && selectedProfileData && (
          <div style={styles.profileDashboardContainer}>
            <div style={styles.profileHeaderBox}>
              <div style={styles.profileAvatarBig}>
                {selectedProfileData.avatar_url ? <img src={selectedProfileData.avatar_url} style={styles.profileAvatarBigImg} alt="Avatar" /> : selectedProfileData.brand_name?.charAt(0).toUpperCase()}
              </div>

              <div style={styles.profileMetaInfoColumn}>
                <div style={styles.profileUsernameRow}>
                  <h2 style={styles.profileUsernameHeader}>{selectedProfileData.brand_name}</h2>
                  {user?.id === selectedProfileData.id && !isEditingBio && (
                    <button style={styles.editProfileButton} onClick={() => setIsEditingBio(true)}>
                      <Edit3 size={12} style={{ marginRight: '6px' }} /> Edit Profile
                    </button>
                  )}
                </div>

                <div style={styles.profileStatsRow}>
                  <span><strong>{selectedProfilePosts.length}</strong> posts</span>
                </div>

                {isEditingBio ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    
                    {/* Instagram Style Avatar Selector */}
                    <label htmlFor="avatar-upload" style={{ ...styles.formTextInput, display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <ImageIcon size={16} color="#8A8A8E" />
                      <span style={{ color: '#8A8A8E', fontSize: '13px' }}>
                        {selectedAvatarFile ? selectedAvatarFile.name : "Change Profile Photo"}
                      </span>
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarFileChange} style={{ display: 'none' }} />

                    <textarea rows={3} value={bioInput} onChange={(e) => setBioInput(e.target.value)} placeholder="Write your bio..." style={styles.bioEditorTextarea} />
                    <button style={styles.saveBioBtn} onClick={handleUpdateBioAndMeta} disabled={uploading}>
                      {uploading ? 'Saving Asset...' : 'Save Profile'}
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: '14px', color: '#D4D4D8', lineHeight: '1.6', maxWidth: '480px' }}>
                    <span style={{ color: '#6A6A70', display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>@{selectedProfileData.username}</span>
                    {selectedProfileData.bio || 'No bio yet.'}
                  </div>
                )}
              </div>
            </div>

            <div style={styles.threeColumnLookbookGrid}>
              {selectedProfilePosts.map((p) => (
                <div key={p.id} style={styles.gridImageCardWrapper} onClick={() => { setPosts([p, ...posts.filter(item => item.id !== p.id)]); setActiveTab('home'); }}>
                  <img src={p.img_url} style={styles.gridImageItem} alt="Grid item" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
