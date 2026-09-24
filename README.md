
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1">
<title>Marges</title>
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="theme-color" content="#2D3A47">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=KoPub+Batang:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --vanilla:#FFF8EA;
    --blush:#F7C8D3;
    --rosewood:#B46A72;
    --sage:#A8B58A;
    --olive:#8FA05C;
    --olive-text:#6B7A54;
    --misty:#A9B7C6;
    --midnight:#2D3A47;
    --bg:var(--midnight);
    --paper:var(--vanilla);
    --ink:var(--midnight);
    --ink-soft:#59636d;
    --gold:var(--sage);
    --rust:var(--rosewood);
    --teal:var(--misty);
    --rule:rgba(45,58,71,.18);
    --header-h:60px;
    --bar-h:74px;
    --tabs-h:44px;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;height:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;}
  body{
    background:var(--bg);
    font-family:'Instrument Serif', Georgia, serif;
    color:var(--ink);
    overflow:hidden;
    min-height:100%;
    overscroll-behavior:none;
    -webkit-tap-highlight-color:transparent;
  }

  /* ===================== HEADER (Image-2 style, coded, no image asset) ===================== */
  #app-header{
    position:fixed; top:0; left:0; right:0; z-index:80;
    height:calc(var(--header-h) + env(safe-area-inset-top));
    padding-top:env(safe-area-inset-top);
    display:flex; align-items:center;
    padding-left:max(20px, env(safe-area-inset-left));
    padding-right:max(20px, env(safe-area-inset-right));
    background:var(--bg);
    border-bottom:1px solid rgba(168,181,138,.55);
  }
  #app-header .brand{
    font-family:'KoPub Batang','Times New Roman',serif;
    font-weight:700;
    font-size:clamp(22px,5vw,28px);
    color:var(--sage);
    letter-spacing:-.01em;
  }

  /* ===================== FEED CATEGORY TABS ===================== */
  #feed-tabs{
    position:fixed; left:0; right:0; z-index:78;
    top:calc(var(--header-h) + env(safe-area-inset-top));
    height:var(--tabs-h);
    display:flex; align-items:center; gap:22px;
    padding:0 max(20px, env(safe-area-inset-left)) 0 max(20px, env(safe-area-inset-right));
    background:var(--bg);
    border-bottom:1px solid rgba(168,181,138,.28);
    overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none;
  }
  #feed-tabs::-webkit-scrollbar{ display:none; }
  .feed-tab{
    background:transparent; border:none; padding:0; margin:0;
    font:600 14px 'Montserrat',Arial,sans-serif; color:rgba(168,181,138,.6);
    white-space:nowrap; cursor:pointer; position:relative; height:100%;
    display:flex; align-items:center;
  }
  .feed-tab.active{ color:var(--sage); }
  .feed-tab.active::after{
    content:''; position:absolute; left:2px; right:2px; bottom:0;
    height:2px; background:var(--sage); border-radius:2px;
  }

  /* ===================== FEED / CARDS ===================== */
  #feed{
    height:100dvh; min-height:100svh;
    overflow-y:scroll;
    scroll-snap-type:y mandatory;
    scrollbar-width:none;
    overscroll-behavior-y:contain;
    -webkit-overflow-scrolling:touch;
  }
  #feed::-webkit-scrollbar{display:none;}
  section.card-slot{
    height:100dvh; min-height:100svh;
    width:100%;
    display:flex; align-items:center; justify-content:center;
    scroll-snap-align:start; scroll-snap-stop:always;
    position:relative;
    padding:
      calc(var(--header-h) + var(--tabs-h) + env(safe-area-inset-top) + 22px)
      max(16px, env(safe-area-inset-right))
      calc(var(--bar-h) + env(safe-area-inset-bottom) + 22px)
      max(16px, env(safe-area-inset-left));
  }

  .flip-container{
    width:100%; max-width:440px;
    height:100%;
    position:relative;
    perspective:1700px;
    opacity:.35; transform:scale(.94);
    transition:opacity .5s ease, transform .5s ease;
  }
  .card-slot.in-view .flip-container{ opacity:1; transform:scale(1); }
  .card-inner{
    position:relative; width:100%; height:100%;
    transform-style:preserve-3d;
    transition:transform .65s cubic-bezier(.4,.15,.2,1);
  }
  .card-inner.flipped{ transform:rotateY(180deg); }

  .card{
    position:absolute; inset:0;
    background:var(--paper);
    border-radius:28px;
    box-shadow:0 34px 70px -22px rgba(0,0,0,.55), 0 0 0 1px rgba(0,0,0,.04);
    padding:38px 36px 32px;
    display:flex; flex-direction:column;
    backface-visibility:hidden;
    overflow-y:auto;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
  }
  .card::-webkit-scrollbar{display:none;}
  .card.back{ transform:rotateY(180deg); }

  /* Category pill — bordered capsule, italic serif, like Image 2's "Catégorie … post" bar */
  .card-tag-row{
    display:flex; align-items:center; justify-content:space-between;
    gap:10px;
    border:1.4px solid var(--sage);
    border-radius:100px;
    padding:9px 18px;
    margin-bottom:20px;
  }
  .card-tag{
    font-family:'Instrument Serif',Georgia,serif;
    font-style:italic;
    font-size:14px;
    color:var(--olive-text);
    border:none; padding:0; border-radius:0; background:none;
  }
  .card-tag.gold{ color:#8a6a22; }
  .card-tag.back-tag{ color:var(--rust); }
  .card-index{
    position:static;
    font-family:'Instrument Serif',Georgia,serif;
    font-style:italic;
    font-size:13px;
    color:var(--olive-text);
    opacity:.75;
  }

  .card-body{
    flex:1; min-height:0;
    display:flex; flex-direction:column;
    overflow-y:auto; -webkit-overflow-scrolling:touch;
    scrollbar-width:none;
  }
  .card-body::-webkit-scrollbar{display:none;}

  h1.title{
    font-family:'KoPub Batang','Times New Roman',serif;
    font-weight:700;
    color:var(--olive);
    font-size:clamp(30px,7.5vw,46px);
    line-height:1.08;
    letter-spacing:-.01em;
    margin:0 0 14px;
    text-align:left;
  }
  .subtitle{
    font-family:'Montserrat',Arial,sans-serif;
    font-size:12px; color:var(--ink-soft); margin:0 0 14px;
    text-align:left;
  }
  .book-author{
    font-family:'Montserrat',Arial,sans-serif;
    font-size:12px; color:var(--olive-text); margin:0 0 14px;
    text-align:left;
  }
  p.lead{
    font-family:'Instrument Serif',Georgia,serif;
    color:var(--olive-text);
    font-size:clamp(17px,2.6vw,20px);
    line-height:1.42;
    margin:0 0 12px;
    white-space:pre-wrap;
    text-align:left;
  }
  p.lead:last-child{ margin-bottom:0; }
  p.lead mark{ background:var(--sage); color:var(--ink); padding:0 3px; border-radius:2px; }
  ul.takeaways{ margin:0 0 14px; padding-left:18px; }
  ul.takeaways li{
    font-family:'Instrument Serif',Georgia,serif;
    color:var(--olive-text);
    font-size:16px; line-height:1.4; margin-bottom:8px;
  }
  .example{
    margin-top:auto; padding-top:12px;
    border-top:1px dashed rgba(105,116,81,.4);
    font-family:'Instrument Serif',Georgia,serif;
    font-style:italic;
    font-size:15px; color:var(--olive-text); opacity:.85;
    line-height:1.45;
  }
  .diagram-wrap{ flex:1; display:flex; align-items:center; justify-content:center; min-height:150px; }
  .diagram-wrap svg{ width:100%; height:auto; max-height:42vh; }
  .diagram-caption{
    font-family:'Instrument Serif',Georgia,serif;
    font-style:italic;
    font-size:13.5px; color:var(--olive-text); text-align:center; margin-top:8px; line-height:1.4;
  }
  .sources{ margin-top:auto; padding-top:12px; border-top:1px solid rgba(105,116,81,.3); text-align:center; }
  .sources-label{
    font-family:'Instrument Serif',Georgia,serif;
    font-style:italic;
    font-size:11px; color:var(--olive); opacity:.9; margin-bottom:6px;
  }
  .sources ol{ margin:0; padding:0; list-style:none; }
  .sources li{
    font-family:'Instrument Serif',Georgia,serif;
    font-size:12px; color:var(--olive-text); line-height:1.45; margin-bottom:3px;
  }
  .post-source{
    font-family:'Instrument Serif',Georgia,serif;
    color:var(--olive-text); font-size:13px; line-height:1.3; text-align:center;
  }

  /* back-face */
  .back-note{
    font-family:'Instrument Serif',Georgia,serif;
    font-size:16px; line-height:1.55; color:var(--olive-text);
    margin-top:auto; margin-bottom:auto;
  }
  details.quiz summary{
    cursor:pointer;
    font-family:'Montserrat',Arial,sans-serif;
    font-size:11.5px; color:var(--rust); margin-top:14px; list-style:none;
  }
  details.quiz summary::-webkit-details-marker{ display:none; }
  details.quiz summary::before{ content:'→ '; }
  details.quiz[open] summary::before{ content:'↓ '; }
  details.quiz p{
    font-family:'Instrument Serif',Georgia,serif;
    font-size:14.5px; line-height:1.5; color:var(--olive-text);
    margin:8px 0 0; padding-top:8px; border-top:1px dashed rgba(105,116,81,.35);
  }

  /* per-card controls (like / flip) shown on hover / always on touch */
  .card-controls{
    position:absolute; bottom:14px; left:0; right:0;
    display:flex; justify-content:flex-end; gap:10px; padding:0 16px; z-index:6;
    pointer-events:none;
  }
  .ctrl-btn{
    pointer-events:auto;
    width:40px; height:40px; border-radius:50%;
    border:1px solid rgba(255,247,230,.5);
    background:rgba(45,58,71,.55);
    backdrop-filter:blur(3px);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; transition:transform .15s ease;
  }
  .ctrl-btn:active{ transform:scale(.88); }
  .ctrl-btn svg{ width:19px; height:19px; }
  .like-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.7; transition:fill .2s, stroke .2s; }
  .like-btn.liked svg path{ fill:var(--rust); stroke:var(--rust); }
  .flip-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.6; }

  /* ===================== FLOATING PILL ACTION BAR (Image-2 style) ===================== */
  #action-bar{
    position:fixed; left:50%; z-index:90;
    bottom:calc(18px + env(safe-area-inset-bottom));
    transform:translateX(-50%);
    display:flex; align-items:center; gap:28px;
    background:rgba(45,58,71,.85);
    border:1px solid rgba(168,181,138,.45);
    border-radius:100px;
    padding:14px 28px;
    box-shadow:0 12px 30px rgba(0,0,0,.4);
    backdrop-filter:blur(6px);
  }
  .action-btn{
    background:none; border:none; cursor:pointer;
    width:24px; height:24px; padding:0;
    display:flex; align-items:center; justify-content:center;
    color:var(--sage);
    touch-action:manipulation;
  }
  .action-btn svg{ width:100%; height:100%; display:block; }
  .action-btn svg path{ fill:none; stroke:var(--sage); stroke-width:1.6; }
  #like-current-btn.liked svg path{ fill:var(--sage); }
  #msg-btn .dot{ display:none; }

  #nav{
    position:fixed; right:10px; top:50%; transform:translateY(-50%);
    display:flex; flex-direction:column; gap:9px; z-index:10;
  }
  #nav button{
    width:6px; height:6px; border-radius:50%; border:none;
    background:rgba(255,247,230,.25); padding:0; cursor:pointer;
    transition:background .3s, transform .3s;
  }
  #nav button.active{ background:var(--gold); transform:scale(1.6); }

  .hint{
    position:fixed; left:0; right:0; z-index:5;
    bottom:calc(var(--bar-h) + env(safe-area-inset-bottom) + 8px);
    text-align:center;
    font-family:'Montserrat',Arial,sans-serif; font-size:10.5px;
    color:rgba(255,247,230,.4); letter-spacing:.03em; pointer-events:none;
    transition:opacity .6s;
  }

  /* ===================== OVERLAYS / MODALS ===================== */
  .overlay{
    position:fixed; inset:0; background:rgba(10,17,15,.86);
    display:none; align-items:flex-end; justify-content:center;
    z-index:150; padding:max(10px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-right)) max(10px,env(safe-area-inset-bottom)) max(10px,env(safe-area-inset-left));
  }
  .overlay.open{ display:flex; }

  /* ===================== AUTH SCREEN (Firebase) ===================== */
  #auth-screen{
    position:fixed; inset:0; background:var(--midnight);
    display:none; align-items:center; justify-content:center;
    z-index:400; padding:20px;
  }
  #auth-screen.open{ display:flex; }
  .auth-panel{
    width:100%; max-width:360px; background:var(--paper); border-radius:20px;
    padding:32px 26px; box-shadow:0 30px 60px rgba(0,0,0,.5);
  }
  .auth-title{
    font-family:'KoPub Batang','Times New Roman',serif; font-weight:700;
    font-size:28px; color:var(--olive); margin:0 0 6px;
  }
  .auth-sub{ font-family:'Montserrat',Arial,sans-serif; font-size:13px; color:var(--ink-soft); margin:0 0 18px; }
  .auth-error{ font-family:'Montserrat',Arial,sans-serif; font-size:12px; color:var(--rust); min-height:16px; margin:-8px 0 10px; }
  .modal-panel{
    background:var(--paper); border-radius:16px 16px 8px 8px;
    width:100%; max-width:420px; max-height:min(90dvh,760px);
    display:flex; flex-direction:column; overflow:hidden;
    box-shadow:0 30px 60px rgba(0,0,0,.5);
  }
  .wide-panel{ max-width:520px; }
  .modal-head{
    display:flex; align-items:center; justify-content:space-between;
    padding:14px 16px 11px; border-bottom:1px solid var(--rule);
  }
  .modal-head h2{
    font-family:'KoPub Batang','Times New Roman',serif;
    font-weight:700; font-size:19px; margin:0; color:var(--olive);
  }
  .modal-close{
    background:none; border:none; cursor:pointer;
    font-family:'Montserrat',Arial,sans-serif; font-size:13px; color:var(--ink-soft);
    min-height:40px;
  }
  .modal-body{ padding:14px 16px 18px; overflow-y:auto; -webkit-overflow-scrolling:touch; }
  .field-label{
    font-family:'Montserrat',Arial,sans-serif; font-size:10.5px; color:var(--ink-soft);
    margin-bottom:6px; display:block;
  }
  .mode-toggle{
    display:flex; margin-bottom:16px; border:1px solid var(--ink); border-radius:100px; overflow:hidden;
  }
  .mode-btn{
    flex:1; padding:9px 0; border:none; background:transparent;
    font-family:'Montserrat',Arial,sans-serif; font-size:12px; color:var(--ink); cursor:pointer; min-height:40px;
  }
  .mode-btn.active{ background:var(--ink); color:var(--paper); }
  .text-toolbar{ display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap; }
  .tb-btn{
    font-family:'Montserrat',Arial,sans-serif; font-size:11px; padding:8px 10px;
    border:1px solid var(--rule); border-radius:4px; background:#ffffff40; color:var(--ink);
    cursor:pointer; min-height:40px;
  }
  #compose-text, #compose-title, #compose-source, #compose-legend, #add-contact, #thread-input, #library-search, #auth-email, #auth-password{
    font-size:16px; /* avoid iOS zoom */
  }
  #compose-text{ white-space:pre-wrap; }
  .file-btn{
    display:inline-block; font-family:'Montserrat',Arial,sans-serif; font-size:12px;
    padding:9px 14px; border:1px solid var(--ink); border-radius:4px; cursor:pointer;
    background:transparent; color:var(--ink); margin-bottom:12px; min-height:40px;
  }
  .compose-preview{
    width:100%; max-height:180px; object-fit:cover; border-radius:4px;
    margin-bottom:12px; display:none; background:#00000010;
  }
  #compose-caption{
    width:100%; font-family:'Instrument Serif',Georgia,serif; font-size:16px; padding:10px;
    border:1px solid var(--rule); border-radius:4px; resize:vertical; min-height:70px;
    margin-bottom:14px; background:#ffffff40; color:var(--ink);
  }
  .select-field, #compose-title, .library-folder-select{
    font-family:'Montserrat',Arial,sans-serif;
  }
  #compose-title, #compose-source, #compose-legend, .select-field, #library-search, #add-contact, #thread-input, #auth-email, #auth-password{
    width:100%; padding:9px 10px; border:1px solid var(--rule); border-radius:4px;
    margin-bottom:14px; background:#ffffff40; color:var(--ink);
  }
  #compose-text{
    width:100%; padding:10px; border:1px solid var(--rule); border-radius:4px;
    margin-bottom:14px; background:#ffffff40; color:var(--ink); font-family:'Instrument Serif',Georgia,serif;
  }
  .modal-actions{ display:flex; gap:10px; justify-content:flex-end; }
  .btn{
    font-family:'Montserrat',Arial,sans-serif; font-size:12px; padding:9px 16px; border-radius:4px;
    cursor:pointer; border:1px solid var(--ink); background:transparent; color:var(--ink); min-height:40px;
  }
  .btn.primary{ background:var(--ink); color:var(--paper); }
  .btn.primary:disabled{ opacity:.4; cursor:default; }

  .compose-type-wrap{ margin-bottom:14px; }
  .compose-type-help{ font-size:12px; color:var(--ink-soft); margin-top:5px; font-style:italic; }
  .schema-builder{ display:none; margin:4px 0 14px; padding:12px; border:1px solid var(--rule); border-radius:6px; background:#ffffff38; }
  .schema-builder.open{ display:block; }
  .schema-grid{ display:grid; grid-template-columns:1fr; gap:8px; }
  .schema-node{ display:flex; align-items:center; gap:8px; }
  .schema-node input{ flex:1; font-family:'Instrument Serif',Georgia,serif; font-size:15px; padding:9px 10px; border:1px solid var(--rule); border-radius:4px; background:#ffffff66; color:var(--ink); }
  .schema-arrow{ text-align:center; font:700 18px serif; color:var(--rosewood); line-height:1; }
  .schema-note{ font-size:11px; color:var(--ink-soft); font-style:italic; margin-top:8px; }
  .schema-card{ display:flex; flex-direction:column; gap:8px; margin-top:12px; }
  .schema-card-node{ padding:11px 12px; border:1px solid var(--rule); border-radius:5px; background:rgba(168,181,138,.28); font-size:16px; font-weight:700; text-align:center; }
  .schema-card-arrow{ text-align:center; font-size:20px; color:var(--rosewood); line-height:.8; }

  .profile-chip{
    font-family:'Montserrat',Arial,sans-serif; font-size:11px; color:var(--ink-soft);
    display:flex; align-items:center; gap:8px; margin-bottom:14px;
  }
  .profile-chip button{ background:none; border:none; color:var(--rust); font-family:inherit; font-size:11px; cursor:pointer; text-decoration:underline; padding:0; }

  #contact-list{ list-style:none; margin:0 0 14px; padding:0; }
  #contact-list li{ padding:10px 8px; border-bottom:1px solid var(--rule); cursor:pointer; font-size:14.5px; }
  #contact-list li:hover{ background:#00000008; }
  #thread-view{ display:none; flex-direction:column; }
  #thread-view.active{ display:flex; }
  #thread-back{ background:none; border:none; cursor:pointer; font-family:'Montserrat',Arial,sans-serif; font-size:11px; color:var(--ink-soft); margin-bottom:10px; text-align:left; padding:0; }
  #thread-messages{ display:flex; flex-direction:column; gap:8px; max-height:42dvh; overflow-y:auto; margin-bottom:12px; padding-right:4px; }
  .msg-bubble{ max-width:78%; padding:8px 12px; border-radius:12px; font-size:14px; line-height:1.4; }
  .msg-bubble.mine{ align-self:flex-end; background:var(--ink); color:var(--paper); border-bottom-right-radius:3px; }
  .msg-bubble.theirs{ align-self:flex-start; background:rgba(169,183,198,.28); color:var(--ink); border-bottom-left-radius:3px; }
  .msg-meta{ font-family:'Montserrat',Arial,sans-serif; font-size:9.5px; color:var(--ink-soft); margin-top:2px; }
  #thread-input-row{ display:flex; gap:8px; }
  #thread-input{ flex:1; margin-bottom:0; }
  .empty-note{ font-size:13.5px; color:var(--ink-soft); font-style:italic; }

  /* library */
  .library-tools{ display:grid; grid-template-columns:1fr auto; gap:8px; margin-bottom:12px; }
  #library-search{ margin-bottom:0; }
  .filter-row{ display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
  .filter-chip{ border:1px solid var(--rule); background:transparent; color:var(--ink); border-radius:100px; padding:8px 10px; font:500 10.5px 'Montserrat',Arial,sans-serif; cursor:pointer; min-height:36px; }
  .filter-chip.active{ background:var(--ink); color:var(--paper); }
  .folder-bar{ display:flex; gap:7px; align-items:center; flex-wrap:wrap; margin:0 0 12px; }
  .folder-chip{ border:1px solid var(--rule); background:transparent; color:var(--ink); border-radius:100px; padding:7px 10px; font:500 10.5px 'Montserrat',Arial,sans-serif; cursor:pointer; }
  .folder-chip.active{ background:var(--ink); color:var(--paper); }
  .folder-add{ width:32px; height:32px; border-radius:50%; border:1px solid var(--ink); background:transparent; color:var(--ink); font:16px 'Montserrat',Arial,sans-serif; cursor:pointer; }
  #library-results{ display:flex; flex-direction:column; gap:22px; max-height:56dvh; overflow:auto; padding-right:2px; }
  .library-section-title{
    font-family:'Montserrat',Arial,sans-serif; font-weight:600; font-size:12px;
    text-transform:uppercase; letter-spacing:.06em; color:var(--olive-text);
    display:flex; align-items:center; gap:6px; margin-bottom:2px;
  }
  .library-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(108px,1fr)); gap:14px; }
  .cover-card{ display:flex; flex-direction:column; gap:6px; cursor:pointer; }
  .cover-thumb{
    position:relative; width:100%; aspect-ratio:3/4; border-radius:10px;
    overflow:hidden; display:flex; align-items:center; justify-content:center;
    box-shadow:0 8px 18px rgba(0,0,0,.28);
    padding:10px; text-align:center;
  }
  .cover-thumb img{ width:100%; height:100%; object-fit:cover; }
  .cover-thumb-title{
    font-family:'KoPub Batang','Times New Roman',serif; font-weight:700;
    color:rgba(255,255,255,.92); font-size:13px; line-height:1.2;
  }
  .cover-star{
    position:absolute; top:6px; right:6px; z-index:2;
    width:22px; height:22px; border-radius:50%; border:none;
    background:rgba(20,24,20,.5); color:#fff; font-size:12px;
    display:flex; align-items:center; justify-content:center; cursor:pointer;
  }
  .cover-star.active{ color:#F7C8D3; }
  .cover-title{ font-family:'Instrument Serif',Georgia,serif; font-size:13.5px; color:var(--ink); line-height:1.25; }
  .cover-meta{ font-family:'Montserrat',Arial,sans-serif; font-size:10px; color:var(--ink-soft); }
  .cover-actions{ display:flex; gap:5px; margin-top:2px; }
  .cover-action-btn{
    flex:1; border:1px solid var(--rule); background:#ffffff40;
    color:var(--ink); border-radius:5px; padding:4px 0; font-size:11px; cursor:pointer;
    min-height:26px;
  }
  .cover-action-btn.danger{ color:var(--rosewood); }
  .library-quit{
    display:block; width:100%; margin-top:16px; text-align:center;
    font-family:'Montserrat',Arial,sans-serif;
  }
  .library-footer{ display:flex; gap:8px; flex-wrap:wrap; padding-top:14px; margin-top:14px; border-top:1px solid var(--rule); }
  #import-file{ display:none; }
  .status-toast{
    position:fixed; left:50%; z-index:190; bottom:calc(var(--bar-h) + env(safe-area-inset-bottom) + 16px);
    transform:translateX(-50%) translateY(10px);
    background:var(--paper); color:var(--ink); border:1px solid var(--rule); border-radius:100px;
    padding:8px 13px; font:500 11px 'Montserrat',Arial,sans-serif; opacity:0; pointer-events:none;
    transition:.25s; box-shadow:0 8px 20px rgba(0,0,0,.2);
  }
  .status-toast.show{ opacity:1; transform:translateX(-50%) translateY(0); }

  /* user-posted photo cards */
  .card.photo{ background:#000; padding:0; }
  .card.photo .card-body{ margin:0; padding:0; border:0; height:100%; overflow:hidden; }
  .post-photo{ width:100%; height:100%; object-fit:cover; display:block; }
  .post-tools{ position:absolute; top:14px; right:14px; z-index:7; display:flex; gap:7px; }
  .post-tool-btn{
    width:34px; height:34px; border-radius:50%; border:1px solid rgba(255,247,230,.5);
    background:rgba(45,58,71,.62); color:var(--paper); display:flex; align-items:center; justify-content:center;
    cursor:pointer; font:600 12px 'Montserrat',Arial,sans-serif; backdrop-filter:blur(3px);
  }
  .delete-btn{
    width:34px; height:34px; border-radius:50%; border:1px solid rgba(255,247,230,.5);
    background:rgba(45,58,71,.62); display:flex; align-items:center; justify-content:center; cursor:pointer;
  }
  .delete-btn svg{ width:14px; height:14px; }
  .delete-btn svg path{ fill:none; stroke:#FFF7E6; stroke-width:1.7; }
  .deleted-card{ display:none !important; }
  .hidden-by-filter{ display:none !important; }

  @media (max-width:380px){
    section.card-slot{ padding-left:9px; padding-right:9px; }
    .card{ padding-left:20px; padding-right:20px; }
    p.lead{ font-size:16px; }
    #action-bar{ gap:22px; padding:12px 20px; }
  }
  @media (orientation:landscape) and (max-height:520px){
    :root{ --header-h:48px; --bar-h:60px; --tabs-h:40px; }
  }
  @media (prefers-reduced-motion:reduce){
    .flip-container,.card-inner,.ctrl-btn{ transition:none !important; }
    #feed{ scroll-behavior:auto !important; }
  }

  /* ===================== QUIZ ===================== */
  .quiz-options{ display:flex; flex-direction:column; gap:10px; margin:4px 0 14px; }
  .quiz-option-btn{
    text-align:left; font-family:'Instrument Serif',Georgia,serif; font-size:16.5px;
    color:var(--ink); background:#ffffff55; border:1.4px solid var(--rule);
    border-radius:10px; padding:12px 14px; cursor:pointer; line-height:1.35;
    transition:border-color .15s, background .15s, transform .1s;
  }
  .quiz-option-btn:active{ transform:scale(.98); }
  .quiz-option-btn .qo-letter{
    display:inline-flex; align-items:center; justify-content:center;
    width:22px; height:22px; border-radius:50%; border:1.2px solid var(--olive-text);
    font-family:'Montserrat',Arial,sans-serif; font-size:11px; color:var(--olive-text);
    margin-right:10px; flex-shrink:0; vertical-align:middle;
  }
  .quiz-options.answered .quiz-option-btn{ cursor:default; }
  .quiz-option-btn.correct{
    border-color:var(--olive); background:rgba(168,181,138,.32);
  }
  .quiz-option-btn.correct .qo-letter{ background:var(--olive); border-color:var(--olive); color:#fff; }
  .quiz-option-btn.incorrect{
    border-color:var(--rosewood); background:rgba(180,106,114,.16);
  }
  .quiz-option-btn.incorrect .qo-letter{ background:var(--rosewood); border-color:var(--rosewood); color:#fff; }
  .quiz-options.answered .quiz-option-btn:not(.correct):not(.incorrect){ opacity:.5; }
  .quiz-feedback{
    font-family:'Montserrat',Arial,sans-serif; font-size:12.5px; font-weight:600;
    letter-spacing:.01em; margin:-2px 0 12px; min-height:16px;
  }
  .quiz-feedback.is-correct{ color:var(--olive-text); }
  .quiz-feedback.is-incorrect{ color:var(--rosewood); }
  .quiz-hint{
    margin-top:auto; padding-top:12px; border-top:1px dashed rgba(105,116,81,.4);
    font-family:'Instrument Serif',Georgia,serif; font-style:italic; font-size:13.5px;
    color:var(--olive-text); opacity:.85; text-align:center;
  }

  .vocab-builder{ display:none; margin:4px 0 14px; padding:12px; border:1px solid var(--rule); border-radius:6px; background:#ffffff38; }
  .vocab-builder.open{ display:block; }
  .quiz-builder{ display:none; margin:4px 0 14px; padding:12px; border:1px solid var(--rule); border-radius:6px; background:#ffffff38; }
  .quiz-builder.open{ display:block; }
  .vocab-body{ text-align:center; }
  .vocab-center{ flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; width:100%; }
  .vocab-word{ text-align:center; margin:0; }
  .vocab-image{ width:100%; display:flex; justify-content:center; }
  .vocab-translation{ text-align:center; margin:0; }
  .quiz-builder textarea{
    width:100%; padding:10px; border:1px solid var(--rule); border-radius:4px;
    margin-bottom:12px; background:#ffffff66; color:var(--ink); font-family:'Instrument Serif',Georgia,serif; font-size:15px;
  }
  .quiz-option-row{ display:flex; align-items:center; gap:8px; margin-bottom:8px; }
  .quiz-option-row input[type="text"]{
    flex:1; font-family:'Instrument Serif',Georgia,serif; font-size:15px; padding:9px 10px;
    border:1px solid var(--rule); border-radius:4px; background:#ffffff66; color:var(--ink);
  }
  .quiz-option-row input[type="radio"]{ width:18px; height:18px; margin:0; flex-shrink:0; accent-color:var(--olive); }
  .quiz-option-row .qr-label{ font-family:'Montserrat',Arial,sans-serif; font-size:9.5px; color:var(--ink-soft); text-align:center; width:34px; flex-shrink:0; line-height:1.2; }
  .quiz-note{ font-size:11px; color:var(--ink-soft); font-style:italic; margin-top:2px; }

  /* confetti celebration */
  .confetti-layer{ position:fixed; inset:0; pointer-events:none; z-index:500; overflow:hidden; }
  .confetti-piece{
    position:absolute; width:8px; height:14px; border-radius:2px; opacity:.95;
    animation-name:confetti-fall; animation-timing-function:cubic-bezier(.15,.6,.4,1); animation-fill-mode:forwards;
  }
  @keyframes confetti-fall{
    0%{ transform:translate(0,0) rotate(0deg); opacity:1; }
    100%{ transform:translate(var(--dx,0px), 78vh) rotate(var(--rot,360deg)); opacity:0; }
  }
</style>
</head>
<body>

<div id="auth-screen">
  <div class="auth-panel">
    <h1 class="auth-title">Marges</h1>
    <p class="auth-sub" id="auth-status">Connexion à votre bibliothèque…</p>
    <div id="auth-form-wrap" style="display:none;">
      <div class="mode-toggle" id="auth-mode-toggle">
        <button class="mode-btn active" data-mode="login" type="button">Se connecter</button>
        <button class="mode-btn" data-mode="signup" type="button">Créer un compte</button>
      </div>
      <span class="field-label">E-mail</span>
      <input type="email" id="auth-email" placeholder="vous@exemple.com" autocomplete="email">
      <span class="field-label">Mot de passe</span>
      <input type="password" id="auth-password" placeholder="••••••••" autocomplete="current-password">
      <p class="auth-error" id="auth-error"></p>
      <button class="btn primary" id="auth-submit" style="width:100%;">Se connecter</button>
    </div>
  </div>
</div>

<header id="app-header">
  <span class="brand">Marges.</span>
</header>

<div id="feed-tabs" role="tablist" aria-label="Catégories">
  <button type="button" class="feed-tab active" data-cat="all">Tous</button>
</div>

<nav id="action-bar" aria-label="Actions">
  <button id="msg-btn" class="action-btn" aria-label="Messagerie">
    <svg viewBox="0 0 22 18"><path d="M1 2h20v14H1z M1 2l10 9 10-9"/></svg>
    <span class="dot"></span>
  </button>
  <button id="library-btn" class="action-btn" aria-label="Bibliothèque">
    <svg viewBox="0 0 20 22"><path d="M3 2h14v18l-7-4.5L3 20V2z"/></svg>
  </button>
  <button id="like-current-btn" class="action-btn" aria-label="Aimer la fiche affichée">
    <svg viewBox="0 0 20 18"><path d="M10 17 C2 11 1 5 5.5 2.5 C8 1 10 2.5 10 5 C10 2.5 12 1 14.5 2.5 C19 5 18 11 10 17 Z"/></svg>
  </button>
  <button id="compose-btn" class="action-btn" aria-label="Publier une fiche">
    <svg viewBox="0 0 20 20"><path d="M10 2v16 M2 10h16"/></svg>
  </button>
</nav>

<div id="feed">

  <section class="card-slot">
    <div class="flip-container"><div class="card-inner"><div class="card">
      <div class="card-tag-row"><span class="card-tag">Introduction</span><span class="card-index">N° 00</span></div>
      <div class="card-body">
        <h1 class="title" style="font-size:38px;">Marges</h1>
        <p class="subtitle" style="margin-bottom:20px;">notes de lecture, à défiler</p>
        <p class="lead">Le même geste que sur les réseaux — mais chaque écran est une idée, un schéma ou un livre résumé, sources à l'appui.</p>
        <p class="lead" style="font-size:14px; opacity:.85;">Touchez le cœur pour garder une fiche. Touchez ⟲ pour la retourner et creuser un peu plus. Touchez + pour publier votre propre fiche.</p>
        <p class="example">Faites glisser vers le haut pour commencer.</p>
      </div>
    </div></div></div>
  </section>

  <div id="user-posts-anchor"></div>

  <section class="card-slot">
    <div class="flip-container"><div class="card-inner"><div class="card">
      <div class="card-tag-row"><span class="card-tag">Fin</span><span class="card-index">Fin</span></div>
      <div class="card-body">
        <h1 class="title" style="font-size:30px;">Vous êtes à jour.</h1>
        <p class="lead" style="margin-top:10px;">Une seule règle : rien n'est affirmé sans qu'on puisse en retrouver la source.</p>
        <p class="example">Touchez + pour publier votre première fiche.</p>
      </div>
    </div></div></div>
  </section>

</div>

<div id="nav"></div>
<div class="hint" id="hint">faites glisser vers le haut</div>

<!-- COMPOSE OVERLAY -->
<div class="overlay" id="compose-overlay">
  <div class="modal-panel">
    <div class="modal-head">
      <h2>Nouvelle fiche</h2>
      <button class="modal-close" id="compose-close">fermer ✕</button>
    </div>
    <div class="modal-body">
      <div class="mode-toggle">
        <button type="button" class="mode-btn active" data-mode="photo">Image recto / verso</button>
        <button type="button" class="mode-btn" data-mode="text">Texte</button>
      </div>

      <div id="compose-photo-fields">
        <span class="field-label">Recto</span>
        <label class="file-btn" for="compose-file-front">Choisir une image</label>
        <input type="file" id="compose-file-front" accept="image/*" style="display:none;">
        <img id="compose-preview-front" class="compose-preview" alt="Aperçu recto">

        <span class="field-label">Verso <span style="opacity:0.6;">(optionnel — pour pouvoir retourner la fiche)</span></span>
        <label class="file-btn" for="compose-file-back">Choisir une image</label>
        <input type="file" id="compose-file-back" accept="image/*" style="display:none;">
        <img id="compose-preview-back" class="compose-preview" alt="Aperçu verso">
      </div>

      <div id="compose-text-fields" style="display:none;">
        <div class="compose-type-wrap">
          <span class="field-label">Catégorie</span>
          <select id="compose-type" class="select-field">
            <option value="Concept">Concept</option>
            <option value="Schéma">Schéma</option>
            <option value="Définition">Définition</option>
            <option value="Question">Question</option>
            <option value="Résumé de livre">Résumé de livre</option>
            <option value="Citation">Citation</option>
            <option value="Quiz">Quiz</option>
            <option value="Vocabulaire">Vocabulaire</option>
            <option value="Note">Note libre</option>
          </select>
          <div class="compose-type-help">Le type donne un cadre visuel, mais le contenu reste libre.</div>
          <div class="schema-builder" id="schema-builder">
            <span class="field-label">Construire le schéma</span>
            <div class="schema-grid">
              <div class="schema-node"><span>1</span><input id="schema-node-1" placeholder="Idée / élément de départ"></div>
              <div class="schema-arrow">↓</div>
              <div class="schema-node"><span>2</span><input id="schema-node-2" placeholder="Relation / transformation"></div>
              <div class="schema-arrow">↓</div>
              <div class="schema-node"><span>3</span><input id="schema-node-3" placeholder="Résultat / idée finale"></div>
            </div>
            <div class="schema-note">Le schéma reste personnalisable : tu peux laisser un bloc vide.</div>
          </div>

          <div class="quiz-builder" id="quiz-builder">
            <span class="field-label">Question (affichée au recto)</span>
            <textarea id="quiz-question" placeholder="Ex. Quelle est la capitale de l'Australie ?" style="min-height:70px;"></textarea>
            <span class="field-label">Réponses possibles — cochez la bonne</span>
            <div class="quiz-option-row">
              <input type="radio" name="quiz-correct-radio" value="0" checked>
              <span class="qr-label">Bonne réponse</span>
              <input type="text" id="quiz-option-0" placeholder="Réponse A">
            </div>
            <div class="quiz-option-row">
              <input type="radio" name="quiz-correct-radio" value="1">
              <span class="qr-label">Bonne réponse</span>
              <input type="text" id="quiz-option-1" placeholder="Réponse B">
            </div>
            <div class="quiz-option-row">
              <input type="radio" name="quiz-correct-radio" value="2">
              <span class="qr-label">Bonne réponse</span>
              <input type="text" id="quiz-option-2" placeholder="Réponse C (optionnel)">
            </div>
            <div class="quiz-option-row">
              <input type="radio" name="quiz-correct-radio" value="3">
              <span class="qr-label">Bonne réponse</span>
              <input type="text" id="quiz-option-3" placeholder="Réponse D (optionnel)">
            </div>
            <div class="quiz-note">Au moins deux réponses, et le rond coché indique la bonne.</div>
            <span class="field-label" style="margin-top:12px;">Développement (affiché au verso, quand on retourne la fiche)</span>
            <textarea id="quiz-explanation" placeholder="Expliquez ici pourquoi c'est la bonne réponse…" style="min-height:100px;"></textarea>
          </div>

          <div class="vocab-builder" id="vocab-builder">
            <div class="compose-type-help" style="margin:0 0 10px;">Le mot s'affiche au recto, la traduction apparaît quand on retourne la fiche.</div>
            <span class="field-label">Traduction en français (affichée au verso)</span>
            <textarea id="vocab-translation" placeholder="La traduction du mot en français…" style="min-height:90px;"></textarea>
          </div>
        </div>

        <div id="compose-title-group">
          <span class="field-label" id="compose-title-label">Titre</span>
          <input type="text" id="compose-title" placeholder="Le titre de votre fiche">
        </div>

        <div style="display:flex; gap:10px; margin-bottom:14px;">
          <div style="flex:1;">
            <span class="field-label">Taille du titre</span>
            <select id="compose-title-size" class="select-field" style="margin-bottom:0;">
              <option value="26">Petit</option>
              <option value="36" selected>Moyen</option>
              <option value="46">Grand</option>
            </select>
          </div>
          <div style="flex:1;">
            <span class="field-label">Taille du texte</span>
            <select id="compose-text-size" class="select-field" style="margin-bottom:0;">
              <option value="15">Petit</option>
              <option value="18" selected>Moyen</option>
              <option value="22">Grand</option>
            </select>
          </div>
        </div>

        <div id="compose-image-group">
          <span class="field-label">Image <span style="opacity:0.6;">(optionnel — les PNG à fond transparent sont conservés)</span></span>
          <label class="file-btn" for="compose-image-file">Choisir une image</label>
          <input type="file" id="compose-image-file" accept="image/*" style="display:none;">
          <img id="compose-image-preview" class="compose-preview" alt="Aperçu de l'image" style="object-fit:contain; background:repeating-conic-gradient(#00000012 0% 25%, transparent 0% 50%) 50% / 18px 18px;">
          <button type="button" class="btn" id="compose-image-remove" style="display:none; margin:-4px 0 12px;">Retirer l'image</button>
          <div id="compose-image-size-row" style="display:none; margin:-4px 0 14px;">
            <span class="field-label">Taille de l'image : <span id="compose-image-size-label">60%</span></span>
            <input type="range" id="compose-image-size" min="15" max="100" step="5" value="60" style="width:100%;">
          </div>
        </div>

        <div id="compose-text-group">
          <span class="field-label">Texte</span>
          <div class="text-toolbar">
            <button type="button" class="tb-btn" data-action="bold" title="Gras"><strong>G</strong></button>
            <button type="button" class="tb-btn" data-action="italic" title="Italique"><em>I</em></button>
            <button type="button" class="tb-btn" data-action="highlight" title="Surligner">Surligner</button>
            <button type="button" class="tb-btn" data-action="newline" title="Aller à la ligne">↵ Ligne</button>
            <button type="button" class="tb-btn" data-action="space" title="Espacement">␣ Espace</button>
          </div>
          <textarea id="compose-text" placeholder="Votre idée, expliquée en quelques phrases…" style="min-height:140px;"></textarea>
        </div>

        <span class="field-label"><span id="compose-source-label">Source</span> <span id="compose-source-optional" style="opacity:0.6;">(optionnel)</span></span>
        <input type="text" id="compose-source" placeholder="Livre, article, lien ou référence…">

        <span class="field-label">Légende <span style="opacity:0.6;">(optionnel — remplace votre nom en signature)</span></span>
        <input type="text" id="compose-legend" placeholder="Vous">
        <div id="compose-back-toggle-group">
          <label style="display:flex; align-items:center; gap:8px; font-family:'Montserrat',Arial,sans-serif; font-size:12px; color:var(--ink-soft); cursor:pointer; margin-bottom:10px;">
            <input type="checkbox" id="compose-has-back" style="width:16px; height:16px; margin:0;">
            Ajouter un verso (texte) pour pouvoir retourner la fiche
          </label>
          <div id="compose-back-fields" style="display:none; padding:12px; border:1px solid var(--rule); border-radius:6px; margin-bottom:14px; background:#ffffff30;">
            <span class="field-label">Titre du verso <span style="opacity:0.6;">(optionnel)</span></span>
            <input type="text" id="compose-back-title" placeholder="Titre au verso">
            <span class="field-label">Texte du verso</span>
            <textarea id="compose-back-text" placeholder="Le contenu affiché quand on retourne la fiche…" style="min-height:110px; margin-bottom:0;"></textarea>
          </div>
        </div>

        <span class="field-label">Dossier</span>
        <select id="compose-folder" class="select-field"><option value="">Sans dossier</option></select>
      </div>

      <div class="modal-actions">
        <button class="btn" id="compose-cancel">Annuler</button>
        <button class="btn primary" id="compose-submit" disabled>Publier</button>
      </div>
    </div>
  </div>
</div>


<!-- LIBRARY / DISCOVERY OVERLAY -->
<div class="overlay" id="library-overlay">
  <div class="modal-panel wide-panel">
    <div class="modal-head">
      <h2>Ma bibliothèque</h2>
      <button class="modal-close" id="library-close">✕</button>
    </div>
    <div class="modal-body">
      <div class="library-tools">
        <input id="library-search" type="search" placeholder="Rechercher dans les fiches…">
        <button class="btn" id="random-card">Aléatoire</button>
      </div>
      <div class="filter-row" id="library-filters">
        <button class="filter-chip active" data-filter="all">Toutes</button>
        <button class="filter-chip" data-filter="favorites">★ Favoris</button>
        <button class="filter-chip" data-filter="mine">Mes fiches</button>
      </div>
      <div class="filter-row" id="library-category-filters"></div>
      <div class="folder-bar" id="folder-bar">
        <button class="folder-chip active" data-folder="all">Tous les dossiers</button>
        <button class="folder-add" id="add-folder" title="Créer un dossier">+</button>
      </div>
      <div id="library-results"></div>
      <input type="file" id="cover-file-input" accept="image/*" style="display:none;">
      <div class="library-footer">
        <button class="btn" id="export-data">Exporter mes données</button>
        <label class="btn" for="import-file">Importer</label>
        <input id="import-file" type="file" accept="application/json,.json">
      </div>
      <button class="btn library-quit" id="library-quit">← Quitter la bibliothèque</button>
    </div>
  </div>
</div>
<div class="status-toast" id="status-toast"></div>

<!-- MESSAGES OVERLAY -->
<div class="overlay" id="messages-overlay">
  <div class="modal-panel">
    <div class="modal-head">
      <h2>Messagerie</h2>
      <button class="modal-close" id="messages-close">fermer ✕</button>
    </div>
    <div class="modal-body">
      <div class="profile-chip">
        Vous discutez en tant que <strong id="profile-name">Vous</strong>
        <button id="change-profile">changer</button>
        <button id="logout-btn">déconnexion</button>
      </div>

      <div id="list-view">
        <span class="field-label">Démo — ce navigateur simule plusieurs comptes. Tapez un nom pour lui écrire.</span>
        <input type="text" id="add-contact" placeholder="Nom d'un contact (ex. Léa)">
        <ul id="contact-list"></ul>
        <p class="empty-note" id="no-contacts">Aucune conversation pour l'instant.</p>
      </div>

      <div id="thread-view">
        <button id="thread-back">← retour aux conversations</button>
        <div id="thread-messages"></div>
        <div id="thread-input-row">
          <input type="text" id="thread-input" placeholder="Écrire un message…">
          <button class="btn primary" id="thread-send">Envoyer</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
  import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDWGmSX-cAmv9RUeFGES-xS0G-MYjKHpAc",
    authDomain: "marges-738db.firebaseapp.com",
    projectId: "marges-738db",
    storageBucket: "marges-738db.firebasestorage.app",
    messagingSenderId: "513479975491",
    appId: "1:513479975491:web:2ec90f80ed992c54702af6"
  };

  const fbApp = initializeApp(firebaseConfig);
  const auth = getAuth(fbApp);
  const db = getFirestore(fbApp);

  window.MargesCloud = { auth, db, doc, getDoc, setDoc, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };
  window.dispatchEvent(new Event('marges-firebase-ready'));
</script>

<script>
(() => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const feed=$('#feed'), nav=$('#nav'), hint=$('#hint'), feedTabsBar=$('#feed-tabs');
  let feedCategory='all';
  const KEYS={posts:'marges:v5:posts',favorites:'marges:v5:favorites',profile:'marges:v5:profile',messages:'marges:v5:messages',settings:'marges:v5:settings',folders:'marges:v5:folders',folderMap:'marges:v5:folderMap',deletedCards:'marges:v5:deletedCards',covers:'marges:v5:covers',quizAnswers:'marges:v5:quizAnswers'};
  let applyingCloudData=false;
  const store={
    get(k,fallback=null){try{const v=localStorage.getItem(k);return v===null?fallback:JSON.parse(v)}catch(e){return fallback}},
    set(k,v){try{localStorage.setItem(k,JSON.stringify(v));if(!applyingCloudData)scheduleCloudPush();return true}catch(e){toast('Stockage local saturé — exportez vos données.');return false}},
    del(k){localStorage.removeItem(k)}
  };
  let favorites, posts, activeProfile, folders, folderMap, deletedCards, covers, quizAnswers;
  function loadLocalState(){
    favorites=new Set(store.get(KEYS.favorites,[]));
    posts=store.get(KEYS.posts,[]);
    activeProfile=store.get(KEYS.profile,'Vous');
    folders=store.get(KEYS.folders,[]);
    folderMap=store.get(KEYS.folderMap,{});
    deletedCards=new Set(store.get(KEYS.deletedCards,[]));
    covers=store.get(KEYS.covers,{});
    quizAnswers=store.get(KEYS.quizAnswers,{});
  }
  loadLocalState();

  // ---- Synchronisation Firebase ----
  let cloudUser=null, cloudPushTimer=null, cloudSyncEnabled=false;
  function buildCloudPayload(){
    return {
      posts:store.get(KEYS.posts,[]),
      favorites:store.get(KEYS.favorites,[]),
      profile:store.get(KEYS.profile,'Vous'),
      messages:store.get(KEYS.messages,[]),
      settings:store.get(KEYS.settings,{}),
      folders:store.get(KEYS.folders,[]),
      folderMap:store.get(KEYS.folderMap,{}),
      deletedCards:store.get(KEYS.deletedCards,[]),
      covers:store.get(KEYS.covers,{}),
      quizAnswers:store.get(KEYS.quizAnswers,{}),
      updatedAt:Date.now()
    };
  }
  function applyCloudPayload(data){
    if(!data) return;
    applyingCloudData=true;
    if(data.posts!==undefined) store.set(KEYS.posts,data.posts);
    if(data.favorites!==undefined) store.set(KEYS.favorites,data.favorites);
    if(data.profile!==undefined) store.set(KEYS.profile,data.profile);
    if(data.messages!==undefined) store.set(KEYS.messages,data.messages);
    if(data.settings!==undefined) store.set(KEYS.settings,data.settings);
    if(data.folders!==undefined) store.set(KEYS.folders,data.folders);
    if(data.folderMap!==undefined) store.set(KEYS.folderMap,data.folderMap);
    if(data.deletedCards!==undefined) store.set(KEYS.deletedCards,data.deletedCards);
    if(data.covers!==undefined) store.set(KEYS.covers,data.covers);
    if(data.quizAnswers!==undefined) store.set(KEYS.quizAnswers,data.quizAnswers);
    applyingCloudData=false;
  }
  function scheduleCloudPush(){
    if(!cloudSyncEnabled||!cloudUser) return;
    clearTimeout(cloudPushTimer);
    cloudPushTimer=setTimeout(pushToCloud,1200);
  }
  async function pushToCloud(){
    if(!cloudUser) return;
    try{
      const {doc,setDoc,db}=window.MargesCloud;
      await setDoc(doc(db,'users',cloudUser.uid), buildCloudPayload());
    }catch(e){
      console.error('Erreur de synchronisation cloud',e);
      toast('Synchronisation impossible — vérifiez votre connexion.');
    }
  }
  async function pullFromCloud(uid){
    try{
      const {doc,getDoc,db}=window.MargesCloud;
      const snap=await getDoc(doc(db,'users',uid));
      if(snap.exists()){ applyCloudPayload(snap.data()); return true; }
      return false;
    }catch(e){
      console.error('Erreur de récupération cloud',e);
      toast('Impossible de récupérer vos données en ligne.');
      return false;
    }
  }
  let io=null, currentContact=null, composeMode='photo', pendingFront=null, pendingBack=null, pendingImage=null, editingPostId=null;
  let libraryFolder='all';

  function toast(msg){const el=$('#status-toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200)}

  // ---- télécharger une fiche en image (PNG) ----
  function slugify(str){
    return (str||'').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'fiche';
  }
  async function getDownloadsCapability(){
    try{ return (window.claude && typeof window.claude.use==='function') ? await window.claude.use('downloads') : null; }
    catch(e){ return null; }
  }
  async function downloadSlotImage(slot){
    const inner=slot.querySelector('.card-inner'); if(!inner){toast('Fiche introuvable');return}
    const isFlipped=inner.classList.contains('flipped');
    let faceEl=isFlipped?inner.querySelector('.card.back'):inner.querySelector('.card.front');
    if(!faceEl) faceEl=inner.querySelector('.card:not(.back)')||inner.querySelector('.card');
    if(!faceEl){toast('Impossible de préparer cette fiche');return}
    if(typeof html2canvas==='undefined'){toast("Le module d'export d'image n'a pas pu se charger.");return}
    const downloads=await getDownloadsCapability();
    if(!downloads){toast('Téléchargement indisponible dans cette vue.');return}
    toast('Préparation de l\u2019image…');
    const rect=faceEl.getBoundingClientRect();
    const clone=faceEl.cloneNode(true);
    clone.style.position='fixed'; clone.style.left='-9999px'; clone.style.top='0';
    clone.style.transform='none'; clone.style.margin='0'; clone.style.boxShadow='none';
    clone.style.width=Math.max(1,Math.round(rect.width))+'px';
    clone.style.height=Math.max(1,Math.round(rect.height))+'px';
    document.body.appendChild(clone);
    try{
      const bg=getComputedStyle(faceEl).backgroundColor;
      const canvas=await html2canvas(clone,{backgroundColor:(bg&&bg!=='rgba(0, 0, 0, 0)')?bg:'#FFF8EA',scale:2,useCORS:true,logging:false});
      clone.remove();
      canvas.toBlob(async blob=>{
        if(!blob){toast("Échec de la génération de l'image");return}
        const base=slugify(slot.dataset.cardTitle||'marges-fiche');
        const filename=(isFlipped?base+'-verso':base)+'.png';
        try{ await downloads.save({filename,data:blob}); toast('Image enregistrée'); }
        catch(err){ if(!err||err.code!=='declined') toast('Téléchargement impossible.'); }
      },'image/png');
    }catch(e){
      clone.remove();
      toast("Impossible de générer l'image de cette fiche.");
    }
  }
  function ensureDownloadButton(slot){
    const flipContainer=slot.querySelector('.flip-container'); if(!flipContainer) return;
    let controls=flipContainer.querySelector('.card-controls');
    if(!controls){ controls=document.createElement('div'); controls.className='card-controls'; flipContainer.appendChild(controls); }
    if(controls.querySelector('.dl-btn')) return;
    const btn=document.createElement('button');
    btn.type='button'; btn.className='ctrl-btn dl-btn';
    btn.title='Télécharger en image'; btn.setAttribute('aria-label','Télécharger cette fiche en image');
    btn.innerHTML='<svg viewBox="0 0 20 20" fill="none"><path d="M10 3v10M6 9l4 4 4-4M4 17h12" stroke="#FFF7E6" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btn.addEventListener('click',e=>{ e.stopPropagation(); downloadSlotImage(slot); });
    controls.insertBefore(btn,controls.firstChild);
  }
  function escapeHtml(str){const d=document.createElement('div');d.textContent=str||'';return d.innerHTML}
  function formatBody(str){let safe=escapeHtml(str);safe=safe.replace(/\*\*(.+?)\*\*/gs,'<strong>$1</strong>');safe=safe.replace(/_(.+?)_/gs,'<em>$1</em>');safe=safe.replace(/==(.+?)==/gs,'<mark>$1</mark>');return safe.replace(/\n/g,'<br>')}
  function persistFavorites(){store.set(KEYS.favorites,[...favorites])}
  function saveFolders(){store.set(KEYS.folders,folders);store.set(KEYS.folderMap,folderMap)}
  function saveQuizAnswers(){store.set(KEYS.quizAnswers,quizAnswers)}

  // ---- confetti celebration ----
  function launchConfetti(fromEl){
    const colors=['#A8B58A','#F7C8D3','#B46A72','#A9B7C6','#8FA05C'];
    let originX=window.innerWidth/2, originTop=window.innerHeight*0.25;
    if(fromEl){ const r=fromEl.getBoundingClientRect(); originX=r.left+r.width/2; originTop=r.top; }
    const layer=document.createElement('div'); layer.className='confetti-layer'; document.body.appendChild(layer);
    const count=30;
    for(let i=0;i<count;i++){
      const p=document.createElement('span'); p.className='confetti-piece';
      const dx=(Math.random()*220-110);
      const rot=(Math.random()*640-320)+'deg';
      const size=6+Math.random()*6;
      p.style.left=(originX+(Math.random()*160-80))+'px';
      p.style.top=originTop+'px';
      p.style.width=size+'px'; p.style.height=(size*1.7)+'px';
      p.style.background=colors[i%colors.length];
      p.style.borderRadius=(Math.random()<0.4)?'50%':'2px';
      p.style.setProperty('--dx',dx+'px');
      p.style.setProperty('--rot',rot);
      p.style.animationDuration=(850+Math.random()*650)+'ms';
      p.style.animationDelay=(Math.random()*120)+'ms';
      layer.appendChild(p);
    }
    setTimeout(()=>layer.remove(),1900);
  }

  function renderFolderControls(){
    const bar=$('#folder-bar'); if(!bar)return;
    bar.querySelectorAll('.folder-chip').forEach(x=>x.remove());
    const all=document.createElement('button'); all.className='folder-chip '+(libraryFolder==='all'?'active':''); all.textContent='Tous les dossiers'; all.onclick=()=>{libraryFolder='all';renderFolderControls();renderLibrary()};
    bar.insertBefore(all,$('#add-folder'));
    folders.forEach(f=>{const b=document.createElement('button');b.className='folder-chip '+(libraryFolder===f.id?'active':'');b.textContent=f.name;b.onclick=()=>{libraryFolder=f.id;renderFolderControls();renderLibrary()};bar.insertBefore(b,$('#add-folder'))});
  }

  // ---- Onglets de catégories du fil (par dossier), à la TikTok ----
  function renderFeedTabs(){
    if(!feedTabsBar) return;
    if(feedCategory!=='all' && !folders.some(f=>f.id===feedCategory)) feedCategory='all';
    feedTabsBar.innerHTML='';
    const makeTab=(id,label)=>{
      const b=document.createElement('button');
      b.type='button'; b.setAttribute('role','tab');
      b.className='feed-tab'+(feedCategory===id?' active':'');
      b.textContent=label; b.dataset.cat=id;
      b.addEventListener('click',()=>setFeedCategory(id));
      return b;
    };
    feedTabsBar.appendChild(makeTab('all','Tous'));
    folders.forEach(f=>feedTabsBar.appendChild(makeTab(f.id,f.name)));
  }
  function applyFeedCategoryFilter(){
    $$('.card-slot').forEach(slot=>{
      const match = feedCategory==='all' || slot.dataset.folderId===feedCategory;
      slot.classList.toggle('hidden-by-filter', !match);
    });
    rebuildFeedControls();
  }
  function setFeedCategory(id){
    if(feedCategory===id) return;
    feedCategory=id;
    renderFeedTabs();
    applyFeedCategoryFilter();
    feed.scrollTo({top:0,behavior:'auto'});
  }
  let feedTouchX=0, feedTouchY=0, feedSwipeAxis=null;
  feed.addEventListener('touchstart',e=>{
    if(e.touches.length!==1) return;
    feedTouchX=e.touches[0].clientX; feedTouchY=e.touches[0].clientY; feedSwipeAxis=null;
  },{passive:true});
  feed.addEventListener('touchmove',e=>{
    if(e.touches.length!==1) return;
    const dx=e.touches[0].clientX-feedTouchX, dy=e.touches[0].clientY-feedTouchY;
    if(feedSwipeAxis===null && (Math.abs(dx)>8||Math.abs(dy)>8)) feedSwipeAxis = Math.abs(dx)>Math.abs(dy)*1.2 ? 'x' : 'y';
    if(feedSwipeAxis==='x') e.preventDefault();
  },{passive:false});
  feed.addEventListener('touchend',e=>{
    const axis=feedSwipeAxis; feedSwipeAxis=null;
    if(axis!=='x') return;
    const dx=e.changedTouches[0].clientX-feedTouchX;
    if(Math.abs(dx)<50) return;
    const tabs=$$('.feed-tab',feedTabsBar);
    const idx=tabs.findIndex(t=>t.dataset.cat===feedCategory);
    if(idx===-1) return;
    const next = dx<0 ? Math.min(tabs.length-1, idx+1) : Math.max(0, idx-1);
    if(next!==idx) setFeedCategory(tabs[next].dataset.cat);
  });

  function populateComposeFolders(selected=''){const sel=$('#compose-folder');if(!sel)return;sel.innerHTML='<option value="">Sans dossier</option>'+folders.map(f=>`<option value="${escapeHtml(f.id)}">${escapeHtml(f.name)}</option>`).join('');sel.value=selected||''}
  $('#add-folder')?.addEventListener('click',()=>{const name=prompt('Nom du nouveau dossier :');if(name&&name.trim()){folders.push({id:'folder-'+Date.now(),name:name.trim()});saveFolders();renderFolderControls();renderFeedTabs();populateComposeFolders();toast('Dossier créé')}});

  function identifyStaticCards(){
    $$('.card-slot').forEach((slot,i)=>{
      if(slot.dataset.cardId) return;
      const btn=$('.like-btn',slot);
      if(btn) slot.dataset.cardId=btn.dataset.id;
      else slot.dataset.cardId='static-'+i;
      const tag=$('.card-tag',slot)?.textContent.trim() || (i===0?'Introduction':'Note');
      slot.dataset.cardType=tag;
      slot.dataset.owner='system';
      const title=$('.title',slot)?.textContent.trim() || (i===0?'Marges':'Fiche');
      slot.dataset.cardTitle=title;
    });
    $$('.card-slot').forEach(slot=>{
      const id=slot.dataset.cardId;
      if(!id) return;
      if(deletedCards.has(id)) slot.classList.add('deleted-card');
      ensureDownloadButton(slot);
      if(!slot.querySelector('.static-delete-btn')){
        const tools=document.createElement('div');
        tools.className='post-tools';
        tools.innerHTML='<button class="post-tool-btn static-delete-btn" title="Supprimer cette fiche" aria-label="Supprimer cette fiche">⌫</button>';
        slot.querySelector('.flip-container')?.appendChild(tools);
        tools.querySelector('.static-delete-btn').addEventListener('click',e=>{
          e.stopPropagation();
          if(!confirm('Supprimer cette fiche ?')) return;
          deletedCards.add(id);
          favorites.delete(id);
          delete folderMap[id];
          store.set(KEYS.deletedCards,[...deletedCards]);
          saveFolders();
          slot.remove();
          persistFavorites();
          renderFolderControls();
          renderLibrary();
          rebuildFeedControls();
          toast('Fiche supprimée');
        });
      }
    });
  }

  function rebuildFeedControls(){
    const slots=$$('.card-slot:not(.hidden-by-filter):not(.deleted-card)');nav.innerHTML='';
    slots.forEach(slot=>{const b=document.createElement('button');b.addEventListener('click',()=>slot.scrollIntoView({behavior:'smooth'}));nav.appendChild(b)});
    const dots=$$('button',nav); if(io)io.disconnect();
    io=new IntersectionObserver(entries=>entries.forEach(entry=>{const idx=slots.indexOf(entry.target);if(entry.isIntersecting){entry.target.classList.add('in-view');dots.forEach(d=>d.classList.remove('active'));if(dots[idx])dots[idx].classList.add('active');if(idx>0)hint.style.opacity='0'}else entry.target.classList.remove('in-view')}),{threshold:.6});
    slots.forEach(s=>io.observe(s));
  }

  document.addEventListener('click',e=>{
    const flip=e.target.closest('.flip-btn'); if(flip){const inner=document.getElementById(flip.dataset.target);if(inner)inner.classList.toggle('flipped')}
  });
  function syncLikeButtons(){ syncLikeCurrentButton() }

  // like the currently centered card via the floating action bar heart
  function currentSlot(){
    const slots=$$('.card-slot:not(.hidden-by-filter):not(.deleted-card)');
    const center=window.innerHeight/2; let best=null,score=-Infinity;
    slots.forEach(s=>{const r=s.getBoundingClientRect();const sc=-Math.abs((r.top+r.height/2)-center);if(sc>score){score=sc;best=s}});
    return best;
  }
  function syncLikeCurrentButton(){
    const slot=currentSlot(); const likeBtn=$('#like-current-btn');
    if(!likeBtn) return;
    const id=slot?.dataset.cardId;
    likeBtn.classList.toggle('liked', !!(id && favorites.has(id)));
  }
  feed.addEventListener('scroll',()=>{ clearTimeout(feed._t); feed._t=setTimeout(syncLikeCurrentButton,120); });

  // ---- quiz interaction ----
  function applyQuizAnswerState(wrap,post,chosenIndex,animate){
    const buttons=$$('.quiz-option-btn',wrap);
    wrap.classList.add('answered');
    buttons.forEach(btn=>{
      const idx=parseInt(btn.dataset.index,10);
      const isCorrect=post.quizOptions[idx]&&post.quizOptions[idx].correct;
      btn.classList.remove('correct','incorrect');
      if(isCorrect) btn.classList.add('correct');
      else if(idx===chosenIndex) btn.classList.add('incorrect');
    });
    const feedback=$('.quiz-feedback',wrap.parentElement);
    const chosenCorrect=post.quizOptions[chosenIndex]&&post.quizOptions[chosenIndex].correct;
    if(feedback){
      feedback.classList.remove('is-correct','is-incorrect');
      if(chosenCorrect){feedback.textContent='Bonne réponse !';feedback.classList.add('is-correct')}
      else{feedback.textContent='Pas tout à fait — la bonne réponse est en vert.';feedback.classList.add('is-incorrect')}
    }
    if(chosenCorrect&&animate) launchConfetti(wrap);
  }
  document.addEventListener('click',e=>{
    const optBtn=e.target.closest('.quiz-option-btn'); if(!optBtn) return;
    const wrap=optBtn.closest('.quiz-options'); if(!wrap||wrap.classList.contains('answered')) return;
    const slot=optBtn.closest('.card-slot'); const postId=slot?.dataset.cardId; if(!postId) return;
    const post=posts.find(p=>p.id===postId); if(!post||!post.quizOptions) return;
    const chosenIndex=parseInt(optBtn.dataset.index,10);
    quizAnswers[postId]=chosenIndex; saveQuizAnswers();
    applyQuizAnswerState(wrap,post,chosenIndex,true);
  });

  // Compose
  const composeOverlay=$('#compose-overlay'), composeFileFront=$('#compose-file-front'), composeFileBack=$('#compose-file-back'), composePreviewFront=$('#compose-preview-front'), composePreviewBack=$('#compose-preview-back'), composePhotoFields=$('#compose-photo-fields'), composeTextFields=$('#compose-text-fields'), composeTitle=$('#compose-title'), composeText=$('#compose-text'), composeSource=$('#compose-source'), composeLegend=$('#compose-legend'), composeType=$('#compose-type'), composeFolder=$('#compose-folder'), composeTitleSize=$('#compose-title-size'), composeTextSize=$('#compose-text-size'), composeImageFile=$('#compose-image-file'), composeImagePreview=$('#compose-image-preview'), composeImageRemove=$('#compose-image-remove'), composeImageSizeRow=$('#compose-image-size-row'), composeImageSize=$('#compose-image-size'), composeImageSizeLabel=$('#compose-image-size-label'), composeHasBack=$('#compose-has-back'), composeBackFields=$('#compose-back-fields'), composeBackTitle=$('#compose-back-title'), composeBackText=$('#compose-back-text'), schemaBuilder=$('#schema-builder'), schemaNode1=$('#schema-node-1'), schemaNode2=$('#schema-node-2'), schemaNode3=$('#schema-node-3'), composeSubmit=$('#compose-submit');
  const quizBuilder=$('#quiz-builder'), quizQuestionEl=$('#quiz-question'), quizExplanationEl=$('#quiz-explanation'), quizOptionInputs=[$('#quiz-option-0'),$('#quiz-option-1'),$('#quiz-option-2'),$('#quiz-option-3')];
  const vocabBuilder=$('#vocab-builder'), vocabTranslation=$('#vocab-translation'), composeTitleLabel=$('#compose-title-label'), composeSourceLabel=$('#compose-source-label'), composeSourceOptional=$('#compose-source-optional');
  const composeTitleGroup=$('#compose-title-group'), composeTextGroup=$('#compose-text-group'), composeImageGroup=$('#compose-image-group'), composeBackToggleGroup=$('#compose-back-toggle-group');
  function insertAtCursor(textarea,text){const s=textarea.selectionStart,e=textarea.selectionEnd,v=textarea.value;textarea.value=v.slice(0,s)+text+v.slice(e);textarea.selectionStart=textarea.selectionEnd=s+text.length;textarea.focus()}
  function wrapSelection(textarea,before,after){const s=textarea.selectionStart,e=textarea.selectionEnd,v=textarea.value,sel=v.slice(s,e)||'texte';textarea.value=v.slice(0,s)+before+sel+after+v.slice(e);textarea.selectionStart=s+before.length;textarea.selectionEnd=s+before.length+sel.length;textarea.focus()}
  $$('.tb-btn').forEach(btn=>btn.addEventListener('click',()=>{const a=btn.dataset.action;if(a==='bold')wrapSelection(composeText,'**','**');else if(a==='italic')wrapSelection(composeText,'_','_');else if(a==='highlight')wrapSelection(composeText,'==','==');else if(a==='newline')insertAtCursor(composeText,'\n');else if(a==='space')insertAtCursor(composeText,'\n\n');updateSubmitState()}));
  function isQuizType(){return composeType.value==='Quiz'}
  function isVocabType(){return composeType.value==='Vocabulaire'}
  function updateSchemaVisibility(){
    schemaBuilder.classList.toggle('open',composeMode==='text'&&composeType.value==='Schéma');
    quizBuilder.classList.toggle('open',composeMode==='text'&&isQuizType());
    vocabBuilder.classList.toggle('open',composeMode==='text'&&isVocabType());
    const hideForQuiz=composeMode==='text'&&isQuizType();
    const hideForVocab=composeMode==='text'&&isVocabType();
    composeTitleGroup.style.display=hideForQuiz?'none':'block';
    composeTextGroup.style.display=(hideForQuiz||hideForVocab)?'none':'block';
    composeImageGroup.style.display=hideForQuiz?'none':'block';
    composeBackToggleGroup.style.display=(hideForQuiz||hideForVocab)?'none':'block';
    if(hideForVocab){
      composeTitleLabel.textContent='Mot';
      composeTitle.placeholder='Le mot dans la langue (ex : Apple)';
      composeSourceLabel.textContent='Langue';
      composeSourceOptional.style.display='none';
      composeSource.placeholder='Nom de la langue (ex : Anglais)';
    }else{
      composeTitleLabel.textContent='Titre';
      composeTitle.placeholder='Le titre de votre fiche';
      composeSourceLabel.textContent='Source';
      composeSourceOptional.style.display='inline';
      composeSource.placeholder='Livre, article, lien ou référence…';
    }
  }
  composeType.addEventListener('change',()=>{updateSchemaVisibility();updateSubmitState()});
  [schemaNode1,schemaNode2,schemaNode3].forEach(x=>x.addEventListener('input',updateSubmitState));
  [quizQuestionEl,quizExplanationEl,...quizOptionInputs].forEach(x=>x.addEventListener('input',updateSubmitState));
  $$('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{composeMode=btn.dataset.mode;$$('.mode-btn').forEach(b=>b.classList.toggle('active',b===btn));composePhotoFields.style.display=composeMode==='photo'?'block':'none';composeTextFields.style.display=composeMode==='text'?'block':'none';updateSchemaVisibility();updateSubmitState()}));
  function updateSubmitState(){
    if(composeMode==='photo'){composeSubmit.disabled=!pendingFront;return}
    if(isQuizType()){
      const filled=quizOptionInputs.filter(inp=>inp.value.trim());
      composeSubmit.disabled=!(quizQuestionEl.value.trim()&&filled.length>=2);
      return;
    }
    if(isVocabType()){
      composeSubmit.disabled=!(composeTitle.value.trim()&&vocabTranslation.value.trim());
      return;
    }
    composeSubmit.disabled=!composeText.value.trim();
  }
  vocabTranslation.addEventListener('input',updateSubmitState);
  composeText.addEventListener('input',updateSubmitState);composeTitle.addEventListener('input',updateSubmitState);
  $('#compose-btn').addEventListener('click',()=>{editingPostId=null;composeSubmit.textContent='Publier';populateComposeFolders();updateSchemaVisibility();composeOverlay.classList.add('open')});
  $('#compose-close').addEventListener('click',closeCompose);$('#compose-cancel').addEventListener('click',closeCompose);
  function closeCompose(){composeOverlay.classList.remove('open');composeFileFront.value='';composeFileBack.value='';composePreviewFront.style.display='none';composePreviewBack.style.display='none';composeTitle.value='';composeText.value='';composeSource.value='';composeLegend.value='';composeType.value='Concept';composeFolder.value='';composeTitleSize.value='36';composeTextSize.value='18';composeImageFile.value='';composeImagePreview.src='';composeImagePreview.style.display='none';composeImageRemove.style.display='none';composeImageSizeRow.style.display='none';composeImageSize.value='60';composeImageSizeLabel.textContent='60%';pendingImage=null;composeHasBack.checked=false;composeBackFields.style.display='none';composeBackTitle.value='';composeBackText.value='';schemaNode1.value='';schemaNode2.value='';schemaNode3.value='';quizQuestionEl.value='';quizExplanationEl.value='';quizOptionInputs.forEach(inp=>inp.value='');vocabTranslation.value='';const firstRadio=document.querySelector('input[name="quiz-correct-radio"][value="0"]');if(firstRadio)firstRadio.checked=true;updateSchemaVisibility();pendingFront=pendingBack=null;editingPostId=null;composeSubmit.textContent='Publier';composeSubmit.disabled=true}
  function readAndResize(file,cb){const r=new FileReader();r.onload=e=>{const img=new Image();img.onload=()=>{const maxW=1100,scale=Math.min(1,maxW/img.width),c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.76))};img.src=e.target.result};r.readAsDataURL(file)}
  // Comme readAndResize, mais garde le canal alpha des PNG (fond transparent) au lieu de forcer du JPEG
  function readAndResizeKeepAlpha(file,cb){
    const isPng = file.type==='image/png' || /\.png$/i.test(file.name||'');
    const r=new FileReader();
    r.onload=e=>{
      const img=new Image();
      img.onload=()=>{
        const maxW=1000, scale=Math.min(1,maxW/img.width);
        const c=document.createElement('canvas');
        c.width=Math.round(img.width*scale); c.height=Math.round(img.height*scale);
        const ctx=c.getContext('2d');
        ctx.clearRect(0,0,c.width,c.height);
        ctx.drawImage(img,0,0,c.width,c.height);
        cb(isPng ? c.toDataURL('image/png') : c.toDataURL('image/jpeg',.82));
      };
      img.src=e.target.result;
    };
    r.readAsDataURL(file);
  }
  composeImageFile.addEventListener('change',()=>{
    const f=composeImageFile.files[0]; if(!f) return;
    readAndResizeKeepAlpha(f,d=>{
      pendingImage=d;
      composeImagePreview.src=d;
      composeImagePreview.style.display='block';
      composeImageRemove.style.display='inline-block';
      composeImageSizeRow.style.display='block';
    });
  });
  composeImageRemove.addEventListener('click',()=>{
    pendingImage=null;
    composeImageFile.value='';
    composeImagePreview.src='';
    composeImagePreview.style.display='none';
    composeImageRemove.style.display='none';
    composeImageSizeRow.style.display='none';
  });
  composeImageSize.addEventListener('input',()=>{ composeImageSizeLabel.textContent=composeImageSize.value+'%'; });
  composeHasBack.addEventListener('change',()=>{ composeBackFields.style.display=composeHasBack.checked?'block':'none'; });
  composeFileFront.addEventListener('change',()=>{const f=composeFileFront.files[0];if(f)readAndResize(f,d=>{pendingFront=d;composePreviewFront.src=d;composePreviewFront.style.display='block';updateSubmitState()})});
  composeFileBack.addEventListener('change',()=>{const f=composeFileBack.files[0];if(f)readAndResize(f,d=>{pendingBack=d;composePreviewBack.src=d;composePreviewBack.style.display='block'})});
  composeSubmit.addEventListener('click',()=>{
    let post;
    if(composeMode==='photo'){if(!pendingFront)return;post={id:editingPostId||'post-'+Date.now(),type:'photo',cardType:'Photo',author:activeProfile,imageFront:pendingFront,imageBack:pendingBack,folderId:composeFolder.value||'',ts:Date.now()}}
    else if(isQuizType()){
      const question=quizQuestionEl.value.trim(); if(!question)return;
      const correctRadio=document.querySelector('input[name="quiz-correct-radio"]:checked');
      const correctIdx=correctRadio?parseInt(correctRadio.value,10):0;
      const quizOptions=quizOptionInputs.map((inp,idx)=>({text:inp.value.trim(),correct:idx===correctIdx})).filter(o=>o.text);
      if(quizOptions.length<2)return;
      if(!quizOptions.some(o=>o.correct))quizOptions[0].correct=true;
      const explanation=quizExplanationEl.value.trim();
      post={id:editingPostId||'post-'+Date.now(),type:'text',cardType:'Quiz',category:'Quiz',author:activeProfile,quizQuestion:question,quizOptions,backTitle:'',backBody:explanation,titleSize:parseInt(composeTitleSize.value,10)||36,bodySize:parseInt(composeTextSize.value,10)||18,source:composeSource.value.trim(),legend:composeLegend.value.trim(),folderId:composeFolder.value||'',ts:Date.now()};
    }
    else if(isVocabType()){
      const word=composeTitle.value.trim(); if(!word)return;
      const translation=vocabTranslation.value.trim(); if(!translation)return;
      post={id:editingPostId||'post-'+Date.now(),type:'text',cardType:'Vocabulaire',category:'Vocabulaire',author:activeProfile,title:word,titleSize:parseInt(composeTitleSize.value,10)||46,bodySize:parseInt(composeTextSize.value,10)||20,image:pendingImage||null,imageSize:parseInt(composeImageSize.value,10)||60,backTitle:'',backBody:translation,source:composeSource.value.trim(),legend:composeLegend.value.trim(),folderId:composeFolder.value||'',schema:null,ts:Date.now()};
    }
    else{const body=composeText.value.trim();if(!body)return;post={id:editingPostId||'post-'+Date.now(),type:'text',cardType:composeType.value,category:composeType.value,author:activeProfile,title:composeTitle.value.trim(),titleSize:parseInt(composeTitleSize.value,10)||36,bodySize:parseInt(composeTextSize.value,10)||18,image:pendingImage||null,imageSize:parseInt(composeImageSize.value,10)||60,backTitle:composeHasBack.checked?composeBackTitle.value.trim():'',backBody:composeHasBack.checked?composeBackText.value.trim():'',body,source:composeSource.value.trim(),legend:composeLegend.value.trim(),folderId:composeFolder.value||'',schema:composeType.value==='Schéma'?[schemaNode1.value.trim(),schemaNode2.value.trim(),schemaNode3.value.trim()]:null,ts:Date.now()}}
    if(editingPostId){posts=posts.map(p=>p.id===editingPostId?{...p,...post}:p)}else posts.unshift(post);
    if(!store.set(KEYS.posts,posts))return; if(post.folderId)folderMap[post.id]=post.folderId;else delete folderMap[post.id];saveFolders(); renderAllPosts(); closeCompose(); toast(editingPostId?'Fiche modifiée':'Fiche enregistrée sur cet appareil');
  });

  function renderAllPosts(){$$('.card-slot[data-user-post="1"]').forEach(x=>x.remove());posts.slice().reverse().forEach(renderPost);identifyStaticCards();syncLikeButtons();applyFeedCategoryFilter();renderLibrary()}
  const anchor=$('#user-posts-anchor');
  const QUIZ_LETTERS=['A','B','C','D'];
  function renderPost(post){
    if(post.type==='photo'&&!post.imageFront&&post.image)post.imageFront=post.image;
    const innerId='inner-'+post.id,section=document.createElement('section');section.className='card-slot';section.dataset.userPost='1';section.dataset.cardId=post.id;section.dataset.cardType=post.cardType||(post.type==='photo'?'Photo':'Note');section.dataset.cardTitle=post.title||post.quizQuestion||post.cardType||'Publication';section.dataset.owner=post.author||'Vous';section.dataset.folderId=post.folderId||folderMap[post.id]||'';
    let cardHtml='', hb=false;
    if(post.cardType==='Quiz'&&Array.isArray(post.quizOptions)){
      const alreadyAnswered=Object.prototype.hasOwnProperty.call(quizAnswers,post.id);
      const optionsHtml=post.quizOptions.map((o,idx)=>`<button type="button" class="quiz-option-btn" data-index="${idx}"><span class="qo-letter">${QUIZ_LETTERS[idx]||idx+1}</span>${escapeHtml(o.text)}</button>`).join('');
      const frontFace=`<div class="card front"><div class="card-tag-row"><span class="card-tag gold">Quiz</span><span class="card-index">Post</span></div><div class="card-body">${post.title?`<h1 class="title" style="font-size:${post.titleSize||36}px;">${escapeHtml(post.title)}</h1>`:''}<p class="lead" style="font-size:${post.bodySize||18}px;">${formatBody(post.quizQuestion)}</p><div class="quiz-feedback"></div><div class="quiz-options">${optionsHtml}</div>${post.source?`<div class="sources"><div class="sources-label">source</div><div class="post-source">${escapeHtml(post.source)}</div></div>`:''}<p class="quiz-hint">Choisissez une réponse, puis retournez la fiche pour le développement.</p><p class="example" style="margin-top:0;">${escapeHtml(post.legend||post.author)}</p></div></div>`;
      hb=!!(post.backBody&&post.backBody.trim());
      const backFace=hb?`<div class="card back"><div class="card-tag-row"><span class="card-tag back-tag">Développement</span><span class="card-index">Post</span></div><div class="card-body">${post.backTitle?`<h1 class="title" style="font-size:${post.titleSize||36}px;">${escapeHtml(post.backTitle)}</h1>`:''}<p class="lead" style="font-size:${post.bodySize||18}px;">${formatBody(post.backBody)}</p></div></div>`:'';
      cardHtml=`<div class="card-inner" id="${innerId}">${frontFace}${backFace}</div>`;
      section.innerHTML=`<div class="flip-container">${cardHtml}<div class="post-tools"><button class="post-tool-btn edit-post" title="Modifier">✎</button><button class="delete-btn" title="Supprimer"><svg viewBox="0 0 20 20"><path d="M4 5h12 M8 5V3h4v2 M6 5l1 12h6l1-12"/></svg></button></div>${hb?`<div class="card-controls"><button class="ctrl-btn flip-btn" data-target="${innerId}" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button></div>`:''}</div>`;
      $('.delete-btn',section).addEventListener('click',()=>{if(confirm('Supprimer cette fiche ?')){posts=posts.filter(p=>p.id!==post.id);favorites.delete(post.id);delete folderMap[post.id];delete quizAnswers[post.id];if(!store.set(KEYS.posts,posts))return;saveFolders();saveQuizAnswers();persistFavorites();section.remove();rebuildFeedControls();renderLibrary();toast('Fiche supprimée')}});
      $('.edit-post',section).addEventListener('click',()=>editPost(post));
      anchor.after(section);
      ensureDownloadButton(section);
      if(alreadyAnswered){ const wrap=$('.quiz-options',section); if(wrap) applyQuizAnswerState(wrap,post,quizAnswers[post.id],false); }
      return;
    }
    if(post.type==='text'){
      if(post.cardType==='Vocabulaire'){
        const frontFace=`<div class="card front"><div class="card-tag-row"><span class="card-tag gold">Vocabulaire</span><span class="card-index">Post</span></div><div class="card-body vocab-body"><div class="vocab-center">${post.image?`<div class="vocab-image"><img src="${post.image}" alt="" style="width:${post.imageSize||60}%;max-width:100%;height:auto;display:block;background:transparent;"></div>`:''}<h1 class="title vocab-word" style="font-size:${post.titleSize||46}px;">${escapeHtml(post.title)}</h1></div>${post.source?`<div class="sources"><div class="sources-label">langue</div><div class="post-source">${escapeHtml(post.source)}</div></div>`:''}</div></div>`;
        hb=!!(post.backBody&&post.backBody.trim());
        const backFace=hb?`<div class="card back"><div class="card-tag-row"><span class="card-tag back-tag">Traduction</span><span class="card-index">Post</span></div><div class="card-body vocab-body"><div class="vocab-center"><p class="lead vocab-translation" style="font-size:${post.bodySize||22}px;">${formatBody(post.backBody)}</p></div></div></div>`:'';
        cardHtml=`<div class="card-inner" id="${innerId}">${frontFace}${backFace}</div>`;
      }else{
      const schema=Array.isArray(post.schema)?post.schema.filter(Boolean):[];
      const schemaHtml=post.cardType==='Schéma'&&schema.length ? '<div class="schema-card">'+schema.map((n,i)=>(i?'<div class="schema-card-arrow">↓</div>':'')+'<div class="schema-card-node">'+escapeHtml(n)+'</div>').join('')+'</div>' : '';
      const frontFace=`<div class="card front"><div class="card-tag-row"><span class="card-tag gold">${escapeHtml(post.cardType||'Publication')}</span><span class="card-index">Post</span></div><div class="card-body">${post.title?`<h1 class="title" style="font-size:${post.titleSize||36}px;">${escapeHtml(post.title)}</h1>`:''}${post.image?`<div style="display:flex;justify-content:center;margin:0 0 14px;"><img src="${post.image}" alt="" style="width:${post.imageSize||60}%;max-width:100%;height:auto;display:block;background:transparent;"></div>`:''}<p class="lead" style="font-size:${post.bodySize||18}px;">${formatBody(post.body)}</p>${schemaHtml}${post.source?`<div class="sources"><div class="sources-label">source</div><div class="post-source">${escapeHtml(post.source)}</div></div>`:''}<p class="example" style="margin-top:auto;">${escapeHtml(post.legend||post.author)}</p></div></div>`;
      hb=!!(post.backBody&&post.backBody.trim());
      const backFace=hb?`<div class="card back"><div class="card-tag-row"><span class="card-tag back-tag">Verso</span><span class="card-index">Post</span></div><div class="card-body">${post.backTitle?`<h1 class="title" style="font-size:${post.titleSize||36}px;">${escapeHtml(post.backTitle)}</h1>`:''}<p class="lead" style="font-size:${post.bodySize||18}px;">${formatBody(post.backBody)}</p></div></div>`:'';
      cardHtml=`<div class="card-inner" id="${innerId}">${frontFace}${backFace}</div>`;
      }
    }
    else{hb=!!post.imageBack;cardHtml=`<div class="card-inner" id="${innerId}"><div class="card photo front"><div class="card-body"><img class="post-photo" src="${post.imageFront}" alt=""></div></div>${hb?`<div class="card photo back"><div class="card-body"><img class="post-photo" src="${post.imageBack}" alt=""></div></div>`:''}</div>`}
    section.innerHTML=`<div class="flip-container">${cardHtml}<div class="post-tools"><button class="post-tool-btn edit-post" title="Modifier">✎</button><button class="delete-btn" title="Supprimer"><svg viewBox="0 0 20 20"><path d="M4 5h12 M8 5V3h4v2 M6 5l1 12h6l1-12"/></svg></button></div>${hb?`<div class="card-controls"><button class="ctrl-btn flip-btn" data-target="${innerId}" aria-label="Retourner la fiche"><svg viewBox="0 0 20 20"><path d="M17 10a7 7 0 1 1-2-4.9M17 3v4h-4"/></svg></button></div>`:''}</div>`;
    $('.delete-btn',section).addEventListener('click',()=>{if(confirm('Supprimer cette fiche ?')){posts=posts.filter(p=>p.id!==post.id);favorites.delete(post.id);delete folderMap[post.id];if(!store.set(KEYS.posts,posts))return;saveFolders();persistFavorites();section.remove();rebuildFeedControls();renderLibrary();toast('Fiche supprimée')}});
    $('.edit-post',section).addEventListener('click',()=>editPost(post));anchor.after(section);
    ensureDownloadButton(section);
  }
  function editPost(post){
    editingPostId=post.id;composeOverlay.classList.add('open');composeSubmit.textContent='Enregistrer';
    if(post.cardType==='Quiz'&&Array.isArray(post.quizOptions)){
      composeMode='text';$$('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='text'));composePhotoFields.style.display='none';composeTextFields.style.display='block';
      composeType.value='Quiz';
      quizQuestionEl.value=post.quizQuestion||'';
      quizExplanationEl.value=post.backBody||'';
      quizOptionInputs.forEach((inp,idx)=>{inp.value=post.quizOptions[idx]?post.quizOptions[idx].text:''});
      const correctIdx=post.quizOptions.findIndex(o=>o.correct);
      const radio=document.querySelector(`input[name="quiz-correct-radio"][value="${correctIdx>=0?correctIdx:0}"]`);
      if(radio)radio.checked=true;
      composeTitleSize.value=String(post.titleSize||36);composeTextSize.value=String(post.bodySize||18);
      composeSource.value=post.source||'';composeLegend.value=post.legend||'';
      populateComposeFolders(post.folderId||folderMap[post.id]||'');
      updateSchemaVisibility();updateSubmitState();
      return;
    }
    if(post.type==='text'){composeMode='text';$$('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='text'));composePhotoFields.style.display='none';composeTextFields.style.display='block';composeType.value=post.cardType||'Concept';composeTitle.value=post.title||'';composeTitleSize.value=String(post.titleSize||36);composeTextSize.value=String(post.bodySize||18);composeText.value=post.body||'';composeSource.value=post.source||'';composeLegend.value=post.legend||'';vocabTranslation.value=post.cardType==='Vocabulaire'?(post.backBody||''):'';if(post.image){pendingImage=post.image;composeImagePreview.src=post.image;composeImagePreview.style.display='block';composeImageRemove.style.display='inline-block';composeImageSizeRow.style.display='block';composeImageSize.value=String(post.imageSize||60);composeImageSizeLabel.textContent=(post.imageSize||60)+'%'}else{pendingImage=null;composeImagePreview.src='';composeImagePreview.style.display='none';composeImageRemove.style.display='none';composeImageSizeRow.style.display='none';composeImageSize.value='60';composeImageSizeLabel.textContent='60%'}const hasBack=!!(post.backBody&&post.backBody.trim());composeHasBack.checked=hasBack;composeBackFields.style.display=hasBack?'block':'none';composeBackTitle.value=post.backTitle||'';composeBackText.value=post.backBody||'';populateComposeFolders(post.folderId||folderMap[post.id]||'');const sc=Array.isArray(post.schema)?post.schema:[];schemaNode1.value=sc[0]||'';schemaNode2.value=sc[1]||'';schemaNode3.value=sc[2]||'';updateSchemaVisibility()}else{composeMode='photo';$$('.mode-btn').forEach(b=>b.classList.toggle('active',b.dataset.mode==='photo'));composePhotoFields.style.display='block';composeTextFields.style.display='none';pendingFront=post.imageFront;pendingBack=post.imageBack||null;composePreviewFront.src=pendingFront;composePreviewFront.style.display='block';if(pendingBack){composePreviewBack.src=pendingBack;composePreviewBack.style.display='block'}}updateSubmitState()}

  // Library / discovery
  const libraryOverlay=$('#library-overlay'), librarySearch=$('#library-search'), libraryResults=$('#library-results'), coverFileInput=$('#cover-file-input'); let libraryFilter='all', coverEditingId=null;
  const COVER_COLORS={'Concept':'#8FA05C','Schéma':'#B49A46','Résumé de livre':'#B46A72','Citation':'#A9B7C6','Définition':'#7C9E9E','Question':'#9C7CA0','Quiz':'#B49A46','Vocabulaire':'#6D8CA8','Note':'#8A8F98','Photo':'#2D3A47'};
  function coverColorFor(type){return COVER_COLORS[type]||'#6B7A54'}
  function saveCovers(){store.set(KEYS.covers,covers)}
  function openLibrary(){libraryOverlay.classList.add('open');renderLibrary();setTimeout(()=>librarySearch.focus(),80)}
  function closeLibrary(){libraryOverlay.classList.remove('open')}
  $('#library-btn').addEventListener('click',openLibrary);
  $('#library-close').addEventListener('click',closeLibrary);
  $('#library-quit').addEventListener('click',closeLibrary);
  $$('#library-filters .filter-chip').forEach(btn=>btn.addEventListener('click',()=>{libraryFilter=btn.dataset.filter;syncFilterChips();renderLibrary()}));
  librarySearch.addEventListener('input',renderLibrary);
  function syncFilterChips(){
    $$('#library-filters .filter-chip').forEach(b=>b.classList.toggle('active',b.dataset.filter===libraryFilter));
    $$('#library-category-filters .filter-chip').forEach(b=>b.classList.toggle('active',b.dataset.filter===libraryFilter));
  }
  function cardMeta(slot){return{id:slot.dataset.cardId||'',type:slot.dataset.cardType||'Note',title:slot.dataset.cardTitle||$('.title',slot)?.textContent.trim()||'Fiche',owner:slot.dataset.owner||'system',folderId:folderMap[slot.dataset.cardId]||'',text:slot.innerText.replace(/\s+/g,' ').trim(),slot}}
  function renderCategoryChips(allItems){
    const wrap=$('#library-category-filters'); if(!wrap) return;
    const types=[...new Set(allItems.map(x=>x.type))].sort((a,b)=>a.localeCompare(b,'fr'));
    wrap.innerHTML=types.map(t=>`<button class="filter-chip" data-filter="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('');
    $$('#library-category-filters .filter-chip').forEach(btn=>btn.addEventListener('click',()=>{libraryFilter=btn.dataset.filter;syncFilterChips();renderLibrary()}));
    syncFilterChips();
  }
  function coverCardHtml(x){
    const cover=covers[x.id];
    const thumb=cover?`<img src="${cover}" alt="">`:`<span class="cover-thumb-title">${escapeHtml(x.title)}</span>`;
    return `<div class="cover-card" data-id="${escapeHtml(x.id)}">
      <div class="cover-thumb" style="background:${cover?'#20242a':coverColorFor(x.type)}">
        ${thumb}
        <button class="cover-star ${favorites.has(x.id)?'active':''}" title="Favori" data-action="star">${favorites.has(x.id)?'★':'☆'}</button>
      </div>
      <div class="cover-title">${escapeHtml(x.title)}</div>
      <div class="cover-meta">${escapeHtml(x.type)}</div>
      <div class="cover-actions">
        <button class="cover-action-btn" data-action="cover">🖼 Couverture</button>
        <button class="cover-action-btn danger" data-action="delete">⌫</button>
      </div>
    </div>`;
  }
  function bindCoverCard(el,x){
    $('[data-action="star"]',el).addEventListener('click',e=>{e.stopPropagation();if(favorites.has(x.id))favorites.delete(x.id);else favorites.add(x.id);persistFavorites();renderLibrary();syncLikeCurrentButton()});
    $('[data-action="cover"]',el).addEventListener('click',e=>{e.stopPropagation();coverEditingId=x.id;coverFileInput.value='';coverFileInput.click()});
    $('[data-action="delete"]',el).addEventListener('click',e=>{
      e.stopPropagation();
      if(!confirm('Supprimer cette fiche ?')) return;
      if(x.owner==='system'){ deletedCards.add(x.id); store.set(KEYS.deletedCards,[...deletedCards]); }
      else{ posts=posts.filter(p=>p.id!==x.id); store.set(KEYS.posts,posts); }
      favorites.delete(x.id); delete folderMap[x.id]; delete covers[x.id]; delete quizAnswers[x.id];
      saveFolders(); saveCovers(); saveQuizAnswers(); persistFavorites();
      if(x.slot) x.slot.classList.add('deleted-card');
      renderAllPosts();
      toast('Fiche supprimée');
    });
    el.addEventListener('click',e=>{ if(e.target.closest('button')) return; closeLibrary(); x.slot.scrollIntoView({behavior:'smooth'}); });
  }
  coverFileInput.addEventListener('change',()=>{
    const f=coverFileInput.files[0]; if(!f||!coverEditingId) return;
    readAndResizeKeepAlpha(f,d=>{ covers[coverEditingId]=d; saveCovers(); toast('Couverture mise à jour'); renderLibrary(); });
  });
  function renderLibrary(){
    identifyStaticCards(); renderFolderControls();
    const q=librarySearch.value.trim().toLowerCase();
    const allItems=$$('.card-slot').map(cardMeta).filter(x=>!deletedCards.has(x.id));
    renderCategoryChips(allItems);
    const matchesSearch=x=>!q||(`${x.title} ${x.type} ${x.text}`).toLowerCase().includes(q);
    const matchesFolder=x=>libraryFolder==='all'||x.folderId===libraryFolder;
    let items=allItems.filter(x=>matchesSearch(x)&&matchesFolder(x));
    if(libraryFilter==='favorites') items=items.filter(x=>favorites.has(x.id));
    else if(libraryFilter==='mine') items=items.filter(x=>x.owner===activeProfile);
    else if(libraryFilter!=='all') items=items.filter(x=>x.type===libraryFilter);

    libraryResults.innerHTML='';
    if(!items.length){libraryResults.innerHTML='<p class="empty-note">Aucune fiche ne correspond à cette recherche.</p>';return}

    const renderSection=(title,list)=>{
      if(!list.length) return;
      const section=document.createElement('div');
      section.innerHTML=`<div class="library-section-title">${escapeHtml(title)}</div><div class="library-grid"></div>`;
      const grid=$('.library-grid',section);
      list.forEach(x=>{ grid.insertAdjacentHTML('beforeend',coverCardHtml(x)); });
      $$('.cover-card',grid).forEach((el,i)=>bindCoverCard(el,list[i]));
      libraryResults.appendChild(section);
    };

    if(libraryFilter==='all'&&!q){
      const favs=items.filter(x=>favorites.has(x.id));
      renderSection('★ Favoris',favs);
      const byType={};
      items.forEach(x=>{ (byType[x.type]=byType[x.type]||[]).push(x); });
      Object.keys(byType).sort((a,b)=>a.localeCompare(b,'fr')).forEach(t=>renderSection(t,byType[t]));
    }else{
      renderSection(libraryFilter==='favorites'?'★ Favoris':libraryFilter==='mine'?'Mes fiches':libraryFilter==='all'?'Résultats':libraryFilter,items);
    }
  }
  $('#random-card').addEventListener('click',()=>{const slots=$$('.card-slot').filter(s=>!s.classList.contains('hidden-by-filter')&&!s.classList.contains('deleted-card'));if(!slots.length)return;closeLibrary();slots[Math.floor(Math.random()*slots.length)].scrollIntoView({behavior:'smooth'})});

  // Cœur de la barre d'actions : tap = aime la fiche affichée, appui long = ouvre les favoris
  (()=>{
    const likeCurrentBtn=$('#like-current-btn'); let pressTimer=null, longPressed=false;
    const openFavorites=()=>{
      longPressed=true;
      libraryFilter='favorites';
      openLibrary();
      syncFilterChips();
    };
    likeCurrentBtn.addEventListener('pointerdown',()=>{longPressed=false;pressTimer=setTimeout(openFavorites,500)});
    ['pointerup','pointerleave','pointercancel'].forEach(ev=>likeCurrentBtn.addEventListener(ev,()=>clearTimeout(pressTimer)));
    likeCurrentBtn.addEventListener('click',()=>{
      if(longPressed){longPressed=false;return}
      const slot=currentSlot(); const id=slot?.dataset.cardId; if(!id) return;
      if(favorites.has(id)) favorites.delete(id); else favorites.add(id);
      persistFavorites();
      renderLibrary();
      syncLikeCurrentButton();
    });
  })();

  // Export / import
  $('#export-data').addEventListener('click',()=>{const payload={app:'Marges',version:5,exportedAt:new Date().toISOString(),posts,favorites:[...favorites],profile:activeProfile,messages:store.get(KEYS.messages,[]),settings:store.get(KEYS.settings,{}),folders,folderMap,deletedCards:[...deletedCards],covers,quizAnswers};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='marges-sauvegarde-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Sauvegarde exportée')});
  $('#import-file').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(d.app!=='Marges')throw 0;posts=Array.isArray(d.posts)?d.posts:[];favorites=new Set(Array.isArray(d.favorites)?d.favorites:[]);activeProfile=d.profile||'Vous';store.set(KEYS.posts,posts);persistFavorites();store.set(KEYS.profile,activeProfile);if(Array.isArray(d.messages))store.set(KEYS.messages,d.messages);if(d.settings)store.set(KEYS.settings,d.settings);folders=Array.isArray(d.folders)?d.folders:[];folderMap=d.folderMap&&typeof d.folderMap==='object'?d.folderMap:{};deletedCards=new Set(Array.isArray(d.deletedCards)?d.deletedCards:[]);store.set(KEYS.deletedCards,[...deletedCards]);covers=d.covers&&typeof d.covers==='object'?d.covers:{};saveCovers();quizAnswers=d.quizAnswers&&typeof d.quizAnswers==='object'?d.quizAnswers:{};saveQuizAnswers();saveFolders();$('#profile-name').textContent=activeProfile;renderAllPosts();renderFolderControls();renderLibrary();toast('Données importées')}catch(err){alert('Ce fichier ne semble pas être une sauvegarde Marges valide.')}};r.readAsText(f);e.target.value=''});

  // Profile + messages
  const profileNameEl=$('#profile-name');profileNameEl.textContent=activeProfile;$('#change-profile').addEventListener('click',()=>{const name=prompt('Nom du profil :',activeProfile);if(name&&name.trim()){activeProfile=name.trim();store.set(KEYS.profile,activeProfile);profileNameEl.textContent=activeProfile;renderContactList()}});
  const msgBtn=$('#msg-btn'),messagesOverlay=$('#messages-overlay'),listView=$('#list-view'),threadView=$('#thread-view'),contactListEl=$('#contact-list'),noContactsEl=$('#no-contacts'),addContactInput=$('#add-contact'),threadMessagesEl=$('#thread-messages'),threadInput=$('#thread-input');
  msgBtn.addEventListener('click',()=>{messagesOverlay.classList.add('open');showList();renderContactList()});$('#messages-close').addEventListener('click',()=>messagesOverlay.classList.remove('open'));function showList(){listView.style.display='block';threadView.classList.remove('active')}function showThread(){listView.style.display='none';threadView.classList.add('active')}$('#thread-back').addEventListener('click',showList);
  function getAllMessages(){return store.get(KEYS.messages,[])}function saveAllMessages(m){store.set(KEYS.messages,m)}
  function renderContactList(){const msgs=getAllMessages(),partners=new Set();msgs.forEach(m=>{if(m.from===activeProfile)partners.add(m.to);if(m.to===activeProfile)partners.add(m.from)});contactListEl.innerHTML='';noContactsEl.style.display=partners.size?'none':'block';[...partners].forEach(name=>{const li=document.createElement('li');li.textContent=name;li.addEventListener('click',()=>openThread(name));contactListEl.appendChild(li)})}
  addContactInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&addContactInput.value.trim()){const n=addContactInput.value.trim();addContactInput.value='';if(n!==activeProfile)openThread(n)}});function openThread(name){currentContact=name;showThread();renderThreadMessages()}function renderThreadMessages(){const thread=getAllMessages().filter(m=>(m.from===activeProfile&&m.to===currentContact)||(m.from===currentContact&&m.to===activeProfile)).sort((a,b)=>a.ts-b.ts);threadMessagesEl.innerHTML=thread.length?'':'<p class="empty-note">Aucun message pour l\'instant.</p>';thread.forEach(m=>{const d=document.createElement('div');d.className='msg-bubble '+(m.from===activeProfile?'mine':'theirs');d.innerHTML=escapeHtml(m.text)+`<div class="msg-meta">${escapeHtml(m.from)}</div>`;threadMessagesEl.appendChild(d)});threadMessagesEl.scrollTop=threadMessagesEl.scrollHeight}function sendMessage(){const text=threadInput.value.trim();if(!text||!currentContact)return;threadInput.value='';const m=getAllMessages();m.push({from:activeProfile,to:currentContact,text,ts:Date.now()});saveAllMessages(m);renderThreadMessages()}$('#thread-send').addEventListener('click',sendMessage);threadInput.addEventListener('keydown',e=>{if(e.key==='Enter')sendMessage()});

  // Overlay usability
  $$('.overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open')}));document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.overlay.open').forEach(o=>o.classList.remove('open'))});

  function boot(){identifyStaticCards();renderFolderControls();renderFeedTabs();populateComposeFolders();renderAllPosts();syncLikeButtons();applyFeedCategoryFilter();renderLibrary();syncLikeCurrentButton()}

  // ---- Écran de connexion ----
  const authScreen=$('#auth-screen'),authFormWrap=$('#auth-form-wrap'),authStatus=$('#auth-status'),authEmail=$('#auth-email'),authPassword=$('#auth-password'),authSubmit=$('#auth-submit'),authError=$('#auth-error'),authModeToggle=$('#auth-mode-toggle');
  let authMode='login';
  authModeToggle.addEventListener('click',e=>{
    const btn=e.target.closest('.mode-btn'); if(!btn) return;
    authMode=btn.dataset.mode;
    $$('.mode-btn',authModeToggle).forEach(b=>b.classList.toggle('active',b===btn));
    authSubmit.textContent=authMode==='login'?'Se connecter':'Créer le compte';
    authError.textContent='';
  });
  function showAuthStatus(msg){ authStatus.textContent=msg||''; authFormWrap.style.display='none'; authScreen.classList.add('open'); }
  function showAuthForm(){ authStatus.textContent=''; authFormWrap.style.display='block'; authScreen.classList.add('open'); }
  function hideAuthScreen(){ authScreen.classList.remove('open'); }
  function translateAuthError(code){
    const map={
      'auth/invalid-email':'Adresse e-mail invalide.',
      'auth/user-not-found':'Aucun compte avec cet e-mail.',
      'auth/wrong-password':'Mot de passe incorrect.',
      'auth/invalid-credential':'E-mail ou mot de passe incorrect.',
      'auth/email-already-in-use':'Un compte existe déjà avec cet e-mail.',
      'auth/weak-password':'Le mot de passe doit contenir au moins 6 caractères.'
    };
    return map[code]||'Une erreur est survenue. Réessayez.';
  }
  authSubmit.addEventListener('click',async()=>{
    const email=authEmail.value.trim(), pass=authPassword.value;
    authError.textContent='';
    if(!email||!pass){ authError.textContent='Renseignez e-mail et mot de passe.'; return; }
    authSubmit.disabled=true;
    const {auth,signInWithEmailAndPassword,createUserWithEmailAndPassword}=window.MargesCloud;
    try{
      if(authMode==='login') await signInWithEmailAndPassword(auth,email,pass);
      else await createUserWithEmailAndPassword(auth,email,pass);
    }catch(e){ authError.textContent=translateAuthError(e.code); }
    authSubmit.disabled=false;
  });
  [authEmail,authPassword].forEach(inp=>inp.addEventListener('keydown',e=>{if(e.key==='Enter')authSubmit.click()}));
  $('#logout-btn').addEventListener('click',async()=>{
    if(!confirm('Se déconnecter ? Vos données restent en ligne et seront retéléchargées à la prochaine connexion.')) return;
    const {auth,signOut}=window.MargesCloud;
    await signOut(auth);
  });

  function startAuthFlow(){
    if(!window.MargesCloud){ window.addEventListener('marges-firebase-ready',startAuthFlow,{once:true}); return; }
    const {auth,onAuthStateChanged}=window.MargesCloud;
    showAuthStatus('Connexion à votre bibliothèque…');
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        cloudUser=user;
        showAuthStatus('Synchronisation de vos données…');
        await pullFromCloud(user.uid);
        cloudSyncEnabled=true;
        loadLocalState();
        profileNameEl.textContent=activeProfile;
        hideAuthScreen();
        boot();
      }else{
        cloudUser=null; cloudSyncEnabled=false;
        showAuthForm();
      }
    });
  }
  startAuthFlow();
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
})();
</script>

</body>
</html>
