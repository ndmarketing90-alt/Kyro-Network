import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// ================= PREMIUM CONTEMPORARY ICON ENGINES =================
const HomeIcon = ({ size = 22, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "#FFF" : "none"} stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = ({ size = 22, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CompassIcon = ({ size = 22, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={active ? "#FFF" : "none"} stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const PlusIcon = ({ size = 22, active }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="4" ry="4" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const HeartIcon = ({ size = 20, filled }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#FFF" : "none"} stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CommentIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const ShareIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
  </svg>
);

const CheckIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FFF" stroke="#000" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSession, setUserSession] = useState(null);

  const [selectedProfileSlug, setSelectedProfileSlug] = useState(null);
  const [profileMetadata, setProfileMetadata] = useState({ bio: '', avatar_url: '' });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authBrandName, setAuthBrandName] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);

  const [newLocation, setNewLocation] = useState('Lagos, Nigeria');
  const [newCaption, setNewCaption] = useState('');
  const [fileA, setFileA] = useState(null);
  const [previewA, setPreviewA] = useState('');
  const [uploading, setUploading] = useState(false);

  const [likedPosts, setLikedPosts] = useState(() => {
    const saved = localStorage.getItem('kyro_liked_posts');
    return saved ? JSON.parse(saved) : {};
  });
  const [activeCommentBox, setActiveCommentBox] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [postComments, setPostComments] = useState({});

  const [editBio, setEditBio] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      if (session) fetchCurrentProfileMetadata(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
      if (session) fetchCurrentProfileMetadata(session.user.id);
    });

    fetchLiveTimeline();
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('kyro_liked_posts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(p =>
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.caption && p.caption.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const fetchLiveTimeline = async () => {
    setLoading(true);
    try {
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      const { data: commentsData, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      const commentsGrouped = {};
      if (commentsData) {
        commentsData.forEach(c => {
          if (!commentsGrouped[c.post_id]) {
            commentsGrouped[c.post_id] = [];
          }
          commentsGrouped[c.post_id].push({ username: c.username, comment: c.comment });
        });
      }

      setPostComments(commentsGrouped);
      setPosts(postsData || []);
      setFilteredPosts(postsData || []);
    } catch (err) {
      console.error("Fetch failure:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentProfileMetadata = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('bio, avatar_url')
        .eq('id', userId)
        .single();
      if (error) throw error;
      if (data) {
        setProfileMetadata(data);
        setEditBio(data.bio || '');
      }
    } catch (err) {
      console.log("Profile check status:", err.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileA(selectedFile);
      setPreviewA(URL.createObjectURL(selectedFile));
    }
  };

  const handleLikeToggle = async (postId, currentLikes) => {
    const isLiked = likedPosts[postId];
    const updatedLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: updatedLikes } : p));

    try {
      await supabase
        .from('posts')
        .update({ likes_count: updatedLikes })
        .eq('id', postId);
    } catch (err) {
      console.error("Like database fault:", err.message);
    }
  };

  const handleAddComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim() || !userSession) {
      if (!userSession) alert("Please sign in or create an account to post comments.");
      return;
    }

    const brandHandle = userSession.user.user_metadata?.username_slug || 'user';

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{ post_id: postId, user_id: userSession.user.id, username: brandHandle, comment: text.trim() }]);

      if (error) throw error;

      const newComment = { username: brandHandle, comment: text.trim() };
      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));

      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      alert(`Comment upload failed: ${err.message}`);
    }
  };

  const handleSharePostLink = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl);
    alert("🔗 Link copied to clipboard!");
  };

  const navigateToProfile = (usernameSlug) => {
    setSelectedProfileSlug(usernameSlug);
    setActiveTab('profile_view');
  };

  const handleUpdateBio = async (e) => {
    e.preventDefault();
    if (!userSession) return;
    setUpdatingProfile(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ bio: editBio })
        .eq('id', userSession.user.id);

      if (error) throw error;
      setProfileMetadata(prev => ({ ...prev, bio: editBio }));
      alert("Bio updated successfully!");
    } catch (err) {
      alert(`Bio fault: ${err.message}`);
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userSession) return;
    setUpdatingProfile(true);

    try {
      const fileExt = file.name.split('.').pop();
      const pathName = `avatars/${userSession.user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from('product-images')
        .upload(pathName, file);

      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(pathName);

      const { error: dbErr } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userSession.user.id);

      if (dbErr) throw dbErr;

      setProfileMetadata(prev => ({ ...prev, avatar_url: publicUrl }));
      alert("Avatar uploaded successfully!");
    } catch (err) {
      alert(`Avatar fault: ${err.message}`);
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleSignUpUser = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword || !authBrandName) return;

    setUploading(true);
    const slug = authBrandName.toLowerCase().replace(/\s+/g, '.');

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: authEmail,
        password: authPassword,
        options: { data: { username_slug: slug, display_brand: authBrandName } }
      });

      if (authError) throw authError;
      setVerificationSent(true);
    } catch (err) {
      alert(`Sign up fault: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDropCollectionPost = async (e) => {
    e.preventDefault();
    if (!userSession || !fileA) return;
    setUploading(true);

    try {
      const currentUserId = userSession.user.id;
      const brandHandle = userSession.user.user_metadata?.username_slug || 'anonymous';
      const fileExtension = fileA.name.split('.').pop();
      const cleanFileName = `${Date.now()}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(cleanFileName, fileA);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(cleanFileName);

      const newCloudPost = {
        profile_id: currentUserId,
        username: brandHandle,
        location: newLocation,
        img_a: publicUrl,
        label_a: 'POST',
        caption: newCaption || '',
        likes_count: 0
      };

      const { error: insertError } = await supabase.from('posts').insert([newCloudPost]);
      if (insertError) throw insertError;

      setFileA(null);
      setPreviewA('');
      setNewCaption('');

      await fetchLiveTimeline();
      setActiveTab('home');
      alert("Post shared successfully!");
    } catch (err) {
      alert(`Post fault: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const currentBrandSlug = userSession?.user?.user_metadata?.username_slug || '';
  const myProfilePosts = posts.filter(p => p.username === currentBrandSlug);
  const selectedBrowsedPosts = posts.filter(p => p.username === selectedProfileSlug);

  return (
    <div style={styles.appContainer}>

      {/* ================= SIDEBAR NAVIGATION PANEL ================= */}
      <nav style={styles.sidebar}>
        <div>
          <div style={styles.logo} onClick={() => { setSelectedProfileSlug(null); setActiveTab('home'); }}>KYRO // NET</div>
          <div style={styles.navLinks}>
            <div style={{...styles.navItem, color: activeTab === 'home' ? '#FFF' : '#707070'}} onClick={() => setActiveTab('home')}>
              <HomeIcon size={20} active={activeTab === 'home'} />
              <span style={styles.navText}>Home</span>
            </div>
            <div style={{...styles.navItem, color: activeTab === 'search' ? '#FFF' : '#707070'}} onClick={() => setActiveTab('search')}>
              <SearchIcon size={20} active={activeTab === 'search'} />
              <span style={styles.navText}>Search</span>
            </div>
            <div style={{...styles.navItem, color: activeTab === 'explore' ? '#FFF' : '#707070'}} onClick={() => setActiveTab('explore')}>
              <CompassIcon size={20} active={activeTab === 'explore'} />
              <span style={styles.navText}>Explore</span>
            </div>
            {userSession ? (
              <div style={{...styles.navItem, color: activeTab === 'create' ? '#FFF' : '#707070'}} onClick={() => setActiveTab('create')}>
                <PlusIcon size={20} active={activeTab === 'create'} />
                <span style={styles.navText}>Create Post</span>
              </div>
            ) : (
              <div style={{...styles.navItem, color: activeTab === 'auth' ? '#FFF' : '#707070'}} onClick={() => setActiveTab('auth')}>
                <PlusIcon size={20} active={activeTab === 'auth'} />
                <span style={styles.navText}>Create Account</span>
              </div>
            )}
          </div>
        </div>

        <div style={{...styles.profileLink, border: (activeTab === 'profile' && userSession) ? '1px solid #FFF' : '1px solid transparent'}} onClick={() => userSession ? setActiveTab('profile') : setActiveTab('auth')}>
          {profileMetadata.avatar_url ? (
            <img src={profileMetadata.avatar_url} alt="avatar" style={styles.miniAvatarImg} />
          ) : (
            <div style={styles.miniAvatar}>{userSession ? currentBrandSlug.substring(0,2).toUpperCase() : '?'}</div>
          )}
          <span style={{...styles.navText, color: '#FFF'}}>{userSession ? currentBrandSlug : 'Account Login'}</span>
        </div>
      </nav>

      {/* ================= MAIN INTERFACE DISPLAY ================= */}
      <main style={(activeTab === 'home' || activeTab === 'profile' || activeTab === 'profile_view') ? styles.mainContent : styles.mainContentPanels}>

        {/* VIEW 1: HOME FEED */}
        {activeTab === 'home' && (
          <div style={styles.feedContainer}>
            {loading ? (
              <div style={styles.loaderSpinnerBox}>INITIALIZING LOOKBOOK TIMELINE...</div>
            ) : posts.length === 0 ? (
              <div style={styles.emptyTimelineNotice}>
                <h3>No collections posted yet.</h3>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} style={styles.postCard}>
                  <div style={styles.postHeader}>
                    <div style={styles.headerLeft} onClick={() => navigateToProfile(post.username)}>
                      <div style={styles.brandAvatar}>{post.username.substring(0, 2).toUpperCase()}</div>
                      <div>
                        <div style={styles.usernameRow}>
                          <span style={styles.username}>{post.username}</span>
                          <div style={styles.badgeVerify}><CheckIcon /></div>
                        </div>
                        <span style={styles.location}>{post.location}</span>
                      </div>
                    </div>
                  </div>
                  <div style={styles.mediaContainer}>
                    <img src={post.img_a} alt="Post content" style={styles.postImage} />
                  </div>

                  {/* ACTIONS BAR */}
                  <div style={styles.actionRow}>
                    <button style={styles.iconActionBtn} onClick={() => handleLikeToggle(post.id, post.likes_count)}>
                      <HeartIcon size={20} filled={likedPosts[post.id]} />
                    </button>
                    <button style={styles.iconActionBtn} onClick={() => setActiveCommentBox(prev => ({ ...prev, [post.id]: !prev[post.id] }))}>
                      <CommentIcon size={20} />
                    </button>
                    <button style={styles.iconActionBtn} onClick={() => handleSharePostLink(post.img_a)}>
                      <ShareIcon size={20} />
                    </button>
                  </div>

                  <div style={styles.likesSection}>{post.likes_count} interactions</div>
                  <div style={styles.captionSection}>
                    <span style={styles.boldUser} onClick={() => navigateToProfile(post.username)}>{post.username}</span>
                    <span style={styles.captionText}>{post.caption}</span>
                  </div>

                  {/* COMMENTS DRAWER */}
                  {activeCommentBox[post.id] && (
                    <div style={styles.commentsBoxHarness}>
                      <div style={styles.commentsListingArea}>
                        {(postComments[post.id] || []).map((c, i) => (
                          <div key={i} style={styles.singleCommentRow}>
                            <strong style={{color: '#FFF', marginRight: '6px'}}>{c.username}</strong>
                            <span style={{color: '#A0A0A0'}}>{c.comment}</span>
                          </div>
                        ))}
                      </div>
                      <div style={styles.commentInputRow}>
                        <input
                          type="text"
                          placeholder="Type an expression..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                          style={styles.inlineCommentInput}
                        />
                        <button onClick={() => handleAddComment(post.id)} style={styles.postCommentBtn}>SUBMIT</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: SEARCH */}
        {activeTab === 'search' && (
          <div style={styles.panelCenterContainer}>
            <h2 style={styles.panelTitleHeader}>SEARCH</h2>
            <input type="text" placeholder="Filter by brand keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchBarInput} />
            <div style={styles.searchResultsContainer}>
              {filteredPosts.map(post => (
                <div key={post.id} style={styles.searchResultRowItem} onClick={() => navigateToProfile(post.username)}>
                  <div style={styles.searchMiniAvatar}>{post.username.substring(0,2).toUpperCase()}</div>
                  <div>
                    <div style={styles.searchResultUsername}>{post.username}</div>
                    <div style={styles.searchResultCaptionSnippet}>{post.caption}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: EXPLORE */}
        {activeTab === 'explore' && (
          <div style={styles.profileDashboardContainer}>
            <h2 style={{...styles.panelTitleHeader, marginBottom: '25px'}}>CULTURE DISCOVERIES</h2>
            <div style={styles.threeColumnLookbookGrid}>
              {posts.map((post) => (
                <div key={post.id} style={styles.gridImageCardWrapper} onClick={() => navigateToProfile(post.username)}>
                  <img src={post.img_a} alt="Explore asset" style={styles.gridImageItem} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: REGISTER ACCOUNT */}
        {activeTab === 'auth' && (
          <div style={styles.panelCenterContainer}>
            <h2 style={styles.panelTitleHeader}>INITIALIZE ACCESS</h2>
            {verificationSent ? (
              <div style={styles.successValidationCard}>
                <h3 style={{color: '#FFF', fontSize: '14px', marginBottom: '8px'}}>✓ DISPATCHED</h3>
                <p style={{color: '#808080', fontSize: '13px'}}>Verification link sent to <strong>{authEmail}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleSignUpUser} style={styles.portalForm}>
                <input type="text" placeholder="Brand Handle (e.g. naira.studio)" value={authBrandName} onChange={(e) => setAuthBrandName(e.target.value)} style={styles.formTextInput} required/>
                <input type="email" placeholder="Email Reference" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} style={styles.formTextInput} required/>
                <input type="password" placeholder="Access Cipher (Password)" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} style={styles.formTextInput} required/>
                <button type="submit" style={styles.launchBtn}>CREATE PLATFORM PROFILE</button>
              </form>
            )}
          </div>
        )}

        {/* VIEW 5: CREATE POST */}
        {activeTab === 'create' && (
          <div style={styles.panelCenterContainer}>
            <h2 style={styles.panelTitleHeader}>DROP EXPRESSION</h2>
            <form onSubmit={handleDropCollectionPost} style={styles.portalForm}>
              <input type="text" placeholder="Location Coordinate (e.g. Lagos, Nigeria)" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} style={styles.formTextInput}/>
              <input type="file" accept="image/*" onChange={handleFileChange} style={styles.nativeHiddenFileInput} id="verified-gallery-uploader" required />
              <label htmlFor="verified-gallery-uploader" style={styles.customFileLabelTriggerBtn}>
                {fileA ? `📁 ${fileA.name.toUpperCase()}` : 'MOUNT MEDIA ASSET'}
              </label>
              {previewA && <img src={previewA} alt="Local preview" style={{width: '100%', borderRadius: '12px', marginBottom: '10px', filter: 'brightness(0.95)'}} />}
              <textarea placeholder="Write index commentary or collection details..." value={newCaption} onChange={(e) => setNewCaption(e.target.value)} style={styles.formTextareaInput} rows="3"/>
              <button type="submit" style={styles.launchBtn}>PUBLISH POST</button>
            </form>
          </div>
        )}

        {/* VIEW 6: USER PROFILE */}
        {activeTab === 'profile' && (
          <div style={styles.profileDashboardContainer}>
            <header style={styles.profileHeaderBox}>
              <div style={{position: 'relative'}}>
                {profileMetadata.avatar_url ? (
                  <img src={profileMetadata.avatar_url} alt="Profile avatar" style={styles.profileAvatarBigImg} />
                ) : (
                  <div style={styles.profileAvatarBig}>{currentBrandSlug.substring(0,2).toUpperCase()}</div>
                )}
                <input type="file" accept="image/*" onChange={handleAvatarUpload} id="avatar-input-file" style={{display: 'none'}} />
                <label htmlFor="avatar-input-file" style={styles.avatarMiniUploadTrigger}>EDIT</label>
              </div>

              <div style={styles.profileMetaInfoColumn}>
                <div style={styles.profileUsernameRow}>
                  <h2 style={styles.profileUsernameHeader}>{currentBrandSlug}</h2>
                  <button onClick={() => { supabase.auth.signOut(); setActiveTab('home'); }} style={styles.editProfileButton}>DISCONNECT</button>
                </div>
                <div style={styles.profileStatsRow}>
                  <span><strong>{myProfilePosts.length}</strong> collections</span>
                </div>

                <form onSubmit={handleUpdateBio} style={{marginTop: '10px', display: 'flex', gap: '10px', flexDirection: 'column'}}>
                  <textarea
                    placeholder="Describe identity..."
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    style={styles.bioEditorTextarea}
                  />
                  <button type="submit" disabled={updatingProfile} style={styles.saveBioBtn}>
                    {updatingProfile ? 'UPDATING...' : 'SAVE BIOGRAPHY'}
                  </button>
                </form>
              </div>
            </header>

            <div style={styles.threeColumnLookbookGrid}>
              {myProfilePosts.map((gridPost) => (
                <div key={gridPost.id} style={styles.gridImageCardWrapper} onClick={() => navigateToProfile(gridPost.username)}>
                  <img src={gridPost.img_a} alt="Profile post" style={styles.gridImageItem} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: BROWSE OTHER PROFILES */}
        {activeTab === 'profile_view' && (
          <div style={styles.profileDashboardContainer}>
            <header style={styles.profileHeaderBox}>
              <div style={styles.profileAvatarBig}>{selectedProfileSlug ? selectedProfileSlug.substring(0,2).toUpperCase() : '?'}</div>
              <div style={styles.profileMetaInfoColumn}>
                <h2 style={styles.profileUsernameHeader}>{selectedProfileSlug}</h2>
                <div style={styles.profileStatsRow}>
                  <span><strong>{selectedBrowsedPosts.length}</strong> collections</span>
                </div>
                <p style={{color: '#808080', fontSize: '13px', marginTop: '10px', whiteSpace: 'pre-wrap', lineHeight: '1.5'}}>
                  {posts.find(p => p.username === selectedProfileSlug)?.caption || 'No brand manifest declared.'}
                </p>
              </div>
            </header>
            <div style={styles.threeColumnLookbookGrid}>
              {selectedBrowsedPosts.map((gridPost) => (
                <div key={gridPost.id} style={styles.gridImageCardWrapper} onClick={() => { setActiveTab('home'); }}>
                  <img src={gridPost.img_a} alt="Post item" style={styles.gridImageItem} />
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

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
  avatarMiniUploadTrigger: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFF', color: '#000', padding: '4px 10px', borderRadius: '20px', fontSize: '9px', fontWeight: '900', cursor: 'pointer' },
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